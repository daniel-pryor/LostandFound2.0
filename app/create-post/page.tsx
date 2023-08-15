'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Form } from '@/components'

const CreatePost = () => {
  const { data: session } = useSession()
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

  const createPost = async (
    e: React.FormEvent<HTMLInputElement>,
    photoData: any
  ) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/post/new', {
        method: 'POST',
        body: JSON.stringify({
          type: post.type,
          title: post.title,
          location: post.location,
          date: post.date,
          description: post.description,
          datePosted: Date.now(),
          category: post.category,
          userId: session?.user?.id,
          public_id: photoData[0].public_id,
          secure_url: photoData[0].secure_url,
        }),
      })

      return response
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      setSubmitting={setSubmitting}
      handleSubmit={createPost}
    />
  )
}

export default CreatePost
