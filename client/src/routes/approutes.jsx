import React from 'react'
import { Route,Routes } from 'react-router-dom'
import HomePage from '../pages/Homepage'
import MyWorkouts from '../pages/MyWorkouts'
import RegisterPage from '../pages/RegisterPage'
import WorkoutBuilder from '../pages/Workoutbuilder'
import LoginPage from '../pages/LoginPage'
import ExplorePage from '../pages/Explorepage'
import AdminPage from '../pages/AdminPage'
const approutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />

      <Route path='/myworkout' element={<MyWorkouts/>} />   
      <Route path='/registerpage' element={<RegisterPage/>} />    
      <Route path='/workoutbuilder' element={<WorkoutBuilder/>} />  
      <Route path='/loginpage' element={<LoginPage/>} />  
      <Route path='/explore' element={<ExplorePage/>} />
       <Route path='/adminpage' element={<AdminPage/>}/>
    </Routes>
  )
}

export default approutes