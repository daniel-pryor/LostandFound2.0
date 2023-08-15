import { ProfileProps } from '@/types'
import { PostCard } from '.'
import Link from 'next/link'

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: ProfileProps) => {
  const userEmail = data[0]?.creator?.email
  return (
    <section className='flex flex-col lg:items-center '>
      <div className='flex flex-col  mx-auto justify-between'>
        <div className='my-5'>
          <h1 className='text-4xl font-extrabold mb-1'>{name} profile</h1>
          <p>{desc}</p>
        </div>
        {name !== 'My' && (
          <div className='mb-5'>
            <a
              href={`mailto:${userEmail}?subject=Lost and Found item`}
              className='rounded-full border border-primary-purple bg-primary-purple py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm  flex items-center justify-center'
            >
              Contact User
            </a>
          </div>
        )}
      </div>

      <div className='flex flex-row flex-wrap w-full py-5 justify-center gap-10 mt-5'>
        {data.length ? (
          data.map((post) => (
            <PostCard
              key={post._id}
              handleCategoryClick={() => {}}
              post={post}
              url={post?.secure_url}
              handleDelete={() => handleDelete && handleDelete(post)}
              handleEdit={() => handleEdit && handleEdit(post)}
            />
          ))
        ) : (
          <h2>You have no posts</h2>
        )}
      </div>
    </section>
  )
}

export default Profile
