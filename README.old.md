# ECC Fullstack Application

Boilerplate aplikasi fullstack dengan **Express.js**, **Bootstrap 5**, **PostgreSQL**, dan **Drizzle ORM**.

## 🚀 Tech Stack

- **Backend**: Express.js (Node.js Framework)
- **Frontend**: EJS Template Engine + Bootstrap 5
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Session**: Express Session
- **Password Hashing**: bcryptjs

## 📋 Prerequisites

Sebelum memulai, pastikan Anda telah menginstall:

- [Node.js](https://nodejs.org/) (v18 atau lebih tinggi)
- [PostgreSQL](https://www.postgresql.org/) (v14 atau lebih tinggi)
- npm atau yarn

## 🛠️ Installation

1. **Clone atau download repository ini**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Database PostgreSQL**

   Buat database PostgreSQL baru:
   ```bash
   createdb ecc_db
   ```

   Atau menggunakan psql:
   ```sql
   CREATE DATABASE ecc_db;
   ```

4. **Setup Environment Variables**

   Copy file `.env.example` ke `.env`:
   ```bash
   cp .env.example .env
   ```

   Edit file `.env` dan sesuaikan dengan konfigurasi database Anda:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/ecc_db
   PORT=3000
   NODE_ENV=development
   SESSION_SECRET=your-secret-key-change-this-in-production
   ```

5. **Generate dan Run Migrations**

   Generate migration files:
   ```bash
   npm run db:generate
   ```

   Jalankan migrations:
   ```bash
   npm run db:migrate
   ```

   Atau langsung push schema ke database (untuk development):
   ```bash
   npm run db:push
   ```

## 🏃 Running the Application

### Development Mode (with hot reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

## 📁 Project Structure

```
ecc/
├── public/                 # Static files
│   ├── css/
│   │   └── style.css      # Custom CSS
│   └── js/
│       └── main.js        # Custom JavaScript
├── src/
│   ├── db/                # Database configuration
│   │   ├── index.js       # Database connection
│   │   ├── schema.js      # Database schema
│   │   ├── migrate.js     # Migration runner
│   │   └── migrations/    # Generated migrations
│   ├── routes/            # Express routes
│   │   ├── index.js       # Web routes
│   │   └── api.js         # API routes
│   ├── views/             # EJS templates
│   │   ├── layout.ejs     # Base layout (not used)
│   │   ├── index.ejs      # Home page
│   │   ├── users.ejs      # Users page
│   │   ├── posts.ejs      # Posts page
│   │   ├── about.ejs      # About page
│   │   ├── 404.ejs        # 404 page
│   │   └── error.ejs      # Error page
│   └── server.js          # Main application file
├── .env                   # Environment variables
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore file
├── drizzle.config.js      # Drizzle configuration
├── package.json           # Dependencies
└── README.md             # This file
```

## 🗄️ Database Schema

### Users Table
- `id` - Serial primary key
- `username` - Varchar(50), unique
- `email` - Varchar(255), unique
- `password` - Varchar(255), hashed
- `fullName` - Varchar(100), nullable
- `isActive` - Boolean, default true
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

### Posts Table
- `id` - Serial primary key
- `title` - Varchar(255)
- `content` - Text, nullable
- `userId` - Foreign key to users
- `isPublished` - Boolean, default false
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

### Categories Table
- `id` - Serial primary key
- `name` - Varchar(100), unique
- `description` - Text, nullable
- `createdAt` - Timestamp

## 🔌 API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "fullName": "John Doe"
  }
  ```

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
  ```json
  {
    "title": "My First Post",
    "content": "Post content here...",
    "userId": 1,
    "isPublished": true
  }
  ```

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category
  ```json
  {
    "name": "Technology",
    "description": "Tech related posts"
  }
  ```

## 🎨 Available Pages

- `/` - Home page
- `/users` - Users management page
- `/posts` - Posts listing page
- `/about` - About page

## 🔧 Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run db:generate` - Generate migration files from schema
- `npm run db:migrate` - Run migrations
- `npm run db:push` - Push schema directly to database
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## 🔐 Security Features

- Password hashing dengan bcryptjs
- Session management dengan express-session
- CORS enabled
- Environment variables untuk sensitive data
- SQL injection protection via Drizzle ORM

## 📝 Modifikasi Schema Database

1. Edit file `src/db/schema.js`
2. Generate migration:
   ```bash
   npm run db:generate
   ```
3. Review migration files di `src/db/migrations/`
4. Jalankan migration:
   ```bash
   npm run db:migrate
   ```

## 🎯 Next Steps

- [ ] Tambahkan authentication middleware
- [ ] Implement JWT authentication
- [ ] Tambahkan file upload functionality
- [ ] Implement pagination
- [ ] Tambahkan search functionality
- [ ] Setup testing (Jest/Mocha)
- [ ] Implement logging (Winston/Morgan)
- [ ] Deploy ke production

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [EJS Documentation](https://ejs.co/)

## 🐛 Troubleshooting

### Database Connection Error
- Pastikan PostgreSQL sudah berjalan
- Cek konfigurasi `DATABASE_URL` di file `.env`
- Pastikan database sudah dibuat

### Migration Error
- Pastikan database connection sudah benar
- Hapus folder `src/db/migrations/` dan generate ulang
- Gunakan `npm run db:push` untuk development

### Port Already in Use
- Ubah `PORT` di file `.env`
- Atau stop aplikasi yang menggunakan port 3000

## 📄 License

MIT

## 👨‍💻 Author

Created with ❤️ by ECC Team

---

Happy Coding! 🚀
