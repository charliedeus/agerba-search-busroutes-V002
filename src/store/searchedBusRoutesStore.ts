import { create } from 'zustand'

interface PlaceProps {
  id: string
  name: string
}

export interface BusRouteProps {
  id: string
  busRouteNumber: string
  name: string
  operator: string
  coverUrl: string
  itinerary: PlaceProps[]
  timetable: Array<{
    id: string
    direction: string
    weekday: string
    starts_at: string
    bus_route_id: string
  }>
}

export interface BusRoutesState {
  busRoute: BusRouteProps | null
  busRoutes: BusRouteProps[]
  isLoading: boolean

  searchBusRouteById: (busRouteId: string) => Promise<void>
  searchBusRoutesByPlaces: (placesId: string[] | null) => Promise<void>
  clear: () => void
}

export const useBusRoutesStore = create<BusRoutesState>((set) => {
  return {
    busRoute: null,
    busRoutes: [],
    isLoading: true,

    searchBusRouteById: async (busRouteId) => {
      set({ isLoading: true })

      const response = await fetch(`/api/linhas/search_by_id/${busRouteId}`)
      const result = await response.json()

      set({
        busRoute: result,
        isLoading: false,
      })
    },
    searchBusRoutesByPlaces: async (placesId) => {
      set({ isLoading: true })
      const response = await fetch('/api/linhas/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          placesId,
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
        busRoute: null,
        busRoutes: [],
        isLoading: false,
      })
    },
  }
})
