import { ProfileProps } from '@/types'
import { PostCard } from '.'

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: ProfileProps) => {
  return (
    <section className='w-full'>
      <h1>{name} Profile</h1>
      <p>{desc}</p>
      <div>
        {data.map((post) => (
          <PostCard
            key={post._id}
            handleCategoryClick={() => {}}
            post={post}
            url={post?.secure_url}
            handleDelete={() => handleDelete && handleDelete(post)}
            handleEdit={() => handleEdit && handleEdit(post)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile
