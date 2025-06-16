import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { Link } from "react-router-dom"
const Explorepage = () => {
const [exercise,setexercise]=useState([])
const [search,setsearch]=useState("")
const[muscleGroup,setmuscleGroup]=useState("")
const[level,setlevel]=useState("")
const[equipment,setequipment]=useState("")
const[workoutType,setWokoutType]=useState("")

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
const filteredExercise=exercise.filter((ex)=>{
  const nameMatch=ex.name.toLowerCase().includes(search.toLowerCase())
  const muscleMatch=muscleGroup
?ex.primaryMuscles?.some((m)=>
  m.toLowerCase().includes(muscleGroup.toLowerCase())
)
:true;
const levelMatch=level
?ex.level?.toLowerCase().includes(level.toLowerCase())
:true;
const equipmentMatch=equipment
?ex.equipment?.toLowerCase().includes(equipment.toLowerCase())
:true
const typeMatch=workoutType
?ex.force?.toLowerCase().includes(workoutType.toLowerCase())
:true
return nameMatch && muscleMatch && levelMatch && equipmentMatch &&typeMatch
})
  return (
  <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Explore Exercises</h1>

      {/* Name Search */}
      <input
        type="text"
        placeholder="Search by name..."
        className="w-full p-2 border rounded mb-2"
        value={search}
        onChange={(e) => setsearch(e.target.value)}
      />

<select
  className="w-full p-2 border rounded mb-2"
  value={muscleGroup}
  onChange={(e) => setmuscleGroup(e.target.value)}
>
  <option value="">All Muscle Groups</option>
  <option value="abdominals">Abdominals</option>
  <option value="biceps">Biceps</option>
  <option value="chest">Chest</option>
  <option value="triceps">Triceps</option>
  <option value="quadriceps">Quadriceps</option>
  <option value="hamstrings">Hamstrings</option>
  <option value="glutes">Glutes</option>
  <option value="back">Back</option>
  <option value="shoulders">Shoulders</option>
  <option value="calves">Calves</option>
  {/* Add more based on your exercise data */}
</select>


      {/* Level Dropdown */}
      <select
        className="w-full p-2 border rounded mb-2"
        value={level}
        onChange={(e) => setlevel(e.target.value)}
      >
        <option value="">All Levels</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>

      </select>

      {/* Equipment Dropdown */}
      <select
        className="w-full p-2 border rounded mb-4"
        value={equipment}
        onChange={(e) => setequipment(e.target.value)}
      >
        <option value="">All Equipment</option>
        <option value="body only">Body Only</option>
        <option value="dumbbell">Dumbbell</option>
        <option value="barbell">Barbell</option>
        <option value="kettlebell">Kettlebell</option>
        <option value="machine">Machine</option>
        {/* Add more based on your data */}
      </select>
      <select
  className="w-full p-2 border rounded mb-2"
  value={workoutType}
  onChange={(e) => setWokoutType(e.target.value)}
>
  <option value="">All Types</option>
  <option value="push">Push</option>
  <option value="pull">Pull</option>
</select>

      {/* Filtered Results */}
{filteredExercise.length > 0 ? (
  <ul className="space-y-2">
    {filteredExercise.map((ex, index) => (
      <li key={index} className="p-3 border rounded shadow">
        <strong>{ex.name}</strong> – {ex.level}, {ex.equipment} <br />
        <span className="text-sm text-gray-600">
          Muscles: {ex.primaryMuscles?.join(", ")}
        </span>
        <br />
        {/* View Details Button */}
        <Link
          to={`/exercise/${ex._id}`}
          className="inline-block mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View Details
        </Link>
      </li>
    ))}
  </ul>
) : (
  <p>No exercises found.</p>
)}
    
    </div>
  )
}

export default Explorepage