const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: String,
  force: String,
  level: String,
  mechanic: String,
  equipment: String,
  primaryMuscles: [String],
  secondaryMuscles: [String],
  instructions: String,
  category: String,

  imageUrls: [String], 
  exerciseId: String,  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
