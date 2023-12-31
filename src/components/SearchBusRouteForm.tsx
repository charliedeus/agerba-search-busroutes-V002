'use client'

import { useBusRoutesStore } from '@/store/searchedBusRoutesStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Search, X } from 'lucide-react'
import {
  ChangeEvent,
  KeyboardEvent,
  forwardRef,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
// import { MostAttendedCities } from './MostAttendedCities'
import { usePlacesStore } from '@/store/searchPlacesStore'
import { Combobox, Transition } from '@headlessui/react'
import { debounce } from 'lodash'
import Link from 'next/link'

interface PlaceProps {
  id: string
  name: string
}

interface SearchBusRouteFormProps {}

const searchFormValidationSchema = z.object({
  placesId: z.array(z.string()).nullable(),
})

type searchFormValidationData = z.infer<typeof searchFormValidationSchema>

export const SearchBusRouteForm = forwardRef<
  HTMLFormElement,
  SearchBusRouteFormProps
>(function SearchBusRouteForm(ref) {
  const [selectedPlace, setSelectedPlace] = useState<PlaceProps | null>(null)
  const [selectedPlaces, setSelectedPlaces] = useState<PlaceProps[]>([])

  const { handleSubmit, reset } = useForm<searchFormValidationData>({
    resolver: zodResolver(searchFormValidationSchema),
    defaultValues: {
      placesId: null,
    },
  })

  const { places, searchPlacesByName, clear } = usePlacesStore((store) => {
    return {
      places: store.places,
      searchPlacesByName: store.searchPlacesByName,
      clear: store.clear,
    }
  })

  const { busRoutes, searchBusRoutesByPlaces, clearBusRoutesList } =
    useBusRoutesStore((store) => {
      return {
        busRoutes: store.busRoutes,
        isLoading: store.isLoading,
        searchBusRoutesByPlaces: store.searchBusRoutesByPlaces,
        clearBusRoutesList: store.clear,
      }
    })

  const formRef = useRef<HTMLFormElement>(null)

  async function handleSelectPlace(place: PlaceProps) {
    setSelectedPlace(place)
  }

  async function handleAddPlace() {
    if (selectedPlace) {
      setSelectedPlaces((prevSelectedPlaces) => [
        ...prevSelectedPlaces,
        selectedPlace,
      ])
      setSelectedPlace(null)
    }
  }

  async function handleClearForm() {
    setSelectedPlaces([])
    setSelectedPlace(null)
    reset()
    clear()
    clearBusRoutesList()
  }

  async function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    const trimmedValue = event.target.value.trim()
    if (trimmedValue !== '') {
      searchPlacesByName(trimmedValue)
    }
  }

  const debounceChangeHandler = useMemo(() => {
    return debounce(changeHandler, 300)
  }, [changeHandler])

  function handleRemovePlace(place: PlaceProps) {
    setSelectedPlaces((prevSelectedPlaces) =>
      prevSelectedPlaces.filter((p) => p.id !== place.id),
    )
  }

  async function handleSearchBusRoutesByPlaces() {
    // eslint-disable-next-line
    let searchPlacesId = selectedPlaces.map((item) => {
      return item.id
    })

    if (selectedPlace) {
      searchPlacesId.push(selectedPlace.id)
    }

    searchBusRoutesByPlaces(searchPlacesId)
  }

  // async function handleSelectedBusRoute(busRoute: BusRouteProps) {
  //   setModalIsOpen(true)
  //   setSelectedBusRoute(busRoute)
  // }

  async function handleEscapeKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      setSelectedPlace(null)
      clear()
    }
  }

  return (
    <>
      {selectedPlaces &&
        selectedPlaces.map((place) => (
          <div key={place.id} className="flex flex-col gap-2">
            <div className="relative flex w-full flex-none items-center justify-between gap-2 laptop:mx-auto laptop:w-2/3 laptop:flex-row laptop:gap-4">
              <span className="h-full w-full flex-1 rounded-lg bg-zinc-100 p-4 shadow outline-none">
                {place.name}
              </span>

              <button
                type="button"
                onClick={() => handleRemovePlace(place)}
                className="rounded-lg bg-red-500 p-4 hover:bg-red-600 focus:bg-red-600 "
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        ))}
      <form
        ref={formRef}
        onSubmit={handleSubmit(handleSearchBusRoutesByPlaces)}
        className="flex h-full w-full flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <div className="relative flex w-full flex-none items-center justify-center gap-2 laptop:mx-auto laptop:w-2/3 laptop:flex-row laptop:gap-4">
            <Combobox value={selectedPlace} onChange={handleSelectPlace}>
              <div className="w-full shadow">
                <Combobox.Input
                  autoComplete="off"
                  placeholder="Informe localidade"
                  onChange={debounceChangeHandler}
                  onKeyDown={handleEscapeKey}
                  displayValue={(place: PlaceProps) => place?.name}
                  className="w-full rounded-lg bg-zinc-100 p-4 outline-none placeholder:text-zinc-400"
                />

                {places.length > 0 && (
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                    className={
                      'absolute top-16 z-50 mt-2 max-h-64 w-full overflow-y-scroll rounded-md bg-white p-2 shadow-lg'
                    }
                  >
                    <Combobox.Options>
                      <ul className="w-full space-y-2 hover:cursor-pointer">
                        {places.map((place) => (
                          <Combobox.Option
                            key={place.id}
                            value={place}
                            className={'text-sm'}
                          >
                            {place.name}
                          </Combobox.Option>
                        ))}
                      </ul>
                    </Combobox.Options>
                  </Transition>
                )}
              </div>
            </Combobox>

            <button
              type="button"
              onClick={handleAddPlace}
              disabled={!selectedPlace}
              className="rounded-lg bg-blue-800 p-4 text-white hover:bg-blue-800 focus:bg-blue-800 disabled:bg-zinc-500 disabled:text-zinc-950"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex grow flex-col gap-4 rounded-lg bg-zinc-100 px-2 py-4 shadow laptop:mx-auto laptop:w-2/3">
          {busRoutes.length > 0 && (
            <h1 className="text-base font-semibold">
              Resultado:{' '}
              {busRoutes.length === 1
                ? `${busRoutes.length} linha`
                : `${busRoutes.length} linhas`}
            </h1>
          )}
          <div className="relative h-32 grow">
            <div className="absolute inset-0 space-y-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-400">
              {busRoutes.length > 0 &&
                busRoutes.map((item, index) => (
                  <Link
                    href={`/linhas/${item.id}`}
                    key={item.id}
                    className="flex cursor-pointer items-center gap-2 pr-4 text-sm hover:font-semibold"
                  >
                    <span className="w-6 self-start text-zinc-400">
                      {index + 1}
                    </span>
                    <span className="flex-1 truncate">{item.name}</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>

        <div className="mt-auto flex flex-none items-center gap-1 laptop:mx-auto laptop:w-2/3">
          <button
            disabled={selectedPlace === null && selectedPlaces.length === 0}
            className="flex flex-1 items-center justify-between gap-2 rounded-md bg-blue-900 px-4 py-3 font-semibold text-zinc-50 hover:bg-blue-950 focus:bg-blue-950 disabled:bg-zinc-500 disabled:text-zinc-950"
          >
            Buscar
            <Search className="h-4 w-4" />
          </button>

          <button
            type="reset"
            onClick={handleClearForm}
            className="h-full rounded-md bg-red-500 px-4 py-3 font-semibold text-zinc-50 hover:bg-red-600 focus:bg-red-600 disabled:bg-zinc-500 disabled:text-zinc-950"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </form>
    </>
  )
})
