import React from 'react'
import { Route,Routes } from 'react-router-dom'
import HomePage from '../pages/Homepage'
import MyWorkouts from '../pages/MyWorkouts'
import RegisterPage from '../pages/RegisterPage'
import WorkoutBuilder from '../pages/WorkoutBuilder'
import LoginPage from '../pages/LoginPage'
import ExplorePage from '../pages/ExplorePage'
import AdminPage from '../pages/AdminPage'
import Exercise from '../pages/Exercise'
import Layout from '../pages/layout'
const approutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout/>} >
     <Route index element={<HomePage/>} />
      <Route path='myworkout' element={<MyWorkouts/>} />   
      <Route path='registerpage' element={<RegisterPage/>} />    
      <Route path='workoutbuilder' element={<WorkoutBuilder/>} />  
      <Route path='loginpage' element={<LoginPage/>} />  
      <Route path='explore' element={<ExplorePage/>} />
      <Route path='adminpage' element={<AdminPage/>}/>
         <Route path='exercise/:id' element={<Exercise/>}/>
         </Route>
    </Routes>
  )
}

export default approutes