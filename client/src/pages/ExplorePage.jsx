import React from 'react'
import { useEffect,useState } from 'react'
import axios from "axios"
const Explorepage = () => {
const [exercise,setexercise]=useState([])
useEffect(() => {
  const fetchexercise = async () => {
    try {
      const response = await axios.get("http://localhost:8000/exercise");
      setexercise(response.data);
      
    } catch (err) {
      console.error("Error in fetching:", err);
    }
  };

  fetchexercise(); 
}, []);


  return (
    <div>Explorepage</div>
  )
}

export default Explorepage