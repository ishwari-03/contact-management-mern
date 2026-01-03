import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

const app = express();

// ✅ CORS (works for localhost + Vercel)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env.FRONTEND_URL
    ],
    methods: ["GET", "POST", "DELETE"],
  })
);

app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Routes
import contactRoutes from './routes/contactroutes.js';
app.use('/api/contacts', contactRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
