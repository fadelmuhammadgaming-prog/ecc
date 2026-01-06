import express from 'express';
import { db } from '../db/index.js';
import { users, agenda, surat, contact, anggaran, protokol } from '../db/schema.js';
import { eq, desc, sql } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { upload } from '../config/upload.js';

const router = express.Router();

// ==================== USERS / LOGIN API ====================

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Username dan password harus diisi' 
      });
    }
    
    const user = await db.select().from(users).where(eq(users.username, username)).limit(1);
    
    if (user.length === 0) {
      return res.status(401).json({ success: false, error: 'Username atau password salah' });
    }
    
    const validPassword = await bcrypt.compare(password, user[0].password);
    
    if (!validPassword) {
      return res.status(401).json({ success: false, error: 'Username atau password salah' });
    }
    
    // Check if user is active
    if (!user[0].isActive) {
      return res.status(401).json({ success: false, error: 'Akun tidak aktif' });
    }
    
    // Store user in session (both user and userId for compatibility)
    req.session.userId = user[0].id;
    req.session.user = {
      id: user[0].id,
      username: user[0].username,
      nama: user[0].nama,
      role: user[0].role,
      divisi: user[0].divisi,
      jobTitle: user[0].jobTitle,
    };
    
    const { password: _, ...userWithoutPassword } = user[0];
    res.json({ 
      success: true, 
      message: 'Login berhasil',
      data: userWithoutPassword 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Terjadi kesalahan server' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: 'Logged out successfully' });
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const allUsers = await db.select({
      id: users.id,
      username: users.username,
      email: users.email,
      nama: users.nama,
      divisi: users.divisi,
      jobTitle: users.jobTitle,
      role: users.role,
      isActive: users.isActive,
      createdAt: users.createdAt,
    }).from(users);
    
    res.json({ success: true, data: allUsers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await db.select({
      id: users.id,
      username: users.username,
      email: users.email,
      nama: users.nama,
      divisi: users.divisi,
      jobTitle: users.jobTitle,
      role: users.role,
      isActive: users.isActive,
      createdAt: users.createdAt,
    }).from(users).where(eq(users.id, parseInt(req.params.id)));
    
    if (user.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    res.json({ success: true, data: user[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new user
router.post('/users', async (req, res) => {
  try {
    const { username, password, email, nama, divisi, jobTitle, role } = req.body;
    
    if (!username || !password || !email || !nama || !role) {
      return res.status(400).json({ 
        success: false, 
        error: 'Username, password, email, nama, and role are required' 
      });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await db.insert(users).values({
      username,
      password: hashedPassword,
      email,
      nama,
      divisi: divisi || null,
      jobTitle: jobTitle || null,
      role,
    }).returning();
    
    const { password: _, ...userWithoutPassword } = newUser[0];
    res.status(201).json({ success: true, data: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update user
router.put('/users/:id', async (req, res) => {
  try {
    const { nama, divisi, jobTitle, role, isActive } = req.body;
    
    const updatedUser = await db.update(users)
      .set({ 
        nama, 
        divisi, 
        jobTitle, 
        role, 
        isActive,
        updatedAt: new Date() 
      })
      .where(eq(users.id, parseInt(req.params.id)))
      .returning();
    
    if (updatedUser.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    const { password: _, ...userWithoutPassword } = updatedUser[0];
    res.json({ success: true, data: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await db.delete(users)
      .where(eq(users.id, parseInt(req.params.id)))
      .returning();
    
    if (deletedUser.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== AGENDA API ====================

// Get all agenda
router.get('/agenda', async (req, res) => {
  try {
    const { status, tanggal } = req.query;
    let query = db.select().from(agenda);
    
    if (status) {
      query = query.where(eq(agenda.status, status));
    }
    
    const allAgenda = await query.orderBy(desc(agenda.tanggal));
    res.json({ success: true, data: allAgenda });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get agenda by ID
router.get('/agenda/:id', async (req, res) => {
  try {
    const result = await db.select().from(agenda).where(eq(agenda.id, parseInt(req.params.id)));
    
    if (result.length === 0) {
      return res.status(404).json({ success: false, error: 'Agenda not found' });
    }
    
    res.json({ success: true, data: result[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create agenda
router.post('/agenda', async (req, res) => {
  try {
    const { tanggal, waktu, kegiatan, lokasi, pesertaInternal, pesertaExternal, status } = req.body;
    
    if (!tanggal || !waktu || !kegiatan) {
      return res.status(400).json({ 
        success: false, 
        error: 'Tanggal, waktu, and kegiatan are required' 
      });
    }
    
    const newAgenda = await db.insert(agenda).values({
      tanggal,
      waktu,
      kegiatan,
      lokasi: lokasi || null,
      pesertaInternal: pesertaInternal || null,
      pesertaExternal: pesertaExternal || null,
      status: status || 'ON SCHEDULE',
      createdBy: req.session?.user?.id || null,
    }).returning();
    
    res.status(201).json({ success: true, data: newAgenda[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update agenda
router.put('/agenda/:id', async (req, res) => {
  try {
    const { tanggal, waktu, kegiatan, lokasi, pesertaInternal, pesertaExternal, status } = req.body;
    
    const updatedAgenda = await db.update(agenda)
      .set({ 
        tanggal, 
        waktu, 
        kegiatan, 
        lokasi, 
        pesertaInternal, 
        pesertaExternal, 
        status,
        updatedAt: new Date()
      })
      .where(eq(agenda.id, parseInt(req.params.id)))
      .returning();
    
    if (updatedAgenda.length === 0) {
      return res.status(404).json({ success: false, error: 'Agenda not found' });
    }
    
    res.json({ success: true, data: updatedAgenda[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete agenda
router.delete('/agenda/:id', async (req, res) => {
  try {
    const deletedAgenda = await db.delete(agenda)
      .where(eq(agenda.id, parseInt(req.params.id)))
      .returning();
    
    if (deletedAgenda.length === 0) {
      return res.status(404).json({ success: false, error: 'Agenda not found' });
    }
    
    res.json({ success: true, message: 'Agenda deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== SURAT API ====================

// Get all surat
router.get('/surat', async (req, res) => {
  try {
    const { statusSurat, urgensi, jenisSurat } = req.query;
    const allSurat = await db.select().from(surat).orderBy(desc(surat.tglRekam));
    res.json({ success: true, data: allSurat });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get surat by ID
router.get('/surat/:id', async (req, res) => {
  try {
    const result = await db.select().from(surat).where(eq(surat.id, parseInt(req.params.id)));
    
    if (result.length === 0) {
      return res.status(404).json({ success: false, error: 'Surat not found' });
    }
    
    res.json({ success: true, data: result[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create surat (with file upload)
router.post('/surat', upload.single('uploadSurat'), async (req, res) => {
  try {
    const { idSurat, jenisSurat, noMemoSurat, statusSurat, urgensi } = req.body;
    
    if (!idSurat || !jenisSurat) {
      return res.status(400).json({ 
        success: false, 
        error: 'ID Surat and Jenis Surat are required' 
      });
    }
    
    // Get user from session
    const user = req.session?.user;
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'User not authenticated' 
      });
    }
    
    // Get file path if uploaded
    const uploadPath = req.file ? `/uploads/${req.file.filename}` : null;
    
    const newSurat = await db.insert(surat).values({
      idSurat,
      kodeUser: user.id,
      namaUser: user.nama,
      jenisSurat,
      noMemoSurat: noMemoSurat || null,
      statusSurat: statusSurat || 'BELUM',
      urgensi: urgensi || 'BIASA',
      uploadSurat: uploadPath,
    }).returning();
    
    res.status(201).json({ success: true, data: newSurat[0] });
  } catch (error) {
    console.error('Create surat error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update surat (with optional file upload)
router.put('/surat/:id', upload.single('uploadSurat'), async (req, res) => {
  try {
    const { jenisSurat, noMemoSurat, statusSurat, urgensi } = req.body;
    
    // Prepare update data
    const updateData = { 
      jenisSurat, 
      noMemoSurat, 
      statusSurat, 
      urgensi,
      updatedAt: new Date()
    };
    
    // Add file path if new file uploaded
    if (req.file) {
      updateData.uploadSurat = `/uploads/${req.file.filename}`;
    }
    
    const updatedSurat = await db.update(surat)
      .set(updateData)
      .where(eq(surat.id, parseInt(req.params.id)))
      .returning();
    
    if (updatedSurat.length === 0) {
      return res.status(404).json({ success: false, error: 'Surat not found' });
    }
    
    res.json({ success: true, data: updatedSurat[0] });
  } catch (error) {
    console.error('Update surat error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete surat
router.delete('/surat/:id', async (req, res) => {
  try {
    const deletedSurat = await db.delete(surat)
      .where(eq(surat.id, parseInt(req.params.id)))
      .returning();
    
    if (deletedSurat.length === 0) {
      return res.status(404).json({ success: false, error: 'Surat not found' });
    }
    
    res.json({ success: true, message: 'Surat deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== CONTACT API ====================

// Get all contacts
router.get('/contact', async (req, res) => {
  try {
    const allContacts = await db.select().from(contact).orderBy(contact.nama);
    res.json({ success: true, data: allContacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get contact by ID
router.get('/contact/:id', async (req, res) => {
  try {
    const result = await db.select().from(contact).where(eq(contact.id, parseInt(req.params.id)));
    
    if (result.length === 0) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }
    
    res.json({ success: true, data: result[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create contact
router.post('/contact', async (req, res) => {
  try {
    const { nama, instansi, jabatan, noTelepon } = req.body;
    
    if (!nama) {
      return res.status(400).json({ 
        success: false, 
        error: 'Nama is required' 
      });
    }
    
    const newContact = await db.insert(contact).values({
      nama,
      instansi: instansi || null,
      jabatan: jabatan || null,
      noTelepon: noTelepon || null,
      createdBy: req.session?.user?.id || null,
    }).returning();
    
    res.status(201).json({ success: true, data: newContact[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update contact
router.put('/contact/:id', async (req, res) => {
  try {
    const { nama, instansi, jabatan, noTelepon } = req.body;
    
    const updatedContact = await db.update(contact)
      .set({ 
        nama, 
        instansi, 
        jabatan, 
        noTelepon,
        updatedAt: new Date()
      })
      .where(eq(contact.id, parseInt(req.params.id)))
      .returning();
    
    if (updatedContact.length === 0) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }
    
    res.json({ success: true, data: updatedContact[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete contact
router.delete('/contact/:id', async (req, res) => {
  try {
    const deletedContact = await db.delete(contact)
      .where(eq(contact.id, parseInt(req.params.id)))
      .returning();
    
    if (deletedContact.length === 0) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }
    
    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== ANGGARAN API ====================

// Get all anggaran
router.get('/anggaran', async (req, res) => {
  try {
    const { tahunAnggaran } = req.query;
    const allAnggaran = await db.select().from(anggaran).orderBy(anggaran.mataAnggaran);
    res.json({ success: true, data: allAnggaran });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get anggaran summary
router.get('/anggaran/summary', async (req, res) => {
  try {
    const summary = await db.select({
      totalPagu: sql`SUM(${anggaran.pagu})`,
      totalRealisasi: sql`SUM(${anggaran.realisasi})`,
      totalSisa: sql`SUM(${anggaran.sisa})`,
      persentaseRealisasi: sql`ROUND((SUM(${anggaran.realisasi}) / SUM(${anggaran.pagu}) * 100), 2)`,
    }).from(anggaran);
    
    res.json({ success: true, data: summary[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get anggaran by ID
router.get('/anggaran/:id', async (req, res) => {
  try {
    const result = await db.select().from(anggaran).where(eq(anggaran.id, parseInt(req.params.id)));
    
    if (result.length === 0) {
      return res.status(404).json({ success: false, error: 'Anggaran not found' });
    }
    
    res.json({ success: true, data: result[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create anggaran
router.post('/anggaran', async (req, res) => {
  try {
    const { mataAnggaran, pagu, realisasi, tahunAnggaran } = req.body;
    
    if (!mataAnggaran || !pagu || !tahunAnggaran) {
      return res.status(400).json({ 
        success: false, 
        error: 'Mata Anggaran, Pagu, and Tahun Anggaran are required' 
      });
    }
    
    const realValue = parseFloat(realisasi || 0);
    const paguValue = parseFloat(pagu);
    const sisaValue = paguValue - realValue;
    
    const newAnggaran = await db.insert(anggaran).values({
      mataAnggaran,
      pagu: paguValue.toString(),
      realisasi: realValue.toString(),
      sisa: sisaValue.toString(),
      tahunAnggaran,
      createdBy: req.session?.user?.id || null,
    }).returning();
    
    res.status(201).json({ success: true, data: newAnggaran[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update anggaran
router.put('/anggaran/:id', async (req, res) => {
  try {
    const { mataAnggaran, pagu, realisasi, tahunAnggaran } = req.body;
    
    const realValue = parseFloat(realisasi);
    const paguValue = parseFloat(pagu);
    const sisaValue = paguValue - realValue;
    
    const updatedAnggaran = await db.update(anggaran)
      .set({ 
        mataAnggaran, 
        pagu: paguValue.toString(), 
        realisasi: realValue.toString(), 
        sisa: sisaValue.toString(),
        tahunAnggaran,
        updatedAt: new Date()
      })
      .where(eq(anggaran.id, parseInt(req.params.id)))
      .returning();
    
    if (updatedAnggaran.length === 0) {
      return res.status(404).json({ success: false, error: 'Anggaran not found' });
    }
    
    res.json({ success: true, data: updatedAnggaran[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete anggaran
router.delete('/anggaran/:id', async (req, res) => {
  try {
    const deletedAnggaran = await db.delete(anggaran)
      .where(eq(anggaran.id, parseInt(req.params.id)))
      .returning();
    
    if (deletedAnggaran.length === 0) {
      return res.status(404).json({ success: false, error: 'Anggaran not found' });
    }
    
    res.json({ success: true, message: 'Anggaran deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== PROTOKOL API ====================

// Get all protokol
router.get('/protokol', async (req, res) => {
  try {
    const allProtokol = await db.select().from(protokol).orderBy(desc(protokol.tanggalRekam));
    
    // Set cache control headers to prevent 304
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    
    res.json({ success: true, data: allProtokol });

    
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get protokol by ID
router.get('/protokol/:id', async (req, res) => {
  try {
    const result = await db.select().from(protokol).where(eq(protokol.id, parseInt(req.params.id)));
    
    if (result.length === 0) {
      return res.status(404).json({ success: false, error: 'Protokol not found' });
    }
    
    // Set cache control headers to prevent 304
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create protokol with file uploads
router.post('/protokol', upload.fields([
  { name: 'uploadDisposisi', maxCount: 1 },
  { name: 'uploadEtiket', maxCount: 1 },
  { name: 'uploadMateri', maxCount: 1 },
  { name: 'uploadDokumentasi', maxCount: 1 },
  { name: 'uploadLaporan', maxCount: 1 },
  { name: 'uploadSppdFinal', maxCount: 1 },
  { name: 'uploadBoardingPass', maxCount: 1 }
]), async (req, res) => {
  try {
    const { agendaDinas, tglKegiatan, noSppd, checklistKebutuhan, monitoringPelaksanaan } = req.body;
    
    if (!agendaDinas || !tglKegiatan) {
      return res.status(400).json({ 
        success: false, 
        error: 'Agenda Dinas dan Tanggal Kegiatan harus diisi' 
      });
    }
    
    const user = req.session?.user;
    
    // Get file paths from uploaded files
    const files = req.files || {};
    
    const newProtokol = await db.insert(protokol).values({
      kodeUser: user?.id || null,
      namaUser: user?.nama || null,
      agendaDinas,
      tglKegiatan,
      noSppd: noSppd || null,
      checklistKebutuhan: checklistKebutuhan || null,
      monitoringPelaksanaan: monitoringPelaksanaan || null,
      uploadDisposisi: files.uploadDisposisi ? files.uploadDisposisi[0].filename : null,
      uploadEtiket: files.uploadEtiket ? files.uploadEtiket[0].filename : null,
      uploadMateri: files.uploadMateri ? files.uploadMateri[0].filename : null,
      uploadDokumentasi: files.uploadDokumentasi ? files.uploadDokumentasi[0].filename : null,
      uploadLaporan: files.uploadLaporan ? files.uploadLaporan[0].filename : null,
      uploadSppdFinal: files.uploadSppdFinal ? files.uploadSppdFinal[0].filename : null,
      uploadBoardingPass: files.uploadBoardingPass ? files.uploadBoardingPass[0].filename : null,
    }).returning();
    
    res.status(201).json({ success: true, data: newProtokol[0] });
  } catch (error) {
    console.error('Create protokol error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update protokol with optional file uploads
router.put('/protokol/:id', upload.fields([
  { name: 'uploadDisposisi', maxCount: 1 },
  { name: 'uploadEtiket', maxCount: 1 },
  { name: 'uploadMateri', maxCount: 1 },
  { name: 'uploadDokumentasi', maxCount: 1 },
  { name: 'uploadLaporan', maxCount: 1 },
  { name: 'uploadSppdFinal', maxCount: 1 },
  { name: 'uploadBoardingPass', maxCount: 1 }
]), async (req, res) => {
  try {
    const { agendaDinas, tglKegiatan, noSppd, checklistKebutuhan, monitoringPelaksanaan } = req.body;
    
    // Get existing protokol first
    const existing = await db.select().from(protokol).where(eq(protokol.id, parseInt(req.params.id)));
    if (existing.length === 0) {
      return res.status(404).json({ success: false, error: 'Protokol tidak ditemukan' });
    }
    
    // Get file paths from uploaded files (if any)
    const files = req.files || {};
    
    // Build update object - keep existing files if not replaced
    const updateData = {
      agendaDinas,
      tglKegiatan,
      noSppd: noSppd || null,
      checklistKebutuhan: checklistKebutuhan || null,
      monitoringPelaksanaan: monitoringPelaksanaan || null,
      uploadDisposisi: files.uploadDisposisi ? files.uploadDisposisi[0].filename : existing[0].uploadDisposisi,
      uploadEtiket: files.uploadEtiket ? files.uploadEtiket[0].filename : existing[0].uploadEtiket,
      uploadMateri: files.uploadMateri ? files.uploadMateri[0].filename : existing[0].uploadMateri,
      uploadDokumentasi: files.uploadDokumentasi ? files.uploadDokumentasi[0].filename : existing[0].uploadDokumentasi,
      uploadLaporan: files.uploadLaporan ? files.uploadLaporan[0].filename : existing[0].uploadLaporan,
      uploadSppdFinal: files.uploadSppdFinal ? files.uploadSppdFinal[0].filename : existing[0].uploadSppdFinal,
      uploadBoardingPass: files.uploadBoardingPass ? files.uploadBoardingPass[0].filename : existing[0].uploadBoardingPass,
      updatedAt: new Date()
    };
    
    const updatedProtokol = await db.update(protokol)
      .set(updateData)
      .where(eq(protokol.id, parseInt(req.params.id)))
      .returning();
    
    res.json({ success: true, data: updatedProtokol[0] });
  } catch (error) {
    console.error('Update protokol error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete protokol
router.delete('/protokol/:id', async (req, res) => {
  try {
    const deletedProtokol = await db.delete(protokol)
      .where(eq(protokol.id, parseInt(req.params.id)))
      .returning();
    
    if (deletedProtokol.length === 0) {
      return res.status(404).json({ success: false, error: 'Protokol not found' });
    }
    
    res.json({ success: true, message: 'Protokol deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== DASHBOARD API ====================

// Dashboard statistics
router.get('/dashboard/stats', async (req, res) => {
  try {
    // Get anggaran summary
    const anggaranSummary = await db.select({
      totalPagu: sql`SUM(${anggaran.pagu})`,
      totalRealisasi: sql`SUM(${anggaran.realisasi})`,
      persentase: sql`ROUND((SUM(${anggaran.realisasi}) / NULLIF(SUM(${anggaran.pagu}), 0) * 100), 2)`,
    }).from(anggaran);
    
    // Get today's agenda count
    const today = new Date().toISOString().split('T')[0];
    const todayAgenda = await db.select({ count: sql`COUNT(*)` })
      .from(agenda)
      .where(eq(agenda.tanggal, today));
    
    // Get active agenda count
    const activeAgenda = await db.select({ count: sql`COUNT(*)` })
      .from(agenda)
      .where(eq(agenda.status, 'ON SCHEDULE'));
    
    // Get urgent surat count
    const urgentSurat = await db.select({ count: sql`COUNT(*)` })
      .from(surat)
      .where(eq(surat.urgensi, 'MENDESAK'));
    
    res.json({ 
      success: true, 
      data: {
        anggaran: anggaranSummary[0],
        agendaHariIni: todayAgenda[0].count,
        agendaAktif: activeAgenda[0].count,
        suratMendesak: urgentSurat[0].count,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
