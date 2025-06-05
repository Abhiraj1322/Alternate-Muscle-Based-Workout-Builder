const mongoose=require("mongoose");

const progressLogschema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    Workout:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"Workout",
   required:true,
    },

  exercise:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Excercise",
  required:true,
  },
  date:{
    type:Date,
    default:Date.now,
  },
  sets:{
 type:Number,
 required:true,

  },
reps:{
    type:Number,
    required:true,
},
weight:{
type:Number,
default:0,
},
notes:{
 type:String,   
}
});
