'use client'

import { useState, useEffect } from 'react'
import { PostCard } from '.'
import { PostListProps } from '@/types'

const PostList = ({
  data,
  handleCategoryClick,
  searchQuery,
}: PostListProps & { searchQuery: string }) => {
  // Filter items based on the search query
  const filteredData = data.filter((post) => {
    const { title, location, description, category, type } = post
    const lowerCaseSearchQuery = searchQuery.toLowerCase()

    return (
      title.toLowerCase().includes(lowerCaseSearchQuery) ||
      location.toLowerCase().includes(lowerCaseSearchQuery) ||
      description.toLowerCase().includes(lowerCaseSearchQuery) ||
      type.toLowerCase().includes(lowerCaseSearchQuery) ||
      category.toLowerCase().includes(lowerCaseSearchQuery)
    )
  })

  return (
    <div className='flex flex-row flex-wrap w-full py-5 justify-center gap-10'>
      {filteredData.map((post) => (
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
  const [allPosts, setAllPosts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/post')
      const data = await response.json()

      setAllPosts(data.reverse())
    }
    fetchPosts()
  }, [])

  return (
    <section className='flex flex-col lg:items-center'>
      <form className='relative sm:w-full lg:w-[50vw] flex-center my-5'>
        <input
          type='text'
          placeholder='Filter by type, name, location, or description'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='search-input peer'
        />
      </form>

      <PostList
        data={allPosts}
        handleCategoryClick={setSearchQuery}
        searchQuery={searchQuery}
      />
    </section>
  )
}

export default Feed
