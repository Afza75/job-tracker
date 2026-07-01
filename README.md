# 📋 Job Application Tracker

A full-stack web application to track your job applications in one place. Built with the MERN stack (MongoDB, Express, React, Node.js).

## 🔗 Live Demo
[https://job-tracker-afza2.vercel.app](https://job-tracker-afza2.vercel.app)

## ✨ Features
- User authentication (signup/login) with JWT tokens and bcrypt password hashing
- Each user sees only their own applications — fully isolated data
- Add, update, and delete job applications
- Track application status: Applied → Interview → Offer → Rejected
- Dashboard with real-time stats (total, interviews, offers, rejected, response rate)
- Filter applications by status
- Data persists permanently in MongoDB

## 🛠️ Tech Stack
**Frontend**
- React (Vite)
- JavaScript (ES6+)
- CSS3

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs

**Deployment**
- Frontend: Vercel
- Backend: Back4app (Docker container)
- Database: MongoDB Atlas

## 🚀 Running Locally

**Prerequisites:** Node.js, MongoDB Atlas account

**Backend:**
```bash
cd job-tracker-backend
npm install
```
Create a `.env` file:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```
```bash
node server.js
```

**Frontend:**
```bash
npm install
```
Create a `.env` file:
```
VITE_API_URL=http://localhost:5000
```
```bash
npm run dev
```

## 📁 Project Structure
```
job-tracker/
├── src/                  # React frontend
│   ├── components/       # Reusable components
│   │   ├── AuthPage.jsx      # Login/signup
│   │   ├── Navbar.jsx        # Navigation bar
│   │   ├── Dashboard.jsx     # Stats overview
│   │   ├── AddApplicationForm.jsx
│   │   ├── ApplicationList.jsx
│   │   └── FilterBar.jsx
│   └── App.jsx           # Main app, state management
├── job-tracker-backend/  # Express backend
│   ├── models/           # Mongoose schemas
│   │   ├── User.js
│   │   └── Application.js
│   ├── middleware/       # Auth middleware
│   │   └── auth.js
│   └── server.js         # Express server, API routes
└── README.md
```