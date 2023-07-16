import { useRecipes } from '../store/store'
import { Recipe } from '../types/recipe'
import { NavLink } from 'react-router-dom'

interface IRecipeProps {
  recipe: Recipe
}

export default function RecipeCard({
  recipe: { image_url, name, id },
}: IRecipeProps) {
  const selectRecipes = useRecipes(state => state.selectRecipes)
  const selectedRecipes = useRecipes(state => state.selectedRecipes)

  const handleSelect = (e: React.MouseEvent<HTMLElement>, id: number) => {
    e.preventDefault()
    selectRecipes(id)
  }

  return (
    <NavLink to={`/recipes/${id}`}>
      <div
        onContextMenu={e => handleSelect(e, id)}
        className={`flex flex-col justify-center items-center p-2 shadow-xl border rounded max-h-96  ${
          selectedRecipes.includes(id) ? 'bg-teal-200' : 'bg-transparent'
        }`}
      >
        <img
          src={image_url}
          alt={name}
          loading='lazy'
          className='object-cover max-h-80'
        />

        <h3 className='my-2 text-center font-semibold'>{name}</h3>
      </div>
    </NavLink>
  )
}
