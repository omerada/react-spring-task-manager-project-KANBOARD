import { VercelRequest, VercelResponse } from "@vercel/node";

// Mock data
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
          {
            id: "2",
            title: "API entegrasyonu",
            description: "Backend API servislerini frontend ile entegre et",
            position: 1,
            createdAt: "2024-01-15T11:00:00Z",
            updatedAt: "2024-01-15T11:00:00Z",
          },
        ],
      },
      {
        id: "2",
        title: "Devam Eden",
        position: 1,
        tasks: [
          {
            id: "3",
            title: "Veritabanı şeması",
            description: "PostgreSQL veritabanı şemasını tasarla",
            position: 0,
            createdAt: "2024-01-15T12:00:00Z",
            updatedAt: "2024-01-15T12:00:00Z",
          },
        ],
      },
      {
        id: "3",
        title: "İnceleme",
        position: 2,
        tasks: [],
      },
      {
        id: "4",
        title: "Tamamlandı",
        position: 3,
        tasks: [
          {
            id: "4",
            title: "Deployment",
            description: "Uygulamayı production ortamına deploy et",
            position: 0,
            createdAt: "2024-01-15T15:00:00Z",
            updatedAt: "2024-01-15T15:00:00Z",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Mobil Uygulama",
    createdAt: "2024-01-16T09:00:00Z",
    columns: [
      {
        id: "5",
        title: "Planlama",
        position: 0,
        tasks: [],
      },
      {
        id: "6",
        title: "Geliştirme",
        position: 1,
        tasks: [],
      },
      {
        id: "7",
        title: "Test",
        position: 2,
        tasks: [],
      },
      {
        id: "8",
        title: "Yayın",
        position: 3,
        tasks: [],
      },
    ],
  },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (req.method === "GET") {
    return res.status(200).json(mockBoards);
  }

  if (req.method === "POST") {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Board adı gerekli" });
    }

    const newBoard = {
      id: Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      createdAt: new Date().toISOString(),
      columns: [
        {
          id: Math.random().toString(36).substr(2, 9),
          title: "Yapılacaklar",
          position: 0,
          tasks: [],
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          title: "Devam Eden",
          position: 1,
          tasks: [],
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          title: "Tamamlandı",
          position: 2,
          tasks: [],
        },
      ],
    };

    mockBoards.push(newBoard);
    return res.status(201).json(newBoard);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
