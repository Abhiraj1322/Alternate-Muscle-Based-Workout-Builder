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
  day: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
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
           muscles: {
        type: [String],
        default: [],
      },
         type: {
      type: String,
      enum: ['push', 'pull', 'legs'], 
      required: true,
    },
    weightLog:[
  {
    weight:Number,
    date:{type:Date,default:Date.now}
  }
    ]
    }
      
   ],
   createdAt:{
    type:Date,
    default:Date.now
   },
   updatedAt:{
    type:Date
   },
     notes: {
    type: String,
    default: "",
  },

})

const Workout=mongoose.model('Workout',workoutSchema)
module.exports=Workout