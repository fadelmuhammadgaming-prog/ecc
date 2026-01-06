# 🏢 ECC - Executive Command Center

## 📋 Deskripsi
Executive Command Center (ECC) adalah aplikasi fullstack untuk monitoring dan manajemen perjalanan dinas direksi dengan desain modern dan menarik menggunakan gradient purple-blue.

## ✨ Fitur Utama

### 1. 📊 Dashboard Executive
- Statistik real-time (agenda, surat, kontak, users)
- Ringkasan anggaran dengan visual cards
- Recent agenda dan surat
- Animasi smooth on load

### 2. 📅 Agenda Kegiatan
- CRUD lengkap dengan modal forms
- Filter by status & tanggal
- Status tracking: On Schedule, Delayed, Completed, Cancelled
- Peserta internal & eksternal

### 3. ✉️ Manajemen Surat
- Tracking urgensi: Urgent, High, Medium, Low
- Status: Pending, Approved, Rejected
- Upload dokumen surat
- Table view dengan statistics

### 4. 👥 Database Kontak
- Card layout dengan avatar
- Info lengkap: nama, jabatan, instansi
- Kontak telepon & email clickable

### 5. 💰 Monitor Anggaran
- Progress bar visual per mata anggaran
- Summary cards (pagu, realisasi, sisa)
- Color-coded alerts
- Nilai dalam Milyar Rupiah

### 6. 📋 Protokol Kegiatan
- Upload disposisi
- Tracking tanggal & keterangan
- Card layout dengan header gradient

### 7. 👤 Manajemen Users
- 4 Role: Sekretaris, Protokoler, Direksi, PA
- Statistics per role
- Status active/inactive
- Complete CRUD operations

## 🛠️ Tech Stack

- **Express.js 4.18.2** - Backend framework
- **Bootstrap 5.3.2** - Modern UI framework
- **PostgreSQL 14.18** - Reliable database
- **Drizzle ORM 0.29.5** - Type-safe ORM
- **EJS 3.1.9** + **express-ejs-layouts** - Template engine with layouts
- **bcryptjs 2.4.3** - Password hashing
- **Google Fonts (Inter)** - Clean typography

## 🎨 Design Features

✨ **Gradient Backgrounds** - Purple-blue aesthetic  
🎯 **Sidebar Navigation** - Clean & intuitive  
📱 **Fully Responsive** - Mobile-first design  
🌈 **Color-coded Status** - Easy visual identification  
✨ **Hover Animations** - Interactive elements  
🎭 **Modal Forms** - Seamless data entry  
📊 **Progress Bars** - Visual budget tracking  

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup database
createdb ecc_db

# 3. Configure environment
cp .env.example .env
# Edit DATABASE_URL di .env

# 4. Run migrations & seed
npm run db:migrate
npm run db:seed

# 5. Start server
npm run dev
```

Server: `http://localhost:3000`

## 🔐 Default Login

| Role | Username | Password |
|------|----------|----------|
| Sekretaris | sekretaris1 | password123 |
| Protokoler | protokoler1 | password123 |
| Direksi | direksi1 | password123 |
| PA | pa1 | password123 |

## 📝 NPM Scripts

```bash
npm run dev          # Development dengan nodemon
npm start            # Production server
npm run db:generate  # Generate migrations
npm run db:migrate   # Run migrations
npm run db:seed      # Seed sample data
```

## 🔗 API Endpoints

### Auth
- `POST /api/login` - User login
- `POST /api/logout` - User logout

### CRUD Endpoints
- Agenda: `GET|POST|PUT|DELETE /api/agenda/:id?`
- Surat: `GET|POST|PUT|DELETE /api/surat/:id?`
- Contact: `GET|POST|PUT|DELETE /api/contact/:id?`
- Anggaran: `GET|POST|PUT|DELETE /api/anggaran/:id?`
- Protokol: `GET|POST|PUT|DELETE /api/protokol/:id?`
- Users: `GET|POST|PUT|DELETE /api/users/:id?`

