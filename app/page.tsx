import { Hero } from '@/components'
import { Feed } from '@/components'

export default async function Home() {
  return (
    <main className='overflow-hidden'>
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container' id='posts'>
          <h1 className='text-4xl font-extrabold'>All Posts</h1>
          <p>Find your lost items, or see who is looking...</p>
        </div>
        <Feed />
      </div>
    </main>
  )
}
