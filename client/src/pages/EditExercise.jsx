import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditExercise = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const res = await axios.get(`https://alternate-muscle-based-workout-builder-1.onrender.com/exercise/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        setExercise(data);
        setFormData({
          ...data,
          primaryMuscles: data.primaryMuscles.join(", "),
          secondaryMuscles: data.secondaryMuscles.join(", "),
          imageUrls: data.imageUrls.join(", "),
        });
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message);
      }
    };
    fetchExercise();
  }, [id, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        primaryMuscles: formData.primaryMuscles.split(",").map(m => m.trim()),
        secondaryMuscles: formData.secondaryMuscles.split(",").map(m => m.trim()),
        imageUrls: formData.imageUrls.split(",").map(url => url.trim()),
      };

      await axios.put(`https://alternate-muscle-based-workout-builder-1.onrender.com/exercise/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Exercise updated!");
      navigate("/admin"); // or your admin route
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
    }
  };

  if (!exercise) return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 text-white">
      <div className="max-w-2xl mx-auto bg-[#1e293b] p-6 rounded-xl border border-gray-600">
        <h2 className="text-2xl font-bold mb-6 text-indigo-400">✏️ Edit Exercise</h2>

        <form onSubmit={handleUpdate} className="grid gap-4">
          {[
            "name", "force", "level", "mechanic", "equipment",
            "category", "instructions", "primaryMuscles", "secondaryMuscles", "imageUrls"
          ].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="capitalize mb-1">{field.replace(/([A-Z])/g, ' $1')}:</label>
              <input
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                className="p-2 rounded bg-[#0f172a] border border-gray-500"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded mt-4 font-semibold"
          >
            ✅ Update Exercise
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExercise;
