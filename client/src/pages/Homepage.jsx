// src/pages/Homepage.jsx
import { useState,useEffect,useRef } from 'react';
import axios from 'axios'
import BodyFront from '../assets/body-front.svg?react';
import BodyBack from '../assets/body-back.svg?react';
import { Link } from "react-router-dom"
const Homepage = () => {
const [exercise,setexercise]=useState([])
const [selectedMuscle, setSelectedMuscle] = useState(null);
 const [filteredExercises, setFilteredExercises] = useState([]);
const frontRef= useRef(null)
const backRef=useRef(null)
useEffect(() => {
  const fetchexercise = async () => {

    try {
        const token = localStorage.getItem("token");
      const response = await axios.get("https://alternate-muscle-based-workout-builder-1.onrender.com/exercise",{
         headers: { Authorization: `Bearer ${token}` },
      });
      
      setexercise(response.data);

    } catch (err) {
      console.error("Error in fetching:", err);
    }
  };

  fetchexercise(); 

}, []);

useEffect(()=>{
  const handmuscleclick=(e)=>{
 const muscleId=e.target.closest('.muscle')?.id
 if(muscleId){
  setSelectedMuscle(muscleId)
 }
  }
  const frontSvg=frontRef.current;
  const backSvg=  backRef.current

  if(frontSvg) frontSvg.addEventListener('click',handmuscleclick)
  if(backSvg)  backSvg.addEventListener('click',handmuscleclick) 
       return () => {
      if (frontSvg) frontSvg.removeEventListener('click', handmuscleclick);
      if (backSvg) backSvg.removeEventListener('click', handmuscleclick);
    };
},[])
useEffect(()=>{
  if(!selectedMuscle){
    setSelectedMuscle([])
    return;
  }
  const filter=exercise.filter(ex=>
    ex.primaryMuscles && ex.primaryMuscles.includes(selectedMuscle)
  )
setFilteredExercises(filter)
},[selectedMuscle,exercise])

  return (
  
   <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] p-4 sm:p-6">
  <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Select a Muscle Group</h1>


  <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-8">
    <div className="w-[250px] sm:w-[300px] md:w-[400px]" ref={frontRef}>
      <BodyFront className="w-full h-auto cursor-pointer" />
    </div>
    <div className="w-[250px] sm:w-[300px] md:w-[400px]" ref={backRef}>
      <BodyBack className="w-full h-auto cursor-pointer" />
    </div>
  </div>

  {/* Exercise List */}
  <div className="w-full max-w-xl p-4 border border-gray-700 rounded shadow-sm bg-[#1e1e1e] text-white">
    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
      {selectedMuscle
        ? `Exercises for ${selectedMuscle}`
        : 'Click a muscle group to see exercises'}
    </h2>

    {filteredExercises.length === 0 && selectedMuscle && (
      <p className="text-center sm:text-left text-gray-400">No exercises found for this muscle.</p>
    )}

    <ul>
      {filteredExercises.map((ex) => (
        <li key={ex._id} className="mb-3 border-b border-gray-600 pb-2">
          <strong>{ex.name}</strong> — Level: {ex.level}, Equipment: {ex.equipment}
          <br />
          <Link
            to={`/exercise/${ex._id}`}
            className="inline-block mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
          >
            View Details
          </Link>
        </li>
      ))}
    </ul>
  </div>
</div>

  );
};

export default Homepage;
