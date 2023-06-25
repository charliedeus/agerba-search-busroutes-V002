import { MostAttendedCities } from '@/components/MostAttendedCities'

interface CityProps {
  id: string
  name: string
  coverUrl?: string
  countOriginViews: number
  countDestinyViews: number
}

export default async function Linhas() {
  const cities: CityProps[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/info`,
    {
      next: {
        revalidate: 60 * 60, // 1 hour
      },
    },
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data)

      const formattedCities = data.cities.map(
        (city: {
          id: string
          ibge_code: string
          name: string
          cover_url?: string
          count_origin_views: number
          count_destiny_views: number
        }) => ({
          id: city.id,
          name: city.name,
          coverUrl: city.cover_url,
          countOriginViews: city.count_origin_views,
          countDestinyViews: city.count_destiny_views,
        }),
      )

      return formattedCities
    })

  return (
    <main className="flex h-full w-full flex-col gap-4 p-8">
      <header>
        <h1 className="text-lg font-semibold text-zinc-950">
          Para onde deseja ir
        </h1>
      </header>

      <MostAttendedCities cities={cities} />
    </main>
  )
}
