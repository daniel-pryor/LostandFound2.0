'use client'

import { useState, useEffect } from 'react'
import { PostCard, SearchBar } from '.'
import { PostListProps } from '@/types'

const PostList = ({ data, handleCategoryClick }: PostListProps) => {
  return (
    <div>
      {data.map((post) => (
        <PostCard
          key={post._id}
          handleCategoryClick={handleCategoryClick}
          post={post}
          url={post?.secure_url}
          handleDelete={() => {}}
          handleEdit={() => {}}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/post')
      const data = await response.json()

      setPosts(data)
    }
    fetchPosts()
  }, [])

  return (
    <section className='home__cars-wrapper'>
      <SearchBar />
      <PostList data={posts} handleCategoryClick={() => {}} />
    </section>
  )
}

export default Feed
