import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const user = response.data.user
      console.log(user)
      localStorage.setItem("userId", user._id);
localStorage.setItem("name", user.name);
localStorage.setItem("email", user.email);

  

     navigate("/loginpage")
      setMessage("✅ Registered successfully. Please log in.");
       
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1d] text-white flex items-center justify-center">
      <div className="w-full max-w-sm p-8">
        <h1 className="text-center text-3xl font-bold mb-8">ALTERNATE</h1>

        <h2 className="text-xl font-semibold mb-2">Sign Up</h2>
        <p className="text-gray-400 mb-6">Create an account to get started</p>

        {message && (
          <p
            className={`mb-4 ${
              message.includes("success") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-transparent border text-white border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="name@email.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-transparent border text-white border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-transparent border text-white border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-transparent border text-white border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
