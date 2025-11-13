import mongoose from "mongoose";

// Foydalanuvchi ro'yxatdan o'tish schema
const signupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Signup", signupSchema);
