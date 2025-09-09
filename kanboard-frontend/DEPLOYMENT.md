# Kanboard - Vercel Deployment Guide

Bu proje Vercel üzerinde deploy edilmek üzere yapılandırılmıştır ve mock backend ile birlikte gelir.

## 🚀 Vercel'e Deploy Etme

### 1. GitHub'a Push

```bash
git add .
git commit -m "Add Vercel deployment configuration with mock backend"
git push origin main
```

### 2. Vercel'e Deploy

1. [Vercel](https://vercel.com) hesabınıza giriş yapın
2. "New Project" butonuna tıklayın
3. GitHub repository'nizi seçin
4. Project settings:
   - **Framework Preset**: Create React App
   - **Root Directory**: `kanboard-frontend`
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `build`

### 3. Environment Variables

Vercel dashboard'da aşağıdaki environment variable'ları ekleyin:

```
REACT_APP_API_URL=/api
REACT_APP_MOCK_API=true
REACT_APP_ENVIRONMENT=production
```

## 🎯 Demo Credentials

Uygulama demo modunda çalışıyor. Aşağıdaki giriş bilgilerini kullanabilirsiniz:

**Admin Kullanıcı:**

- Kullanıcı Adı: `admin`
- Şifre: `admin123`

**Demo Kullanıcı:**

- Kullanıcı Adı: `demo`
- Şifre: `demo123`

## 🔧 Mock API Features

- ✅ Kimlik doğrulama (JWT token simulation)
- ✅ Board yönetimi (CRUD operasyonları)
- ✅ Task yönetimi (Create, Update, Delete, Move)
- ✅ Drag & Drop özelliği
- ✅ Gerçekçi network delay simulation
- ✅ Persistent data (localStorage)

## 📁 Project Structure

```
kanboard-frontend/
├── api/                    # Vercel serverless functions
│   ├── auth/
│   │   ├── login.ts
│   │   └── register.ts
│   └── boards/
│       ├── index.ts
│       └── [id].ts
├── src/
│   ├── mocks/             # Mock data and services
│   │   ├── data.ts
│   │   ├── utils.ts
│   │   ├── initialize.ts
│   │   ├── mockAuthService.ts
│   │   ├── mockBoardService.ts
│   │   └── mockTaskService.ts
│   └── services/          # Updated API services with mock support
└── vercel.json           # Vercel configuration
```

## 🎨 Features

- 📱 Responsive design
- 🎭 Dark/Light theme support
- 🔐 Authentication system
- 📋 Multiple boards support
- 🏗️ Kanban board with drag & drop
- ⚡ Real-time updates simulation
- 🎯 TypeScript support
- 🎨 Tailwind CSS styling

## 🛠️ Development

Local development için:

```bash
cd kanboard-frontend
npm install
npm start
```

Production build test için:

```bash
npm run build
npm run preview
```

## 📝 Notes

- Mock API Vercel serverless functions olarak çalışır
- Tüm data localStorage'da saklanır (demo amaçlı)
- Production'da gerçek backend API'sine kolayca geçilebilir
- Environment variable `REACT_APP_MOCK_API=false` yaparak gerçek API kullanılabilir
