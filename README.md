# SecureSight — Fullstack Developer Intern Technical Assessment (July '25)

SecureSight is a fictional CCTV monitoring software. This assessment focuses on building a dashboard interface to monitor and resolve security incidents.

## 🔧 Tech Stack

- **Frontend**: Next.js 15 (App Router), Tailwind CSS
- **Backend**: API Routes with Next.js
- **ORM**: Prisma
- **Database**: SQLite (local) / Postgres (optional for production)
- **Deployment**: Vercel

---
## screenshot
<img width="1536" height="1024" alt="secure screenshot" src="https://github.com/user-attachments/assets/4154f001-bf26-47c1-9a7d-7b972633a921" />


## 🖼 Features

### ✅ Mandatory Features
- **Navbar** (in progress or omitted as design had no actions)
- **Incident Player** (static frame + camera thumbnails)
- **Incident List**:
  - Shows thumbnails, type icon, camera location, time range
  - Resolve button with optimistic UI and auto-refresh

### 🧪 API Endpoints

| Method | Endpoint                         | Description                    |
|--------|----------------------------------|--------------------------------|
| GET    | `/api/incidents?resolved=false` | Fetch unresolved incidents     |
| PATCH  | `/api/incidents/:id/resolve`    | Toggle resolved status         |

---

## 📦 Local Setup

```bash
git clone https://github.com/yourusername/securesight-dashboard.git
cd securesight-dashboard
npm install
```
Setup DB and seed data:
```
npx prisma db push
npx prisma db seed
```
Run the development server:
```
npm run dev
Visit http://localhost:3000
```
🛢 Database Models
Camera
id: Int

name: String

location: String

Incident
id: Int

cameraId: FK → Camera

type: String

tsStart: DateTime

tsEnd: DateTime

thumbnailUrl: String

resolved: Boolean

🌐 Deployment Instructions
Push to GitHub

Deploy to Vercel from GitHub repo

Set any environment variables if switching to hosted DB (e.g., PostgreSQL)

🧠 If I Had More Time...
Add Interactive Timeline below video using SVG

Implement Navbar filter/sort features

Add 3D View route using React Three Fiber

Add video player and timeline sync

Add user auth and role-based access
```
📁 Folder Structure
bash
Copy
Edit
/app
  /api
    /incidents
      route.ts              ← GET /incidents
      [id]/resolve/route.ts ← PATCH /incidents/:id/resolve
  page.tsx                  ← Main UI

/prisma
  schema.prisma             ← DB models
  seed.ts                   ← Data seeding
/public
  thumb1.jpg ... thumb5.jpg ← Placeholder thumbnails
```

👤 Author
Jitendra Kumar

GitHub Profile

