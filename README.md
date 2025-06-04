# NodeJS Concepts

A starter project for mastering advanced Node.js concepts.

## Table of Contents

- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Authentication, Database & Caching](#authentication-database--caching)
- [API Endpoints](#api-endpoints)
- [Client Application](#client-application)
- [Continuous Integration](#continuous-integration)

## Project Structure

- **/client**: React frontend application
- **/models**: Mongoose models for MongoDB
- **/routes**: Express route handlers
- **/services**: Passport, authentication, Redis cache, and other backend services
- **/config**: Configuration files (e.g., dev.js for credentials)
- **/middlewares**: Custom Express middlewares
- **server.js**: Main entry point for the backend server

## Setup Instructions

1. Run `npm install` in the root directory to install server dependencies.
2. Change into the `/client` directory and run `npm install --legacy-peer-deps` to install frontend dependencies.
3. Ensure Redis is running locally or update your configuration for a remote Redis instance.
4. Return to the root and run `npm run dev` to start both the server and client.
5. Open `http://localhost:3000` in your browser.

## Authentication, Database & Caching

- Uses Passport.js for authentication (Google OAuth).
- MongoDB Atlas is used for data storage.
- Redis is used to cache frequently accessed data and improve performance.
- Default credentials in `config/dev.js` are read-only. To enable full functionality, add your own MongoDB and Redis connection strings.

## API Endpoints

- `GET /api/current_user`: Get current authenticated user
- `GET /api/blogs`: Fetch all blogs for the user (uses Redis cache)
- `POST /api/blogs`: Create a new blog (requires authentication)
- Additional endpoints for authentication and logout

## Client Application

- Built with React and Redux
- Handles authentication, blog creation, and listing

## Continuous Integration

- CI is now set up with **GitHub Actions** (see `.github/workflows/deploy.yml` for configuration).
- Travis CI is deprecated and no longer used (`.travis.yml` file).
- On each push or pull request, GitHub Actions runs tests and checks code quality.
