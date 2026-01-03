const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

const contactRoutes = require('./routes/contactroutes');
app.use('/api/contacts', contactRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
