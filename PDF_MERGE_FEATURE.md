# 📄 PDF Merge Feature - Protokol

## Overview

Fitur ini memungkinkan penggabungan semua file PDF yang telah di-upload dalam satu agenda protokol menjadi satu file PDF final.

## Features

### 1. Automatic PDF Merging
- Menggabungkan hingga 7 jenis dokumen PDF:
  - Upload Disposisi
  - Upload Etiket
  - Upload Materi
  - Upload Dokumentasi
  - Upload Laporan
  - Upload SPPD Final
  - Upload Boarding Pass

### 2. Smart Filtering
- Hanya menggabungkan file yang:
  - Memiliki ekstensi `.pdf`
  - File exists di server
  - File tidak kosong

### 3. Automatic Naming
- Format: `merged-protokol-{id}-{agenda}-{timestamp}.pdf`
- Example: `merged-protokol-1-Kunjungan_Kerja-1736181234567.pdf`

### 4. Auto-save as "SPPD Final"
- File hasil merge otomatis disimpan ke field `uploadSppdFinal`
- Dapat di-download langsung dari detail protokol

## Tech Stack

### Dependencies
```json
{
  "pdf-lib": "^1.17.1",
  "pdf-merger-js": "^5.1.2"
}
```

### Files Modified/Created

1. **`src/utils/pdfMerger.js`** (NEW)
   - `mergePDFs(pdfPaths, outputPath)` - Core merge function
   - `mergeProtokolPDFs(protokol)` - Protokol-specific merge
   - `getProtkolPDFStatus(protokol)` - Check available PDFs

2. **`src/routes/api.js`** (MODIFIED)
   - `GET /api/protokol/:id/pdf-status` - Get merge status
   - `POST /api/protokol/:id/merge-pdf` - Execute merge

3. **`src/views/protokol.ejs`** (MODIFIED)
   - Added "Merge PDF" button
   - Added `window.mergePDFs()` JavaScript function

## API Documentation

### 1. Get PDF Status

**Endpoint:** `GET /api/protokol/:id/pdf-status`

**Description:** Check how many PDFs are available for merging

**Response:**
```json
{
  "success": true,
  "data": {
    "protokolId": 1,
    "agendaDinas": "Kunjungan Kerja ke Provinsi Jawa Barat",
    "total": 7,
    "available": 3,
    "missing": 4,
    "files": [
      { "name": "Disposisi", "file": "disposisi-123.pdf" },
      { "name": "Materi", "file": "materi-456.pdf" },
      { "name": "Laporan", "file": "laporan-789.pdf" }
    ],
    "canMerge": true
  }
}
```

### 2. Merge PDFs

**Endpoint:** `POST /api/protokol/:id/merge-pdf`

**Description:** Merge all available PDFs into one file

**Request:**
- Method: POST
- No body required

**Response (Success):**
```json
{
  "success": true,
  "message": "PDF berhasil digabungkan",
  "data": {
    "protokolId": 1,
    "agendaDinas": "Kunjungan Kerja ke Provinsi Jawa Barat",
    "mergedFilename": "merged-protokol-1-Kunjungan_Kerja-1736181234567.pdf",
    "filesCount": 3,
    "downloadUrl": "/uploads/merged-protokol-1-Kunjungan_Kerja-1736181234567.pdf"
  }
}
```

**Response (Error - No PDFs):**
```json
{
  "success": false,
  "error": "Tidak ada file PDF yang dapat digabungkan"
}
```

**Response (Error - Not Found):**
```json
{
  "success": false,
  "error": "Protokol tidak ditemukan"
}
```

## Usage

### From Web UI

1. **Navigate to Protokol page:**
   - Login to ECC
   - Click "Protokol" menu

2. **Find protokol with uploaded PDFs:**
   - Scroll to protokol card that has PDF files

3. **Click "Merge PDF" button:**
   - Blue button with PDF icon
   - Confirm merge dialog

4. **Result:**
   - Success message with filename
   - Page auto-reload
   - Merged PDF saved as "SPPD Final"

### From API (cURL)

```bash
# Check PDF status
curl -X GET http://localhost:3000/api/protokol/1/pdf-status

# Merge PDFs
curl -X POST http://localhost:3000/api/protokol/1/merge-pdf

# Download merged PDF
curl -O http://localhost:3000/uploads/merged-protokol-1-Kunjungan_Kerja-1736181234567.pdf
```

### From JavaScript

