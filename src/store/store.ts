import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Recipe } from '../types/recipe'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

const BASE_URL = 'https://api.punkapi.com/v2/beers/'

export const beerRecipeAPI = axios.create({
  baseURL: BASE_URL,
})

interface State {
  recipes: Recipe[]
  secondRecipes: Recipe[]
  currentRecipe: Recipe | null
  selectedRecipes: number[]
  page: number
  isHasRecipes: boolean
  isLoading: boolean
  error: string | null
  getRecipes: () => Promise<void>
  getRecipeById: (id: string) => Promise<void>
  selectRecipes: (id: number) => void
  removeRecipes: (id: number[]) => Promise<void>
  checkRecipes: () => void
}

export const useRecipes = create<State, [['zustand/devtools', State]]>(
  devtools((set, get) => ({
    recipes: [],
    secondRecipes: [],
    currentRecipe: null,
    selectedRecipes: [],
    page: 1,
    isHasRecipes: true,
    isLoading: false,
    error: null,

    getRecipes: async () => {
      set({ isLoading: true })
      try {
        const { data } = await beerRecipeAPI.get<Recipe[]>('', {
          params: {
            page: get().page,
          },
        })

        set({
          secondRecipes: [...get().secondRecipes, ...data],
        })

        get().checkRecipes()
      } catch (e: unknown) {
        const error = e as AxiosError
        console.log(error.message)
        toast.error(error.message)
        set({ error: error.message })
      } finally {
        set({ isLoading: false })
      }
    },

    checkRecipes: () => {
      const lengthBaseArr = get().recipes.length

      if (lengthBaseArr < 15) {
        const requiredRecipes = 15 - lengthBaseArr
        const necessaryArr = get().secondRecipes.slice(0, requiredRecipes)
        set({
          recipes: [...get().recipes, ...necessaryArr],
          secondRecipes: get().secondRecipes.slice(requiredRecipes),
        })
      }
    },

    getRecipeById: async recipeId => {
      try {
        const { data } = await beerRecipeAPI.get<Recipe[]>(`/${recipeId}`)
        set({ currentRecipe: data[0] })
      } catch (e: unknown) {
        const error = e as AxiosError
        console.log(error.message)
        toast.error(error.message)
      }
    },

    removeRecipes: async (ids: number[]) => {
      const selectedRecipes = get().selectedRecipes.length
      if (selectedRecipes > get().secondRecipes.length) {
        set({ page: get().page + 1 })
        await get().getRecipes()
      }

      set({
        recipes: get().recipes.filter(recipe => !ids.includes(recipe.id)),
        selectedRecipes: [],
      })

      get().checkRecipes()
    },

    selectRecipes: recipeId => {
      const currentArr = get().selectedRecipes
      currentArr.includes(recipeId)
        ? set({
            selectedRecipes: currentArr.filter(id => id !== recipeId),
          })
        : set({
            selectedRecipes: [...currentArr, recipeId],
          })
    },
  }))
)
