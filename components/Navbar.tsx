'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'

import CustomButton from './CustomButton'

const Navbar = () => {
  const { data: session } = useSession()
  const [toggleDropDown, setToggleDropDown] = useState(false)

  return (
    <header className='w-full z-10'>
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4'>
        <Link href='/' className='flex justify-center items-center'>
          <Image
            src='/lf-logo.svg'
            alt='Lost & Found Logo'
            width={130}
            height={20}
            className='object-contain'
          />
        </Link>
        {/** Desktop navigation */}
        <div className='sm:flex hidden'>
          {session?.user ? (
            <div className='flex gap-3 md:gap-5'>
              <Link href='/create-post' className=''>
                Create Post
              </Link>
              <CustomButton
                title={'Sign Out'}
                btnType='button'
                containerStyles='text-primary-purple rounded-full bg-white min-w[130px]'
                handleClick={signOut}
              />
              <Link href='/profile'>
                <Image
                  src={`${session?.user.image}`}
                  width={37}
                  height={37}
                  className='rounded-full'
                  alt='profile'
                />
              </Link>
            </div>
          ) : (
            <CustomButton
              title={'Sign In'}
              btnType='button'
              containerStyles='text-primary-blue rounded-full bg-white min-w[130px]'
              handleClick={signIn}
            />
          )}
        </div>

        {/* Mobile Navigation */}

        <div className='sm:hidden flex relative'>
          {session?.user ? (
            <div className='flex z-10'>
              <Image
                src={`${session?.user.image}`}
                width={37}
                height={37}
                className='rounded-full cursor-pointer'
                alt='profile'
                onClick={() => setToggleDropDown((prev) => !prev)}
              />
              {toggleDropDown && (
                <div className='dropdown'>
                  <Link
                    href='/profile'
                    className=''
                    onClick={() => setToggleDropDown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href='/create-post'
                    className=''
                    onClick={() => setToggleDropDown(false)}
                  >
                    Create Post
                  </Link>

                  <CustomButton
                    title={'Sign Out'}
                    btnType='button'
                    containerStyles='text-primary-blue rounded-full bg-white min-w[130px]'
                    handleClick={() => {
                      signOut()
                      setToggleDropDown(false)
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <>
              <CustomButton
                title={'Sign In'}
                btnType='button'
                containerStyles='text-primary-blue rounded-full bg-white min-w[130px]'
                handleClick={signIn}
              />
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
