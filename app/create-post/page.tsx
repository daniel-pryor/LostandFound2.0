'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Form } from '@/components'

const CreatePost = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    type: '',
    title: '',
    location: '',
    date: '',
    description: '',
    category: '',
  })

  const createPost = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSubmitting(true)

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
        type='Create'
        // post={post}
        // setPost={setPost}
        submitting={submitting}
        handleSubmit={createPost}
      />
    </div>
  )
}

export default CreatePost
