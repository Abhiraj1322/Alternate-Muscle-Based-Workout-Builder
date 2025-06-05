const mongoose=require('mongoose');
const ExcerciseSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    muscleGroup:{
        type:String,
        required:true,
    },
    subGroup:{
        type:String,
    },
    equipment:{
    type:String,
    default:'Bodyweight'
    },
    difficulty:{
        type:String,
        enum:['Beginner','Intermediate','Advanced']
    },
    videoUrl:{
        type:String,
        required:true,
    },
    instruction:{
        type:String,
        required:true,
    },
    tips:{
        type:String,
    },
    createdAt:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,

    }

})
const Exercise=mongoose.model('Excercise',ExcerciseSchema)
module.exports=Exercise