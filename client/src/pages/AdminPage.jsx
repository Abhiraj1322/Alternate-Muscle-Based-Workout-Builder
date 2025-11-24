import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    });
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");


  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/exercise",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setExercises(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    fetchExercises();
  }, [token]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();


  Object.keys(formData).forEach((key) => {
    data.append(key, formData[key]);
  });

  if (files && files.length > 0) {
    files.forEach((file) => data.append("images", file));
  }

  try {
    const res = await axios.post(
      "http://localhost:8000//exercise",
      data,
      { headers: { Authorization: `Bearer ${token}` } } 
    );

    setMessage("✅ Exercise added successfully!");
    setFormData({
      name: "", force: "", level: "", mechanic: "", equipment: "",
      primaryMuscles: "", secondaryMuscles: "", instructions: "", category: "",
    });
    setFiles([]);
    setExercises((prev) => [...prev, res.data]);
  } catch (err) {
  if (err.response) {

    console.error("Server error:", err.response.data);
  } else if (err.request) {

    console.error("No response received:", err.request);
  } else {

    console.error("Error setting up request:", err.message);
  }
}
};

  // Handle delete
  const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
    try {
      
      await axios.delete(
        `http://localhost:8000/exercise/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setExercises((prev) => prev.filter((ex) => ex._id !== id));
  
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Filter exercises based on search
const filteredExercises = exercises.filter((ex) =>
  (ex.name || "").toLowerCase().includes(searchTerm.toLowerCase())
);
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-400">
        🛠️ Admin Exercise Panel
      </h1>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by exercise name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 rounded bg-[#1e293b] text-white border border-gray-600"
        />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto mb-10 bg-[#1e293b] p-6 rounded-xl border border-gray-700"
      >
        {[
          "name", "force", "level", "mechanic", "equipment",
          "category", "instructions", "primaryMuscles", "secondaryMuscles",
        ].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-sm mb-1 capitalize">
              {field.replace(/([A-Z])/g, " $1")}:
            </label>
            <input
              name={field}
              placeholder={field}
              value={formData[field]}
              onChange={handleChange}
              className="p-2 rounded bg-[#0f172a] border border-gray-600 text-white"
            />
          </div>
        ))}

        <div className="flex flex-col">
          <label className="text-sm mb-1">Upload Images:</label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>

        <div className="sm:col-span-2 mt-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold">
            Add Exercise
          </button>
        </div>
      </form>

      {message && <p className="text-center mb-4">{message}</p>}

      {/* Exercise List */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {filteredExercises.length > 0 ? (
          filteredExercises.map((ex) => (
            <div key={ex._id} className="bg-[#1e293b] p-4 rounded-lg border border-gray-700 shadow">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <h2 className="text-xl font-bold text-indigo-300">{ex.name}</h2>
                  <p className="text-sm"><strong>Category:</strong> {ex.category}</p>
                  <p className="text-sm"><strong>Force:</strong> {ex.force}</p>
                  <p className="text-sm"><strong>Level:</strong> {ex.level}</p>
                  <p className="text-sm"><strong>Primary Muscles:</strong> {ex.primaryMuscles?.join(", ")}</p>
                  <p className="text-sm"><strong>Secondary Muscles:</strong> {ex.secondaryMuscles?.join(", ")}</p>
                  <p className="text-sm"><strong>Instructions:</strong> {ex.instructions}</p>

                  {/* Display images */}
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {ex.imageUrls?.map((url, i) => (
                      <img
                        key={i}
                        src={`http://localhost:8000/${url}`}
                        alt={ex.name}
                        className="w-24 h-24 object-cover border"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mt-4 sm:mt-0">
                  <button
                    onClick={() => navigate(`/exercisedetails/${ex._id}`)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                  >
                    View
                  </button>

                  <button
                    onClick={() => navigate(`/editexercise/${ex._id}`)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(ex._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No exercises found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
