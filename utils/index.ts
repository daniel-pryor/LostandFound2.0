import { FilterProps } from '@/types'

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters

  const headers = {
    'X-RapidAPI-Key': '9b9d52b979msh34e406dec575ea8p110e46jsn496b165a1e1c',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
  }

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    {
      headers: headers,
    }
  )
  const result = await response.json()

  return result
}

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.set(type, value)

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`

  return newPathname
}
