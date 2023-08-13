'use client'

import { useState, useEffect } from 'react'
import { Post, PostCard, SearchBar } from '.'
import { PostListProps } from '@/types'
import PhotoList from './PhotoList'
import { getAllPhotos } from '@/actions/uploadActions'

const PostList = ({ data, handleCategoryClick }: PostListProps) => {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    const fetchPhotos = async () => {
      const photos = await getAllPhotos()
      setPhotos(photos)
    }
    fetchPhotos()
  }, [])

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
