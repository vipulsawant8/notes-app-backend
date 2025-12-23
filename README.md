# Notes App — Backend (Node.js + Express + MongoDB)

![Render Deployment](https://img.shields.io/badge/render-deployed-success?logo=render&logoColor=white)
![License](https://img.shields.io/github/license/vipulsawant8/notes-app-backend)

Backend API for the **Notes application**, built using **Node.js**, **Express**, and **MongoDB**.

This service handles **authentication**, **authorization**, and **notes management**, and is designed to work with a separately deployed React + Redux frontend.

Built to demonstrate **real-world backend architecture**, secure auth patterns, and clean API design suitable for **portfolio and interview review**.

---

## Live API

- **Backend Base URL:** https://notes-app-rha3.onrender.com
- **Frontend Repository:** https://github.com/vipulsawant8/notes-app-frontend
- **Live Frontend:** https://notes-app-pi-mauve.vercel.app

---

## Features

- User authentication (register / login / logout)
- JWT-based access & refresh tokens
- HTTP-only cookie handling
- Protected routes via middleware
- Notes CRUD operations
- Pagination support
- Pin / unpin notes
- Sorted responses (pinned first, latest updated)
- Centralized error handling
- Environment-based configuration
- Production-ready project structure

---

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cookie-based sessions
- ESLint

---

## Demo Account (For Reviewers)

- **Email:** demo.user@notes.test
- **Password:** Demo@1234

All notes are **fictional test data** (pop-culture inspired).
No real user data is stored.

---

## Environment Setup

```bash
cp .env.example .env
```

### Example `.env`

```env
PORT=5000
NODE_ENV=development

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CORS_ORIGIN=your_frontend_url
```

---

## Running Locally

```bash
npm install
npm run dev
```

---

## License

MIT
