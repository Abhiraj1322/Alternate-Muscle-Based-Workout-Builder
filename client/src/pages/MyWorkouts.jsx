import React, { useEffect, useState } from 'react';
import axios from 'axios';
  import { useNavigate,useParams } from 'react-router-dom'
const MyWorkouts = () => {
    const {id}=useParams();
  const [workouts, setWorkouts] = useState([]);
  const [selectedDay, setSelectedDay] = useState("All");
  const [exercise,setexercise]=useState([]);
const navigate = useNavigate();
useEffect(() => {
  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:8000/workout", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setWorkouts(response.data);
    } catch (error) {
      console.error("Failed to fetch workouts:", error);
    }
  };

  fetchWorkouts();
}, []);

const deleteWorkout = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:8000/workout/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setWorkouts(prev => prev.filter(workout => workout._id !== id));
  } catch (error) {
    console.error("Failed to delete workout:", error);
  }
};
const filteredWorkouts =
  selectedDay === "All"
    ? workouts
    : workouts.filter((workout) => workout.day === selectedDay);


  
  return (
<div className="p-4 sm:p-6 text-white min-h-screen bg-black">
  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">My Workouts</h2>

  {/* Day Filter */}
  <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-2">
    <label className="font-medium">Filter by Day:</label>
    <select
      value={selectedDay}
      onChange={(e) => setSelectedDay(e.target.value)}
      className="bg-[#1c1c1e] text-white border border-gray-600 p-2 rounded w-full sm:w-auto"
    >
      <option value="All">All</option>
      <option value="Monday">Monday</option>
      <option value="Tuesday">Tuesday</option>
      <option value="Wednesday">Wednesday</option>
      <option value="Thursday">Thursday</option>
      <option value="Friday">Friday</option>
      <option value="Saturday">Saturday</option>
      <option value="Sunday">Sunday</option>
    </select>
  </div>

  {/* Workout List */}
  {filteredWorkouts.length > 0 ? (
    <ul className="space-y-6">
      {filteredWorkouts.map((workout) => (
        <li
          key={workout._id}
          className="bg-[#1c1c1e] rounded-lg p-4 shadow-lg border border-gray-700"
        >
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-3">
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-400">
                {workout.name}
              </h3>
              <p className="text-sm text-gray-400">Day: {workout.day}</p>
              {workout.notes && (
                <p className="text-sm text-gray-300 italic mt-1">
                  Note: {workout.notes}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={() => navigate(`/viewdetails/${workout._id}`)}
                className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-sm font-semibold"
              >
                View
              </button>
              <button
                onClick={() => navigate(`/editworkout/${workout._id}`)}
                className="bg-yellow-500 hover:bg-yellow-600 px-4 py-1 rounded text-sm font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => deleteWorkout(workout._id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-sm font-semibold"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Exercise List */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Exercises:</h4>
            <ul className="space-y-2">
              {workout.exercises.map((ex, index) => (
                <li
                  key={index}
                  className="bg-[#2a2a2e] p-3 rounded border border-gray-600"
                >
                  <p>
                    <span className="font-semibold">Type:</span> {ex.type}
                  </p>
                  <p>
                    <span className="font-semibold">Sets:</span> {ex.sets}
                  </p>
                  <p>
                    <span className="font-semibold">Reps:</span> {ex.reps}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-center text-gray-400 mt-12">No workouts found.</p>
  )}
</div>

  );
};

export default MyWorkouts;
