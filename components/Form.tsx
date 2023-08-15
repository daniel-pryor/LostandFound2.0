'use client'

import { FormProps } from '@/types'
import Link from 'next/link'

import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import PhotoCard from './PhotoCard'
import { uploadPhoto } from '@/actions/uploadActions'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { categories } from '@/constants'
const Form = ({
  type,
  submitting,
  setSubmitting,
  handleSubmit,
  post,
  setPost,
}: FormProps) => {
  const formRef = useRef()
  const [files, setFiles] = useState([])
  const router = useRouter()

  async function handleInputFiles(e: any) {
    const files = e.target.files

    const newFiles = [...files].filter((file) => {
      if (file.size < 1024 * 1024 && file.type.startsWith('image/')) {
        // Only accept image files less than 1mb in size
        return file
      }
    })
    setFiles((prev) => [...prev, ...newFiles])
    formRef?.current?.reset()
  }

  async function handleDeleteFile(index: Number) {
    const newFiles = files.filter((_, i) => i !== index)

    setFiles(newFiles)
  }

  async function handleUpload(e: any) {
    e.preventDefault()
    setSubmitting(true)

    if (!post.secure_url && !files.length)
      return alert('No image files are selected')

    const formData = new FormData()

    files.forEach((file) => {
      formData.append('files', file)
    })

    const res = await uploadPhoto(formData)

    if (res?.errMsg) alert(`Error: ${res?.errMsg}`)
    const response = await handleSubmit(e, res)

    if (response.ok) {
      router.push('/')
    }
    setFiles([])
    formRef?.current?.reset()
  }

  return (
    <section className='   flex flex-col items-center w-[350px] lg:w-full mx-auto'>
      <h1 className='text-4xl font-extrabold m-1'>{type} Post</h1>
      {/* <UploadFile /> */}
      <form
        onSubmit={handleUpload}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        {post.secure_url ? (
          <div className='w-[300px] h-[300px] bg-slate-100 rounded-sm drop-shadow-sm p-5 my-2 relative'>
            <Image
              src={post.secure_url}
              alt='image'
              layout='fill'
              objectFit='cover'
              className='mx-auto'
              priority
            />
          </div>
        ) : (
          <div className='flex flex-col items-center'>
            <input
              type='file'
              accept='image/*'
              onChange={handleInputFiles}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-2  w-full p-2 mb-2'
            />

            <h5 className='text-gray-400'>
              (*) Only accepts files less than 1mb{' '}
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
        <label className='text-md text-gray-900'>
          Lost or Found?
          <select
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-2  w-full p-2 dark:focus:ring-blue-500 dark:focus:border-blue-500'
            onChange={(e) => setPost({ ...post, type: e.target.value })}
            required
            placeholder='Lost or found?'
          >
            <option value='' disabled defaultValue='Select an option'>
              Select an option
            </option>
            <option value='Lost'>Lost</option>
            <option value='Found'>Found</option>
          </select>
        </label>
        <label className='text-md text-gray-900'>
          Category
          <select
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-2  w-full p-2 dark:focus:ring-blue-500 dark:focus:border-blue-500'
            onChange={(e) => setPost({ ...post, category: e.target.value })}
            required
            placeholder='Select an option'
          >
            <option value='' disabled defaultValue='Select an option'>
              Select an option
            </option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}

            <option value='Found'>Found</option>
          </select>
        </label>
        {/* <label>
          <span className=''>Item Category</span>

          <input
            value={post.category}
            onChange={(e) => setPost({ ...post, category: e.target.value })}
            placeholder='item category'
            required
            className='border'
          />
        </label> */}
        <label>
          <span className=''>Title</span>

          <input
            type='text'
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder='eg. Brown leather wallet...'
            required
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-2  w-full p-2'
          />
        </label>
        <label>
          <span className=''>Location</span>

          <input
            type='text'
            value={post.location}
            onChange={(e) => setPost({ ...post, location: e.target.value })}
            placeholder='eg. Clovelly Beach...'
            required
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-2  w-full p-2'
          />
        </label>
        <label>
          <span className=''>Date</span>

          <input
            type='date'
            value={post.date}
            onChange={(e) => setPost({ ...post, date: e.target.value })}
            placeholder='item name'
            required
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-2  w-full p-2'
          />
        </label>
        <label>
          <span className=''>Item description</span>

          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            placeholder='Describe the item and give more information about where you lost/found it...'
            required
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-2  w-full p-2 h-[100px]'
          />
        </label>
        <div className='flex justify-between items-center mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>
          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-purple rounded-full text-white w-[100px]'
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
