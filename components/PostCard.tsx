'use client'

import { PostCardProps } from '@/types'
import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { CustomButton, PostDetails } from '.'

const PostCard = ({
  handleCategoryClick,
  post,
  url,
  handleEdit,
  handleDelete,
}: PostCardProps) => {
  const { data: session } = useSession()
  const pathName = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex flex-col p-5 bg-slate-50 rounded-sm drop-shadow-lg'>
      <div className='flex justify-between'>
        <h2
          className={`${
            post.type === 'Lost' ? 'text-red-400' : 'text-green-700'
          } text-2xl font-bold`}
        >
          {post.type}
        </h2>
      </div>
      <div className='w-[300px] h-[300px] bg-slate-100 rounded-sm drop-shadow-sm p-5 my-2 relative'>
        {url && (
          <Image
            src={url}
            alt='image'
            layout='fill'
            objectFit='cover'
            objectPosition='center'
            className='mx-auto'
          />
        )}
      </div>
      <h3 className='text-2xl'>{post.title}</h3>
      <div className='flex flex-wrap justify-between gap-5 my-3'>
        <p>
          <span className='text-gray-400'>Location: </span>
          {post.location}
        </p>
        <p>
          <span className='text-gray-400'>Date {post.type}: </span>
          {post.date}
        </p>
      </div>

      <CustomButton
        title='More Details'
        containerStyles='w-full py-[16px] rounded-full bg-primary-purple'
        textStyles='text-white text-[14px] leading-[17px] font-bold'
        rightIcon='/right-arrow.svg'
        handleClick={() => setIsOpen(true)}
      />
      <PostDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        post={post}
        url={url}
        handleCategoryClick={handleCategoryClick}
      />
      {session?.user?.id === post?.creator?._id && pathName === '/profile' && (
        <div>
          <p className='cursor-pointer' onClick={handleEdit}>
            Edit
          </p>
          <p className='cursor-pointer' onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
      <p
        onClick={() => handleCategoryClick(post.category)}
        className='underline text-center cursor-pointer mt-4'
      >
        See more posts in category {post.category}
      </p>
    </div>
  )
}

export default PostCard
