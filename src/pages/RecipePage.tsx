import { useParams } from 'react-router-dom'
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
    <main>
      <h1>{currentRecipe?.name}</h1>
      <img src={currentRecipe?.image_url} alt={currentRecipe?.name} />
      <p>{currentRecipe?.description}</p>
      <div>
        <p>
          <b>ABV:</b> {currentRecipe?.abv}%
        </p>
        <p>
          <b>IBU:</b> {currentRecipe?.ibu}
        </p>
        <p>
          <b>First Brewed:</b> {currentRecipe?.first_brewed}
        </p>
        <p>
          <b>Target FG:</b> {currentRecipe?.target_fg}
        </p>
        <p>
          <b>Target OG:</b> {currentRecipe?.target_og}
        </p>
        <p>
          <b>EBC:</b> {currentRecipe?.ebc}
        </p>
        <p>
          <b>SRM:</b> {currentRecipe?.srm}
        </p>
        <p>
          <b>pH:</b> {currentRecipe?.ph}
        </p>
        <p>
          <b>Attenuation Level:</b> {currentRecipe?.attenuation_level}
        </p>
      </div>
      <h2>Ingredients</h2>
      <div>
        <p>
          <b>Malt:</b>
        </p>
        {currentRecipe?.ingredients?.malt.map((malt, index) => (
          <p key={index}>
            {malt.name}: {malt.amount?.value} {malt.amount?.unit}
          </p>
        ))}
        <p>
          <b>Hops:</b>
        </p>
        {currentRecipe?.ingredients?.hops?.map((hop, index) => (
          <p key={index}>
            {hop.name}: {hop.amount.value} {hop.amount.unit} - {hop.add}
          </p>
        ))}
        <p>
          <b>Yeast:</b> {currentRecipe?.ingredients?.yeast}
        </p>
      </div>
      <h2>Method</h2>
      <div>
        <p>
          <b>Mash Temp:</b> {currentRecipe?.method?.mash_temp[0]?.temp?.value}
          {currentRecipe?.method?.mash_temp[0]?.temp?.unit} (
          {currentRecipe?.method?.mash_temp[0]?.duration} minutes)
        </p>
        <p>
          <b>Fermentation Temp:</b>
          {currentRecipe?.method?.fermentation?.temp?.value}
          {currentRecipe?.method?.fermentation?.temp?.unit}
        </p>
        <p>
          <b>Brewers Tips:</b> {currentRecipe?.brewers_tips}
        </p>
      </div>
      <h2>Food Pairing</h2>
      <div>
        {currentRecipe?.food_pairing?.map((food, index) => (
          <p key={index}>{food}</p>
        ))}
      </div>
    </main>
  )
}
