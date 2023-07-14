import { NavLink } from 'react-router-dom'

function SharedLayout() {
  const activeStyle = {
    background: 'red',
  }

  return (
    <div className='mx-auto'>
      <header className='flex mb-3 py-2'>
        <nav className='flex mx-auto gap-4'>
          <NavLink
            to='/'
            className='py-2 px-5 rounded  bg-blue-400 text-white my-0 no-underline font-medium'
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            to='/recipes'
            className='py-2 px-5 rounded  bg-blue-400 text-white my-0 no-underline font-medium'
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Recipes
          </NavLink>
        </nav>
      </header>
    </div>
  )
}

export default SharedLayout
