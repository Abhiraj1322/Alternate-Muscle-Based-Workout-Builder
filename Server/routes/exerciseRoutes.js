const express=require("express")
const router=express.Router()
const Exercise=require("../models/Exercise")
 const mongoose = require('mongoose');
const authenticateToken=require("../middleware/authenticateToken")
const isAdmin=require('../middleware/checkAdmin')
router.post('/',authenticateToken,isAdmin, async(req,res)=>{
    try{
const exercise= new Exercise(req.body);
await exercise.save()
res.status(201).json(exercise);
    }
    catch(err){
 res.status(400).json({eror:err.message})   
    }
})
router.get("/",authenticateToken, async(req,res)=>{
    try{
const exercise= await Exercise.find()
res.json(exercise)
    }
    catch(err){
 res.status(500).json({error:err.message})
    }
    
})
router.get("/:id", authenticateToken,  async (req, res) => {
  const { id } = req.params;


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid exercise ID format" });
  }

  try {
    const exercise = await Exercise.findById(id);

    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.status(200).json(exercise);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
router.put("/:id",authenticateToken,isAdmin,async(req,res)=>{
    try{
const exercise=await Exercise.findById(req.params.id)
if(!exercise) return res.status(404).json()
    }
    catch(err){
   res.status(500).json({error:err.message})
    }
})

router.delete("/:id",authenticateToken,isAdmin,async(req,res)=>{
    try{
const exercise=await Exercise.findByIdAndDelete(req.params.id)
if(!exercise) return res.status(404).json("Excercise got deleted")
    }
    catch (err){
 res.status(500).json({error:err})
    }
})
 module.exports=router