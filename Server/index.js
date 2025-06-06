const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express();
require("dotenv").config()
const path=require("path")
const PORT=process.env.PORT
const excercise=require("./routes/exerciseRoutes")
app.use(express.json())
app.use("/exercise",excercise)
app.use(express.static(path.join(__dirname, 'public')))  //express.sttuc is use for sttic images ,icon,css
  
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
      console.log("Mongoose is connected")
    })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
