import PDFMerger from 'pdf-merger-js';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Convert image file to PDF
 * @param {string} imagePath - Path to image file
 * @param {string} outputPath - Output PDF path
 * @returns {Promise<string>} - Path to converted PDF
 */
async function convertImageToPDF(imagePath, outputPath) {
  try {
    const imageBytes = fs.readFileSync(imagePath);
    const pdfDoc = await PDFDocument.create();
    
    let image;
    const ext = path.extname(imagePath).toLowerCase();
    
    if (ext === '.png') {
      image = await pdfDoc.embedPng(imageBytes);
    } else if (ext === '.jpg' || ext === '.jpeg') {
      image = await pdfDoc.embedJpg(imageBytes);
    } else {
      throw new Error(`Unsupported image format: ${ext}`);
    }
    
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
    
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
    
    return outputPath;
  } catch (error) {
    console.error('❌ Image to PDF conversion error:', error);
    throw error;
  }
}

/**
 * Merge multiple PDF files into one (with auto-conversion for images)
 * @param {Array<string>} filePaths - Array of file paths to merge (PDF or images)
 * @param {string} outputPath - Output filename for merged PDF
 * @returns {Promise<string>} - Path to merged PDF
 */
export async function mergePDFs(filePaths, outputPath) {
  const tempFiles = []; // Track temp files for cleanup
  
  try {
    console.log('🔍 Starting PDF merge process...');
    console.log('📁 Files to merge:', filePaths);
    
    // Get absolute path to uploads directory
    const uploadsDir = path.join(__dirname, '../../uploads');
    console.log('📂 Uploads directory:', uploadsDir);
    
    // Process files - convert images to PDF if needed
    const pdfFiles = [];
    
    for (const filePath of filePaths) {
      if (!filePath) continue;
      
      const fullPath = path.join(uploadsDir, filePath);
      console.log(`🔎 Checking file: ${fullPath}`);
      
      if (!fs.existsSync(fullPath)) {
        console.log(`❌ File not found: ${filePath}`);
        continue;
      }
      
      const ext = path.extname(fullPath).toLowerCase();
      
      if (ext === '.pdf') {
        // Already PDF, use directly
        pdfFiles.push(fullPath);
        console.log(`✅ PDF file: ${filePath}`);
      } else if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        // Convert image to PDF first
        console.log(`🖼️  Converting image to PDF: ${filePath}`);
        const tempPdfPath = path.join(uploadsDir, `temp-${Date.now()}-${path.basename(filePath)}.pdf`);
        
        await convertImageToPDF(fullPath, tempPdfPath);
        pdfFiles.push(tempPdfPath);
        tempFiles.push(tempPdfPath); // Mark for cleanup
        
        console.log(`✅ Converted to PDF: ${path.basename(tempPdfPath)}`);
      } else {
        console.log(`⚠️  Skipping unsupported file: ${filePath} (${ext})`);
      }
    }

    if (pdfFiles.length === 0) {
      throw new Error('No valid files found to merge (need PDF or image files)');
    }

    console.log(`📚 Total files to merge: ${pdfFiles.length}`);

    // Create merger instance
    const merger = new PDFMerger();

    // Add PDFs to merger
    for (const pdfPath of pdfFiles) {
      console.log(`📄 Adding PDF: ${path.basename(pdfPath)}`);
      await merger.add(pdfPath);
    }

    // Save merged PDF
    const outputFullPath = path.join(uploadsDir, outputPath);
    console.log(`💾 Saving merged PDF to: ${outputFullPath}`);
    await merger.save(outputFullPath);

    // Cleanup temp files
    for (const tempFile of tempFiles) {
      try {
        fs.unlinkSync(tempFile);
        console.log(`🗑️  Cleaned up temp file: ${path.basename(tempFile)}`);
      } catch (err) {
        console.warn(`⚠️  Failed to cleanup temp file: ${tempFile}`);
      }
    }

    console.log(`✅ PDF merge completed successfully!`);
    return outputPath;
  } catch (error) {
    // Cleanup temp files on error
    for (const tempFile of tempFiles) {
      try {
        if (fs.existsSync(tempFile)) {
          fs.unlinkSync(tempFile);
        }
      } catch (err) {
        // Ignore cleanup errors
      }
    }
    
    console.error('❌ PDF Merge Error:', error);
    throw new Error(`Failed to merge files: ${error.message}`);
  }
}

