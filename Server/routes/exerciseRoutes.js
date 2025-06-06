const express=require("express")
const router=express.Router()
const Excercise=require("../models/Exercise")
 
router.post('/',async(req,res)=>{
    try{
const exercise= new Excercise(req.body);
await exercise.save()
res.status(201).json(exercise);
    }
    catch(err){
 res.status(400).json({eror:err.message})   
    }
})
router.get("/",async(req,res)=>{
    try{
const exercise= await Excercise.find()
res.json(exercise)
    }
    catch(err){
 res.status(500).json({error:err.message})
    }
    
})
router.put("/:id",async(req,res)=>{
    try{
const exercise=await Excercise.findById(req.params.id)
if(!exercise) return res.status(404).json()
    }
    catch(err){
   res.status(500).json({error:err.message})
    }
})

router.delete("/:id",async(req,res)=>{
    try{
const exercise=await Excercise.findByIdAndDelete(req.params.id)
if(!exercise) return res.status(404).json("Excercise got deleted")
    }
    catch (err){
 res.status(500).json({error:err})
    }
})
 module.exports=router