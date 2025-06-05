const mongoose=require("mongoose");
const workoutSchema= new mongoose.Schema({
   name:{
    type:String,
    required:true,
   },
   createdby:{
    typr:String,
    required:true,
   },
   excercises:[
    {
   excercise:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Excercise',
            required:true,
        },
        sets:Number,
        reps:Number,
        resttime:Number,
        notes: String,
    }
     
   ],
   createdAt:{
    type:Date,
    default:Date.now
   },
   updatedAt:{
    type:Date
   }

})

const Workout=mongoose.model('Workout',workoutSchema)
module.exports=Workout