import React, { useEffect, useState } from 'react';
import axios from 'axios';
  import { useNavigate } from 'react-router-dom'
const MyWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    
  const fetchWorkouts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/workout');
      setWorkouts(response.data);
    } catch (error) {
      console.error("Failed to fetch workouts:", error);
    }
  };
    fetchWorkouts();
  }, [workouts]);


  const deleteWorkout = async (id) => {
    try {
      console.log(id)
      await axios.delete(`http://localhost:8000/workout/${id}`);
      setWorkouts(prev => prev.filter(workout => workout._id !== id));

    } catch (error) {
      console.error("Failed to delete workout:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">My Workouts</h2>

      {workouts.length > 0 ? (
        <ul className="space-y-4">
          {workouts.map((workout) => (
            <li key={workout._id} className="p-4 border rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{workout.name}</h3>
                  <p className="text-gray-600">Created by: {workout.createdby}</p>
                </div>
                <button
                  onClick={() => deleteWorkout(workout._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>

              <h4 className="mt-2 font-semibold">Exercises:</h4>
              <ul className="list-disc list-inside">
                {workout.exercises.map((ex, index) => (
                  <div key={index}>
                    <p>Exercise ID: {ex.exercise}</p>
                    <p>Sets: {ex.sets}, Reps: {ex.reps}</p>
                    <p> Workout Type: {ex.type}</p>
                  </div>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No workouts found.</p>
      )}
    </div>
  );
};

export default MyWorkouts;
