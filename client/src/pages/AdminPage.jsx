import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [exercises, setExercises] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    force: "",
    level: "",
    mechanic: "",
    equipment: "",
    primaryMuscles: "",
    secondaryMuscles: "",
    instructions: "",
    category: "",
    imageUrls: "",
  });

  const token = localStorage.getItem("token");


  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await axios.get("http://localhost:8000/exercise", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExercises(res.data);
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message);
      }
    };
    fetchExercises();
  }, [token]);

  // Form change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit new exercise
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      primaryMuscles: formData.primaryMuscles.split(",").map((m) => m.trim()),
      secondaryMuscles: formData.secondaryMuscles.split(",").map((m) => m.trim()),
      imageUrls: formData.imageUrls.split(",").map((url) => url.trim()),
    };

    try {
      await axios.post("http://localhost:8000/exercise", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Exercise added!");
      setFormData({
        name: "",
        force: "",
        level: "",
        mechanic: "",
        equipment: "",
        primaryMuscles: "",
        secondaryMuscles: "",
        instructions: "",
        category: "",
        imageUrls: "",
      });
      window.location.reload(); // or re-fetch
    } catch (err) {
      console.error("Add error:", err.response?.data || err.message);
    }
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/exercise/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExercises(exercises.filter((ex) => ex._id !== id));
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-amber-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Admin Exercise Panel</h1>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-10">
        {[
          "name", "force", "level", "mechanic", "equipment",
          "category", "instructions", "primaryMuscles", "secondaryMuscles", "imageUrls"
        ].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
        ))}

        <div className="sm:col-span-2">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
            Add Exercise
          </button>
        </div>
      </form>

      {/* Exercises List */}
      <div className="space-y-4">
        {exercises.map((ex) => (
          <div key={ex._id} className="p-4 border rounded shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold">{ex.name}</h2>
                <p><strong>Category:</strong> {ex.category}</p>
                <p><strong>Force:</strong> {ex.force}</p>
                <p><strong>Level:</strong> {ex.level}</p>
                <p><strong>Muscles:</strong> {ex.primaryMuscles?.join(", ")}</p>
              </div>
              <button
                onClick={() => handleDelete(ex._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
