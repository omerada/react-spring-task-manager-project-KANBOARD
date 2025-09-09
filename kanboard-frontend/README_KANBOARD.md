# 🎯 Kanboard Frontend — React Task Manager

Modern, responsive Kanban board application built with React, TypeScript, Tailwind CSS, and React Query. The frontend is optimized for Vercel deployment and includes a mock backend for demo mode.

## Live demo

Visit the live demo (replace with your URL):

[Live Demo - Vercel](https://your-app-url.vercel.app)

Demo accounts:

- Admin: `admin` / `admin123`
- Demo: `demo` / `demo123`

## Features

- Modern React + TypeScript
- JWT authentication (mocked in demo mode)
- Drag & drop Kanban board (React DnD)
- Responsive UI (Tailwind CSS)
- Server-state management with React Query
- Form handling with React Hook Form
- Mock backend for offline/demo use
- Vercel-ready configuration
- PWA support and Docker options

## Technologies

- React
- TypeScript
- Tailwind CSS
- React Query
- React Router
- React Hook Form
- React DnD
- Axios
- React Hot Toast
- Heroicons
- Vercel

## Quick start

Recommended deployment: Vercel

1. Fork or clone this repository
2. Import the project into Vercel
   - Framework: Create React App
   - Root directory: `kanboard-frontend`
   - Build command: `npm run vercel-build`
3. Add environment variables (in Vercel dashboard):

```
REACT_APP_API_URL=/api
REACT_APP_MOCK_API=true
REACT_APP_ENVIRONMENT=production
```

Local development:

```powershell
cd kanboard-frontend
npm install
npm start
```

## Requirements

- Node.js 18+
- npm or yarn
- (Optional) Backend API on port 8080 when not using mock mode

## Deployment options

Vercel (recommended) — see `DEPLOYMENT.md` for full instructions.

Docker

```powershell
npm run docker:build
npm run docker:run
```

Manual build

```powershell
npm run build
# Upload the generated `build/` folder to your static host
```

## Project structure

```
kanboard-frontend/
├─ api/                 # Vercel serverless functions (mock API)
├─ src/
│  ├─ components/
   │  ├─ mocks/
   │  ├─ services/
   │  ├─ types/
   │  └─ utils/
├─ vercel.json
└─ DEPLOYMENT.md
```

## Usage

Demo mode (default): application runs without a real backend using mock services and localStorage persistence.

Production mode: set env vars to point to your real backend:

```powershell
REACT_APP_MOCK_API=false
REACT_APP_API_URL=https://your-backend-api.com/api
```

Authentication

Use the demo login button, or credentials `demo/demo123` or `admin/admin123`. Registration works in demo mode.

Board & task management

1. Create a board from the dashboard
2. Add tasks using the "+" button inside a column
3. Drag & drop tasks between columns
4. Edit or delete tasks via card controls

## Tests

```powershell
npm test
npm run test:coverage
npm run type-check
npm run lint
```

## Available scripts

- `npm start` — Development server
- `npm run build` — Production build
- `npm run vercel-build` — Build for Vercel
- `npm test` — Run tests
- `npm run preview` — Preview build
- `npm run docker:build` — Build Docker image
- `npm run docker:run` — Run Docker container

## Environment variables

```
# Production (Vercel)
REACT_APP_API_URL=/api
REACT_APP_MOCK_API=true
REACT_APP_ENVIRONMENT=production

# Development
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_MOCK_API=true
REACT_APP_ENVIRONMENT=development

# Real backend
REACT_APP_API_URL=https://your-api.com/api
REACT_APP_MOCK_API=false
```

## Notes

- Mock mode is enabled by default for demo purposes.
- Data is persisted in localStorage in demo mode.
- To use a real backend set `REACT_APP_MOCK_API=false` and update `REACT_APP_API_URL`.

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m "Add feature"`)
4. Push and open a Pull Request

## License

MIT License

## Links

- Live Demo: https://your-app-url.vercel.app
- Deployment Guide: `DEPLOYMENT.md`
- Issues: GitHub Issues

## Thanks

- Vercel, React, Tailwind CSS
