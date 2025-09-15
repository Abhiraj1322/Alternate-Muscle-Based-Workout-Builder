import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ExerciseDetails = () => {
  const { id } = useParams(); // get id from URL
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercise = async () => {
     const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `http://localhost:8000/exercise/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
          }
        );
        setExercise(res.data);
      } catch (err) {
        console.error("Error fetching exercise:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [id]);

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (!exercise) return <p className="text-center text-red-400">❌ Exercise not found</p>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
      >
        ← Back
      </button>

      <div className="max-w-3xl mx-auto bg-[#1e293b] p-6 rounded-xl shadow border border-gray-700">
        <h1 className="text-3xl font-bold text-indigo-400 mb-4">
          {exercise.name}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <p><strong>Force:</strong> {exercise.force}</p>
          <p><strong>Level:</strong> {exercise.level}</p>
          <p><strong>Mechanic:</strong> {exercise.mechanic}</p>
          <p><strong>Equipment:</strong> {exercise.equipment}</p>
          <p><strong>Category:</strong> {exercise.category}</p>
        </div>

        <p className="mb-4">
          <strong>Primary Muscles:</strong> {exercise.primaryMuscles?.join(", ")}
        </p>
        <p className="mb-4">
          <strong>Secondary Muscles:</strong> {exercise.secondaryMuscles?.join(", ")}
        </p>

        <p className="mb-6">
          <strong>Instructions:</strong> {exercise.instructions}
        </p>

        {/* Images */}
        <div className="grid grid-cols-2 gap-4">
          {exercise.imageUrls?.map((url, i) => (
            <img
              key={i}
              src={`http://localhost:8000/${url}`}
              alt={exercise.name}
              className="rounded-lg shadow border"
            />
          ))}
        </div>

        <div className="mt-6 text-sm text-gray-400">
          <p><strong>ID:</strong> {exercise._id}</p>
          <p><strong>Exercise ID:</strong> {exercise.exerciseId}</p>
          <p><strong>Created At:</strong> {new Date(exercise.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetails;
