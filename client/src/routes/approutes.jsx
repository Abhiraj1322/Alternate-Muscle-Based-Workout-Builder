import React from 'react'
import { Route,Routes } from 'react-router-dom'
import HomePage from '../pages/Homepage'
import MyWorkouts from '../pages/MyWorkouts'
import RegisterPage from '../pages/RegisterPage'

import LoginPage from '../pages/LoginPage'
import ExplorePage from '../pages/ExplorePage'
import UserPage from '../pages/UserPage'
import Exercise from '../pages/Exercise'
import Layout from '../pages/layout'
import ProtectedRoute from '../components/ProtectedRoute'
import EditWorkout from '../pages/EditWorkout'
import Progress from '../pages/Progress'
import AdminPage from '../pages/AdminPage'
import ExerciseDetails from '../pages/Details'
const approutes = () => {
  return (
    <Routes>
        <Route index element={<LoginPage/>} ></Route>
        <Route path='/registerpage' element={<RegisterPage/>} />  
      <Route  element= {<ProtectedRoute><Layout/></ProtectedRoute>} >
  
     <Route path='homepage' element=
     {<ProtectedRoute><HomePage/></ProtectedRoute>} />
      <Route path='myworkout' element={<ProtectedRoute><MyWorkouts/></ProtectedRoute>} />   
      

      <Route path='explore' element={<ProtectedRoute><ExplorePage/></ProtectedRoute>} />

      <Route path='exercise/:id' element={<ProtectedRoute><Exercise/></ProtectedRoute>}/>
      <Route path='editworkout/:id' element={<ProtectedRoute><EditWorkout/></ProtectedRoute>}/>
     
        <Route path='exercisedetails/:id' element={<ProtectedRoute><ExerciseDetails/></ProtectedRoute>}/>
        <Route path='progress/:id' element={<ProtectedRoute><Progress/></ProtectedRoute>}/>
         <Route path='user' element={<ProtectedRoute><UserPage/></ProtectedRoute>}/>
         <Route path='admin' element={<ProtectedRoute><AdminPage/></ProtectedRoute>}/>

         </Route>
    </Routes>
  )
}

export default approutes