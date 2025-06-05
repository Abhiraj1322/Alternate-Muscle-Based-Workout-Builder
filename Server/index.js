const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express();
require("dotenv").config()
const PORT=process.env.PORT








mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
      console.log("Mongoose is connected")
    })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
