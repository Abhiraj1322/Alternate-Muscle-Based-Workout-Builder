const mongoose=require("mongoose")
const workoutLogSchema= new mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    workoutid:{type:mongoose.Schema.Types.ObjectId,ref:"Workout"},
    weight:{type:String,required:true},
    sets:[{type:Number,required:true}],
    reps:[{type:Number,required:true}],
    notes:{type:stirng},
    date:{type:Date,default:Date.now}

})
const WorkoutLog=mongoose.model("WorkoutLog",workoutLogSchema);
module.exports=WorkoutLog