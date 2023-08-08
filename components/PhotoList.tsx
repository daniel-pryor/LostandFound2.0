'use client'

import { deletePhoto } from '@/actions/uploadActions'
import PhotoCard from './PhotoCard'

const PhotoList = ({ photos }: any) => {
  async function handleDeletePhoto(public_id: string) {
    await deletePhoto(public_id)
  }
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      {photos.map((photo) => (
        <PhotoCard
          key={photo?.public_id}
          url={photo?.secure_url}
          onClick={() => handleDeletePhoto(photo?.public_id)}
        />
      ))}
    </div>
  )
}

export default PhotoList
