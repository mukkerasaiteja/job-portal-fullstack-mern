# JobRadar 🎯

A modern, full-stack job portal application that connects job seekers with recruiters. Built with the MERN stack.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://job-radar.vercel.app)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css)

## ✨ Features

### For Job Seekers

- 🔍 **Smart Job Search** — Advanced filters (location, salary, job type)
- 📝 **One-Click Apply** — Seamless job applications
- 👤 **Profile Builder** — Create professional profiles with resume upload
- 📊 **Application Tracker** — Monitor all applications in one dashboard
- 🌙 **Dark/Light Mode** — Eye-friendly viewing experience

### For Recruiters

- 🏢 **Company Profiles** — Create and manage company pages
- 📋 **Job Management** — Post, edit, and manage job listings
- 👥 **Applicant Dashboard** — Review and manage candidates
- ✅ **Quick Actions** — Accept or reject applications instantly

## 🛠️ Tech Stack

| Frontend      | Backend    | Database | Cloud      |
| ------------- | ---------- | -------- | ---------- |
| React 18      | Node.js    | MongoDB  | Vercel     |
| Redux Toolkit | Express.js | Mongoose | Railway    |
| Tailwind CSS  | JWT Auth   | —        | Cloudinary |
| Vite          | Multer     |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Cloudinary account

### Installation

```bash
# Clone the repository
git clone https://github.com/mukkerasaiteja/job-portal-fullstack-mern.git
cd job-portal-fullstack-mern

# Install all dependencies
npm run install:all

# Start development servers
npm run dev
```

### Environment Variables

**Backend** (`backend/.env`):

```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Frontend** (`frontend/.env`):

```env
VITE_SERVER_URL=http://localhost:3000
```

## 📜 Available Scripts

| Command                | Description                           |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | Start frontend & backend concurrently |
| `npm run dev:frontend` | Start frontend only                   |
| `npm run dev:backend`  | Start backend with nodemon            |
| `npm run install:all`  | Install all dependencies              |
| `npm run build`        | Build frontend for production         |
| `npm start`            | Start backend (production)            |

## 📁 Project Structure

```
jobradar/
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # UI components
│   │   │   ├── shared/     # NavBar, Footer, etc.
│   │   │   └── ui/         # shadcn/ui components
│   │   ├── redux/          # State management
│   │   ├── customHooks/    # Custom React hooks
│   │   └── utilis/         # Helper functions
│   └── public/
│
├── backend/                # Express server
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API endpoints
│   ├── middlewares/        # Auth, upload, etc.
│   └── utils/              # Helpers
│
└── package.json            # Root scripts
```

## 🔌 API Endpoints

### Authentication

```
POST   /api/v1/users/register     # Register user
POST   /api/v1/users/login        # Login user
GET    /api/v1/users/profile      # Get profile
PUT    /api/v1/users/profile/update   # Update profile
```

### Jobs

```
GET    /api/v1/jobs               # Get all jobs
GET    /api/v1/jobs/:id           # Get single job
POST   /api/v1/jobs               # Create job (recruiter)
PUT    /api/v1/jobs/:id           # Update job (recruiter)
```

### Companies

```
GET    /api/v1/company            # Get all companies
POST   /api/v1/company            # Create company
PUT    /api/v1/company/:id        # Update company
```

### Applications

```
POST   /api/v1/applications/apply/:jobId   # Apply for job
GET    /api/v1/applications                # Get user applications
PUT    /api/v1/applications/:id/status     # Update status (recruiter)
```

## 🌍 Deployment

### Frontend → Vercel

1. Connect GitHub repo to Vercel
2. Set `VITE_SERVER_URL` environment variable
3. Deploy

### Backend → Railway

1. Connect GitHub repo to Railway
2. Set environment variables (MongoDB, JWT, Cloudinary)
3. Deploy

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Sai Teja Mukkera**

[![GitHub](https://img.shields.io/badge/GitHub-saitejamukkera-181717?logo=github)](https://github.com/saitejamukkera)

---

<p align="center">
  ⭐ Star this repo if you found it helpful!
</p>
