# Dashboard Features Documentation

## 📊 Dashboard Overview

Dashboard Executive adalah halaman utama yang menampilkan ringkasan dan statistik penting untuk monitoring perjalanan dinas direksi.

## ✨ Fitur Dashboard

### 1. **Statistik Cards**
Menampilkan 4 kartu statistik utama:
- 📅 **Total Agenda**: Jumlah total agenda perjalanan dinas
- 📧 **Total Surat**: Jumlah total surat yang dikelola
- 👥 **Total Kontak**: Jumlah kontak yang tersimpan
- 👤 **Total Users**: Jumlah pengguna sistem

Setiap kartu memiliki:
- Icon yang representatif
- Angka statistik yang besar dan jelas
- Gradient background yang menarik

### 2. **Ringkasan Anggaran** ✅ BARU!

Menampilkan informasi lengkap tentang anggaran perjalanan dinas:

#### **Kartu Anggaran**
- **Total Pagu**: Total anggaran yang dialokasikan (dalam Miliar Rupiah)
- **Total Realisasi**: Total anggaran yang sudah terpakai
  - Badge persentase terpakai (merah)
- **Sisa Anggaran**: Sisa anggaran yang tersedia
  - Badge persentase tersisa (hijau)

#### **Progress Bar Animasi** ✅ BARU!
- Menampilkan visualisasi pemakaian anggaran
- Progress bar dengan gradient merah-pink yang animasi
- Persentase ditampilkan di dalam bar
- Informasi detail di bawah bar:
  - Kiri: Jumlah rupiah terpakai (merah)
  - Kanan: Jumlah rupiah tersisa (hijau)

**Formula Perhitungan:**
```javascript
persenTerpakai = (totalRealisasi / totalPagu) * 100
persenSisa = (totalSisa / totalPagu) * 100
```

**Contoh Tampilan:**
```
Pemakaian Anggaran                    65.50%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
█████████████████████████░░░░░░░░░░░  65.50% Terpakai
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ Rp 1.96 M Terpakai    ✓ Rp 1.03 M Tersisa
```

### 3. **Agenda Terbaru**

Menampilkan 5 agenda terbaru dengan informasi:
- Nama kegiatan
- Tanggal dan waktu
- Status agenda (ON SCHEDULE/DELAYED/CANCELLED)
  - Green badge: ON SCHEDULE
  - Yellow badge: DELAYED
  - Gray badge: CANCELLED

### 4. **Surat Terbaru** ✅ BARU!

Menampilkan 5 surat terbaru dengan informasi yang lebih lengkap:

#### **Badge Jenis Surat** ✅ BARU!
- Badge biru dengan icon file
- Menampilkan tipe surat (Surat Masuk/Keluar, Memo, dll)

#### **Badge Urgensi**
- 🔴 Red badge: URGENT
- 🟡 Yellow badge: HIGH
- 🔵 Blue badge: NORMAL

#### **Badge Status**
- 🟢 Green badge: APPROVED
- 🟡 Yellow badge: PENDING
- ⚪ Gray badge: REJECTED

#### **Informasi Detail** ✅ BARU!
- **Nomor Memo Surat**: Ditampilkan dengan icon hash (#) dan bold
- **Tanggal Pembuatan**: Format Indonesia (contoh: 6 Jan 2026)

**Layout Baru:**
```
┌─────────────────────────────────────────────┐
│ [📄 Surat Masuk] [🔴 URGENT] [🟢 APPROVED] │
│ # 001/MEMO/2026                             │
│ 📅 6 Jan 2026                               │
└─────────────────────────────────────────────┘
```

### 5. **Navigation Links**
- Button "Lihat Semua Agenda" - mengarah ke halaman Agenda
- Button "Lihat Semua Surat" - mengarah ke halaman Surat

## 🎨 Design Features

### Color Scheme
- **Primary (Agenda)**: Blue gradient (#667eea → #764ba2)
- **Danger (Surat)**: Pink-Red gradient (#f5576c → #f093fb)
- **Info (Kontak)**: Cyan gradient (#4facfe → #00f2fe)
- **Success (Users/Sisa)**: Green gradient (#43e97b → #38f9d7)

### Responsive Design
- Grid layout responsive (Bootstrap 5)
- Cards menyesuaikan dengan ukuran layar
- Mobile-friendly

### Visual Effects
- Shadow-sm untuk depth
- Rounded corners
- Hover effects pada buttons
- Animated progress bar dengan stripes

## 💾 Data Source

Data dashboard diambil dari:
- **Router**: `src/routes/index.js` - route GET `/`
- **Database Tables**: 
  - `agenda` - untuk statistik agenda
  - `surat` - untuk statistik dan list surat
  - `contact` - untuk statistik kontak
  - `users` - untuk statistik users
  - `anggaran` - untuk ringkasan anggaran

**Query Anggaran:**
```javascript
totalPagu: SUM(anggaran.pagu)
totalRealisasi: SUM(anggaran.realisasi)
totalSisa: SUM(anggaran.sisa)
persenTerpakai: (totalRealisasi / totalPagu) * 100
persenSisa: (totalSisa / totalPagu) * 100
```

## 🔄 Auto-Refresh
Data dashboard akan refresh setiap kali halaman dimuat atau user kembali ke dashboard.

## 📱 Accessibility
- Icon yang jelas dan deskriptif
- Color coding yang konsisten
- Badge untuk status yang mudah dibaca
- Spacing yang cukup antar elemen

## 🚀 Future Enhancements (Suggestions)

1. **Real-time Updates**: WebSocket untuk update statistik real-time
2. **Chart Visualization**: Grafik pemakaian anggaran per bulan
3. **Filter**: Filter berdasarkan tanggal/periode
4. **Export**: Export laporan dashboard ke PDF/Excel
5. **Notifications**: Notifikasi untuk agenda mendatang
6. **Budget Alert**: Alert ketika anggaran mencapai threshold tertentu (80%, 90%)

---

**Last Updated**: January 6, 2026
**Version**: 2.0
