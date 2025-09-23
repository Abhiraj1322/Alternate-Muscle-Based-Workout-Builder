import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditWorkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workout, setWorkout] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch workout by ID
  useEffect(() => {
    const fetchWorkout = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8000/workout/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWorkout(res.data);
        console.log(workout)
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch workout");
      } finally {
        setLoading(false);
      }
    };
    fetchWorkout();
  }, [id]);

  // Handle update
  const handleUpdate = async () => {
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8000/workout/${id}`, workout, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Workout updated!");
      navigate("/myworkout");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
      console.error(err);
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="text-white p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Workout</h2>

      {/* Day */}
      <label className="block mb-2">Day:</label>
      <select
        value={workout.day}
        onChange={(e) => setWorkout({ ...workout, day: e.target.value })}
        className="bg-black text-white border p-2 rounded mb-4 w-full"
      >
        <option>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
        <option>Thursday</option>
        <option>Friday</option>
        <option>Saturday</option>
        <option>Sunday</option>
      </select>

      {/* Sets */}
      <label className="block mb-2">Sets:</label>
      <input
        type="number"
        min={0}
        value={workout.exercises[0].sets}
        onChange={(e) => {
       const newSets=parseInt(e.target.value)||0
       const updatedExercises=[...workout.exercises]
      updatedExercises[0]={...updatedExercises[0],sets:newSets};
      setWorkout({...workout,exercises:updatedExercises})
      }}
          
          
   
        className="bg-black text-white border p-2 rounded mb-4 w-full"
      />

      {/* Reps */}
      <label className="block mb-2">Reps:</label>
      <input
        type="number"
        min={0}
        value={workout.exercises[0].reps}
        onChange={(e) => {
      const newreps=parseInt(e.target.value)||0
      const updatedExercises=[...workout.exercises]
      updatedExercises[0]={...updatedExercises[0],reps:newreps}
      setWorkout({...workout,exercises:updatedExercises})
        }}
        className="bg-black text-white border p-2 rounded mb-4 w-full"
      />

      {/* Notes */}
      <label className="block mb-2">Notes:</label>
      <textarea
        value={workout.notes}
        onChange={(e) => setWorkout({ ...workout, notes: e.target.value })}
        className="bg-black text-white border p-2 rounded mb-4 w-full"
        placeholder="Add any notes about this workout"
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-600 px-4 py-2 rounded text-white w-full"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditWorkout;
