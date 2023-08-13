'use client'

import Image from 'next/image'
import { Fragment } from 'react'

import { Dialog, Transition } from '@headlessui/react'

import { PostDetailsProps } from '@/types'

const PostDetails = ({
  isOpen,
  closeModal,
  post,
  handleCategoryClick,
}: PostDetailsProps) => {
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
                <Dialog.Panel className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5'>
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

                  <div className='flex-1 flex flex-col gap-2'>
                    <h2 className='font-semibold text-xl capitalize'>
                      {post.title} {post.type}
                    </h2>

                    <div>
                      <p>{post.location}</p>
                      <p>{post.date}</p>
                      <p>{post.description}</p>
                      <p>{post.category}</p>
                      <div>
                        <Image
                          src={post.creator.image}
                          alt='user_image'
                          width={40}
                          height={40}
                          className='rounded-full object-contain'
                        />
                        <p
                          onClick={() =>
                            handleCategoryClick &&
                            handleCategoryClick(post.category)
                          }
                        >
                          posted by {post?.creator.username}
                        </p>
                      </div>
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