/**
 * Merge all uploads for a protokol record (PDFs and images)
 * @param {Object} protokol - Protokol record with upload fields
 * @returns {Promise<string>} - Filename of merged PDF
 */
export async function mergeProtokolPDFs(protokol) {
  try {
    console.log('🔄 Starting protokol file merge...');
    console.log('📋 Protokol ID:', protokol.id);
    console.log('📋 Agenda:', protokol.agendaDinas);
    
    // Get all upload fields (PDFs and images)
    const uploadFields = [
      { name: 'Disposisi', file: protokol.uploadDisposisi },
      { name: 'Etiket', file: protokol.uploadEtiket },
      { name: 'Materi', file: protokol.uploadMateri },
      { name: 'Dokumentasi', file: protokol.uploadDokumentasi },
      { name: 'Laporan', file: protokol.uploadLaporan },
      { name: 'SPPD Final', file: protokol.uploadSppdFinal },
      { name: 'Boarding Pass', file: protokol.uploadBoardingPass }
    ];

    // Filter only files that exist (PDF or images)
    const uploadsDir = path.join(__dirname, '../../uploads');
    const validFiles = [];
    const supportedFormats = ['.pdf', '.png', '.jpg', '.jpeg'];
    
    for (const field of uploadFields) {
      if (!field.file) continue;
      
      const fullPath = path.join(uploadsDir, field.file);
      if (fs.existsSync(fullPath)) {
        const ext = path.extname(fullPath).toLowerCase();
        if (supportedFormats.includes(ext)) {
          validFiles.push(field.file);
          const fileType = ext === '.pdf' ? 'PDF' : 'Image';
          console.log(`✅ ${field.name} (${fileType}): ${field.file}`);
        } else {
          console.log(`⚠️  ${field.name}: Format tidak didukung (${ext})`);
        }
      } else {
        console.log(`❌ ${field.name}: File tidak ditemukan`);
      }
    }

    if (validFiles.length === 0) {
      throw new Error('Tidak ada file yang ditemukan untuk digabungkan (PDF atau gambar)');
    }

    console.log(`📚 Total file yang akan digabungkan: ${validFiles.length}`);

    // Generate output filename
    const timestamp = Date.now();
    const sanitizedAgenda = protokol.agendaDinas
      ? protokol.agendaDinas.replace(/[^a-z0-9]/gi, '_').substring(0, 50)
      : 'protokol';
    const outputFilename = `merged-protokol-${protokol.id}-${sanitizedAgenda}-${timestamp}.pdf`;

    console.log(`📝 Output filename: ${outputFilename}`);

    // Merge files (will auto-convert images to PDF)
    await mergePDFs(validFiles, outputFilename);

    return outputFilename;
  } catch (error) {
    console.error('❌ Protokol File Merge Error:', error);
    throw error;
  }
}

/**
 * Get merge status for a protokol (how many files available - PDF or images)
 * @param {Object} protokol - Protokol record
 * @returns {Object} - Merge status info
 */
export function getProtkolPDFStatus(protokol) {
  const uploadFields = [
    { name: 'Disposisi', file: protokol.uploadDisposisi },
    { name: 'Etiket', file: protokol.uploadEtiket },
    { name: 'Materi', file: protokol.uploadMateri },
    { name: 'Dokumentasi', file: protokol.uploadDokumentasi },
    { name: 'Laporan', file: protokol.uploadLaporan },
    { name: 'SPPD Final', file: protokol.uploadSppdFinal },
    { name: 'Boarding Pass', file: protokol.uploadBoardingPass }
  ];

  const supportedFormats = ['.pdf', '.png', '.jpg', '.jpeg'];
  const availableFiles = uploadFields.filter(field => {
    if (!field.file) return false;
    const fullPath = path.join(__dirname, '../../uploads', field.file);
    if (!fs.existsSync(fullPath)) return false;
    
    const ext = path.extname(fullPath).toLowerCase();
    return supportedFormats.includes(ext);
  });

  return {
    total: uploadFields.length,
    available: availableFiles.length,
    missing: uploadFields.length - availableFiles.length,
    files: availableFiles,
    canMerge: availableFiles.length > 0
  };
}
