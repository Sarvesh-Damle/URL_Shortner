# Project: URL Shortener (Optimized)

## Project Overview

This is a production-ready URL shortener service built with Node.js and Express. It uses MongoDB as its database with Mongoose as the ODM. The front-end is rendered using EJS templates. The architecture follows a Model-View-Controller (MVC) pattern, now optimized for security and serverless deployment.

### Key Technologies

*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB, Mongoose
*   **Templating:** EJS
*   **Security:** Helmet, CORS
*   **Environment Management:** Dotenv
*   **Deployment:** Vercel (Serverless) / Render (Persistent)

### Architecture

*   `api/index.js`: The main entry point. Configures middleware (Helmet, CORS), handles environment variables, and exports the app for Vercel. Moved to `api/` for better Vercel compatibility.
*   `connect.js`: Database connection utility.
*   `models/url.js`: Mongoose schema for the URL model.
*   `controllers/url.js`: Logic for generating IDs, handling redirects with click tracking, and providing analytics.
*   `routes/url.js`: Defines API and View routes.
*   `views/home.ejs`: Refactored EJS template with dynamic URL construction and error handling.
*   `vercel.json`: Configuration for Vercel Serverless Functions.

## Building and Running

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Configuration:**
    Copy `.env.example` to `.env` and provide your `MONGODB_URI` and `BASE_URL`.

3.  **Run Development Mode:**
    ```bash
    npm run dev
    ```

4.  **Run Production Mode:**
    ```bash
    npm start
    ```

## Production Best Practices Implemented

*   **Environment Variables:** Sensitive data and configuration are managed via `.env`.
*   **Security Headers:** `helmet` middleware added to set various HTTP headers for security.
*   **CORS:** Cross-Origin Resource Sharing enabled.
*   **Error Handling:** Controllers now handle 404s and database errors gracefully.
*   **Modular Scripts:** Separate `start` and `dev` scripts in `package.json`.
*   **Global Context:** `BASE_URL` is passed to views globally for consistent link generation.
*   **Deployment Readiness:** Specialized `vercel.json` and `DEPLOY.md` documentation added.

## Development Conventions

*   The project uses `nanoid` (v3) for short ID generation.
*   Model imports are aliased (e.g., `URLModel`) to avoid naming conflicts with global Web APIs.
*   Follows standard MVC structure.