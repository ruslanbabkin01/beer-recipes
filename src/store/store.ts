import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { Recipe } from '../types/recipe'
import { fetchRecipeById, fetchRecipes } from '../services'
import { PER_PAGE } from '../utils/constants'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

interface State {
  recipes: Recipe[]
  currentRecipe: Recipe | null
  selectedRecipes: number[]
  page: number
  isHasRecipes: boolean
  isLoading: boolean
  error: string | null
  getRecipes: () => Promise<void>
  getRecipeById: (id: string) => Promise<void>
  removeRecipe: (id: number) => void
  onLoadMore: () => void
  selectRecipes: (id: number) => void
}

export const useRecipes = create<State, [['zustand/devtools', State]]>(
  devtools((set, get) => ({
    recipes: [],
    currentRecipe: null,
    selectedRecipes: [],
    page: 1,
    isHasRecipes: true,
    isLoading: false,
    error: null,

    getRecipes: async () => {
      set({ isLoading: true })
      try {
        const res = await fetchRecipes(get().page)

        set({
          recipes: [...get().recipes, ...res],
        })

        if (res.length < PER_PAGE) {
          set({ isHasRecipes: false })
        }
      } catch (e: unknown) {
        const error = e as AxiosError
        console.log(error.message)
        toast.error(error.message)
        set({ error: error.message })
      } finally {
        set({ isLoading: false })
      }
    },

    getRecipeById: async recipeId => {
      try {
        const res = await fetchRecipeById(recipeId)
        set({ currentRecipe: res })
      } catch (e: unknown) {
        const error = e as AxiosError
        console.log(error.message)
        toast.error(error.message)
      }
    },

    removeRecipe: recipeId => {
      set({ recipes: get().recipes.filter(recipe => recipe.id !== recipeId) })
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

    onLoadMore: () => {
      set({ page: get().page + 1 })
    },
  }))
)
