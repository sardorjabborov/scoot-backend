import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();

// .env fayldan token olish
const token = process.env.BOT_TOKEN;

// Botni ishga tushirish
const bot = new TelegramBot(token, { polling: true });

console.log("🚀 Scoot bot ishga tushdi!");

// /start buyrug'i
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "👋 Assalomu alaykum! Bu Scoot bot. Siz bu yerdan skuter bron qilishingiz yoki so‘rov yuborishingiz mumkin.");
});

// Foydalanuvchi xabari
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.toLowerCase();

  if (!text || text === "/start") return;

  // --- 1. Foydalanuvchi bot haqida so‘rasa
  if (text.includes("nima") && text.includes("qiladi")) {
    bot.sendMessage(chatId, "🛴 Men Scoot loyihasining Telegram yordamchisiman. Sizga skuter ijarasi, ro‘yxatdan o‘tish yoki so‘rov yuborishda yordam beraman!");
  }

  // --- 2. Foydalanuvchi “egasi kim” deb so‘rasa
  else if (text.includes("egasi") || text.includes("kim yaratdi") || text.includes("kim ishlab chiqdi")) {
    bot.sendMessage(chatId, "👨‍💻 Meni Sardor Jabbоrov ishlab chiqdi — Scoot loyihasi muallifi!");
  }

  // --- 3. Foydalanuvchi boshqa narsa yozsa
  else {
    bot.sendMessage(chatId, `Siz yubordingiz: "${msg.text}"`);
  }
});
