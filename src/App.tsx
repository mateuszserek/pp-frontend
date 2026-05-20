import './App.css'
import { Routes, Route } from 'react-router-dom'

import Products from './pages/Products'

function App() {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </>
  )
}

export default App