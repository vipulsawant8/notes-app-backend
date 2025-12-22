# Notes API — CRUD with Pagination (Backend)

Backend API for a **Notes application** built with **Node.js**, **Express**, and **MongoDB**.  
Supports full CRUD operations on notes with **pagination**, **pinning**, and
sorting by latest updates.

Designed to demonstrate clean backend architecture, authentication middleware,
and real-world data querying patterns.

---

## Features

### Authentication
- User registration and login
- Cookie-based authentication
- Protected routes using middleware

### Notes (CRUD)
- Create, read, update, delete notes
- Pin / unpin notes
- Pagination support
- Sorted results:
  - `pinned: 1` (pinned notes first)
  - `updatedAt: -1` (latest updated notes first)

### Architecture Highlights
- Modular route & controller structure
- Centralized error handling
- Environment-based configuration
- Clean separation of concerns

---

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- Cookie-parser
- dotenv
- REST API

---

## Folder Structure
```
src
├── controllers
│   ├── auth.controller.js
│   └── note.controller.js
├── db
│   └── connectDB.js
├── middlewares
│   ├── auth
│   │   └── verifyLogin.js
│   └── error
│       └── errorHandler.middleware.js
├── models
│   ├── notes.model.js
│   └── user.model.js
├── routes
│   ├── auth.routes.js
│   └── note.route.js
├── constants
│   └── setCookieOptions.js
├── utils
│   └── ApiError.js
├── app.js
└── server.js
```

---

## Pagination & Sorting Logic

Notes are returned using the following priority:

1. **Pinned notes first**
2. **Most recently updated notes next**

MongoDB query pattern:

```js
.sort({ pinned: -1, updatedAt: -1 })
```

Pagination is handled using `page` and `limit` query parameters.

---

## Setup

### Install dependencies
```bash
npm install
```

### Environment Variables

Create a `.env` file using the provided example:

```bash
cp .env.example .env
```

Required variables:

```env
PORT=4000
DB_CONNECT_STRING=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
```

> `.env` is ignored by Git. Never commit secrets.

---

## Run Server

```bash
npm run dev
```

---

## Notes for Reviewers

This project is built for demonstration and interview purposes.  
All data is test data and may be reset periodically.
