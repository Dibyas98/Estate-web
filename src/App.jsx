import { useState } from 'react'
import './App.css'
import Context from './context/Context'
import Route from './route/Route'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <Context>
            <Route></Route>
          </Context>
    </>
  )
}

export default App
