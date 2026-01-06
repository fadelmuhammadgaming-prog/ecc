# ECC Fullstack App - Quick Start Guide

Panduan cepat untuk menjalankan aplikasi ini.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database

#### Option A: Menggunakan Docker (Recommended)
```bash
# Start PostgreSQL container
docker-compose up -d

# Tunggu beberapa detik hingga database siap
```

#### Option B: Manual PostgreSQL Installation (Jika Docker tidak tersedia)
```bash
# macOS dengan Homebrew
brew services start postgresql@16

# Buat database
createdb ecc_db

# Update .env dengan connection string yang benar
# DATABASE_URL=postgresql://your_username@localhost:5432/ecc_db
```

Lihat [POSTGRES_SETUP.md](POSTGRES_SETUP.md) untuk panduan lengkap setup PostgreSQL manual.

### 3. Setup Environment
File `.env` sudah tersedia dengan konfigurasi default.

### 4. Run Migrations
```bash
# Generate migration files
npm run db:generate

# Apply migrations to database
npm run db:migrate
```

### 5. Seed Database (Optional)
```bash
npm run db:seed
```

Ini akan membuat:
- 3 users (admin, johndoe, janedoe)
- 3 categories
- 5 posts

**Test Credentials:**
- Username: `admin`
- Email: `admin@example.com`
- Password: `password123`

### 6. Start Application
```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm start
```

Buka browser: `http://localhost:3000`

## 📋 Available Commands

```bash
npm run dev          # Start dev server with nodemon
npm start            # Start production server
npm run db:generate  # Generate migrations from schema
npm run db:migrate   # Run migrations
npm run db:push      # Push schema to database (dev)
npm run db:studio    # Open Drizzle Studio GUI
npm run db:seed      # Seed database with sample data
```

## 🐳 Docker Commands

```bash
docker-compose up -d      # Start PostgreSQL
docker-compose down       # Stop PostgreSQL
docker-compose logs -f    # View logs
docker-compose ps         # Check status
```

## 🔍 Troubleshooting

**Port 5432 already in use?**
- Stop local PostgreSQL: `brew services stop postgresql` (Mac)
- Or change port in `docker-compose.yml`

**Cannot connect to database?**
- Check if PostgreSQL is running: `docker-compose ps`
- Check DATABASE_URL in `.env`

**Migration errors?**
- Delete `src/db/migrations/` folder
- Run `npm run db:push` instead

## 📖 Full Documentation

Lihat [README.md](README.md) untuk dokumentasi lengkap.
