# 📄 Fitur Merge PDF untuk Protokol

## Overview

Fitur ini memungkinkan pengguna untuk menggabungkan semua file PDF yang sudah di-upload dalam satu agenda protokol menjadi satu file PDF gabungan (merged PDF).

## Features

✅ **Automatic PDF Detection** - Secara otomatis mendeteksi file PDF yang tersedia  
✅ **Multi-File Support** - Menggabungkan hingga 7 jenis dokumen PDF  
✅ **Smart Validation** - Hanya file PDF yang valid yang akan digabungkan  
✅ **Progress Indicator** - Loading state saat proses merge berlangsung  
✅ **Download Link** - Link download otomatis untuk file hasil merge  
✅ **Timestamp Tracking** - Informasi kapan PDF digabungkan

## Dokumen yang Dapat Digabungkan

1. **Disposisi** - Surat disposisi
2. **Etiket** - Etiket hotel dan pesawat
3. **Materi** - Materi kegiatan
4. **Dokumentasi** - Dokumentasi kegiatan
5. **Laporan** - Laporan kegiatan
6. **SPPD Final** - SPPD final
7. **Boarding Pass** - Boarding pass

## How It Works

### 1. Database Schema

Ditambahkan kolom `merged_pdf` di table `protokol`:

\`\`\`sql
ALTER TABLE protokol ADD COLUMN merged_pdf VARCHAR(255);
\`\`\`

### 2. Backend Implementation

**File:** `src/utils/pdfMerger.js`

\`\`\`javascript
// Merge multiple PDFs
export async function mergePDFs(pdfPaths, outputPath)

// Merge all protokol PDFs
export async function mergeProtokolPDFs(protokol)

// Get PDF merge status
export function getProtkolPDFStatus(protokol)
\`\`\`

**API Endpoint:** `POST /api/protokol/:id/merge-pdf`

\`\`\`javascript
router.post('/protokol/:id/merge-pdf', async (req, res) => {
  // 1. Fetch protokol record
  // 2. Validate PDFs available
  // 3. Merge PDFs using pdf-merger-js
  // 4. Save to uploads directory
  // 5. Update database with merged filename
  // 6. Return success response
});
\`\`\`

### 3. Frontend Implementation

**File:** `src/views/protokol.ejs`

#### Button UI

\`\`\`html
<button class="btn btn-sm btn-primary" 
        onclick="window.mergePDFs(<%= item.id %>)">
  <i class="bi bi-file-earmark-pdf-fill me-1"></i>Merge PDF
</button>
\`\`\`

#### Merged PDF Display

\`\`\`html
<% if (item.mergedPdf) { %>
  <div class="mt-3 p-3 bg-success bg-opacity-10 rounded">
    <h6 class="text-success mb-2">
      <i class="bi bi-check-circle-fill me-2"></i>PDF Gabungan Tersedia
    </h6>
    <a href="/uploads/<%= item.mergedPdf %>" 
       target="_blank" 
       class="btn btn-sm btn-success">
      <i class="bi bi-download me-1"></i>Download PDF Gabungan
    </a>
  </div>
<% } %>
\`\`\`

#### JavaScript Function

\`\`\`javascript
window.mergePDFs = async function(id) {
  // 1. Show confirmation dialog
  // 2. Call API endpoint with fetch
  // 3. Show loading indicator
  // 4. Handle response
  // 5. Reload page to show merged PDF
}
\`\`\`

## Usage

### Step 1: Upload Files

Upload file-file PDF untuk protokol (minimal 1 file PDF).

### Step 2: Click Merge PDF Button

Klik tombol **"Merge PDF"** pada card protokol yang ingin digabungkan.

### Step 3: Confirmation

Dialog konfirmasi akan muncul menampilkan jenis file yang akan digabungkan.

### Step 4: Processing

Loading indicator muncul saat proses merge berlangsung (biasanya 2-5 detik).

### Step 5: Success

Setelah berhasil, section hijau akan muncul menampilkan:
- Status "PDF Gabungan Tersedia"
- Tombol download
- Timestamp pembuatan

## API Response

### Success Response

\`\`\`json
{
  "success": true,
  "message": "Berhasil menggabungkan 5 file PDF",
  "data": {
    "protokolId": 1,
    "agendaDinas": "Kunjungan Kerja ke Provinsi Jawa Barat",
    "mergedFilename": "merged-protokol-1-Kunjungan_Kerja-1736153849123.pdf",
    "filesCount": 5,
    "filesMerged": ["Disposisi", "Etiket", "Materi", "Dokumentasi", "Laporan"],
    "downloadUrl": "/uploads/merged-protokol-1-Kunjungan_Kerja-1736153849123.pdf"
  }
}
\`\`\`

### Error Response

\`\`\`json
{
  "success": false,
  "error": "Tidak ada file PDF yang dapat digabungkan",
  "details": "Ditemukan 0 dari 7 file PDF"
}
\`\`\`

## File Naming Convention

Format: `merged-protokol-{ID}-{SanitizedAgenda}-{Timestamp}.pdf`

Example: `merged-protokol-1-Kunjungan_Kerja_ke_Provinsi_Jawa_Barat-1736153849123.pdf`

## Technical Details

### Dependencies

\`\`\`json
{
  "pdf-merger-js": "^5.1.2",
  "pdf-lib": "^1.17.1"
}
\`\`\`

### Error Handling

1. **No PDFs Found**
   - Error: "Tidak ada file PDF yang ditemukan untuk digabungkan"
   - User needs to upload at least one PDF file

2. **File Not Found**
   - Skips missing files automatically
   - Logs warning to console
   - Merges available PDFs only

3. **Merge Failed**
   - Shows detailed error message
   - Restores button state
   - Logs error to server console

### Logging

Server console shows detailed merge process:

\`\`\`
🔄 === MERGE PDF REQUEST ===
📋 Protokol ID: 1
📄 Agenda: Kunjungan Kerja ke Provinsi Jawa Barat
📊 PDF Status: { available: 5, canMerge: true }
🔍 Starting PDF merge process...
📁 PDF paths to merge: ['file1.pdf', 'file2.pdf', ...]
✅ Valid PDF found: file1.pdf
✅ Valid PDF found: file2.pdf
📚 Total PDFs to merge: 5
📄 Adding PDF: file1.pdf
💾 Saving merged PDF to: /uploads/merged-protokol-1-...pdf
✅ PDF merge completed successfully!
=== MERGE COMPLETE ===
\`\`\`

## Performance

- **Average Time:** 2-5 seconds for 5 PDF files
- **File Size:** Output file size = sum of input files + overhead (~5%)
- **Memory Usage:** Minimal (streaming approach)

## Security Considerations

✅ **File Type Validation** - Only .pdf files accepted  
✅ **Path Sanitization** - Prevents directory traversal  
✅ **Size Limits** - Inherits from multer config (5MB per file)  
✅ **Session Authentication** - Requires logged in user

## Future Enhancements

- [ ] Add page order customization
- [ ] Add bookmarks/table of contents
- [ ] Support for password-protected PDFs
- [ ] Compression options
- [ ] Email notification after merge
- [ ] Background job processing for large files
- [ ] Preview merged PDF before download

## Troubleshooting

### Issue: "No PDFs found to merge"

**Cause:** No PDF files uploaded or wrong file format

**Solution:** Upload at least one PDF file first

### Issue: "File not found"

**Cause:** File was deleted from uploads folder

**Solution:** Re-upload the missing file

### Issue: "Merge failed"

**Cause:** Corrupted PDF or invalid PDF structure

**Solution:** Check file integrity, try re-uploading

## Testing

### Manual Test Steps

1. Create protokol with ID 1
2. Upload PDFs: disposisi.pdf, etiket.pdf, materi.pdf
3. Click "Merge PDF" button
4. Verify success message shows "3 file PDF"
5. Check merged PDF section appears
6. Download and verify merged PDF content
7. Check database: `SELECT merged_pdf FROM protokol WHERE id = 1;`

### API Test with curl

\`\`\`bash
# Merge PDFs for protokol ID 1
curl -X POST http://localhost:3000/api/protokol/1/merge-pdf \\
  -H "Content-Type: application/json"

# Expected response:
{
  "success": true,
  "message": "Berhasil menggabungkan 5 file PDF",
  ...
}
\`\`\`

## References

- [pdf-merger-js Documentation](https://www.npmjs.com/package/pdf-merger-js)
- [pdf-lib Documentation](https://pdf-lib.js.org/)
- [Multer Configuration](../src/config/upload.js)

---

**Created:** January 6, 2026  
**Author:** Fadel Muhammad  
**Version:** 1.0.0
