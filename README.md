# NDRise Technologies Workspace

This repository contains both the frontend and backend applications for NDRise Technologies.

## Repository Structure

```
ndrise-technologies/
├── ndrise-frontend/    # React (Vite) Frontend Application
└── ndrise-backend/     # Node.js Express & Prisma Backend API
```

## Getting Started

### 1. Frontend Setup (`ndrise-frontend`)
```bash
cd ndrise-frontend
npm install
npm run dev
```

### 2. Backend Setup (`ndrise-backend`)
```bash
cd ndrise-backend
npm install
# Copy example env file and update credentials
cp .env.example .env
# Run Prisma migrations & start dev server
npx prisma db push
npm run dev
```
