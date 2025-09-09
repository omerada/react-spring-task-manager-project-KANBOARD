import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Tüm alanlar gerekli" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Şifreler eşleşmiyor" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Şifre en az 6 karakter olmalı" });
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generate user ID and token
    const userId = Math.random().toString(36).substr(2, 9);
    const token = `mock-jwt-token-${userId}-${Date.now()}`;

    return res.status(201).json({
      token,
      type: "Bearer",
      username,
      email,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
}
