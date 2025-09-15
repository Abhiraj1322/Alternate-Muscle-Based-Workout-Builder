
import React, {useEffect,useState} from "react"
import axios, { Axios } from "axios"
const [workout,setWorkout]=useState()

const workoutdetails = () => {
useEffect(()=>{
const savedWorkouts=async()=>{
    try{
        const token=localStorage.getItem("token")
        const reponse=await axios.get(`https://alternate-muscle-based-workout-builder-1.onrender.com/workout/${id}`,{
            headers:{
                Authorization:`Bearer ${token}` 
            }
        })
        setWorkout(reponse.data)
    }
    catch(err){
        console.error("Eror in fetching exercise",err)
    }
}
savedWorkouts();
console.log(workout)
},[id])
  return (
    <div>workoutdetails</div>
  )
}

export default workoutdetails