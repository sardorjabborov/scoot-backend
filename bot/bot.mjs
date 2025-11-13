// bot.mjs
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import path from "path";

// .env faylni yuqoriga chiqib olish
dotenv.config({ path: path.resolve("../.env") }); 

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error("❌ BOT_TOKEN topilmadi. .env faylni tekshiring!");
  process.exit(1);
}

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

  if (text.includes("nima") && text.includes("qiladi")) {
    bot.sendMessage(chatId, "🛴 Men Scoot loyihasining Telegram yordamchisiman...");
  } else if (text.includes("egasi") || text.includes("kim yaratdi") || text.includes("kim ishlab chiqdi")) {
    bot.sendMessage(chatId, "👨‍💻 Meni Sardor Jabbоrov ishlab chiqdi!");
  } else {
    bot.sendMessage(chatId, `Siz yubordingiz: "${msg.text}"`);
  }
});
