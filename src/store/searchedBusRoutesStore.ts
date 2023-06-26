import { create } from 'zustand'

interface CityProps {
  id: string
  name: string
  coverUrl?: string
  countOriginViews: number
  countDestinyViews: number
}

export interface BusRouteProps {
  id: string
  bus_route_number: string
  name: string
  operator: string
  cover_url: string
  starts_in: CityProps
  ends_in: CityProps
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
