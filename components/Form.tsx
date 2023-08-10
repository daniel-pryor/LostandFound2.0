'use client'

import { FormProps } from '@/types'
import Link from 'next/link'

import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import PhotoCard from './PhotoCard'
import ButtonSubmit from './ButtonSubmit'
import { revalidate, uploadPhoto } from '@/actions/uploadActions'
import UploadFile from './UploadFile'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
const Form = ({ type, submitting, handleSubmit, post, setPost }: FormProps) => {
  const { data: session } = useSession()
  const router = useRouter()

  const formRef = useRef()
  const [files, setFiles] = useState([])

  async function handleInputFiles(e: any) {
    const files = e.target.files

    const newFiles = [...files].filter((file) => {
      if (file.size < 1024 * 1024 && file.type.startsWith('image/')) {
        // Only accept image files less than 1mb in size
        return file
      }
    })
    setFiles((prev) => [...newFiles, ...prev])
    formRef?.current?.reset()
  }

  async function handleDeleteFile(index: Number) {
    const newFiles = files.filter((_, i) => i !== index)

    setFiles(newFiles)
  }

  async function handleUpload(e: any) {
    e.preventDefault()
    if (!post.secure_url && !files.length)
      return alert('No image files are selected')

    const formData = new FormData()

    files.forEach((file) => {
      formData.append('files', file)
    })

    const res = await uploadPhoto(formData)
    handleSubmit(e, res)
    // setPost({
    //   ...post,
    //   public_id: 'photo',
    //   secure_url: 'photo',
    // })

    // if (res?.msg) alert(`Success: ${res?.msg}`) // await delay(2000)
    if (res?.errMsg) alert(`Error: ${res?.errMsg}`)
    setFiles([])
    formRef?.current?.reset()

    // delay about 2s to update cloudinary database
    // the revalidatePath => call getAllPhotos()
  }

  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1>{type} Post</h1>
      <p className=''>{type} your post</p>
      {/* <UploadFile /> */}
      <form onSubmit={handleUpload} className='flex flex-col gap-5 m-10'>
        {post.secure_url ? (
          <div>
            <Image
              src={post.secure_url}
              alt='image'
              width={100}
              height={60}
              priority
            />
          </div>
        ) : (
          <div style={{ background: '#ddd', minHeight: 200 }}>
            <input type='file' accept='image/*' onChange={handleInputFiles} />

            <h5 style={{ color: 'red' }}>
              {' '}
              (*) Only accepts files less than 1mb. Up to 3 photo files{' '}
            </h5>
            {/* Preview Images */}

            {files.map((file, index) => (
              <PhotoCard
                url={URL.createObjectURL(file)}
                onClick={() => handleDeleteFile(index)}
              />
            ))}
          </div>
        )}

        <label>
          <span className=''>Item type</span>

          <input
            value={post.type}
            onChange={(e) => setPost({ ...post, type: e.target.value })}
            placeholder='item type'
            required
            className='border'
          />
        </label>
        <label>
          <span className=''>Item Category</span>

          <input
            value={post.category}
            onChange={(e) => setPost({ ...post, category: e.target.value })}
            placeholder='item category'
            required
            className='border'
          />
        </label>
        <label>
          <span className=''>Item name</span>

          <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder='item name'
            required
            className='border'
          />
        </label>
        <label>
          <span className=''>Location</span>

          <input
            value={post.location}
            onChange={(e) => setPost({ ...post, location: e.target.value })}
            placeholder='item name'
            required
            className='border'
          />
        </label>
        <label>
          <span className=''>Date</span>

          <input
            value={post.date}
            onChange={(e) => setPost({ ...post, date: e.target.value })}
            placeholder='item name'
            required
            className='border'
          />
        </label>
        <label>
          <span className=''>Item description</span>

          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            placeholder='Describe the item you found'
            required
            className='border'
          />
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>
          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-purple rounded-full text-white'
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
