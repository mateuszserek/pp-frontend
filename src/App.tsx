import './App.css'
import { Routes, Route } from 'react-router-dom'

import Nav from './components/nav'
import Products from './pages/Products'
import Test from './pages/Test'

function App() {
  return (
    <>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/test" element = {<Test />} />
        </Routes>
      </div>
    </>
  )
}

export default App