```javascript
// Check status
const status = await fetch('/api/protokol/1/pdf-status');
const statusData = await status.json();
console.log(statusData.data.canMerge); // true/false

// Merge PDFs
const merge = await fetch('/api/protokol/1/merge-pdf', { method: 'POST' });
const mergeData = await merge.json();
console.log(mergeData.data.downloadUrl); // /uploads/merged-...pdf
```

## Database Schema

No changes to database schema required. Uses existing field:

```javascript
uploadSppdFinal: varchar('upload_sppd_final', { length: 255 })
```

Merged PDF is stored in this field, replacing previous value if any.

## File Storage

- **Location:** `/uploads/` directory
- **Format:** `merged-protokol-{id}-{sanitized-agenda}-{timestamp}.pdf`
- **Naming:** Sanitized agenda (alphanumeric + underscores only)
- **Timestamp:** Milliseconds since epoch for uniqueness

## Error Handling

### Common Errors:

1. **"No PDF files found to merge"**
   - Cause: No PDFs uploaded yet
   - Solution: Upload at least one PDF file first

2. **"Protokol tidak ditemukan"**
   - Cause: Invalid protokol ID
   - Solution: Check protokol exists in database

3. **"Failed to merge PDFs"**
   - Cause: Corrupted PDF or permission issue
   - Solution: Check uploaded PDFs are valid

## Security Considerations

1. **File Validation:**
   - Only `.pdf` extension allowed
   - File existence check before merging
   - Path sanitization to prevent directory traversal

2. **Authorization:**
   - Should add auth middleware to API endpoints
   - Currently relies on session authentication from web UI

3. **File Size:**
   - No explicit limit on merged PDF size
   - Consider adding `MAX_MERGED_PDF_SIZE` config

## Performance

### Metrics (Estimated):

- Small PDFs (< 1MB each, 3 files): ~500ms
- Medium PDFs (1-5MB each, 5 files): ~2-3 seconds
- Large PDFs (> 5MB each, 7 files): ~5-10 seconds

### Optimization Tips:

1. **Async Processing:**
   - Consider using job queue for large merges
   - Example: Bull, BullMQ, or RabbitMQ

2. **Caching:**
   - Cache merged PDFs if same files
   - Use filename hash for cache key

3. **Compression:**
   - Add PDF compression after merge
   - Use `pdf-lib` compression options

## Testing

### Manual Testing:

1. Create protokol with multiple PDFs
2. Click "Merge PDF" button
3. Verify merged PDF downloaded correctly
4. Check all pages present in order

### API Testing:

```bash
# Test status endpoint
curl http://localhost:3000/api/protokol/1/pdf-status | jq

# Test merge endpoint
curl -X POST http://localhost:3000/api/protokol/1/merge-pdf | jq
```

### Unit Testing (TODO):

```javascript
// Example test case
describe('PDF Merger', () => {
  it('should merge multiple PDFs', async () => {
    const files = ['file1.pdf', 'file2.pdf', 'file3.pdf'];
    const output = 'merged.pdf';
    const result = await mergePDFs(files, output);
    expect(result).toBe(output);
  });
});
```

## Future Enhancements

### Planned Features:

1. **Page Order Customization:**
   - Allow users to reorder pages before merge
   - Drag-and-drop interface

2. **Selective Merge:**
   - Checkboxes to select which PDFs to merge
   - Custom page ranges

3. **PDF Preview:**
   - Show preview of each PDF before merge
   - Thumbnail view

4. **Batch Merge:**
   - Merge PDFs for multiple protokols at once
   - Export as ZIP

5. **PDF Metadata:**
   - Add metadata to merged PDF
   - Author, title, creation date

6. **Watermark:**
   - Add watermark to merged PDF
   - Organization logo or "CONFIDENTIAL"

## Troubleshooting

### Issue: Merge button not working

**Solution:**
1. Check browser console for errors
2. Verify server is running
3. Check network tab for failed API calls

### Issue: Merged PDF is empty

**Solution:**
1. Verify source PDFs are not corrupted
2. Check file permissions on uploads folder
3. View server logs for merge errors

### Issue: Some pages missing in merged PDF

**Solution:**
1. Verify all source PDFs open correctly
2. Check if PDFs are password-protected
3. Try re-uploading problematic PDFs

## Support

For issues or questions:
- GitHub Issues: https://github.com/fadelmuhammadgaming-prog/ecc/issues
- Email: fadelmuhammad@example.com

## License

MIT License - Same as main ECC project

---

**Last Updated:** January 6, 2026  
**Version:** 1.0.0  
**Author:** Fadel Muhammad
