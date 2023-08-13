'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Form } from '@/components'

const EditPost = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const postId = searchParams.get('id')

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    type: '',
    title: '',
    location: '',
    date: '',
    description: '',
    category: '',
    public_id: '',
    secure_url: '',
  })

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`/api/post/${postId}`)
      const data = await response.json()

      setPost({
        type: data.type,
        title: data.title,
        location: data.location,
        date: data.date,
        description: data.description,
        category: data.category,
        public_id: data.public_id,
        secure_url: data.secure_url,
      })
    }

    if (postId) getPostDetails()
  }, [postId])

  const updatePost = async (
    e: React.FormEvent<HTMLInputElement>,
    photoData: any
  ) => {
    e.preventDefault()
    setSubmitting(true)

    if (!postId) return alert('Post ID not found')

    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          type: post.type,
          title: post.title,
          location: post.location,
          date: post.date,
          description: post.description,
          datePosted: Date.now(),
          category: post.category,
        }),
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className=''>
      <Form
        type='Edit'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePost}
      />
    </div>
  )
}

export default EditPost
