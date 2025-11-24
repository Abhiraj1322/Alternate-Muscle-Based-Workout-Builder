const  express = require("express")
const router=express.Router()
const Progresslog=require("../models/ProgressLog");
const authenticateToken=require("../middleware/authenticateToken")
const WorkoutLog=require("../models/WorkoutLog")
router.get("/",authenticateToken,async(req,res)=>{

})