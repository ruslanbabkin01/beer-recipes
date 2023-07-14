import { Route, Routes } from 'react-router-dom'
import RecipesPage from './pages/RecipesPage'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import { SharedLayout } from './components'
import RecipePage from './pages/RecipePage'
import './index.css'

function App() {
  return (
    <>
      <SharedLayout />
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/recipes' element={<RecipesPage />} />
        <Route path='/recipes/:id' element={<RecipePage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
