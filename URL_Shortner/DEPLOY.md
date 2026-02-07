# Deployment Guide

## 1. Environment Setup
Ensure you have a MongoDB database ready. You can get a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas).

## 2. Option A: Vercel (Recommended for Serverless)
This project is configured to run on Vercel as a Serverless Function.

1.  **Install Vercel CLI** (optional, or connect via GitHub):
    ```bash
    npm i -g vercel
    ```
2.  **Deploy**:
    ```bash
    vercel
    ```
3.  **Environment Variables**:
    Go to your Vercel Project Settings > Environment Variables and add:
    *   `MONGODB_URI`: Your MongoDB connection string (e.g., `mongodb+srv://...`)
    *   `BASE_URL`: The domain Vercel assigns you (e.g., `https://your-project.vercel.app`)

**Note:** The `vercel.json` is configured to route all traffic to `api/index.js` using rewrites.

## 3. Option B: Render (Alternative for Persistent Server)
If you prefer a traditional server approach or if Vercel limits are restrictive:

1.  Create a new **Web Service** on [Render](https://render.com).
2.  Connect your repository.
3.  **Build Command**: `npm install`
4.  **Start Command**: `npm start`
5.  **Environment Variables**:
    Add `MONGODB_URI` and `BASE_URL` in the Render dashboard.

## 4. Local Development
1.  Create `.env` file (see `.env.example`).
2.  Run `npm run dev`.
