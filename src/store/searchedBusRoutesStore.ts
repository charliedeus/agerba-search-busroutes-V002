import { create } from 'zustand'

interface CityProps {
  id: string
  name: string
  cover_url?: string
  count_origin_views: number
  count_destiny_views: number
}

export interface BusRouteProps {
  id: string
  bus_route_number: string
  name: string
  operator: string
  cover_url: string
  starts_in: CityProps
  ends_in: CityProps
  itinerary: Array<{
    place_itinerary: Array<{
      section_number: number
      is_access: boolean
      place: {
        name: string
      }
    }>
  }>
  timetable: Array<{
    id: string
    direction: string
    weekday: string
    starts_at: string
    bus_route_id: string
  }>
}

export interface BusRoutesState {
  busRoutes: BusRouteProps[]
  isLoading: boolean

  search: (
    originCityId: string | null,
    destinyCityId: string | null,
  ) => Promise<void>

  clear: () => void
}

export const useBusRoutesStore = create<BusRoutesState>((set, get) => {
  return {
    busRoutes: [],
    isLoading: true,

    search: async (originCityId, destinyCityId) => {
      set({ isLoading: true })
      const response = await fetch('/api/linhas/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originCityId,
          destinyCityId,
        }),
      })

      const result = await response.json()

      set({
        busRoutes: result,
        isLoading: false,
      })
    },

    clear: () => {
      set({
        busRoutes: [],
      })
    },
  }
})
