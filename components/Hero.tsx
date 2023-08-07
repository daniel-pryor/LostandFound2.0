'use client'

import Image from 'next/image'
import { CustomButton } from '.'

const Hero = () => {
  const handleScroll = () => {}
  return (
    <div className='hero'>
      <div className='flex-1 pt-36 padding-x'>
        <h1 className='hero__title'>Welcome to Lost & Found</h1>
        <p className='hero__subtitle'>
          Where Lost Belongings Find Their Way Home.
        </p>

        <CustomButton
          title='Explore Items'
          containerStyles='bg-primary-purple text-white rounded-full mt-10'
          handleClick={handleScroll}
        />
      </div>
      <div className='hero__image-container'>
        <div className='hero__image'>
          <Image src='/hero.png' alt='hero' fill className='object-contain' />
        </div>
      </div>
    </div>
  )
}

export default Hero
