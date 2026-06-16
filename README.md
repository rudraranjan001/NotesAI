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

## Roadmap

- Improve note search and filtering
- Add better note editor UI
- Add AI note summarization
- Add RAG question-answering over notes
- Add charts with Recharts
- Add visual note connections with React Flow
- Add deployment
- Add Docker later
