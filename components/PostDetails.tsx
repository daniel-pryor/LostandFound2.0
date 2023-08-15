'use client'

import Image from 'next/image'
import { Fragment } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { Dialog, Transition } from '@headlessui/react'

import { PostDetailsProps } from '@/types'
import { convertTimestampToReadableDate } from '@/utils/functions'

const PostDetails = ({ isOpen, closeModal, post, url }: PostDetailsProps) => {
  const router = useRouter()
  const { data: session } = useSession()

  const handleProfileClick = () => {
    console.log(post)

    if (post?.creator?._id === session?.user?.id) return router.push('/profile')

    router.push(
      `/profile/${post?.creator?._id}?name=${post?.creator?.username}`
    )
  }

  const newDatePosted = convertTimestampToReadableDate(post.datePosted)

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white py-2 px-1 sm: text-left shadow-xl transition-all flex flex-col gap-5'>
                  <button
                    type='button'
                    onClick={closeModal}
                    className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
                  >
                    <Image
                      src='/close.svg'
                      alt='close'
                      width={20}
                      height={20}
                      className='object-contain'
                    />
                  </button>

                  <div className='flex flex-col p-4 items-center'>
                    <div className='flex justify-between w-full '>
                      <h2
                        className={`${
                          post.type === 'Lost'
                            ? 'text-red-400'
                            : 'text-green-700'
                        } text-2xl font-bold`}
                      >
                        {post.type}
                      </h2>
                    </div>
                    <div className='w-[350px] h-[350px] bg-slate-100 rounded-sm drop-shadow-sm  my-2 items-center relative'>
                      {url && (
                        <Image
                          src={url}
                          alt='image'
                          layout='fill'
                          objectFit='cover'
                          className='mx-auto'
                        />
                      )}
                    </div>
                    <h2 className='text-2xl'>{post.title}</h2>
                    <div className='flex flex-wrap justify-between w-full gap-5 my-3'>
                      <p>
                        <span className='text-gray-400'>Location: </span>
                        {post.location}
                      </p>
                      <p>
                        <span className='text-gray-400'>
                          Date {post.type}:{' '}
                        </span>
                        {post.date}
                      </p>
                    </div>
                    <div className='my-5'>
                      <p>{post.description}</p>
                    </div>

                    <div className='flex flex-wrap items-center   justify-around w-full '>
                      <div
                        className='flex items-center gap-2 cursor-pointer'
                        onClick={handleProfileClick}
                      >
                        <Image
                          src={post.creator.image}
                          alt='user_image'
                          width={40}
                          height={40}
                          className='rounded-full object-contain'
                        />
                        <p>{post?.creator?.username}</p>
                      </div>

                      <div>
                        <p>
                          <span className='text-gray-400'>Posted:</span>{' '}
                          {newDatePosted}
                        </p>
                      </div>
                      {post?.creator?._id !== session?.user?.id && (
                        <div className=''>
                          <a
                            href={`mailto:${post.creator?.email}?subject=Lost and Found ${post.title}`}
                            className='rounded-full border border-primary-purple bg-primary-purple py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm  flex items-center justify-center'
                          >
                            Contact User
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default PostDetails
