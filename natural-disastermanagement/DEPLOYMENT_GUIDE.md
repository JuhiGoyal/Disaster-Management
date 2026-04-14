# Deployment Guide: ResQNet

This guide provides step-by-step instructions for deploying the project to production.

## 1. Prerequisites
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account.
- [Vercel](https://vercel.com) (Frontend) and [Render](https://render.com) (Backend) accounts.

## 2. Database Setup (MongoDB Atlas)
1.  **Create Cluster:** Deploy a free tier cluster.
2.  **Network Access:** Add IP `0.0.0.0/0` (Allow access from anywhere).
3.  **Database Access:** Create a user with read/write permissions.
4.  **Connection URI:** Copy the connection string (it looks like `mongodb+srv://<user>:<pass>@cluster.mongodb.net/disaster_db`).

## 3. Backend Deployment (Render)
1.  **New Web Service:** Connect your GitHub repository.
2.  **Root Directory:** `backend` (or leave empty if using the root `Procfile`).
3.  **Build Command:** `npm install`
4.  **Start Command:** `npm start`
5.  **Environment Variables:**
    - `MONGODB_URI`: Your Atlas URI.
    - `JWT_SECRET`: A long random string.
    - `FRONTEND_URL`: `https://your-app.vercel.app` (Add after frontend is deployed).
    - `NODE_ENV`: `production`
    - `PORT`: `10000` (Render's default).

## 4. Frontend Deployment (Vercel)
1.  **New Project:** Select the `frontend` directory from your repository.
2.  **Framework Preset:** `Create React App`.
3.  **Build Command:** `npm run build`
4.  **Output Directory:** `build`
5.  **Environment Variables:**
    - `REACT_APP_API_URL`: `https://your-backend.onrender.com`

## 5. Common Errors & Fixes
- **CORS Error:** Ensure `FRONTEND_URL` in the backend matches the Vercel URL exactly (no trailing slash).
- **MongoDB Connection Timeout:** Ensure your Atlas network whitelist includes `0.0.0.0/0`.
- **401 Unauthorized:** Ensure the `token` is correctly stored in `localStorage` on the frontend.

## 6. Professional Checklist
- [ ] No `console.log` in production files.
- [ ] SSL certificates active (handled by Vercel/Render).
- [ ] Custom domain linked (Optional).
- [ ] Error boundary implemented in React.

---
*Created by Antigravity Senior Product Engineer.*
