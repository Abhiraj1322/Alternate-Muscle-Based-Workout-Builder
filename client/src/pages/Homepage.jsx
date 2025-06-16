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
      const response = await axios.get("http://localhost:8000/exercise");
      
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
  
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] p-6">
      <h1 className="text-3xl font-bold mb-6">Select a Muscle Group</h1>

      <div className="flex gap-12 mb-8">
        <div className="w-[300px] sm:w-[400px] md:w-[500px]" ref={frontRef}>
          <BodyFront className="w-full h-auto cursor-pointer" />
        </div>
        <div className="w-[300px] sm:w-[400px] md:w-[500px]" ref={backRef}>
          <BodyBack className="w-full h-auto cursor-pointer" />
        </div>
      </div>

      <div className="w-full max-w-xl p-4 border rounded shadow-sm  bg-[#121212]">
        <h2 className="text-xl font-semibold mb-4">
          {selectedMuscle
            ? `Exercises for ${selectedMuscle}`
            : 'Click a muscle group to see exercises'}
        </h2>

        {filteredExercises.length === 0 && selectedMuscle && (
          <p>No exercises found for this muscle.</p>
        )}

        <ul>
          {filteredExercises.map((ex) => (
            <li key={ex._id} className="mb-2 border-b border-gray-300 pb-1">
              <strong>{ex.name}</strong> — Level: {ex.level}, Equipment: {ex.equipment}
                 <Link
          to={`/exercise/${ex._id}`}
          className="inline-block mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
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
