import { useEffect } from 'react'
import { Loader, RecipeList } from '../components'
import { useRecipes } from '../store/store'
import { BsFillCartFill } from 'react-icons/bs'

function RecipesPage() {
  const recipes = useRecipes(state => state.recipes)
  const isLoading = useRecipes(state => state.isLoading)
  const error = useRecipes(state => state.error)
  const getRecipes = useRecipes(state => state.getRecipes)
  const removeRecipes = useRecipes(state => state.removeRecipes)
  const selectedRecipes = useRecipes(state => state.selectedRecipes)

  useEffect(() => {
    void getRecipes()
  }, [getRecipes])

  const handleRemoveRecipes = async (): Promise<void> => {
    await removeRecipes(selectedRecipes)
  }

  return (
    <main>
      {selectedRecipes.length > 0 && (
        <button
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleRemoveRecipes}
          className='fixed top-10 right-10 py-2 px-4 rounded bg-sky-700 transition-all ease-in-out text-white border-0 cursor-pointer text-lg  hover:bg-sky-900 focus:bg-sky-900 flex items-center'
        >
          <BsFillCartFill className='mr-1' />
          <span className='text-xs font-bold'>{selectedRecipes.length}</span>
        </button>
      )}
      <section className='mx-auto flex flex-col gap-4 my-3'>
        {error && <p>Ops...Sorry something went wrong</p>}
        {isLoading && <Loader />}

        <RecipeList recipes={recipes} />
      </section>
    </main>
  )
}

export default RecipesPage
