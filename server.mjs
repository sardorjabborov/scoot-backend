import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Signup from "./models/Signup.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7777;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas ga ulanish
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Atlas ga ulanish muvaffaqiyatli!"))
  .catch(err => console.log("MongoDB Atlas ulanish xatoligi:", err));

// Test route
app.get("/", (req, res) => res.send("Scoot backend ishlayapti!"));

// Signup route
app.post("/api/signup", async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Ism va telefon raqami kerak!" });
    }

    const newSignup = new Signup({ name, phone });
    await newSignup.save();

    res.json({ message: "Ro‘yxatdan o‘tish muvaffaqiyatli!" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Serverda xatolik yuz berdi!" });
  }
});

// Serverni ishga tushirish
app.listen(PORT, () => console.log(`Server ${PORT} da ishga tushdi`));
