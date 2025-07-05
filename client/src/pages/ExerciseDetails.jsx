import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ExerciseDetails = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const res = await axios.get(`https://alternate-muscle-based-workout-builder-1.onrender.com/exercise/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExercise(res.data);
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message);
      }
    };

    fetchExercise();
  }, [id, token]);

  if (!exercise) return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#0f172a] px-4 py-8 text-white">
      <div className="max-w-2xl mx-auto bg-[#1e293b] p-6 rounded-2xl shadow-md">
        <h2 className="text-3xl font-extrabold mb-4 text-blue-400 text-center">{exercise.name}</h2>

        <div className="grid gap-3 sm:grid-cols-2 text-sm">
          <p><span className="font-semibold text-blue-200">Category:</span> {exercise.category}</p>
          <p><span className="font-semibold text-blue-200">Level:</span> {exercise.level}</p>
          <p><span className="font-semibold text-blue-200">Force:</span> {exercise.force}</p>
          <p><span className="font-semibold text-blue-200">Mechanic:</span> {exercise.mechanic}</p>
          <p><span className="font-semibold text-blue-200">Equipment:</span> {exercise.equipment}</p>
        </div>

        <div className="my-4">
          <p className="font-semibold text-blue-200 mb-1">Primary Muscles:</p>
          <div className="flex flex-wrap gap-2">
            {exercise.primaryMuscles.map((m, i) => (
              <span key={i} className="bg-blue-700 text-white px-2 py-1 rounded-full text-xs">
                {m}
              </span>
            ))}
          </div>
        </div>

        {exercise.secondaryMuscles?.length > 0 && (
          <div className="my-4">
            <p className="font-semibold text-blue-200 mb-1">Secondary Muscles:</p>
            <div className="flex flex-wrap gap-2">
              {exercise.secondaryMuscles.map((m, i) => (
                <span key={i} className="bg-gray-700 text-white px-2 py-1 rounded-full text-xs">
                  {m}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6 mt-4">
          <p className="font-semibold text-blue-200 mb-1">Instructions:</p>
          <p className="text-sm leading-relaxed">{exercise.instructions}</p>
        </div>

        {exercise.imageUrls?.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
            {exercise.imageUrls.map((imgPath, i) => (
              <img
                key={i}
                src={`https://alternate-muscle-based-workout-builder-1.onrender.com/${imgPath}`}
                alt={`Exercise ${i + 1}`}
                className="w-full h-32 object-cover rounded-md border border-gray-600"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseDetails;