### Special Endpoints
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/anggaran/summary` - Budget summary

## 🌐 Pages

- `/` - Dashboard dengan stats
- `/agenda` - Manajemen agenda
- `/surat` - Manajemen surat
- `/contact` - Database kontak
- `/anggaran` - Monitor anggaran
- `/protokol` - Data protokol
- `/users` - Manajemen users

## 📁 Project Structure

```
ecc/
├── src/
│   ├── config/         # Environment config
│   ├── db/
│   │   ├── migrations/ # SQL migrations
│   │   ├── schema.js   # Database schema
│   │   ├── seed.js     # Sample data
│   │   └── index.js    # DB connection
│   ├── routes/
│   │   ├── index.js    # Web routes
│   │   └── api.js      # API routes
│   ├── views/          # EJS templates
│   │   ├── layout.ejs  # Main layout
│   │   ├── dashboard.ejs
│   │   ├── agenda.ejs
│   │   ├── surat.ejs
│   │   ├── contact.ejs
│   │   ├── anggaran.ejs
│   │   ├── protokol.ejs
│   │   └── users-ecc.ejs
│   └── server.js       # Express app
├── public/             # Static files
├── .env                # Environment vars
└── package.json        # Dependencies
```

## 🎯 Key Features Highlights

### Sidebar Navigation
- Auto-highlight active page
- Smooth hover animations
- Icon + text labels
- Gradient background

### Stat Cards
- Gradient backgrounds per category
- Large numbers with icons
- Hover lift effect
- Smooth fade-in animations

### Tables & Cards
- Alternating row colors
- Hover highlights
- Badge indicators for status
- Responsive design

### Forms & Modals
- Bootstrap 5 modals
- Inline validation
- AJAX submissions
- Success/error alerts

## 🐛 Troubleshooting

### Server won't start
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Restart
npm run dev
```

### Database errors
```bash
# Reset database
dropdb ecc_db
createdb ecc_db
npm run db:migrate
npm run db:seed
```

### Migration errors
```bash
# Clean migrations
rm -rf src/db/migrations/*.sql
rm -rf src/db/migrations/meta

# Regenerate
npm run db:generate
npm run db:migrate
```

## 📊 Sample Data

Seed data includes:
- 4 users (one per role)
- 3 agenda items
- 3 surat with different urgency levels
- 3 contacts from different institutions
- 3 budget items (total Rp 1.45 Miliar)
- 2 protocol entries

## 🔒 Security

- ✅ Password hashing (bcryptjs)
- ✅ Session-based auth
- ✅ SQL injection protection (Drizzle ORM)
- ✅ Environment variables for secrets
- ✅ CORS enabled

## 🚀 Future Enhancements

- [ ] File upload untuk dokumen
- [ ] Export to PDF/Excel
- [ ] Email notifications
- [ ] Calendar integration
- [ ] Advanced reporting & charts
- [ ] Role-based permissions
- [ ] Real-time updates
- [ ] Document versioning
- [ ] Search & advanced filters

## 📸 Screenshots

Dashboard menyajikan overview lengkap dengan:
- 4 stat cards dengan gradient unik
- Budget summary dengan 3 metrik
- Recent agenda list
- Recent surat list

Semua halaman menggunakan:
- Consistent sidebar navigation
- Page headers dengan gradient
- Action buttons dengan icons
- Responsive tables & cards

## 👨‍💻 Development

### Adding Features
1. Update `src/db/schema.js`
2. Generate migration: `npm run db:generate`
3. Run migration: `npm run db:migrate`
4. Add API routes in `src/routes/api.js`
5. Add web routes in `src/routes/index.js`
6. Create view in `src/views/`

### Database Schema
- **users** - Authentication & roles
- **agenda** - Schedule management
- **surat** - Document management
- **contact** - Contact database
- **anggaran** - Budget tracking
- **protokol** - Protocol records

## 📄 License

MIT License

## 🤝 Contributing

Pull requests are welcome!

---

**Built with ❤️ using Express.js, Bootstrap 5, PostgreSQL & Drizzle ORM**

*Desain modern dengan gradient purple-blue, sidebar navigation, dan animasi smooth untuk pengalaman pengguna yang menarik!*
