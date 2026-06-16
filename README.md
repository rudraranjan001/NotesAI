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
