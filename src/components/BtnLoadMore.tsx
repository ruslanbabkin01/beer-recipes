import { Loader } from '.'

interface BtnLoadMoreProps {
  onLoadMore: () => void
  isLoading: boolean
}

function BtnLoadMore({ onLoadMore, isLoading }: BtnLoadMoreProps) {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <button
          onClick={onLoadMore}
          className='mx-auto py-2 px-4 rounded-sm bg-sky-700 text-center transition-all ease-in-out inline-block text-white border-0 cursor-pointer text-lg leading-6 font-medium shadow-xl hover:bg-sky-900 focus:bg-sky-900'
        >
          Load more
        </button>
      )}
    </>
  )
}

export default BtnLoadMore
