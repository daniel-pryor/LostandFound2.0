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
              <Link
                href='/create-post'
                className='rounded-full border border-primary-purple bg-primary-purple py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm  flex items-center justify-center'
              >
                Create Post
              </Link>
              <CustomButton
                title={'Sign Out'}
                btnType='button'
                containerStyles='text-primary-purple'
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
              containerStyles='text-white rounded-full bg-primary-purple min-w[130px]'
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
                    className='text-primary-purple  px-5'
                    onClick={() => setToggleDropDown(false)}
                  >
                    My Profile
                  </Link>
                  <CustomButton
                    title={'Sign Out'}
                    btnType='button'
                    containerStyles='text-primary-purple rounded-full bg-white min-w[130px]'
                    handleClick={() => {
                      signOut()
                      setToggleDropDown(false)
                    }}
                  />
                  <Link
                    href='/create-post'
                    className='rounded-full border border-primary-purple bg-primary-purple py-1.5 px-5 text-white transition-all hover:bg-white hover:text-primary-purple text-center text-sm  flex items-center justify-center'
                    onClick={() => setToggleDropDown(false)}
                  >
                    Create Post
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <CustomButton
                title={'Sign In'}
                btnType='button'
                containerStyles='rounded-full border border-primary-purple bg-white py-1.5 px-5 text-primary-purple transition-all hover:bg-primary-purple hover:text-white text-center text-sm  flex items-center justify-center'
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
