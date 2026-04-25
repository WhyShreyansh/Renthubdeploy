# Deployment Guide — Render (Backend) + Vercel (Frontend)

## 1. MongoDB Atlas
1. Create a free cluster at https://cloud.mongodb.com
2. Create a database user and copy the connection string:
   `mongodb+srv://<user>:<pass>@cluster.mongodb.net/rentalapp`
3. In **Network Access**, allow `0.0.0.0/0` (Render uses dynamic IPs)

---

## 2. Deploy Backend on Render

1. Push this repo to GitHub
2. Go to https://render.com → **New → Web Service**
3. Connect your GitHub repo, set **Root Directory** to `backend`
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Add these **Environment Variables** in the Render dashboard:

   | Key            | Value                                              |
   |----------------|----------------------------------------------------|
   | `MONGO_URI`    | `mongodb+srv://...` (from Atlas)                   |
   | `JWT_SECRET`   | Any long random string (e.g. 64 random chars)      |
   | `FRONTEND_URL` | Your Vercel URL — add this **after** step 3 below  |

6. Click **Deploy** — note your backend URL, e.g.:
   `https://rental-app-backend.onrender.com`

---

## 3. Configure & Deploy Frontend on Vercel

### Step A — Set your backend URL
Open `frontend/js/config.js` and replace the placeholder:
```js
window.BACKEND_URL = 'REPLACE_WITH_RENDER_BACKEND_URL';
// → becomes:
window.BACKEND_URL = 'https://rental-app-backend.onrender.com';
```

### Step B — Deploy to Vercel
1. Go to https://vercel.com → **New Project**
2. Import your GitHub repo, set **Root Directory** to `frontend`
3. Framework preset: **Other** (it's plain HTML/JS)
4. Click **Deploy** — note your Vercel URL, e.g.:
   `https://rental-app.vercel.app`

### Step C — Update CORS on Render
Go back to Render → your backend service → **Environment** and set:
```
FRONTEND_URL = https://rental-app.vercel.app
```
Then click **Save** (Render redeploys automatically).

---

## Local Development
```bash
# Backend
cd backend
cp .env.example .env   # fill in your values
npm install
npm run dev            # runs on http://localhost:5000

# Frontend — just open index.html via Live Server (port 5500)
# config.js auto-detects localhost and points to http://localhost:5000
```

## Files changed for deployment
| File | What changed |
|------|-------------|
| `backend/server.js` | CORS now uses `FRONTEND_URL` env var + allows `*.vercel.app` |
| `backend/.env.example` | Template for Render env vars |
| `render.yaml` | Render deploy config |
| `frontend/js/config.js` | **New** — sets `window.BACKEND_URL` per environment |
| `frontend/js/api.js` | Uses `window.BACKEND_URL` instead of hardcoded localhost |
| `frontend/js/auth.js` | Avatar URL uses `window.BACKEND_URL` |
| `frontend/index.html` + pages | Loads `config.js` before `api.js` |
| `frontend/vercel.json` | **New** — SPA routing for Vercel |
