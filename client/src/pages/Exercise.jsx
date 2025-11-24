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
  const [day, setDay] = useState("Monday");
  const [notes,setNotes]=useState("")

useEffect(() => {
  const fetchexercise = async () => {
    try {
        const token = localStorage.getItem("token")
      const response = await axios.get(`http://localhost:8000/exercise/${id}`,{
        headers:{
           Authorization: `Bearer ${token}`
        }
      });
      setexercise(response.data);
    } catch (err) {
      console.error("Error fetching exercise:", err);
    }
  };
  fetchexercise();
}, [id]);

  const addexercise = async () => {
  try {
    const token = localStorage.getItem("token");

    const newWorkout = {
      name: exercise.name,
      muscles: exercise.primaryMuscles,
      day,
      notes,
      exercises: [
        {
          exercise: exercise._id,
          sets,
          reps,
          resttime: 60,
          type: type,
        },
      ],
    };
  const response = await axios.post("http://localhost:8000/workout", newWorkout, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
      alert("Exercise added successfully!");
      navigate('/myworkout')
      }
    catch (err) {
      console.error("Error adding exercise to workout:", err);
    }
    }
    if(!exercise) return  <p>Loading</p>
  return (
<div className="p-4 max-w-2xl mx-auto">
  <h2 className="text-2xl sm:text-3xl font-bold mb-4">{exercise.name}</h2>

  <div className="text-white space-y-2 mb-4">
    <p><strong>Target muscles:</strong> {exercise.primaryMuscles}</p>
    <p><strong>Level:</strong> {exercise.level}</p>
    <p><strong>Workout type:</strong> {exercise.force}</p>
    <p><strong>Instructions:</strong> {exercise.instructions}</p>
  </div>

  <div className="flex flex-wrap gap-3 mb-6">
    {exercise.imageUrls.map((imgPath, i) => (
      <img
        key={i}
        src={`http://localhost:8000/${imgPath}`}
        alt={`${exercise.name} image ${i + 1}`}
        className="w-32 h-32 object-cover rounded border border-gray-500"
      />
    ))}
  </div>

  <div className="space-y-4 mb-6">
    {/* Sets */}
    <div>
      <label className="block mb-1 font-medium text-white">Sets</label>
      <input
        type="number"
        value={sets}
        onChange={(e) => setSets(Number(e.target.value))}
        className="w-full border p-2 rounded bg-black text-white"
      />
    </div>

    {/* Reps */}
    <div>
      <label className="block mb-1 font-medium text-white">Reps</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(Number(e.target.value))}
        className="w-full border p-2 rounded bg-black text-white"
      />
    </div>

    {/* Type */}
    <div>
      <label className="block mb-1 font-medium text-white">Type</label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full border p-2 rounded bg-black text-white"
      >
        <option value="push">Push</option>
        <option value="pull">Pull</option>
        <option value="legs">Legs</option>
      </select>
    </div>

    
    <div>
      <label className="block mb-1 font-medium text-white">Day</label>
      <select
        value={day}
        onChange={(e) => setDay(e.target.value)}
        className="w-full border p-2 rounded bg-black text-white"
      >
        <option>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
        <option>Thursday</option>
        <option>Friday</option>
        <option>Saturday</option>
        <option>Sunday</option>
      </select>
    </div>

    {/* Notes */}
    <div>
      <label className="block mb-1 font-medium text-white">Notes (optional)</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="e.g. Try higher weight next time"
        className="w-full border p-2 rounded bg-black text-white"
        rows={3}
      />
    </div>
  </div>

  <button
    onClick={addexercise}
    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
  >
    Add to Workout
  </button>
<div className="mt-10 border-t pt-6 text-sm text-white space-y-2">
  <h3 className="text-lg font-semibold">📚 Learn More About This Exercise</h3>
  <ul className="list-disc list-inside space-y-1 text-blue-300">
    <li>
      <a
        href={`https://www.google.com/search?q=${exercise.name}+exercise+benefits`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Google: Benefits of {exercise.name}
      </a>
    </li>
    <li>
      <a
        href={`https://www.youtube.com/results?search_query=${exercise.name}+exercise+form`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        YouTube: Proper form for {exercise.name}
      </a>
    </li>
    <li>
      <a
        href={`https://exrx.net/Lists/Directory`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        ExRx.net – Exercise Directory
      </a>
    </li>
    <li>
      <a
        href="https://www.ncbi.nlm.nih.gov/pmc/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        PubMed Central – Scientific Research on Exercise
      </a>
    </li>
  </ul>
</div>
</div>


  )
}

export default Exercise