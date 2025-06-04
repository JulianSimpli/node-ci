# NodeJS Concepts

A starter project for mastering advanced Node.js concepts.

## Table of Contents

- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Development Workflow](#development-workflow)
- [Authentication, Database & Caching](#authentication-database--caching)
- [API Endpoints](#api-endpoints)
- [Client Application](#client-application)
- [Continuous Integration](#continuous-integration)
- [Common Issues](#common-issues)

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

## Development Workflow

1. Visit `/blogs` to access the blog feature.
2. The React app loads and requests user and blog data from the backend.
3. Express route handlers process requests and interact with MongoDB via Mongoose and Redis for caching.
4. Data is returned to the React app for rendering.

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

- CI is set up with Travis CI.
- On each push or pull request, Travis runs tests and checks code quality.
- See `.travis.yml` for configuration details.
