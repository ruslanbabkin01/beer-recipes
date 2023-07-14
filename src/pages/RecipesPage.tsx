import { useEffect } from 'react'
import { BtnLoadMore, Loader, RecipeList } from '../components'
import { useRecipes } from '../store'

function RecipesPage() {
  const { recipes, isHasRecipes, isLoading, error, getRecipes, onLoadMore } =
    useRecipes()

  useEffect(() => {
    void getRecipes()
  }, [getRecipes])

  return (
    <main className='mx-auto flex flex-col gap-4 my-2'>
      {error && <p>Ops...Sorry something went wrong</p>}
      {isLoading && <Loader />}

      <RecipeList recipes={recipes} />

      {isHasRecipes === true && recipes.length > 0 && (
        <BtnLoadMore onLoadMore={onLoadMore} isLoading={isLoading} />
      )}
    </main>
  )
}

export default RecipesPage
