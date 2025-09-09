import { Board } from "../types/board";
import { Column } from "../types/column";
import { Task } from "../types/task";

export const mockUsers = [
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

export const mockTasks: Task[] = [
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
  {
    id: "3",
    title: "Veritabanı şeması",
    description: "PostgreSQL veritabanı şemasını tasarla",
    position: 0,
    createdAt: "2024-01-15T12:00:00Z",
    updatedAt: "2024-01-15T12:00:00Z",
  },
  {
    id: "4",
    title: "Birim testleri",
    description: "Tüm API endpoint'leri için birim testleri yaz",
    position: 1,
    createdAt: "2024-01-15T13:00:00Z",
    updatedAt: "2024-01-15T13:00:00Z",
  },
  {
    id: "5",
    title: "Kimlik doğrulama",
    description: "JWT token tabanlı kimlik doğrulama sistemi",
    position: 0,
    createdAt: "2024-01-15T14:00:00Z",
    updatedAt: "2024-01-15T14:00:00Z",
  },
  {
    id: "6",
    title: "Deployment",
    description: "Uygulamayı production ortamına deploy et",
    position: 0,
    createdAt: "2024-01-15T15:00:00Z",
    updatedAt: "2024-01-15T15:00:00Z",
  },
];

export const mockColumns: Column[] = [
  {
    id: "1",
    title: "Yapılacaklar",
    position: 0,
    tasks: [mockTasks[0], mockTasks[1]],
  },
  {
    id: "2",
    title: "Devam Eden",
    position: 1,
    tasks: [mockTasks[2], mockTasks[3]],
  },
  {
    id: "3",
    title: "İnceleme",
    position: 2,
    tasks: [mockTasks[4]],
  },
  {
    id: "4",
    title: "Tamamlandı",
    position: 3,
    tasks: [mockTasks[5]],
  },
];

export const mockBoards: Board[] = [
  {
    id: "1",
    name: "Web Geliştirme Projesi",
    createdAt: "2024-01-15T09:00:00Z",
    columns: mockColumns,
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
        tasks: [
          {
            id: "7",
            title: "Gereksinimler analizi",
            description: "Mobil uygulama gereksinimlerini belirle",
            position: 0,
            createdAt: "2024-01-16T10:00:00Z",
            updatedAt: "2024-01-16T10:00:00Z",
          },
        ],
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
  {
    id: "3",
    name: "DevOps & Infrastructure",
    createdAt: "2024-01-17T09:00:00Z",
    columns: [
      {
        id: "9",
        title: "Backlog",
        position: 0,
        tasks: [
          {
            id: "8",
            title: "Docker container setup",
            description: "Uygulama için Docker container yapılandırması",
            position: 0,
            createdAt: "2024-01-17T10:00:00Z",
            updatedAt: "2024-01-17T10:00:00Z",
          },
          {
            id: "9",
            title: "CI/CD pipeline",
            description: "GitHub Actions ile otomatik deployment",
            position: 1,
            createdAt: "2024-01-17T11:00:00Z",
            updatedAt: "2024-01-17T11:00:00Z",
          },
        ],
      },
      {
        id: "10",
        title: "In Progress",
        position: 1,
        tasks: [],
      },
      {
        id: "11",
        title: "Done",
        position: 2,
        tasks: [],
      },
    ],
  },
];
