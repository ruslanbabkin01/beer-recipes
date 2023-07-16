import { RecipeCard } from '.'
import { Recipe } from '../types/recipe'

interface RecipeListProps {
  recipes: Recipe[]
}

export default function RecipeList({ recipes }: RecipeListProps) {
  return (
    <ul className='flex flex-col gap-3 md:flex-row md:flex-wrap justify-center md:gap-4 px-3'>
      {recipes.map(recipe => (
        <li key={recipe.id} className='lg:basis-1/6 md:basis-1/4'>
          <RecipeCard recipe={recipe} />
        </li>
      ))}
    </ul>
  )
}
