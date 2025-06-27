import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewDetails = () => {
  const [exercise, setexercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
const [eror,setError]=useState()
  useEffect(() => {
    const fetchWorkout = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token"); 
        const res = await axios.get("http://localhost:8000/workout", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setexercise(res.data[0]);
        console.log(res.data[0])
     
      } catch (err) {
        setError("Failed to fetch workout");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkout();
  }, []);

  if (loading || !exercise) return <p>Loading...</p>;

  return (
   <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4 text-gray-800">
  <h2 className="text-2xl font-bold">{exercise.name}</h2>
  <p><strong>Day:</strong> {exercise.day}</p>
  <p><strong>Created at:</strong> {new Date(exercise.createdAt).toLocaleDateString()}</p>

  <div className="space-y-4">
    {exercise.exercises.map((ex, index) => (
      <div
        key={ex._id || index}
        className="border rounded-md p-3 shadow-sm bg-gray-50"
      >
        <p className="text-sm"><strong>Exercise ID:</strong> {ex.exercise}</p>
        <p className="text-sm"><strong>Type:</strong> {ex.type}</p>
        <p className="text-sm"><strong>Sets:</strong> {ex.sets}</p>
        <p className="text-sm"><strong>Reps:</strong> {ex.reps}</p>
        <p className="text-sm"><strong>Muscles:</strong> 
          {ex.muscles.length > 0 ? (
            ex.muscles.join(", ")
          ) : (
            " Not specified"
          )}
        </p>
      </div>
    ))}
  </div>
</div>

  );
};

export default ViewDetails;
