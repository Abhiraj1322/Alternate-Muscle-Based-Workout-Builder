import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
const navigate=useNavigate()
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); 

    try {
      const res = await axios.post("https://alternate-muscle-based-workout-builder-1.onrender.com/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
   if(user.isAdmin){
    navigate("/admin")
   }
   else{
    navigate("/homepage")
          setMessage("✅ Login successful");
   }

      
  

    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
   <div className="min-h-screen bg-[#1a1a1d] text-white flex items-center justify-center px-4">
  <div className="w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 bg-[#222] rounded-xl shadow-lg">
    <h1 className="text-center text-3xl font-extrabold mb-6">ALTERNATE</h1>

    <h2 className="text-xl font-semibold mb-2">Login</h2>
    <p className="text-gray-400 mb-6 text-sm sm:text-base">Welcome back!</p>

    {message && (
      <p className={`${message.includes("success") ? "text-green-400" : "text-red-400"} mb-4`}>
        {message}
      </p>
    )}

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="name@email.com"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        name="password"
        placeholder="Your password"
        value={formData.password}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
      >
        Login
      </button>
    </form>

    <p className="mt-6 text-center text-gray-400 text-sm">
      Don’t have an account?{" "}
      <a href="/registerpage" className="text-blue-500 hover:underline">
        Register here
      </a>
    </p>
  </div>
</div>

  );
};

export default LoginPage;
