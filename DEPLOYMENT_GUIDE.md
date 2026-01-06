# 🚀 Deployment Guide - ECC Application

## Update (Jan 2026): Platform Comparison

Setelah testing, berikut update status platform deployment:

| Platform | Free Tier | Credit Card | PostgreSQL | File Upload | Verdict |
|----------|-----------|-------------|------------|-------------|---------|
| **Render.com** | ✅ Yes | ⚠️ Required (not charged) | ✅ Free | ✅ Persistent | ⭐ **RECOMMENDED** |
| **Railway** | ⚠️ $5 credit | ⚠️ Required | ✅ Free | ✅ Persistent | ✅ Good alternative |
| **Fly.io** | ❌ No longer free | ⚠️ Required | 💰 $38/mo | ✅ Persistent | ❌ Not recommended |
| **Vercel** | ✅ Yes | ❌ Not required | ❌ External | ❌ Serverless | ❌ Not suitable |
| **Koyeb** | ✅ Yes | ❌ Not required | ⚠️ Limited | ⚠️ Limited | ⚠️ Basic only |

## 🏆 Recommended: Render.com

Render.com adalah pilihan terbaik karena:
- ✅ Benar-benar gratis untuk start
- ✅ PostgreSQL gratis dengan 1GB storage
- ✅ Persistent disk untuk file uploads
- ✅ Auto-deploy dari GitHub
- ✅ Free SSL certificate
- ⚠️ Memerlukan credit card tapi tidak akan dicharge di free tier

### Prerequisites
- GitHub account (sudah ada ✅)
- Render.com account (gratis)
- Credit card untuk verifikasi (tidak akan dicharge)

### Langkah-langkah Deployment

#### 1. Sign Up ke Render.com

1. Buka https://render.com
2. Klik **Get Started for Free**
3. Sign up dengan GitHub account (recommended)
4. Verify email Anda

#### 2. Buat PostgreSQL Database

1. Di dashboard Render, klik **New** → **PostgreSQL**
2. Isi form:
   - **Name**: `ecc-db`
   - **Database**: `ecc_db`
   - **User**: `ecc_user`
   - **Region**: **Singapore** (untuk performa terbaik)
   - **Plan**: **Free** (0 GB RAM, 1 GB Storage)
3. Klik **Create Database**
4. Tunggu database selesai dibuat (~2-3 menit)
5. **Copy** nilai **Internal Database URL** (dimulai dengan `postgresql://`)

#### 3. Deploy Web Service

1. Klik **New** → **Web Service**
2. Connect GitHub repository Anda:
   - Pilih repository: `fadelmuhammadgaming-prog/ecc`
   - Klik **Connect**
3. Isi form deployment:
   - **Name**: `ecc-app`
   - **Region**: **Singapore**
   - **Branch**: `main`
   - **Runtime**: **Node**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: **Free** (512 MB RAM, shared CPU)

4. Scroll ke **Environment Variables** dan tambahkan:

```
DATABASE_URL = [Paste Internal Database URL dari langkah 2]
NODE_ENV = production
SESSION_SECRET = [Generate random string, misal: ecc_secret_prod_2026]
PORT = 3000
```

5. Klik **Create Web Service**

#### 4. Setup Persistent Disk untuk Uploads

1. Setelah service dibuat, buka **Environment** tab
2. Scroll ke **Disks** section
3. Klik **Add Disk**:
   - **Name**: `uploads`
   - **Mount Path**: `/app/src/uploads`
   - **Size**: **1 GB** (gratis)
4. Klik **Save**

#### 5. Jalankan Database Migration

1. Buka **Shell** tab di web service Anda
2. Jalankan command:
```bash
npm run db:push
```

3. Atau di local, update DATABASE_URL ke production:
```bash
DATABASE_URL="[Production DB URL]" npm run db:push
```

#### 6. Verify Deployment

1. Tunggu deployment selesai (~5-10 menit untuk first deploy)
2. Buka URL yang diberikan: `https://ecc-app.onrender.com`
3. Test login dengan user default
4. Test semua fitur:
   - ✅ Create/Read/Update/Delete protokol
   - ✅ Upload file (7 jenis dokumen)
   - ✅ Merge PDF
   - ✅ Dashboard stats
   - ✅ Agenda management
   - ✅ Surat management

### ⚠️ Important Notes

1. **Free tier limitations**:
   - Service akan sleep setelah 15 menit tidak ada traffic
   - First request setelah sleep akan lambat (~30-60 detik)
   - 750 jam per bulan (cukup untuk 24/7)

2. **Cara atasi sleep**:
   - Gunakan UptimeRobot (https://uptimerobot.com) untuk ping setiap 5 menit
   - Atau upgrade ke paid plan ($7/month untuk always-on)

3. **Database backup**:
   - Free tier tidak ada automatic backup
   - Manual backup via `pg_dump` (dokumentasi tersedia)

4. **Monitoring**:
   - Gunakan Render dashboard untuk monitor logs
   - Lihat **Logs** tab untuk troubleshooting

---

## 🔄 Alternative: Railway

Jika Anda ingin coba Railway (ada $5 free credit):

### Quick Setup Railway

1. **Sign up**: https://railway.app dengan GitHub
2. **New Project** → **Deploy from GitHub repo**
3. Select: `fadelmuhammadgaming-prog/ecc`
4. **Add PostgreSQL**:
   - Klik **New** → **Database** → **PostgreSQL**
   - Railway auto-inject `DATABASE_URL`
5. **Add Environment Variables**:
   ```
   NODE_ENV=production
   SESSION_SECRET=ecc_railway_secret_2026
   PORT=3000
   ```
6. **Deploy**: Automatic
7. **Generate Domain**: Settings → Generate Domain

Railway memberikan $5 credit yang cukup untuk ~2-3 bulan usage dengan free tier.

---

## 📊 Cost Estimation

### Render.com (Free Plan)
- Web Service: **$0/month** (512 MB RAM)
- PostgreSQL: **$0/month** (1 GB storage)
- Bandwidth: **100 GB/month** gratis
- **Total: $0/month** ✅

### Railway (With $5 Credit)
- ~500 hours execution: **~$2/month**
- PostgreSQL: **~$1/month**
- **$5 credit lasts: ~2 months**
- After credit: **~$3-5/month**

---

## 🆘 Troubleshooting

### Build Failed
```bash
# Check Node version in package.json
"engines": {
  "node": ">=18.0.0"
}
```

### Database Connection Error
- Pastikan `DATABASE_URL` sudah diset
- Pastikan SSL enabled di production (sudah dihandle di code)

### File Upload Not Working
- Pastikan persistent disk sudah di-mount
- Check write permissions di `/app/src/uploads`

### Application Slow
- Gunakan UptimeRobot untuk keep-alive (hindari cold start)
- Atau upgrade ke paid plan untuk always-on

---

## 📞 Support

Jika ada masalah:
1. Check **Logs** di Render dashboard
2. Baca [Render Documentation](https://render.com/docs)
3. Join [Render Community](https://community.render.com)

---

## ✅ Post-Deployment Checklist

- [ ] Database migrasi berhasil
- [ ] Login page accessible
- [ ] CRUD operations work
- [ ] File upload works
- [ ] PDF merge works
- [ ] Dashboard displays correct data
- [ ] Setup monitoring (UptimeRobot)
- [ ] Change default admin password
- [ ] Remove demo credentials from login page (✅ sudah done)

---

**Status**: ✅ Ready to deploy!

**Recommended**: Start dengan **Render.com** karena paling mudah dan reliable untuk aplikasi fullstack dengan file uploads.
