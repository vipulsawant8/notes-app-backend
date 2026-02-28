# Notes App Backend

Secure RESTful backend for a Notes Management Application built with
Express, MongoDB, and JWT authentication.

Implements cookie-based authentication with refresh token rotation,
email verification, rate limiting, and input validation.



# Core Features

-   Versioned REST API (/api/v1)
-   Cookie-based JWT authentication
-   Refresh token rotation (hashed + DB persisted)
-   Email verification via token
-   Password reset flow
-   Route-level rate limiting
-   Zod request validation
-   MongoDB TTL cleanup for tokens
-   Centralized error handling



# Project Structure

    src/
    ├── app.js
    ├── loadEnv.js
    ├── server.js
    ├── constants/
    ├── controllers/
    ├── db/
    ├── middlewares/
    ├── models/
    ├── routes/
    ├── utils/
    └── validations/



# Authentication System

-   Access tokens (short-lived)
-   Refresh tokens (long-lived, hashed in DB)
-   Device-scoped sessions
-   HTTP-only cookies
-   Refresh token rotation on every use
-   Logout invalidates refresh token



# Notes System

-   Authenticated users can:
    -   Create notes
    -   Update notes
    -   Delete notes
    -   Fetch notes
-   Ownership enforced via userID checks
-   Validation enforced via Zod schemas



# Security Features

-   HTTP-only cookies
-   Secure flag enabled in production
-   Rate limiting per sensitive route
-   Hashed refresh tokens
-   Centralized error handling
-   Input validation middleware



# Environment Variables

Required:

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

npm install Create .env file npm run dev

Server runs on configured PORT.



# License

MIT License
