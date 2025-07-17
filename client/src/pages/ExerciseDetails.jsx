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
   <div className="min-h-screen bg-black px-4 py-8 text-white">
  <div className="max-w-2xl mx-auto bg-[#1e293b] p-6 sm:p-8 rounded-2xl shadow-lg">
    <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-blue-400 text-center">
      {exercise.name}
    </h2>

    <div className="grid gap-3 sm:grid-cols-2 text-sm mt-[49px]">
      <p><span className="font-semibold text-blue-200">Category:</span> {exercise.category}</p>
      <p><span className="font-semibold text-blue-200">Level:</span> {exercise.level}</p>
      <p><span className="font-semibold text-blue-200">Force:</span> {exercise.force}</p>
      <p><span className="font-semibold text-blue-200">Mechanic:</span> {exercise.mechanic}</p>
      <p><span className="font-semibold text-blue-200">Equipment:</span> {exercise.equipment}</p>
    </div>

    <div className="my-5">
      <p className="font-semibold text-blue-200 mb-2">Primary Muscles:</p>
      <div className="flex flex-wrap gap-2">
        {exercise.primaryMuscles.map((m, i) => (
          <span key={i} className="bg-blue-700 text-white px-3 py-1 rounded-full text-xs">
            {m}
          </span>
        ))}
      </div>
    </div>

    {exercise.secondaryMuscles?.length > 0 && (
      <div className="my-5">
        <p className="font-semibold text-blue-200 mb-2">Secondary Muscles:</p>
        <div className="flex flex-wrap gap-2">
          {exercise.secondaryMuscles.map((m, i) => (
            <span key={i} className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs">
              {m}
            </span>
          ))}
        </div>
      </div>
    )}

    <div className="mb-6 mt-6">
      <p className="font-semibold text-blue-200 mb-2">Instructions:</p>
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

  <div className="mt-10 max-w-2xl mx-auto border-t border-gray-700 pt-6 text-sm space-y-2">
    <h3 className="text-lg font-semibold text-blue-200">📚 Learn More About This Exercise</h3>
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
          href="https://exrx.net/Lists/Directory"
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

  );
};

export default ExerciseDetails;

