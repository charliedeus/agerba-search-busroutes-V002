'use client'

import { ArrowDownUp, Search, X } from 'lucide-react'
import { InputTextSearch } from './InputTextSearch'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { forwardRef, useRef, useState } from 'react'
import {
  BusRouteProps,
  useBusRoutesStore,
} from '@/store/searchedBusRoutesStore'
import { MostAttendedCities } from './MostAttendedCities'
import Modal from './Modal'
import { Dialog, Transition } from '@headlessui/react'

interface CityProps {
  id: string
  name: string
  coverUrl?: string
  countOriginViews: number
  countDestinyViews: number
}

interface SearchBusRouteFormProps {
  cities: CityProps[]
}

const searchFormValidationSchema = z.object({
  originCityId: z.string().nullable(),
  destinyCityId: z.string().nullable(),
})

type searchFormValidationData = z.infer<typeof searchFormValidationSchema>

export const SearchBusRouteForm = forwardRef<
  HTMLFormElement,
  SearchBusRouteFormProps
>(function SearchBusRouteForm({ cities }: SearchBusRouteFormProps, ref) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedBusRoute, setSelectedBusRoute] =
    useState<BusRouteProps | null>()
  const { busRoutes, search, clear } = useBusRoutesStore((store) => {
    return {
      busRoutes: store.busRoutes,
      isLoading: store.isLoading,
      search: store.search,
      clear: store.clear,
    }
  })

  const { register, handleSubmit, setValue, reset } =
    useForm<searchFormValidationData>({
      resolver: zodResolver(searchFormValidationSchema),
      defaultValues: {
        originCityId: null,
        destinyCityId: null,
      },
    })

  async function handleSearchCities(data: searchFormValidationData) {
    search(data.originCityId, data.destinyCityId)
  }

  const formRef = useRef<HTMLFormElement>(null)

  async function handleSelectOriginCity(city: CityProps) {
    setValue('originCityId', city.id)
  }

  async function handleSelectDestinyCity(city: CityProps) {
    setValue('destinyCityId', city.id)
  }

  async function handleSelectedBusRoute(busRoute: BusRouteProps) {
    setModalIsOpen(true)
    setSelectedBusRoute(busRoute)
  }

  async function handleClearForm() {
    reset()
    clear()
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(handleSearchCities)}
      className="flex h-full w-full flex-col gap-4"
    >
      {busRoutes.length === 0 && <MostAttendedCities cities={cities} />}

      <div className="relative flex w-full flex-none flex-col items-center justify-center gap-1 rounded-lg bg-zinc-100 p-2 laptop:mx-auto laptop:w-2/3 laptop:flex-row laptop:gap-4">
        <InputTextSearch
          label="Origem"
          cities={cities}
          onSelectCity={handleSelectOriginCity}
          {...register('originCityId')}
        />

        <button className="absolute right-3 z-30 rounded-full bg-zinc-50 p-4 shadow focus:outline-none laptop:relative laptop:rotate-90">
          <ArrowDownUp className="h-6 w-6" />
        </button>

        <InputTextSearch
          label="Destino"
          cities={cities}
          onSelectCity={handleSelectDestinyCity}
          {...register('destinyCityId')}
        />
      </div>

      {busRoutes.length > 0 && (
        <div className="flex grow flex-col gap-4 rounded-lg bg-zinc-100 px-2 py-4 shadow laptop:mx-auto laptop:w-2/3">
          <h1 className="text-base font-semibold">
            Resultado:{' '}
            {busRoutes.length === 1
              ? `${busRoutes.length} linha`
              : `${busRoutes.length} linhas`}
          </h1>
          <div className="relative h-32 grow">
            <ul className="absolute inset-0 space-y-2 overflow-y-scroll scrollbar-thumb-zinc-700">
              {busRoutes.map((item, index) => (
                <li
                  key={item.id}
                  onClick={() => handleSelectedBusRoute(item)}
                  className="flex cursor-pointer items-center gap-2 pr-4 text-sm hover:font-semibold"
                >
                  <span className="w-6 self-start text-zinc-400">
                    {index + 1}
                  </span>
                  <span className="flex-1 truncate">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-auto flex flex-none items-center gap-1 laptop:mx-auto laptop:w-2/3">
        <button className="flex flex-1 items-center justify-between gap-2 rounded-md bg-blue-900 px-4 py-3 font-semibold text-zinc-50 hover:bg-blue-950 focus:bg-blue-950">
          Buscar
          <Search className="h-4 w-4" />
        </button>

        <button
          type="reset"
          onClick={handleClearForm}
          className="h-full rounded-md bg-red-500 px-4 py-3 font-semibold text-zinc-50 hover:bg-red-600 focus:bg-red-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <Transition
        show={true}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        // as={Fragment}
      >
        <Dialog
          open={modalIsOpen}
          className="relative z-40"
          onClose={() => setModalIsOpen(false)}
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          {selectedBusRoute && (
            <Modal
              busRoute={selectedBusRoute}
              closeModal={() => setModalIsOpen(false)}
            />
          )}
        </Dialog>
      </Transition>
    </form>
  )
})
