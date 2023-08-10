import Image from 'next/image'
import React, { useTransition } from 'react'

const PhotoCard = ({ url, onClick, post }: any) => {
  const [isPending, startTransition] = useTransition()

  return (
    <div>
      {post && (
        <>
          <p>{post.title}</p>
          <p>{post.type}</p>
          <p>{post.location}</p>
          <p>{post.date}</p>
          <p>{post.descritpion}</p>
          <p>{post.category}</p>
        </>
      )}

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
