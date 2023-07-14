import axios from 'axios'
import { Recipe } from '../types/recipe'
import { PER_PAGE } from '../utils/constants'

const BASE_URL = 'https://api.punkapi.com/v2/beers'

export const beerRecipeAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    per_page: PER_PAGE,
  },
})

export const fetchRecipes = async (page: number) => {
  const { data } = await beerRecipeAPI.get<Recipe[]>(`?page=${page}`)
  return data
}

export const fetchRecipeById = async (id: string) => {
  const { data } = await beerRecipeAPI.get<Recipe[]>(`/${id}`)
  return data[0]
}
