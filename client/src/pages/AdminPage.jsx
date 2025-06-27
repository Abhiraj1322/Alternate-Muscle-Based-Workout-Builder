import React, { useEffect,useState } from 'react'
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaIdBadge, FaUserShield, FaHome, FaDumbbell } from "react-icons/fa";
const AdminPage = () => {
  const [User,setUser]=useState(null)
   const navigate = useNavigate();

useEffect(()=>{
  const fetchUerinfo= async ()=>{
    const token=localStorage.getItem("token")
    const res =await fetch("http://localhost:8000/api/user",{
      headers:{
       Authorization: `Bearer ${token}`, 
      }
    })
    const data =await res.json();

    setUser(data.user)

  }
  fetchUerinfo()
},[])


  const goToHome = () => {
    navigate("/homepage"); 
  }
  

  const myworkout = () => {
    navigate("/myworkout"); 
  }
  if (!User) return <p>Loading...</p>;
  return (
 <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-lg space-y-6 text-gray-800 border border-gray-200">
      <h2 className="text-3xl font-extrabold text-center text-indigo-700">👤 User Profile</h2>

      <div className="space-y-4 text-sm">
        <div className="flex items-center gap-2">
          <FaUser className="text-indigo-600" />
          <p><strong>Name:</strong> {User.name}</p>
        </div>

        <div className="flex items-center gap-2">
          <FaEnvelope className="text-green-600" />
          <p className="break-words"><strong>Email:</strong> {User.email}</p>
        </div>

        <div className="flex items-center gap-2">
          <FaUserShield className="text-yellow-500" />
          <p><strong>Admin:</strong> {User.isAdmin ? "Yes ✅" : "No ❌"}</p>
        </div>

        <div className="flex items-center gap-2">
          <FaIdBadge className="text-gray-500" />
          <p className="break-words text-xs"><strong>User ID:</strong> {User._id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        <button
          onClick={goToHome}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
        >
          <FaHome /> Homepage
        </button>

        <button
          onClick={myworkout}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
        >
          <FaDumbbell /> My Workouts
        </button>
      </div>
    </div>
  )
}

export default AdminPage