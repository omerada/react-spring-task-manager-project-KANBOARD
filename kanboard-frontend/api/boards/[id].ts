import { VercelRequest, VercelResponse } from "@vercel/node";

// Mock boards data - in real app this would be from database
let mockBoards = [
  {
    id: "1",
    name: "Web Geliştirme Projesi",
    createdAt: "2024-01-15T09:00:00Z",
    columns: [
      {
        id: "1",
        title: "Yapılacaklar",
        position: 0,
        tasks: [
          {
            id: "1",
            title: "Kullanıcı arayüzü tasarımı",
            description: "Ana sayfa için kullanıcı arayüzü tasarımını tamamla",
            position: 0,
            createdAt: "2024-01-15T10:00:00Z",
            updatedAt: "2024-01-15T10:00:00Z",
          },
        ],
      },
    ],
  },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Board ID gerekli" });
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (req.method === "GET") {
    const board = mockBoards.find((b) => b.id === id);
    if (!board) {
      return res.status(404).json({ message: "Board bulunamadı" });
    }
    return res.status(200).json(board);
  }

  if (req.method === "PUT") {
    const { name } = req.body;
    const boardIndex = mockBoards.findIndex((b) => b.id === id);

    if (boardIndex === -1) {
      return res.status(404).json({ message: "Board bulunamadı" });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Board adı gerekli" });
    }

    mockBoards[boardIndex].name = name.trim();
    return res.status(200).json(mockBoards[boardIndex]);
  }

  if (req.method === "DELETE") {
    const boardIndex = mockBoards.findIndex((b) => b.id === id);

    if (boardIndex === -1) {
      return res.status(404).json({ message: "Board bulunamadı" });
    }

    mockBoards.splice(boardIndex, 1);
    return res.status(200).json({ message: "Board silindi" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
