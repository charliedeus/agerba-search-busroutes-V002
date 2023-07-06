import { create } from 'zustand'

interface PlaceProps {
  id: string
  name: string
}

export interface PlacesState {
  places: PlaceProps[]
  isLoading: boolean

  search: (placesId: string[]) => Promise<void>
  searchPlacesByName: (placeName: string) => Promise<void>
  clear: () => void
}

export const usePlacesStore = create<PlacesState>((set, get) => {
  return {
    places: [],
    isLoading: true,

    search: async (placesId) => {
      set({ isLoading: true })
      const response = await fetch('/api/linhas/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ placesId }),
      })

      const result = await response.json()

      set({
        places: result,
        isLoading: false,
      })
    },

    searchPlacesByName: async (placeName) => {
      set({ isLoading: true })

      const response = await fetch('/api/localidades/search_by_name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: placeName }),
      })

      const result = await response.json()

      set({
        places: result,
        isLoading: false,
      })
    },

    clear: () => {
      set({
        places: [],
      })
    },
  }
})
