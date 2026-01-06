# Changelog - ECC Fullstack Application

## [Version 2.1.0] - January 6, 2026

### 🎉 New Features

#### 1. **PDF Merge dengan Image Conversion**
- ✨ Fitur merge semua dokumen protokol menjadi satu PDF
- 🖼️ Auto-convert PNG/JPG ke PDF sebelum merge
- 🧹 Automatic cleanup temporary files
- 📄 Support mixed file types (PDF + Images)
- 💾 Menyimpan hasil merge di field `mergedPdf`
- 🔽 Download button untuk merged PDF

**Files Modified:**
- `src/utils/pdfMerger.js` (NEW)
- `src/routes/api.js` - Added POST `/api/protokol/:id/merge-pdf`
- `src/db/schema.js` - Added `mergedPdf` column
- `src/views/protokol.ejs` - Added merge UI
- `package.json` - Added pdf-lib, pdf-merger-js

#### 2. **Dashboard Budget Percentage**
- 📊 Persentase anggaran terpakai (% Terpakai)
- 📊 Persentase anggaran tersisa (% Tersisa)
- 📈 Animated progress bar dengan gradient
- 💰 Detail rupiah terpakai dan tersisa

**Formula:**
```javascript
persenTerpakai = (totalRealisasi / totalPagu) * 100
persenSisa = (totalSisa / totalPagu) * 100
```

**Files Modified:**
- `src/routes/index.js` - Added percentage calculation
- `src/views/dashboard.ejs` - Added progress bar UI

#### 3. **Enhanced Surat Terbaru Display**
- 🏷️ Badge untuk Jenis Surat (biru)
- 🏷️ Badge untuk Urgensi (merah/kuning/biru)
- 🏷️ Badge untuk Status (hijau/kuning/abu)
- #️⃣ Nomor Memo Surat ditampilkan bold dengan icon
- 📅 Tanggal pembuatan (format Indonesia)
- 🎨 Better spacing dan visual hierarchy

**Files Modified:**
- `src/views/dashboard.ejs` - Enhanced Surat Terbaru section

#### 4. **New Dashboard Statistics Cards**
- ✅ **Agenda On Schedule**: Menghitung agenda dengan status ON SCHEDULE
- ⚠️ **Surat Mendesak**: Menghitung surat dengan urgensi MENDESAK
- 🔄 Mengganti Total Kontak dan Total Users

**Files Modified:**
- `src/routes/index.js` - New queries for filtered stats
- `src/views/dashboard.ejs` - Updated stat cards

### 🐛 Bug Fixes

#### 1. **Fix Surat Field Names**
- ❌ **Before**: `item.jenis_surat` (snake_case)
- ✅ **After**: `item.jenisSurat` (camelCase)
- ❌ **Before**: `item.no_memo_surat`
- ✅ **After**: `item.noMemoSurat`
- ❌ **Before**: `item.status_surat`
- ✅ **After**: `item.statusSurat`

#### 2. **Fix Badge Conditions**
**Urgensi:**
- ❌ **Before**: `URGENT`, `HIGH`, `NORMAL`
- ✅ **After**: `MENDESAK`, `PENTING`, `BIASA`

**Status Surat:**
- ❌ **Before**: `APPROVED`, `PENDING`, `REJECTED`
- ✅ **After**: `DONE`, `ON PROGRESS`, `BELUM`

### 📚 Documentation

#### New Documentation Files:
1. **FEATURE_PDF_MERGE.md** - PDF merge feature guide
2. **PDF_MERGE_FEATURE.md** - Technical implementation details
3. **DASHBOARD_FEATURES.md** - Comprehensive dashboard documentation
4. **CHANGELOG.md** - This file

### 🎨 UI/UX Improvements

#### Color Scheme Updates:
- **Total Agenda**: Purple gradient (#667eea → #764ba2)
- **Total Surat**: Pink gradient (#f093fb → #f5576c)
- **Agenda On Schedule**: Green gradient (#43e97b → #38f9d7)
- **Surat Mendesak**: Pink-Yellow gradient (#fa709a → #fee140)

#### Icons Updated:
- 📅 Total Agenda: `bi-calendar-event`
- 📧 Total Surat: `bi-envelope-fill`
- ✅ Agenda On Schedule: `bi-calendar-check`
- ⚠️ Surat Mendesak: `bi-exclamation-triangle-fill`

### 🔧 Technical Changes

#### Database Schema:
```sql
ALTER TABLE protokol ADD COLUMN merged_pdf VARCHAR(255);
```

#### New Dependencies:
```json
{
  "pdf-lib": "^1.17.1",
  "pdf-merger-js": "^5.1.2"
}
```

#### New API Endpoints:
- `POST /api/protokol/:id/merge-pdf` - Merge protokol documents

### 📊 Statistics Queries

#### Before:
```javascript
totalContact: COUNT(*) FROM contact
totalUsers: COUNT(*) FROM users
```

#### After:
```javascript
totalAgendaOnSchedule: COUNT(*) FROM agenda WHERE status = 'ON SCHEDULE'
totalSuratMendesak: COUNT(*) FROM surat WHERE urgensi = 'MENDESAK'
```

### 🚀 Performance

- ⚡ Optimized image-to-PDF conversion
- 🧹 Automatic temp file cleanup
- 📦 Batch processing for multiple files
- 💾 Efficient database queries with indexes

### 🔐 Security

- ✅ File type validation (PDF, PNG, JPG, JPEG only)
- ✅ Path traversal prevention
- ✅ Proper file permissions handling
- ✅ Safe filename generation with timestamps

### 📱 Responsive Design

- ✅ Mobile-friendly dashboard cards
- ✅ Responsive progress bar
- ✅ Touch-friendly buttons
- ✅ Adaptive spacing on small screens

### 🧪 Testing Checklist

- [x] PDF merge with PNG files
- [x] PDF merge with mixed PDF+PNG files
- [x] Progress bar calculation accuracy
- [x] Badge colors matching database values
- [x] Stat cards showing correct counts
- [x] Temp file cleanup verification
- [x] Mobile responsiveness

### 📦 Deployment Notes

1. Run database migration:
   ```sql
   ALTER TABLE protokol ADD COLUMN IF NOT EXISTS merged_pdf VARCHAR(255);
   ```

2. Install new dependencies:
   ```bash
   npm install pdf-lib pdf-merger-js
   ```

3. Restart server:
   ```bash
   npm run dev
   ```

4. Test merge functionality on protokol with existing uploads

### 🔮 Future Enhancements

#### Planned Features:
1. 📊 Chart visualization for budget trends
2. 🔔 Real-time notifications for urgent documents
3. 📈 Monthly/Yearly budget comparison
4. 🎯 Budget threshold alerts (80%, 90%)
5. 📤 Export dashboard to PDF/Excel
6. 🔍 Advanced filtering and search
7. 📱 Progressive Web App (PWA) support
8. 🌙 Dark mode theme

### 👥 Contributors

- **Developer**: Fadel Muhammad
- **Date**: January 6, 2026
- **Version**: 2.1.0

### 📝 Git Commits

```bash
# Main commits for this version:
9fbb91c - feat: Add budget percentage and enhance dashboard UI
a41ea69 - fix: Fix Surat Terbaru display and replace stats cards
```

### 🔗 Repository

- **GitHub**: https://github.com/fadelmuhammadgaming-prog/ecc.git
- **Branch**: main
- **Status**: ✅ Up to date

---

**Last Updated**: January 6, 2026
**Next Version**: 2.2.0 (Planned)
