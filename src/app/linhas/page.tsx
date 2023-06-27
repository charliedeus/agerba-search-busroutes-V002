import { SearchBusRouteForm } from '@/components/SearchBusRouteForm'
import { Home } from 'lucide-react'
import Link from 'next/link'

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
    <main className="flex h-full w-full flex-col gap-4 px-8 py-4">
      <header className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-zinc-950">
          Municípios atendidos:
        </h1>

        <Link href={'/'} className="rounded-full bg-zinc-50 p-4">
          <Home className="h-4 w-4" />
        </Link>
      </header>

      <SearchBusRouteForm cities={cities} />
    </main>
  )
}
