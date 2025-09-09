# 🎯 Kanboard Frontend - React Task Manager

Modern ve responsive Kanban board uygulaması. React, TypeScript, Tailwind CSS ve React Query ile geliştirilmiştir.

## 🚀 Özellikler

- ✅ **Modern React & TypeScript**: Tip güvenli geliştirme
- ✅ **JWT Authentication**: Güvenli kullanıcı yönetimi
- ✅ **Drag & Drop**: React DnD ile sürükle-bırak kanban board
- ✅ **Responsive Design**: Tailwind CSS ile mobil uyumlu
- ✅ **State Management**: React Query ile akıllı veri yönetimi
- ✅ **Form Handling**: React Hook Form ile güçlü form yönetimi
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

## 📋 Gereksinimler

- Node.js 18+ 
- npm veya yarn
- Backend API (Port 8080)

## 🚀 Kurulum

### 1. Bağımlılıkları yükleyin

```bash
npm install
# veya
yarn install
```

### 2. Environment dosyasını oluşturun

```bash
cp .env.example .env.development
```

`.env.development` dosyasını düzenleyin:

```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_APP_NAME=Kanboard Dev
REACT_APP_VERSION=1.0.0
```

### 3. Uygulamayı başlatın

```bash
npm start
# veya
yarn start
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde açılacaktır.

## 📁 Proje Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── auth/           # Authentication bileşenleri
│   ├── board/          # Board yönetimi bileşenleri
│   ├── kanban/         # Kanban board bileşenleri
│   ├── layout/         # Layout bileşenleri
│   └── ui/             # Reusable UI bileşenleri
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── pages/              # Sayfa bileşenleri
├── services/           # API servisleri
├── types/              # TypeScript type definitions
├── utils/              # Yardımcı fonksiyonlar
└── styles/             # Global CSS dosyaları
```

## 🎯 Kullanım

### Authentication

1. **Kayıt Ol**: `/register` sayfasından yeni hesap oluşturun
2. **Giriş Yap**: `/login` sayfasından mevcut hesabınızla giriş yapın

### Board Yönetimi

1. **Board Oluştur**: Dashboard'dan "Yeni Board" butonuna tıklayın
2. **Board Görüntüle**: Board kartına tıklayarak detay sayfasına gidin
3. **Board Sil**: Board kartındaki çöp kutusu ikonuna tıklayın

### Task Yönetimi

1. **Task Oluştur**: Kolon içindeki "+" butonuna tıklayın
2. **Task Düzenle**: Task kartındaki kalem ikonuna tıklayın
3. **Task Taşı**: Task'i sürükleyip başka kolona bırakın
4. **Task Sil**: Task kartındaki çöp kutusu ikonuna tıklayın

## 🧪 Test

### Testleri çalıştır

```bash
npm test
# veya
yarn test
```

### Test coverage

```bash
npm run test -- --coverage
# veya
yarn test --coverage
```

## 🏗️ Build

### Development build

```bash
npm run build
# veya
yarn build
```

### Production build

```bash
npm run build:production
# veya
yarn build:production
```

### Bundle analizi

```bash
npm run analyze
# veya
yarn analyze
```

## 🐳 Docker

### Docker image build

```bash
npm run docker:build
# veya
yarn docker:build
```

### Docker container çalıştır

```bash
npm run docker:run
# veya
yarn docker:run
```

## 🚀 Deployment

### Vercel

```bash
npm install -g vercel
vercel --prod
```

### Netlify

```bash
npm run build
# build klasörünü Netlify'a yükleyin
```

### Manual Deployment

```bash
npm run build
# build klasöründeki dosyaları web sunucunuza yükleyin
```

## 🔧 Available Scripts

- `npm start` - Development server başlat
- `npm run build` - Production build oluştur
- `npm test` - Testleri çalıştır
- `npm run lint` - ESLint kontrolü
- `npm run lint:fix` - ESLint hatalarını otomatik düzelt
- `npm run type-check` - TypeScript tip kontrolü
- `npm run preview` - Build edilmiş uygulamayı önizle
- `npm run docker:build` - Docker image oluştur
- `npm run docker:run` - Docker container çalıştır

## 🌍 Environment Variables

```env
REACT_APP_API_URL=http://localhost:8080/api  # Backend API URL
REACT_APP_APP_NAME=Kanboard                  # Uygulama adı
REACT_APP_VERSION=1.0.0                      # Uygulama versiyonu
```

## 🚨 Bilinen Sorunlar

- Drag & drop mobil cihazlarda sınırlı destek
- IE11 desteği yok (modern browserlar gerekli)

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

- Proje: [GitHub Repository](https://github.com/omerada/react-spring-task-manager-project-KANBOARD)
- Issues: [GitHub Issues](https://github.com/omerada/react-spring-task-manager-project-KANBOARD/issues)

## 🙏 Teşekkürler

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query)
- [Heroicons](https://heroicons.com/)
- [React Hook Form](https://react-hook-form.com/)
