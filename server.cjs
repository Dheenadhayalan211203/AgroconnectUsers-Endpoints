const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 3000;
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema and model for user1 collection
const user1Schema = new mongoose.Schema({
  title: String,
  amount: Number
});

const User1 = mongoose.model("user1", user1Schema);

// Define schema and model for user2 collection
const user2Schema = new mongoose.Schema({
  title: String,
  amount: Number
});

const User2 = mongoose.model("user2", user2Schema);

app.use(bodyParser.json());

// Route to add data to user1 collection
app.post("/api/user1", async (req, res) => {
  const newData = new User1({
    title: req.body.title,
    amount: req.body.amount
  });

  try {
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get data from user1 collection
app.get("/api/user1", async (req, res) => {
  try {
    const userData = await User1.find();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to add data to user2 collection
app.post("/api/user2", async (req, res) => {
  const newData = new User2({
    name: req.body.title,
    quantity: req.body.amount
  });

  try {
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get data from user2 collection
app.get("/api/user2", async (req, res) => {
  try {
    const userData = await User2.find();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
