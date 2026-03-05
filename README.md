# Notes App Backend

Secure RESTful backend for a Notes Management application built with **Node.js, Express, and MongoDB**.
The system implements **cookie-based JWT authentication with refresh token rotation**, email verification, password reset functionality, rate limiting, and structured request validation.

# Core Features

* Versioned REST API (`/api/v1`)
* Cookie-based JWT authentication
* Refresh token rotation with database persistence
* Email verification via token system
* Secure password reset flow
* Route-level rate limiting
* Request validation using **Zod**
* Automatic token cleanup using **MongoDB TTL indexes**
* Centralized error handling middleware

# Authentication System

The authentication architecture is designed to be **secure and session-aware**.

Features include:

* Short-lived **Access Tokens**
* Long-lived **Refresh Tokens**
* Refresh tokens stored **hashed in the database**
* **Refresh token rotation** on every refresh request
* **Device-scoped sessions** for improved security
* Tokens delivered through **HTTP-only cookies**
* Logout invalidates the stored refresh token

Authentication Flow:

1. User logs in
2. Server issues:

   * Access Token
   * Refresh Token
3. Access token authenticates API requests
4. When expired, refresh token generates a new access token
5. Refresh token is rotated and previous token becomes invalid

# Notes System

Authenticated users can perform full CRUD operations on notes.

Supported operations:

* Create notes
* Retrieve notes
* Update notes
* Delete notes

Security rules:

* Every note is linked to a **user ID**
* Access control ensures users can only manage **their own notes**
* All request payloads validated using **Zod schemas**

# Security Features

The backend implements several security best practices:

* HTTP-only cookies for token storage
* Secure cookie flag enabled in production
* Route-level rate limiting for sensitive endpoints
* Refresh tokens stored **hashed** in the database
* Centralized error handling
* Strict input validation
* Email verification before full account activation

# Environment Variables

Required environment variables:

```
PORT=

DB_CONNECT_STRING=

ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_EXPIRY=

CORS_ORIGIN=
CLIENT_URL=

EMAIL_USER=
BREVO_API_KEY=
```

# Local Development

Install dependencies:

```
npm install
```

Create a `.env` file with the required environment variables.

Start development server:

```
npm run dev
```

The server will run on the configured `PORT`.

# License

MIT License