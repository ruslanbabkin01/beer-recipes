import { Recipe } from '../types/recipe'
import { RecipeCard } from '.'

interface RecipeListProps {
  recipes: Recipe[]
}

export default function RecipeList({ recipes }: RecipeListProps) {
  return (
    <section>
      <ul className='flex flex-col gap-3 md:flex-row md:flex-wrap justify-center md:gap-4 mx-auto px-3'>
        {recipes.map((recipe, index) => (
          <li className='lg:basis-1/6 md:basis-1/4 shadow-xl ' key={index}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </section>
  )
}
