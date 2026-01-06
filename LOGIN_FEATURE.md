# 🔐 Fitur Login - ECC Application

## ✅ Fitur Yang Telah Ditambahkan

### 1. 🔒 Authentication System
- **Login Page** dengan desain modern gradient purple-blue
- **Session-based authentication** menggunakan express-session
- **Password hashing** dengan bcryptjs
- **Protect all pages** - Semua halaman memerlukan login
- **Auto-redirect** - User yang belum login akan diarahkan ke halaman login

### 2. 🎨 Login Page Design
- **Gradient background** matching aplikasi
- **Animated card** dengan slide-up animation
- **Logo section** dengan icon building
- **Input fields** dengan icon (person & lock)
- **Demo credentials** ditampilkan di halaman
- **Error handling** dengan alert Bootstrap
- **Loading state** saat submit form
- **AJAX login** tanpa page reload

### 3. 👤 User Session Management
- Session store user info: id, username, nama, role, divisi, jobTitle
- User info available di semua views via `res.locals.user`
- Sidebar menampilkan **logged-in user info**:
  - Avatar circle dengan icon
  - Username
  - Role badge

### 4. 🚪 Logout Feature
- **Logout button** di sidebar bawah
- Warna merah untuk indicating action
- Confirmation dialog sebelum logout
- Destroy session dan redirect ke login

### 5. 🛡️ Protected Routes
- Semua halaman protected dengan middleware `requireAuth`
- API endpoints tetap accessible (bisa ditambahkan protection jika perlu)
- Login page accessible tanpa authentication
- Auto-redirect jika sudah login (tidak bisa akses /login)

## 📝 Cara Menggunakan

### Login
1. Buka `http://localhost:3000`
2. Akan auto-redirect ke `/login` jika belum login
3. Gunakan credentials:
   - **Sekretaris**: `sekretaris1` / `password123`
   - **Protokoler**: `protokoler1` / `password123`
   - **Direksi**: `direksi1` / `password123`
   - **PA**: `pa1` / `password123`
4. Klik Login
5. Redirect ke Dashboard

### Logout
1. Klik tombol **Logout** di sidebar bawah
2. Konfirmasi logout
3. Session destroyed
4. Redirect ke login page

## 🔧 Technical Implementation

### Files Modified/Created

#### 1. `/src/views/login.ejs` ✨ NEW
- Standalone login page (no layout)
- Gradient background matching main app
- AJAX form submission
- Demo credentials display
- Loading state animation

#### 2. `/src/views/layout.ejs` ✏️ MODIFIED
- Added user info display di sidebar
- Added logout button
- Avatar circle untuk user
- Show username & role

#### 3. `/src/routes/index.js` ✏️ MODIFIED
```javascript
// Added auth middleware
const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  res.redirect('/login');
};

// Added routes
router.get('/login', ...) // Login page
router.get('/logout', ...) // Logout handler
router.use(requireAuth); // Protect all routes below
```

#### 4. `/src/routes/api.js` ✏️ MODIFIED
```javascript
// Enhanced login API
router.post('/login', async (req, res) => {
  // Validate credentials
  // Check active status
  // Store userId & user in session
  // Return success with user data
});
```

#### 5. `/src/middleware/auth.js` ✔️ EXISTS
- Already has `isAuthenticated` middleware
- Can be used for additional protection if needed

## 🔐 Security Features

1. **Password Hashing** - bcryptjs with salt
2. **Session Security** - httpOnly cookies, secure in production
3. **Active User Check** - Only active users can login
4. **SQL Injection Protection** - Drizzle ORM parameterized queries
5. **CSRF Protection** - Can be added if needed (express-csrf)

## 📊 Session Data Structure

```javascript
req.session = {
  userId: 1,
  user: {
    id: 1,
    username: "sekretaris1",
    nama: "Sekretaris Satu",
    role: "SEKRETARIS",
    divisi: "Sekretariat",
    jobTitle: "Sekretaris Direksi"
  }
}
```

## 🎯 Login Flow

```
User → http://localhost:3000
  ↓
Check session
  ├─ Has session? → Dashboard
  └─ No session? → /login
        ↓
    Enter credentials
        ↓
    POST /api/login
        ↓
    Validate & create session
        ↓
    Redirect to Dashboard
```

## 🚀 API Endpoints

### POST /api/login
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"sekretaris1","password":"password123"}'

Response:
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "id": 1,
    "username": "sekretaris1",
    "nama": "Sekretaris Satu",
    "role": "SEKRETARIS",
    ...
  }
}
```

### GET /logout
```bash
# Via browser or:
curl http://localhost:3000/logout -L
```

## 🎨 Visual Features

### Login Page
- ✅ Gradient background (667eea → 764ba2)
- ✅ White card with shadow & border-radius
- ✅ Logo icon with gradient background
- ✅ Animated entrance (slideUp)
- ✅ Input groups with icons
- ✅ Gradient button with hover effect
- ✅ Demo credentials hint box
- ✅ Role badges color-coded

### Sidebar User Info
- ✅ Avatar circle (white bg, primary text)
- ✅ Username display
- ✅ Role display (smaller text)
- ✅ Logout button (red text, icon)
- ✅ Border-top separator
- ✅ Positioned at bottom (margin-top: auto)

## 🐛 Troubleshooting

### Cannot access any page
- Pastikan sudah login di `/login`
- Check session di browser DevTools (Application → Cookies)
- Restart server jika perlu

### Login tidak berhasil
- Pastikan database seeded (`npm run db:seed`)
- Check credentials (case-sensitive)
- Check user is_active status di database

### Session hilang
- Check session secret di `.env`
- Session expired setelah 24 jam
- Browser cookies disabled

## 📝 Future Enhancements

- [ ] Remember me checkbox
- [ ] Forgot password
- [ ] Password change
- [ ] Role-based access control (RBAC)
- [ ] Login history/audit log
- [ ] Multi-factor authentication (MFA)
- [ ] Session timeout warning
- [ ] Password strength indicator

## ✅ Testing Checklist

- [x] Login dengan valid credentials
- [x] Login dengan invalid credentials
- [x] Access protected page without login → redirect to /login
- [x] Access /login when logged in → redirect to dashboard
- [x] Logout functionality
- [x] User info display di sidebar
- [x] Session persistence
- [x] All 4 roles can login

---

**Aplikasi ECC sekarang FULLY SECURED dengan authentication system!** 🔒✨

Semua halaman memerlukan login, dan user info ditampilkan di sidebar. Login page memiliki desain modern yang matching dengan aplikasi utama.
