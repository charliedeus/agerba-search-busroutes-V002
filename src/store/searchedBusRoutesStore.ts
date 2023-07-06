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
  busRoutes: BusRouteProps[]
  isLoading: boolean

  searchBusRoutesByPlaces: (placesId: string[] | null) => Promise<void>

  clear: () => void
}

export const useBusRoutesStore = create<BusRoutesState>((set, get) => {
  return {
    busRoutes: [],
    isLoading: true,

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
        busRoutes: [],
      })
    },
  }
})
