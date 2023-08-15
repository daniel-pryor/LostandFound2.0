import Image from 'next/image'
import React, { useTransition } from 'react'

const PhotoCard = ({ url, onClick }: any) => {
  const [isPending, startTransition] = useTransition()

  return (
    <div>
      <div className='w-[300px] h-[300px] bg-slate-100 rounded-sm drop-shadow-sm p-5 my-2 relative'>
        <Image
          src={url}
          alt='image'
          layout='fill'
          objectFit='cover'
          className='mx-auto'
          priority
        />
      </div>

      <button
        type='button'
        onClick={() => startTransition(onClick)}
        disabled={isPending}
        className='text-right w-full'
      >
        {isPending ? 'Loading...' : 'Delete'}
      </button>
    </div>
  )
}

export default PhotoCard
