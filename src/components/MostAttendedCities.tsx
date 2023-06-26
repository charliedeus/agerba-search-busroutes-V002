'use client'

import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'

interface CityProps {
  id: string
  name: string
  coverUrl?: string
  countOriginViews: number
  countDestinyViews: number
}

interface MostAttendedCitiesProps {
  cities: CityProps[]
}

export function MostAttendedCities({ cities }: MostAttendedCitiesProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1.05,
      spacing: 6,
    },
    breakpoints: {
      '(min-width: 640px)': {
        slides: {
          perView: 7.25,
          spacing: 6,
        },
      },
    },
  })

  return (
    <div
      className="flex w-full flex-col gap-2 overflow-hidden text-sm"
      ref={sliderRef}
    >
      <div className="keen-slider flex w-full items-center">
        {cities.map((city) => (
          <div
            key={city.id}
            className="keen-slider__slide relative flex h-44 max-h-44 w-full min-w-[137.33px] flex-1 justify-end rounded-lg bg-blue-500 shadow-lg"
          >
            <Image
              src={
                city.coverUrl ||
                'https://images.unsplash.com/photo-1444723121867-7a241cacace9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=60'
              }
              alt=""
              width={60}
              height={100}
              className="h-full w-full flex-1 rounded-md object-cover object-center"
            />
            <div className="w-full-300 absolute p-6">
              <h1 className="rounded-full bg-zinc-50 px-3 py-1 text-sm font-semibold text-zinc-900">
                {city.name}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
