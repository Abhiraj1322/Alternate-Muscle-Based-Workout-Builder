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
import ViewDetails from '../pages/ViewDetails'
import AdminPage from '../pages/AdminPage'
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
     
        <Route path='viewdetails/:id' element={<ProtectedRoute><ViewDetails/></ProtectedRoute>}/>
         <Route path='user' element={<ProtectedRoute><UserPage/></ProtectedRoute>}/>
         <Route path='admin' element={<ProtectedRoute><AdminPage/></ProtectedRoute>}/>
         </Route>
    </Routes>
  )
}

export default approutes