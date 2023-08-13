import Image from 'next/image'
import React, { useTransition } from 'react'

const PhotoCard = ({ url, onClick }: any) => {
  const [isPending, startTransition] = useTransition()

  return (
    <div>
      <div>
        <Image src={url} alt='image' width={100} height={60} priority />
      </div>

      <button
        type='button'
        onClick={() => startTransition(onClick)}
        disabled={isPending}
      >
        {isPending ? 'Loading...' : 'Delete'}
      </button>
    </div>
  )
}

export default PhotoCard
