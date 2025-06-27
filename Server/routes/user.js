const express=require('express')
const router=express.Router()
const authenticateToken=require("../middleware/authenticateToken")
const mongoose=require('mongoose')
const User=require("../models/User")

 router.get("/user",authenticateToken,async(req,res)=>{
    try{
const user=await User.findById(req.userId).select("-password")
if(!user) return res.status(404).json({message:"User not found"})
    res.json({user})
    }
    catch(eror){
  res.status(500).json({message:"server eror"})
    }
 });

 module.exports = router;