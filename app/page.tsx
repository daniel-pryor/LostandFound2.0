import { getAllPhotos } from '@/actions/uploadActions'
import { CustomFilter, Hero, SearchBar, ShowMore, Post } from '@/components'
import { Feed } from '@/components'
import PhotoList from '@/components/PhotoList'
import UploadFile from '@/components/UploadFile'
import { fuels, yearsOfProduction } from '@/constants'
import { fetchCars } from '@/utils'
import Image from 'next/image'

export default async function Home({ searchParams }) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || '',
  })

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars

  const photos = await getAllPhotos()

  return (
    <main className='overflow-hidden'>
      <h1>All photos</h1>
      <PhotoList photos={photos || []} />
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>All Posts</h1>
          <p>Find your lost items</p>
        </div>
        <Feed />
        {/* <div className='home__filters'>
          <SearchBar />
          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
                <Post car={car} />
              ))}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )} */}
      </div>
    </main>
  )
}
