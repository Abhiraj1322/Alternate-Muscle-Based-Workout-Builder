import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditWorkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkout = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token"); 
        const res = await axios.get(`https://alternate-muscle-based-workout-builder-1.onrender.com/workout/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWorkout(res.data);

     
      } catch (err) {
        setError("Failed to fetch workout");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkout();
  }, []);

  const handleUpdate = async () => {
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.put(`https://alternate-muscle-based-workout-builder-1.onrender.com/workout/${id}`, workout, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      alert("Workout updated!");
      navigate("/myworkout");
    } catch (err) {
      setError("Update failed");
      console.error(err);
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!workout) return <p className="text-white">No workout found.</p>;

  
  return (
    <div className="text-white p-6">
  <h2 className="text-2xl font-bold mb-4">Edit Workout</h2>


  {/* Day */}
  <label className="block mb-2">Day:</label>
  <select
    value={workout?.day || ""}
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

  {/* Notes */}
  <label className="block mb-2">Notes:</label>
  <textarea
    value={workout?.notes || ""}
    onChange={(e) => setWorkout({ ...workout, notes: e.target.value })}
    className="bg-black text-white border p-2 rounded w-full mb-4"
  />

  {/* Sets + Reps Inputs */}
  {Array.isArray(workout?.exercises) && workout.exercises.length > 0 && (
    <>
      {/* Sets */}
      <label className="block mb-2">Sets:</label>
      <input
        type="number"
        min={0}
        value={workout.exercises[0].sets}
        onChange={(e) => {
          const newValue = parseInt(e.target.value) || 0;
          const updatedExercises = [...workout.exercises];
          updatedExercises[0] = {
            ...updatedExercises[0],
            sets: newValue,
          };
          setWorkout({ ...workout, exercises: updatedExercises });
        }}
        placeholder="Sets"
        className="bg-black text-white border p-2 rounded mb-4 w-full"
      />

      {/* Reps */}
      <label className="block mb-2">Reps:</label>
      <input
        type="number"
        min={0}
        value={workout.exercises[0].reps}
        onChange={(e) => {
          const newValue = parseInt(e.target.value) || 0;
          const updatedExercises = [...workout.exercises];
          updatedExercises[0] = {
            ...updatedExercises[0],
            reps: newValue,
          };
          setWorkout({ ...workout, exercises: updatedExercises });
        }}
        placeholder="Reps"
        className="bg-black text-white border p-2 rounded mb-4 w-full"
      />
    </>
  )}

  {/* Save button */}
  <button
    onClick={handleUpdate}
    className="bg-blue-600 px-4 py-2 rounded text-white"
  >
    Save Changes
  </button>
</div>

  );
};

export default EditWorkout;
