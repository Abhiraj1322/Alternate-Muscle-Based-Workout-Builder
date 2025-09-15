const  express = require("express")
const router=express.Router()
const authenticateToken=require("../middleware/authenticateToken")
const Workout=require('../models/Workout')


router.post("/", authenticateToken, async (req, res) => {
  try {
    const workout = new Workout({
      ...req.body,
      createdby: req.userId, 
    });

    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find({ createdby: req.userId });
    res.status(200).json(workouts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const workout = await Workout.findOne({ _id: req.params.id, createdby: req.userId }).populate(exercises.exercise,"name equipment instruction")
   
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID or server error" });
  }
});


router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, createdby: req.userId, }, 
      req.body,
      { new: true }
    );
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/:id",  async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete({
      _id: req.params.id,
      createdby: req.userId, 
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.json({ message: "Workout deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports=router;