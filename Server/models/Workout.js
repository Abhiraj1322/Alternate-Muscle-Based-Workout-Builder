const mongoose=require("mongoose");
const workoutSchema= new mongoose.Schema({
   name:{
    type:String,
    required:true,
   },
   createdby:{
    type:String,
    required:true,
   },
   exercises:[
    {
   exercise:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Exercise',
            required:true,
        },
        sets:Number,
        reps:Number,
        muscles:[String],
         type: {
      type: String,
      enum: ['push', 'pull', 'legs'], 
      required: true,
    }
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