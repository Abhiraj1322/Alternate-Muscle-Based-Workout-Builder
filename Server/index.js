const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;


const exerciseRoutes = require("./routes/exerciseRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Mongoose is connected");

    app.use("/exercise", exerciseRoutes);
    app.use("/workout", workoutRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api", userRoutes);

    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
