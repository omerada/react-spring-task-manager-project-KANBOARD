# 🎯 Kanboard Frontend - React Task Manager

Modern ve responsive Kanban board uygulaması. React, TypeScript, Tailwind CSS ve React Query ile geliştirilmiştir. **Vercel deployment** için optimize edilmiş ve **mock backend** ile hazır demo modunu destekler.

## 🚀 Live Demo

**[🌐 Canlı Demo - Vercel](https://your-app-url.vercel.app)**

### Demo Giriş Bilgileri:

- **Admin:** `admin` / `admin123`
- **Demo:** `demo` / `demo123`

## ✨ Özellikler

- ✅ **Modern React & TypeScript**: Tip güvenli geliştirme
- ✅ **JWT Authentication**: Güvenli kullanıcı yönetimi
- ✅ **Drag & Drop**: React DnD ile sürükle-bırak kanban board
- ✅ **Responsive Design**: Tailwind CSS ile mobil uyumlu
- ✅ **State Management**: React Query ile akıllı veri yönetimi
- ✅ **Form Handling**: React Hook Form ile güçlü form yönetimi
- ✅ **Mock Backend**: Backend olmadan test edilebilir demo modu
- ✅ **Vercel Ready**: Tek tıkla deployment
- ✅ **Error Handling**: Kapsamlı hata yönetimi
- ✅ **Loading States**: Optimized kullanıcı deneyimi
- ✅ **PWA Ready**: Progressive Web App desteği
- ✅ **Docker Support**: Containerized deployment

## 🛠️ Teknolojiler

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **React Query** - Server State Management
- **React Router Dom** - Routing
- **React Hook Form** - Form Management
- **React DnD** - Drag and Drop
- **Axios** - HTTP Client
- **React Hot Toast** - Notifications
- **Heroicons** - Icons
- **Vercel** - Deployment Platform

## 🎯 Mock Backend Features

- 🔐 **Authentication simulation** - JWT token simulation
- 📋 **Board management** - CRUD operasyonları
- 📝 **Task management** - Create, Update, Delete, Move
- 🏗️ **Drag & Drop** - Gerçek zamanlı pozisyon güncelleme
- ⏱️ **Network delay simulation** - Gerçekçi API deneyimi
- 💾 **Persistent data** - localStorage ile data saklanması

## 🚀 Hızlı Başlangıç

### Vercel Deploy (Önerilen)

1. **GitHub'a fork/clone yapın**
2. **Vercel'e import edin:**
   - Framework: `Create React App`
   - Root Directory: `kanboard-frontend`
   - Build Command: `npm run vercel-build`
3. **Environment Variables:**
   ```
   REACT_APP_API_URL=/api
   REACT_APP_MOCK_API=true
   REACT_APP_ENVIRONMENT=production
   ```
4. **Deploy!** 🎉

### Local Development

```bash
cd kanboard-frontend
npm install
npm start
```

## 📋 Gereksinimler

- Node.js 18+
- npm veya yarn
- _(Optional)_ Backend API (Port 8080)

## 🚀 Deployment

### 🌟 Vercel (Önerilen)

Detaylı deployment guide için: [DEPLOYMENT.md](DEPLOYMENT.md)

```bash
# 1. GitHub'a push
git add .
git commit -m "Ready for Vercel deployment"
git push origin main

# 2. Vercel'de proje oluştur
# 3. Environment variables ekle
# 4. Deploy!
```

### 🐳 Docker

```bash
npm run docker:build
npm run docker:run
```

### 🔧 Manual Build

```bash
npm run build
# build/ klasörünü web sunucunuza yükleyin
```

## 📁 Proje Yapısı

```
kanboard-frontend/
├── api/                 # Vercel serverless functions
│   ├── auth/           # Authentication endpoints
│   └── boards/         # Board management endpoints
├── src/
│   ├── components/     # React bileşenleri
│   │   ├── auth/      # Authentication bileşenleri
│   │   ├── board/     # Board yönetimi
│   │   ├── kanban/    # Kanban board
│   │   ├── layout/    # Layout bileşenleri
│   │   └── ui/        # Reusable UI bileşenleri
│   ├── mocks/         # Mock backend implementation
│   │   ├── data.ts    # Sample data
│   │   ├── mockAuthService.ts
│   │   ├── mockBoardService.ts
│   │   └── mockTaskService.ts
│   ├── services/      # API services (mock destekli)
│   ├── types/         # TypeScript types
│   └── utils/         # Yardımcı fonksiyonlar
├── vercel.json        # Vercel configuration
└── DEPLOYMENT.md      # Deployment guide
```

## 🎯 Kullanım

### Demo Mode

Uygulama varsayılan olarak demo modunda çalışır:

- Backend gerekmez
- Mock data ile çalışır
- localStorage'da data saklanır
- Gerçekçi API simülasyonu

### Production Mode

```bash
# Environment variable değiştir
REACT_APP_MOCK_API=false
REACT_APP_API_URL=https://your-backend-api.com/api
```

### Authentication

1. **Demo giriş:** Login sayfasındaki "Demo Giriş" butonunu kullanın
2. **Manuel giriş:** `demo/demo123` veya `admin/admin123`
3. **Kayıt:** Yeni hesap oluşturun (demo modunda)

### Board & Task Yönetimi

1. **Board Oluştur**: Dashboard'dan "Yeni Board"
2. **Task Ekle**: Kolon içindeki "+" butonu
3. **Drag & Drop**: Task'leri sürükleyip taşıyın
4. **Düzenle/Sil**: Task kartlarındaki butonları kullanın

## 🧪 Test

```bash
npm test                # Testleri çalıştır
npm run test:coverage   # Test coverage
npm run type-check      # TypeScript kontrolü
npm run lint           # ESLint kontrolü
```

## 🔧 Available Scripts

- `npm start` - Development server
- `npm run build` - Production build
- `npm run vercel-build` - Vercel için build
- `npm test` - Testleri çalıştır
- `npm run preview` - Build preview
- `npm run docker:build` - Docker image
- `npm run docker:run` - Docker container

## 🌍 Environment Variables

```env
# Production (Vercel)
REACT_APP_API_URL=/api
REACT_APP_MOCK_API=true
REACT_APP_ENVIRONMENT=production

# Development
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_MOCK_API=true
REACT_APP_ENVIRONMENT=development

# Real Backend
REACT_APP_API_URL=https://your-api.com/api
REACT_APP_MOCK_API=false
```

## 🚨 Önemli Notlar

- **Mock mode** varsayılan olarak aktif
- **LocalStorage** kullanarak data persist edilir
- **Real backend'e** geçiş için sadece env variable değiştirin
- **Vercel serverless functions** mock API sağlar
- **Responsive design** mobile-first yaklaşım

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim & Linkler

- **🌐 Live Demo:** [Vercel App URL]
- **📝 Deployment Guide:** [DEPLOYMENT.md](DEPLOYMENT.md)
- **🐛 Issues:** [GitHub Issues]
- **📚 Documentation:** Bu README

## 🙏 Teşekkürler

- [Vercel](https://vercel.com/) - Deployment platform
- [React](https://reactjs.org/) - UI Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [React Query](https://tanstack.com/query) - State management
