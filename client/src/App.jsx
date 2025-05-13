import React from 'react'
import Homepage from './pages/Homepage'
import Explorepage from './pages/Explorepage'
import MyWorkouts from './pages/MyWorkouts'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/approutes'
const App = () => {
  return (
  <>
  <Router>
<AppRoutes/>
  </Router>
  </>
  )
}

export default App