import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react'

import axios from 'axios'
const Exercise = () => {
    const {id}=useParams();
    const [exercise,setexercise]=useState();
    const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [type, setType] = useState('push')
  const navigate = useNavigate();
    useEffect(()=>{
        const fetchexercise=async()=>{
           const response=await axios.get(`http://localhost:8000/exercise/${id}`) 

           setexercise(response.data)
        }
        fetchexercise()
    },[id])

    const addexercise=async()=>{
      try{
  const newWorkout = {
        name: exercise.name,
        createdby:"Abhiraj", // or user ID
         muscles:exercise.primaryMuscles,
        exercises: [
          {
            exercise: exercise._id,
            sets,
            reps,
            resttime: 60,
            type:type,
          },
        ],
      };
        const response = await axios.post("http://localhost:8000/workout", newWorkout);
      alert("Exercise added successfully!");
      navigate('/myworkout')
      }
    catch (err) {
      console.error("Error adding exercise to workout:", err);
    }
    }
    if(!exercise) return  <p>Loading</p>
  return (
    <div>
 <h2 className="text-2xl font-bold">{exercise.name}</h2>
  <p><strong>Targetmuscles:</strong> {exercise.primaryMuscles}</p>
 <p><strong>Level:</strong> {exercise.level}</p>
 <p><strong>Workout type:</strong> {exercise.force}</p>
  <p><strong>instructions:</strong> {exercise.instructions
    }</p>
{exercise.imageUrls.map((imgPath,i)=>
    <img key={i}
    src={`http://localhost:8000/${imgPath}`} 
    alt={`${exercise.name} image${i+1}`}
      className="w-32 h-32 object-cover rounded" />
    
)

}
 <div className="space-y-3 mb-4">
        <label className="block">
          Sets:
          <input
            type="number"
            value={sets}
            onChange={(e) => setSets(Number(e.target.value))}
            className="ml-2 border p-1 rounded"
          />
        </label>

        <label className="block">
          Reps:
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(Number(e.target.value))}
            className="ml-2 border p-1 rounded"
          />
        </label>

        <label className="block">
          Type:
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="ml-2 border p-1 rounded"
          >
            <option value="push">Push</option>
            <option value="pull">Pull</option>
  
          </select>
        </label>
         
        
      </div>
      <button
        onClick={addexercise}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add to Workout
      </button>

    </div>

  )
}

export default Exercise