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
    <div>
      <div>
        {url && (
          <Image src={url} alt='image' width={100} height={60} priority />
        )}
        <p>{post.secure_url}</p>
        <h2>{post.title}</h2>
      </div>
      <CustomButton
        title='View More'
        containerStyles='w-full py-[16px] rounded-full bg-primary-purple'
        textStyles='text-white text-[14px] leading-[17px] font-bold'
        rightIcon='/right-arrow.svg'
        handleClick={() => setIsOpen(true)}
      />
      <PostDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        post={post}
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
    </div>
  )
}

export default PostCard
