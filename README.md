# Notes App — Backend API (Node.js + Express)

![License](https://img.shields.io/github/license/vipulsawant8/notes-app-backend)
![Node](https://img.shields.io/badge/node-%3E%3D18.x-brightgreen)
![Express](https://img.shields.io/badge/express-5.x-black)
![MongoDB](https://img.shields.io/badge/mongodb-database-green)
![Render](https://img.shields.io/badge/render-deployed-success?logo=render&logoColor=white)

**Live API (Render):** https://notes-app-backend-prbr.onrender.com

Backend service for the Notes application, built with Node.js, Express, and MongoDB.

This API provides authentication, authorization, and notes persistence using a cookie-based session model with access and refresh token rotation.  
Designed to integrate with a separately deployed React + Redux frontend.

## Architecture Overview

The backend follows a modular Express architecture with clear separation of concerns:

- Routing → endpoint definitions
- Controllers → request handling and response shaping
- Middleware → authentication and centralized error handling
- Models → data schemas and business rules
- Utilities → shared helpers and abstractions

All endpoints are versioned under `/api/v1`.  
All security-sensitive logic (tokens, cookies, session validation) is handled exclusively on the server.

## Authentication & Session Strategy

This backend implements **cookie-based authentication with refresh token rotation**.

### Key characteristics

- Access and refresh tokens are issued by the server
- Tokens are stored in **HTTP-only cookies**
- Tokens are never exposed to frontend JavaScript
- Refresh tokens are **persisted in the database**
- Refresh tokens are **rotated on every successful refresh**
- Sessions are tracked per device using a client-generated `deviceId`

### Session Lifecycle

1.  User logs in with credentials and a `deviceId`
2. Server issues:
	- Short-lived access token
	- Long-lived refresh token
3. Tokens are set as HTTP-only cookies
4. Protected routes validate the access token
5. When access token expires:
	- Client calls `/auth/refresh-token`
	- Server validates and rotates refresh token
	- New cookies are issued
6. On logout:
	- Refresh token for that device is removed from the database
	- Cookies are cleared

If refresh validation fails, **the session is invalidated** and the user must re-authenticate.

## API Design Principles

- Stateless access tokens
- Refresh token rotation to prevent replay attacks
- Centralized error handling
- No token storage on the client
- Minimal surface area for authentication logic

## Project Structure

```bash
src
├── app.js
├── constants
│   └── cookieOptions.js
├── controllers
│   ├── auth.controller.js
│   └── note.controller.js
├── db
│   └── connectDB.js
├── loadEnv.js
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
│   └── note.routes.js
├── server.js
└── utils
	└── ApiError.js
```

## Folder responsibilities

- controllers/ – business logic and response formatting
- routes/ – endpoint definitions and middleware wiring
- middlewares/ – authentication guards and error handling
- models/ – MongoDB schemas and data rules
- constants/ – shared configuration (cookie options)
- utils/ – reusable helpers and abstractions

## Authentication Middleware

Protected routes use a dedicated authentication middleware:

- Reads access token from HTTP-only cookies
- Verifies token signature and expiration
- Fetches user from database
- Attaches user to req.user

Refresh logic is intentionally not handled in middleware and remains centralized in the refresh endpoint.

## Error Handling

All errors are handled by a single centralized error handler.

Handled cases include:

- MongoDB duplicate key errors
- Mongoose validation errors
- Invalid ObjectId errors
- JWT verification errors
- Malformed JSON payloads
- Custom ApiError instances

Error responses are sanitized in production to avoid leaking internal details.

## Notes API Behavior

- Notes are user-scoped (ownership enforced server-side)
- Supports create, read, update, delete
- Pagination supported
- Notes are sorted by:
  1. Pinned notes first
  2. Most recently updated

All validation and authorization checks are enforced by the backend.

## Environment Configuration

Environment variables are managed using **dotenv-flow**, allowing environment-specific and local overrides.

Only an example file is committed:

```bash
.env.example
```

Required environment variables include:

- PORT
- NODE_ENV
- MONGO_URI
- ACCESS_TOKEN_SECRET
- REFRESH_TOKEN_SECRET
- CORS_ORIGIN
- ACCESS_TOKEN_EXPIRY
- REFRESH_TOKEN_EXPIRY

All secrets are managed server-side.  
JWT expiration is configured via environment variables, while cookie lifetimes are defined in code to ensure consistent browser behavior.

## Frontend Integration

This backend is consumed by a separately deployed frontend.

- Frontend Repository: https://github.com/vipulsawant8/notes-app-frontend
- Frontend Stack: React, Redux Toolkit, Axios
- Auth Integration: Cookie-based authentication with refresh token rotation

The frontend does not manage tokens and relies entirely on server-side session handling.

## Security Considerations

- Tokens stored only in HTTP-only cookies
- Refresh tokens rotated on every use
- Logout invalidates refresh token in database
- No sensitive data returned in API responses
- Error messages sanitized in production

This backend is intended for portfolio and demo usage, not high-risk production systems.

## Getting Started (Local Development)

1. Clone the repository
2. Install dependencies
```bash
npm install
```
3. Create an environment file
```bash
cp .env.example .env.development
```
4. Start the server
```bash
npm run dev
```
The API will be available at:
```bash
http://localhost:<PORT>/api/v1
```

## License

This project is licensed under the MIT License.
