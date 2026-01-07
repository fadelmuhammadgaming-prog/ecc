# 🚀 Setup Ngrok - Quick Guide

## ✅ Ngrok Installation Complete!

Ngrok sudah ter-download di: `~/Downloads/ngrok`

---

## 📝 Step Selanjutnya

### 1. **Sign Up Ngrok (Gratis, No Credit Card!)**

Buka browser dan daftar:
```
https://dashboard.ngrok.com/signup
```

**Options**:
- Sign up dengan Email
- **Atau sign up dengan GitHub** (lebih cepat)

Verify email Anda.

---

### 2. **Copy Authtoken**

Setelah login ke dashboard:
1. Buka: https://dashboard.ngrok.com/get-started/your-authtoken
2. Copy authtoken (format: `2xxx...`)

---

### 3. **Setup Authtoken**

Jalankan command ini di terminal (ganti YOUR_TOKEN):

```bash
cd ~/Downloads
./ngrok config add-authtoken YOUR_TOKEN_DARI_DASHBOARD
```

Contoh:
```bash
./ngrok config add-authtoken 2abcdefGHI123_xyz789ABCDEF
```

---

### 4. **Start Aplikasi ECC**

Di terminal, jalankan:

```bash
cd ~/devsecops/ecc
npm start
```

Pastikan muncul:
```
✅ Database connected successfully
🚀 Server is running on http://localhost:3000
```

---

### 5. **Expose dengan Ngrok**

**Buka terminal BARU** (jangan tutup yang npm start), lalu:

```bash
cd ~/Downloads
./ngrok http 3000
```

---

### 6. **Dapatkan URL Publik**

Ngrok akan menampilkan:

```
Session Status    online
Account           fadelmuhammadgaming@gmail.com
Version           3.34.1
Region            Asia Pacific (ap)
Web Interface     http://127.0.0.1:4040
Forwarding        https://abcd-1234-5678.ngrok-free.app -> http://localhost:3000

Connections       ttl     opn     rt1     rt5     p50     p90
                  0       0       0.00    0.00    0.00    0.00
```

**URL Publik Anda**: `https://abcd-1234-5678.ngrok-free.app`

---

## 🎯 Testing

Sekarang aplikasi ECC bisa diakses dari:

✅ **Laptop Anda**: http://localhost:3000
✅ **HP Anda**: https://abcd-1234-5678.ngrok-free.app  
✅ **Teman/Atasan**: https://abcd-1234-5678.ngrok-free.app
✅ **Dari internet mana saja**: URL ngrok

---

## 📱 Test Upload File

1. Buka URL ngrok di HP/browser lain
2. Login dengan user default
3. Upload dokumen protokol
4. File tersimpan di `~/devsecops/ecc/src/uploads/`
5. Merge PDF → Works!

---

## 🔧 Command Summary

```bash
# Terminal 1: Start app
cd ~/devsecops/ecc
npm start

# Terminal 2: Start ngrok  
cd ~/Downloads
./ngrok http 3000
```

---

## ⚠️ Important Notes

1. **Laptop harus tetap nyala** saat testing
2. **Kedua terminal harus tetap berjalan**:
   - Terminal 1: npm start (jangan di-stop)
   - Terminal 2: ngrok (jangan di-stop)
3. **URL berubah** setiap restart ngrok (free tier)
4. **Auto-restart** setiap 2 jam (free tier) - tinggal restart aja
5. **Database lokal** - data tetap aman di laptop

---

## 🌐 Ngrok Web Interface

Buka di browser:
```
http://127.0.0.1:4040
```

Di sini Anda bisa lihat:
- ✅ Semua HTTP requests yang masuk
- ✅ Request/response details
- ✅ Inspect traffic
- ✅ Replay requests

Perfect untuk debugging!

---

## 🛑 Stop Ngrok

Untuk stop ngrok:
```
Ctrl + C di terminal ngrok
```

Untuk stop app:
```
Ctrl + C di terminal npm
```

---

## 💡 Pro Tips

### Gunakan PM2 untuk Keep App Running:
```bash
npm install -g pm2
pm2 start npm --name "ecc-app" -- start
pm2 logs ecc-app
```

Dengan PM2:
- ✅ App auto-restart jika crash
- ✅ Bisa close terminal
- ✅ Monitoring built-in

---

## 🎉 Ready to Go!

Sekarang:
1. Daftar ngrok (gratis)
2. Copy authtoken
3. Setup authtoken
4. Start app + ngrok
5. Share URL untuk testing!

**Need help?** Check dokumentasi lengkap di DEPLOYMENT_GUIDE.md

---

## 📞 Troubleshooting

### "ngrok not found"
```bash
cd ~/Downloads
./ngrok version  # Pakai ./ untuk run dari folder current
```

### "Failed to start tunnel"
- Pastikan sudah setup authtoken
- Check koneksi internet

### "Port 3000 already in use"
```bash
lsof -ti:3000 | xargs kill -9
npm start
```

### URL ngrok tidak bisa diakses
- Pastikan npm start masih running
- Check firewall/antivirus
- Coba restart ngrok

---

**Status**: ✅ Ngrok installed, ready untuk setup authtoken!

**Next**: Daftar di https://dashboard.ngrok.com/signup
