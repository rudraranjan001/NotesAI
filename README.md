# NotesAI

NotesAI is a full-stack note-taking app with Firebase Google authentication and private user notes.

## Tech Stack

- Frontend: React, TypeScript, Vite
- Backend: Node.js, Express, TypeScript
- Database: MongoDB Atlas, Mongoose
- Auth: Firebase Google Authentication
- CI: GitHub Actions

## Features

- Create, read, update, and delete notes
- Google login with Firebase Authentication
- Protected frontend routes
- Authenticated API requests using Firebase ID tokens
- Private notes per user
- Backend route protection with Firebase Admin
- CI workflow that builds frontend and backend

## Routes

Frontend routes:

- `/`
- `/login`
- `/dashboard`
- `/notes`
- `/notes/:id`

Backend routes:

- `GET /api/health`
- `GET /api/notes`
- `POST /api/notes`
- `GET /api/notes/:id`
- `PUT /api/notes/:id`
- `DELETE /api/notes/:id`

## Environment Variables

Backend:

```env
PORT=
MONGODB_URI=
CLIENT_URLS=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
GEMINI_API_KEY=
GEMINI_MODEL=
GEMINI_FALLBACK_MODEL=
```

Frontend:

```env
VITE_API_URL=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Firebase Admin:

```txt
backend/src/config/serviceAccountKey.json
```

This file is required locally but is ignored by Git for security.


## Run Locally

Install backend dependencies:

```bash
cd backend
npm install
```

Start backend:

```bash
npm run dev
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

Start frontend:

```bash
npm run dev
```

## CI

This project uses GitHub Actions.

The CI workflow runs on:

- push
- pull request

It checks:

- backend install
- backend TypeScript build
- frontend install
- frontend production build

## Deployment

This repo includes deployment config for common static/frontend and Node backend hosts.

Frontend:

- Vercel from repo root: use `vercel.json`.
- Vercel from `frontend/`: use `frontend/vercel.json`.
- Netlify/static hosts: `frontend/public/_redirects` handles React Router refreshes.
- Build command: `npm ci && npm run build`
- Publish directory from `frontend/`: `dist`
- Publish directory from repo root: `frontend/dist`

Backend:

- Render blueprint: `render.yaml`
- Build command: `npm ci && npm run build`
- Start command: `npm start`
- Health check: `/api/health`

Production env notes:

- Set `VITE_API_URL` to the deployed backend API base, for example `https://your-backend.onrender.com/api`.
- Set `CLIENT_URLS` on the backend to the deployed frontend origin. Use comma-separated values for multiple origins.
- Store `FIREBASE_PRIVATE_KEY` with escaped newlines (`\n`) if your host requires single-line env values.
- The backend defaults to `gemini-3.1-flash-lite` for generation and falls back to `gemini-2.5-flash`. Override with `GEMINI_MODEL` and `GEMINI_FALLBACK_MODEL` if needed.

## Roadmap

- Improve note search and filtering
- Add better note editor UI
- Add AI note summarization
- Add RAG question-answering over notes
- Add charts with Recharts
- Add visual note connections with React Flow
- Add deployment
- Add Docker later
