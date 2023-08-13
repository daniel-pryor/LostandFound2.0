'use server'

import path from 'path'
import fs from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'
import os, { tmpdir } from 'os'

import { v2 as cloudinary } from 'cloudinary'
import { revalidatePath } from 'next/cache'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

async function savePhotosToLocal(formData: any) {
  const files = formData.getAll('files')

  const multipleBuffersPromise = files.map((file) =>
    file.arrayBuffer().then((data) => {
      const buffer = Buffer.from(data)
      const name = uuidv4()
      const ext = file.type.split('/')[1]

      // const uploadDir = path.join(process.cwd(), 'public', `/${name}.${ext}`) // doesn't work in vercel

      const tempdir = os.tmpdir()
      const uploadDir = path.join(tempdir, `/${name}.${ext}`) // works in vercel

      fs.writeFile(uploadDir, buffer)
      return { filepath: uploadDir, filename: file.name }
    })
  )

  return await Promise.all(multipleBuffersPromise)
}

async function uploadPhotosToCloudinary(newFiles: any) {
  const multiplePhotosPromise = newFiles.map((file) =>
    cloudinary.uploader.upload(file.filepath, {
      folder: 'lostandfound_upload',
    })
  )

  return await Promise.all(multiplePhotosPromise)
}

const delay = (delayTimes: number) => {
  return new Promise((resolve) => setTimeout(resolve, delayTimes))
}

export async function uploadPhoto(formData: any) {
  try {
    // save photo files to temp folder
    const newFiles = await savePhotosToLocal(formData)
    // Upload to cloud after saving the photo file to the temp folder
    const photo = await uploadPhotosToCloudinary(newFiles)
    // Delete photo files in temp folder after successful upload
    newFiles.map((file) => fs.unlink(file.filepath))

    return photo
  } catch (error) {
    console.log(error)
  }
}

export async function deletePhoto(public_id: any) {
  try {
    await cloudinary.uploader.destroy(public_id)

    revalidatePath('/')
    return { msg: 'Delete Success!' }
  } catch (error) {
    return { errMsg: error.message }
  }
}

export async function revalidate(path: string) {
  revalidatePath(path)
}
