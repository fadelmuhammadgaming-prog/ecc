# 🏢 Executive Command Center (ECC)

> A modern fullstack web application for executive management and protocol operations

[![Node.js](https://img.shields.io/badge/Node.js-23.x-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18.2-blue.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14%2B-blue.svg)](https://www.postgresql.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-purple.svg)](https://getbootstrap.com/)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Modules
- 👥 **User Management** - Role-based authentication (Admin, Protokoler)
- 📅 **Agenda Management** - Event scheduling and tracking
- 📧 **Document Management** (Surat) - Upload and manage official documents
- 📞 **Contact Directory** - Centralized contact management
- 💰 **Budget Tracking** (Anggaran) - Financial planning with Pagu, Realisasi, Sisa
- 📋 **Protocol Management** (Protokol) - Comprehensive protocol tracking with 18 fields

### Technical Features
- 🔐 Session-based authentication
- 📁 File upload support (7 document types for Protokol)
- 🎨 Modern gradient UI with Bootstrap 5
- 📊 Real-time dashboard statistics
- 🔄 RESTful API endpoints
- 🚫 Cache control implementation
- 📱 Responsive design

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js 23.x
- **Framework:** Express.js 4.18.2
- **Database:** PostgreSQL 14+
- **ORM:** Drizzle ORM 0.29.5
- **Template Engine:** EJS
- **File Upload:** Multer
- **Session:** express-session

### Frontend
- **CSS Framework:** Bootstrap 5.3.2
- **Icons:** Bootstrap Icons
- **Fonts:** Google Fonts (Inter)
- **JavaScript:** Vanilla JS with modern ES6+

### DevOps
- **Container:** Docker & Docker Compose
- **Database Client:** pg (node-postgres)

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v23.x or higher)
- [PostgreSQL](https://www.postgresql.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🚀 Installation

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/fadelmuhammadgaming-prog/ecc.git
cd ecc
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Environment Configuration

Create a \`.env\` file in the root directory:

\`\`\`bash
cp .env.example .env
\`\`\`

Edit \`.env\` with your configuration:

\`\`\`env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=ecc_db

# Session Secret (change this to a random string)
SESSION_SECRET=your-super-secret-key-change-this-in-production

# File Upload Configuration
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
\`\`\`

## 🗄 Database Setup

### Option 1: Using Docker (Recommended)

\`\`\`bash
# Start PostgreSQL container
docker-compose up -d

# The database will be created automatically
\`\`\`

### Option 2: Local PostgreSQL

1. **Create Database:**
\`\`\`bash
psql -U postgres
CREATE DATABASE ecc_db;
\q
\`\`\`

2. **Run Migrations:**
\`\`\`bash
npm run migrate
\`\`\`

3. **Seed Initial Data:**
\`\`\`bash
npm run seed
\`\`\`

### Default Users (After Seeding)

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | Admin |
| protokoler1 | protokol123 | Protokoler |

**⚠️ IMPORTANT:** Change these passwords in production!

## 🏃 Running the Application

### Development Mode (with auto-reload)

\`\`\`bash
npm run dev
\`\`\`

### Production Mode

\`\`\`bash
npm start
\`\`\`

The application will be available at: **http://localhost:3000**

## � Deployment

### Deploy to Render.com (FREE)

This application is ready to deploy to Render.com with zero configuration!

#### Quick Deploy (10 minutes):
1. Read: [`QUICK_DEPLOY.md`](QUICK_DEPLOY.md) - Fast deployment guide
2. Or: [`DEPLOYMENT_RENDER.md`](DEPLOYMENT_RENDER.md) - Detailed guide
3. Or: [`VISUAL_DEPLOY_GUIDE.md`](VISUAL_DEPLOY_GUIDE.md) - Visual guide

#### What's Included:
- ✅ `render.yaml` - Auto-configuration
- ✅ PostgreSQL database setup
- ✅ SSL certificate (automatic)
- ✅ Auto-deploy from GitHub
- ✅ Environment variables template

#### Cost:
- **FREE Tier:** PostgreSQL + Web Service = $0/month
- **Paid Tier:** Always-on service = $14/month (optional)

#### Live Demo:
After deployment, your app will be available at:
- `https://ecc-app.onrender.com` (or your custom name)

### Other Deployment Options:

#### Railway.app
- Similar to Render
- $5/month free credit
- Better performance
- Guide: Similar steps as Render

#### Vercel + Supabase
- Vercel for app hosting
- Supabase for PostgreSQL
- Both have generous free tiers

**📚 Full deployment documentation available in the deployment guides!**

## �📁 Project Structure

\`\`\`
ecc/
├── public/                 # Static files
│   ├── css/               # Stylesheets
│   ├── js/                # Client-side JavaScript
│   └── images/            # Images
├── src/
│   ├── config/            # Configuration files
│   │   ├── env.js        # Environment validation
│   │   └── upload.js     # Multer configuration
│   ├── db/               # Database layer
│   │   ├── index.js      # Database connection
│   │   ├── schema.js     # Drizzle schema definitions
│   │   ├── migrate.js    # Migration runner
│   │   └── seed.js       # Seed data
│   ├── middleware/       # Express middleware
│   │   └── auth.js       # Authentication middleware
│   ├── routes/           # Route handlers
│   │   ├── index.js      # Web routes
│   │   └── api.js        # API routes
│   ├── views/            # EJS templates
│   │   ├── layout.ejs    # Main layout
│   │   ├── dashboard.ejs # Dashboard
│   │   ├── agenda.ejs    # Agenda management
│   │   ├── surat.ejs     # Document management
│   │   ├── contact.ejs   # Contact directory
│   │   ├── anggaran.ejs  # Budget tracking
│   │   ├── protokol.ejs  # Protocol management
│   │   └── users-ecc.ejs # User management
│   └── server.js         # Express app entry point
├── uploads/              # Uploaded files directory
├── .env.example          # Environment template
├── .gitignore           # Git ignore rules
├── docker-compose.yml   # Docker configuration
├── drizzle.config.js    # Drizzle ORM configuration
├── package.json         # Dependencies
└── README.md           # This file
\`\`\`

## 📚 API Documentation

### Authentication

#### POST `/api/login`
Login user and create session

**Request Body:**
\`\`\`json
{
  "username": "admin",
  "password": "admin123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "admin",
    "nama": "Administrator",
    "role": "admin"
  }
}
\`\`\`

### Protokol API

#### GET `/api/protokol`
Get all protokol records

**Response:**
\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "agendaDinas": "Kunjungan Kerja",
      "namaUser": "Budi Santoso",
      "tglKegiatan": "2026-01-15",
      ...
    }
  ]
}
\`\`\`

#### POST `/api/protokol`
Create new protokol record (with file uploads)

**Form Data:**
- `agendaDinas` (required)
- `tglKegiatan` (required)
- `noSppd`
- `checklistKebutuhan`
- `monitoringPelaksanaan`
- Files: `uploadDisposisi`, `uploadEtiket`, `uploadMateri`, etc.

For complete API documentation, see [API_EXAMPLES.md](./API_EXAMPLES.md)

## 📸 Screenshots

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### Protocol Management
![Protocol](docs/screenshots/protokol.png)

### Budget Tracking
![Anggaran](docs/screenshots/anggaran.png)

## 🛡️ Security Features

- Session-based authentication
- Password hashing (recommended: bcrypt)
- SQL injection prevention (Drizzle ORM parameterized queries)
- CORS configuration
- File upload validation
- Role-based access control

## 🧪 Testing

\`\`\`bash
# Run tests (if available)
npm test

# Test database connection
node src/db/index.js
\`\`\`

## 🐛 Troubleshooting

### Database Connection Issues
\`\`\`bash
# Check PostgreSQL is running
pg_isready

# Test connection
psql -U your_user -d ecc_db -h localhost
\`\`\`

### Port Already in Use
\`\`\`bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
kill -9 $(lsof -ti:3000)
\`\`\`

### Cache Issues
Clear browser cache: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📧 Contact

Fadel Muhammad - [@fadelmuhammadgaming-prog](https://github.com/fadelmuhammadgaming-prog)

Project Link: [https://github.com/fadelmuhammadgaming-prog/ecc](https://github.com/fadelmuhammadgaming-prog/ecc)

## 🙏 Acknowledgments

- Bootstrap team for the amazing UI framework
- Drizzle ORM for type-safe database queries
- Express.js community
- PostgreSQL team

---

**Made with ❤️ by Fadel Muhammad**
