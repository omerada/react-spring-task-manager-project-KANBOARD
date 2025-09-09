# Kanboard — Vercel Deployment Guide

This project is configured for deployment on Vercel and includes a mock backend implemented as Vercel serverless functions for demo and testing.

## 🚀 Deploying to Vercel

### 1. Push to GitHub

```powershell
# Ensure your changes are committed and pushed to the branch you want to deploy (typically `main`)
git add .
git commit -m "Add Vercel deployment configuration with mock backend"
git push origin main
```

This guide explains how to deploy the `kanboard-frontend` to Vercel. The frontend ships with a mock backend implemented as Vercel serverless functions for demo and testing.

## Prerequisites

- A GitHub repository containing the project
- A Vercel account linked to your GitHub
- Node.js 18+ (for local development and builds)

## 1. Push changes to GitHub

Ensure your branch (typically `main`) has the latest changes:

```powershell
git add .
git commit -m "Add Vercel deployment configuration with mock backend"
git push origin main
```

## 2. Import the project into Vercel

1. Sign in to Vercel and click "New Project".
2. Select the GitHub repository.
3. Configure the project settings:
   - Framework Preset: Create React App
   - Root Directory: `kanboard-frontend`
   - Build Command: `npm run vercel-build`
   - Output Directory: `build`

## 3. Environment variables

Add these variables in the Vercel project settings:

```
REACT_APP_API_URL=/api
REACT_APP_MOCK_API=true
REACT_APP_ENVIRONMENT=production
```

When deploying against a real backend, set:

```
REACT_APP_MOCK_API=false
REACT_APP_API_URL=https://your-backend-api.com/api
```

## 4. Demo credentials (demo mode)

The app runs in demo mode by default. Example demo accounts:

- Admin: `admin` / `admin123`
- Demo: `demo` / `demo123`

# Kanboard — Vercel Deployment Guide

This guide explains how to deploy the `kanboard-frontend` to Vercel. The frontend includes a mock backend implemented as Vercel serverless functions for demo and testing.

## Prerequisites

- A GitHub repository containing the project
- A Vercel account linked to your GitHub
- Node.js 18+ installed locally (for development and builds)

## 1 — Push changes to GitHub

Ensure your branch (typically `main`) contains the latest changes:

```powershell
git add .
git commit -m "Add Vercel deployment configuration with mock backend"
git push origin main
```

## 2 — Import the project into Vercel

1. Sign in to Vercel and click "New Project".
2. Select your GitHub repository.
3. Configure project settings:
   - Framework Preset: Create React App
   - Root Directory: `kanboard-frontend`
   - Build Command: `npm run vercel-build`
   - Output Directory: `build`

## 3 — Environment variables

Add the following environment variables in the Vercel project settings:

```text
REACT_APP_API_URL=/api
REACT_APP_MOCK_API=true
REACT_APP_ENVIRONMENT=production
```

When deploying to a real backend, set:

```text
REACT_APP_MOCK_API=false
REACT_APP_API_URL=https://your-backend-api.com/api
```

## 4 — Demo credentials (demo mode)

The app runs in demo mode by default. Example demo accounts:

- Admin: `admin` / `admin123`
- Demo: `demo` / `demo123`

## Mock API features (serverless functions)

- Authentication simulation (JWT)
- Board and task CRUD operations
- Drag & drop support
- Network delay simulation
- Data persistence via localStorage (demo-only)

## Project layout (frontend)

```
kanboard-frontend/
├─ api/               # Vercel serverless functions (mock API)
│  ├─ auth/
│  └─ boards/
├─ src/
│  ├─ components/
│  ├─ mocks/
│  ├─ services/
│  └─ utils/
└─ vercel.json
```

## 2 — Import the project into Vercel

1. Sign in to Vercel and click "New Project".
2. Select the GitHub repository.
3. Configure project settings:
   - Framework Preset: Create React App
   - Root Directory: `kanboard-frontend`
   - Build Command: `npm run vercel-build`
   - Output Directory: `build`

## 3 — Environment variables

Add the following environment variables in the Vercel project settings:

```text
REACT_APP_API_URL=/api
REACT_APP_MOCK_API=true
REACT_APP_ENVIRONMENT=production
```

When deploying to a real backend, set:

```text
REACT_APP_MOCK_API=false
REACT_APP_API_URL=https://your-backend-api.com/api
```

## 4 — Demo credentials (demo mode)

The app runs in demo mode by default. Example demo accounts:

- Admin: `admin` / `admin123`
- Demo: `demo` / `demo123`

## Mock API features (serverless functions)

- Authentication simulation (JWT)
- Board and task CRUD operations
- Drag & drop support
- Network delay simulation
- Data persistence via localStorage (demo-only)

## Project layout (frontend)

```
kanboard-frontend/
├─ api/               # Vercel serverless functions (mock API)
│  ├─ auth/
│  └─ boards/
├─ src/
│  ├─ components/
│  ├─ mocks/
│  ├─ services/
│  └─ utils/
└─ vercel.json
```

## Local development

```powershell
cd kanboard-frontend
npm install
npm start
```

To build and preview a production bundle locally:

```powershell
npm run build
npm run preview
```

## Notes

- The mock API is intended for demo and local testing and uses localStorage for persistence.
- To use a real backend in production set `REACT_APP_MOCK_API=false` and update `REACT_APP_API_URL`.

## Troubleshooting

- Build fails: ensure Node.js 18+ and that you run commands from the `kanboard-frontend` directory.
- Environment variables not applied: confirm they are configured for the correct Vercel environment (Preview vs Production).

## Quick checklist before deploying

- [ ] Push latest code to GitHub
- [ ] Add required environment variables in Vercel
- [ ] Confirm Root Directory = `kanboard-frontend`
- [ ] Trigger a deploy and inspect the build logs in Vercel
