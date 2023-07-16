import { NavLink, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useRecipes } from '../store/store'

export default function RecipePage() {
  const getRecipeById = useRecipes(state => state.getRecipeById)
  const currentRecipe = useRecipes(state => state.currentRecipe)
  const { id } = useParams()

  useEffect(() => {
    if (id !== undefined) {
      return void getRecipeById(id)
    }
  }, [getRecipeById, id])

  return (
    <main className='mx-auto'>
      <section className='my-4'>
        <div className='sm:max-w-xl md:max-w-3xl mx-auto px-3'>
          <NavLink
            to='/recipes'
            className='inline-block px-6 py-1 mb-5 rounded cursor-pointer bg-blue-500 text-white hover:bg-red-600 focus:text-white focus:bg-red-600'
          >
            Back
          </NavLink>
          <h1 className='mb-4 font-bold text-3xl'>{currentRecipe?.name}</h1>
          <p className='font-medium mb-1'>{currentRecipe?.tagline}</p>
          <p className='font-medium mb-1'>
            First Brewed: {currentRecipe?.first_brewed}
          </p>
          <p className='font-medium mb-1 mt-2'>{currentRecipe?.description}</p>
          <img
            src={currentRecipe?.image_url}
            alt={currentRecipe?.name}
            className='object-cover max-h-64 my-3'
          />

          <ul className='list-disc mb-3'>
            <li>
              <p>ABV: {currentRecipe?.abv}%</p>
            </li>
            <li>
              <p>IBU: {currentRecipe?.ibu}</p>
            </li>
            <li>
              <p>Target FG: {currentRecipe?.target_fg}</p>
            </li>
            <li>
              <p>Target OG: {currentRecipe?.target_og}</p>
            </li>
            <li>
              <p>EBC: {currentRecipe?.ebc}</p>
            </li>
            <li>
              <p>SRM: {currentRecipe?.srm}</p>
            </li>
            <li>
              <p>pH: {currentRecipe?.ph}</p>
            </li>
            <li>
              <p>Attenuation Level: {currentRecipe?.attenuation_level}</p>
            </li>
          </ul>

          <h2 className='font-bold text-xl mb-2 md:text-2xl'>Ingredients</h2>

          <ul className='mb-3'>
            <li>
              <h3 className='text-lg font-semibold'>Malt:</h3>
              <ul className='list-disc'>
                {currentRecipe?.ingredients?.malt.map((malt, index) => (
                  <li key={index}>
                    <p>
                      {malt.name}: {malt.amount?.value} {malt.amount?.unit}
                    </p>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <h3 className='text-lg font-semibold'>Hops:</h3>
              <ul className='list-disc'>
                {currentRecipe?.ingredients?.hops?.map((hop, index) => (
                  <li key={index}>
                    <p>
                      {hop.name}: {hop.amount.value} {hop.amount.unit} -
                      {hop.add}
                    </p>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <h3 className='text-lg font-semibold'>
                Yeast: {currentRecipe?.ingredients?.yeast}
              </h3>
            </li>
          </ul>

          <h2 className='font-bold text-xl mb-2 md:text-2xl'>Method</h2>

          <ul className='list-disc mb-3'>
            <li>
              <p>
                Mash Temp: {currentRecipe?.method?.mash_temp[0]?.temp?.value}
                {currentRecipe?.method?.mash_temp[0]?.temp?.unit} (
                {currentRecipe?.method?.mash_temp[0]?.duration} minutes)
              </p>
            </li>
            <li>
              <p>
                Fermentation Temp:
                {currentRecipe?.method?.fermentation?.temp?.value}
                {currentRecipe?.method?.fermentation?.temp?.unit}
              </p>
            </li>
            <li>
              <p>Brewers Tips: {currentRecipe?.brewers_tips}</p>
            </li>
          </ul>

          <h2 className='font-bold text-xl mb-2 md:text-2xl'>Food Pairing</h2>
          <ul className='list-disc'>
            {currentRecipe?.food_pairing?.map((food, index) => (
              <li key={index}>
                <p>{food}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
