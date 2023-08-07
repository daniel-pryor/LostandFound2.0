import { FormProps } from '@/types'
import Link from 'next/link'
const Form = ({ type, post, setPost, submitting, handleSubmit }: FormProps) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1>{type} Post</h1>
      <p className=''>{type} your post</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 m-10'>
        <label>
          <span className=''>Item type</span>

          <input
            value={post.type}
            onChange={(e) => setPost({ ...post, type: e.target.value })}
            placeholder='item type'
            required
            className='border'
          />
        </label>
        <label>
          <span className=''>Item Category</span>

          <input
            value={post.category}
            onChange={(e) => setPost({ ...post, category: e.target.value })}
            placeholder='item category'
            required
            className='border'
          />
        </label>
        <label>
          <span className=''>Item name</span>

          <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder='item name'
            required
            className='border'
          />
        </label>
        <label>
          <span className=''>Location</span>

          <input
            value={post.location}
            onChange={(e) => setPost({ ...post, location: e.target.value })}
            placeholder='item name'
            required
            className='border'
          />
        </label>
        <label>
          <span className=''>Date</span>

          <input
            value={post.date}
            onChange={(e) => setPost({ ...post, date: e.target.value })}
            placeholder='item name'
            required
            className='border'
          />
        </label>
        <label>
          <span className=''>Item description</span>

          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            placeholder='Describe the item you found'
            required
            className='border'
          />
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>
          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-purple rounded-full text-white'
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
