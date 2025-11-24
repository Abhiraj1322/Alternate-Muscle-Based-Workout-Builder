import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Progress = () => {
  const[workout,setWorkout]=useState([])
const{id}=useParams()
  useEffect(()=>{
const fetchWorkout=async()=>{
  try{
const token=localStorage.getItem("token")
const res=await axios.get(`http://localhost:8000/workout/${id}`,{
  headers:{Authorization:`Bearer ${token}`},
});
setWorkout(res.data);
}
  catch(error){
console.error("eror in loading",error)
  }
}
fetchWorkout()
  },[id])

  return (
    <div>
      <h1 >Workout Progress</h1>
    
    </div>
  )
}

export default Progress