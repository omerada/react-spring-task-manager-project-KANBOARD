import { VercelRequest, VercelResponse } from "@vercel/node";

const mockUsers = [
  {
    id: "1",
    username: "admin",
    email: "admin@kanboard.com",
    password: "admin123",
  },
  {
    id: "2",
    username: "demo",
    email: "demo@kanboard.com",
    password: "demo123",
  },
];

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
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Kullanıcı adı ve şifre gerekli" });
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Find user
    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return res.status(401).json({ message: "Geçersiz kullanıcı bilgileri" });
    }

    // Generate mock JWT token
    const token = `mock-jwt-token-${user.id}-${Date.now()}`;

    return res.status(200).json({
      token,
      type: "Bearer",
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
}
