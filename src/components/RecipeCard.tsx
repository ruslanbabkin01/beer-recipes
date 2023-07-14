import { Recipe } from '../types/recipe'
import { NavLink } from 'react-router-dom'

interface IRecipeProps {
  recipe: Recipe
}

export default function RecipeCard({
  recipe: { image_url, name, first_brewed, abv, tagline, ibu, id },
}: IRecipeProps) {
  return (
    <div className='p-3 rounded'>
      <NavLink to={`/recipes/${id}`}>
        <div className='flex flex-col justify-center items-center'>
          <div className='hover:cursor-pointer max-w-xs  lg:max-w-sm mx-auto flex items-center sm:mb-0'>
            <img
              src={image_url}
              alt={name}
              className='object-cover max-h-52 rounded'
            />
          </div>

          <h3 className='my-2 text-center font-semibold'>{name}</h3>

          <button className='hover:cursor-pointer my-2 rounded-sm border-2 bg-gray-500 text-slate-200 px-4 py-2 ease-out duration-300 hover:scale-105 '>
            Delete
          </button>
        </div>
      </NavLink>
    </div>
  )
}
