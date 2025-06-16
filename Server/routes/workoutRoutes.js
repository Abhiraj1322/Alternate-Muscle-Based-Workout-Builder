const  express = require("express")
const router=express.Router()


const Workout = require("../models/Workout")


router.post("/",async(req,res)=>{
    try{
const workout= new Workout(req.body)
await workout.save();
res.status(201).json(workout)
    }
    catch(err){
  res.status(400).json({eror:err.message})
    }
})
router.get("/",async(req,res)=>{
    try{
 const workout=  await Workout.find()
 res.status(201).json(workout)
    }
    catch(err){
 res.status(400).json({eror:err.message})
    }
})

router.put("/:id",async(req,res)=>{
    try{
const workout =await Workout.findById(req.params.id)
if(!workout) return res.status(404).json()
    }
    catch(err){
 res.status(500).json({error:err.message})
    }

})
router.delete("/:id",async(req,res)=>{
    try{
const workout=await Workout.findByIdAndDelete(req.params.id)
if(!workout) return res.status(404).json()
    }
    catch(err){
res.status(500).json({eror:err.message})
    }
})
module.exports=router;