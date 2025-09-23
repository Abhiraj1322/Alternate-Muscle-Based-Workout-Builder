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


router.get("/", authenticateToken,async (req, res) => {
  try {

    const workouts = await Workout.find({  createdby: req.userId });
    res.status(200).json(workouts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id,}, 
 req.body,
      { new: true }
    );
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/:id", authenticateToken, async (req, res) => {
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