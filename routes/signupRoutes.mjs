import express from "express";
import Signup from "../models/Signup.mjs";

const router = express.Router();

// Ro'yxatdan o'tish
router.post("/", async (req, res) => {
  try {
    const { name, phone } = req.body;

    // Telefon oldin ishlatilganini tekshirish
    const existingUser = await Signup.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ error: "Telefon allaqachon mavjud" });
    }

    // Yangi foydalanuvchi yaratish
    const newUser = await Signup.create({ name, phone });
    res.status(201).json({ message: "Ro'yxatdan o'tish muvaffaqiyatli", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Barcha foydalanuvchilarni olish (test uchun)
router.get("/", async (req, res) => {
  try {
    const users = await Signup.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
