'use client'

import { useRef, useState } from 'react'
import PhotoCard from './PhotoCard'
import { revalidate, uploadPhoto } from '@/actions/uploadActions'

const UploadFile = () => {
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

  async function handleUpload() {
    if (!files.length) return alert('No image files are selected')

    const formData = new FormData()

    files.forEach((file) => {
      formData.append('files', file)
    })

    const data = {
      name: 'bottle',
      type: 'found',
    }

    const res = await uploadPhoto(formData, data)

    // if (res?.msg) alert(`Success: ${res?.msg}`) // await delay(2000)
    if (res?.errMsg) alert(`Error: ${res?.errMsg}`)
    setFiles([])
    formRef?.current?.reset()

    // delay about 2s to update cloudinary database
    // the revalidatePath => call getAllPhotos()
    revalidate('/')
  }

  return (
    <form action={handleUpload} ref={formRef}>
      <div style={{ background: '#ddd', minHeight: 200 }}>
        <input type='file' accept='image/*' onChange={handleInputFiles} />

        <h5 style={{ color: 'red' }}>
          {' '}
          (*) Only accepts files less than 1mb. Up to 3 photo files{' '}
        </h5>
        {/* Preview Images */}

        {files.map((file, index) => (
          <PhotoCard
            key={index}
            url={URL.createObjectURL(file)}
            onClick={() => handleDeleteFile(index)}
          />
        ))}
      </div>
    </form>
  )
}

export default UploadFile
