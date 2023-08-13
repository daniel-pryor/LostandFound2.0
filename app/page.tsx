import { CustomFilter, Hero, SearchBar, ShowMore, Post } from '@/components'
import { Feed } from '@/components'
import { fetchCars } from '@/utils'

export default async function Home() {
  return (
    <main className='overflow-hidden'>
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>All Posts</h1>
          <p>Find your lost items</p>
        </div>
        <Feed />
      </div>
    </main>
  )
}
