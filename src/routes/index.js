import express from 'express';
import { db } from '../db/index.js';
import { users, agenda, surat, contact, anggaran, protokol } from '../db/schema.js';
import { eq, sql, desc as descOrder } from 'drizzle-orm';

const router = express.Router();

// Auth middleware
const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  res.redirect('/login');
};

// Login page (public)
router.get('/login', (req, res) => {
  // Redirect to dashboard if already logged in
  if (req.session && req.session.userId) {
    return res.redirect('/');
  }
  res.render('login', { 
    title: 'Login',
    error: req.query.error || null,
    layout: false // No layout for login page
  });
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/login');
  });
});

// Protected routes - require authentication
router.use(requireAuth);

// Home / Dashboard page
router.get('/', async (req, res) => {
  try {
    // Get dashboard statistics
    const stats = {
      totalAgenda: await db.select({ count: sql`COUNT(*)` }).from(agenda).then(r => Number(r[0].count) || 0),
      totalSurat: await db.select({ count: sql`COUNT(*)` }).from(surat).then(r => Number(r[0].count) || 0),
      totalContact: await db.select({ count: sql`COUNT(*)` }).from(contact).then(r => Number(r[0].count) || 0),
      totalUsers: await db.select({ count: sql`COUNT(*)` }).from(users).then(r => Number(r[0].count) || 0),
      totalPagu: await db.select({ sum: sql`COALESCE(SUM(${anggaran.pagu}), 0)` }).from(anggaran).then(r => Number(r[0].sum) || 0),
      totalRealisasi: await db.select({ sum: sql`COALESCE(SUM(${anggaran.realisasi}), 0)` }).from(anggaran).then(r => Number(r[0].sum) || 0),
      totalSisa: await db.select({ sum: sql`COALESCE(SUM(${anggaran.sisa}), 0)` }).from(anggaran).then(r => Number(r[0].sum) || 0),
    };
    
    // Calculate percentages
    stats.persenTerpakai = stats.totalPagu > 0 ? ((stats.totalRealisasi / stats.totalPagu) * 100).toFixed(2) : 0;
    stats.persenSisa = stats.totalPagu > 0 ? ((stats.totalSisa / stats.totalPagu) * 100).toFixed(2) : 0;
    
    const agendaList = await db.select().from(agenda).orderBy(descOrder(agenda.tanggal)).limit(5);
    const suratList = await db.select().from(surat).orderBy(descOrder(surat.createdAt)).limit(5);
    
    res.render('dashboard', { 
      title: 'Dashboard',
      stats,
      agendaList,
      suratList,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.render('dashboard', { 
      title: 'Dashboard',
      stats: { totalAgenda: 0, totalSurat: 0, totalContact: 0, totalUsers: 0, totalPagu: 0, totalRealisasi: 0, totalSisa: 0 },
      agendaList: [],
      suratList: [],
    });
  }
});

// Agenda page
router.get('/agenda', async (req, res) => {
  try {
    const agendaList = await db.select().from(agenda).orderBy(descOrder(agenda.tanggal));
    res.render('agenda', { 
      title: 'Agenda',
      agendaList
    });
  } catch (error) {
    console.error('Agenda error:', error);
    res.render('agenda', { 
      title: 'Agenda',
      agendaList: [] 
    });
  }
});

// Surat page
router.get('/surat', async (req, res) => {
  try {
    const suratList = await db.select().from(surat).orderBy(descOrder(surat.createdAt));
    res.render('surat', { 
      title: 'Surat',
      suratList
    });
  } catch (error) {
    console.error('Surat error:', error);
    res.render('surat', { 
      title: 'Surat',
      suratList: [] 
    });
  }
});

// Contact page
router.get('/contact', async (req, res) => {
  try {
    const contactList = await db.select().from(contact).orderBy(contact.nama);
    res.render('contact', { 
      title: 'Kontak',
      contactList
    });
  } catch (error) {
    console.error('Contact error:', error);
    res.render('contact', { 
      title: 'Kontak',
      contactList: [] 
    });
  }
});

// Anggaran page
router.get('/anggaran', async (req, res) => {
  try {
    const anggaranList = await db.select().from(anggaran).orderBy(anggaran.mataAnggaran);
    
    // Calculate summary
    const summaryData = await db.select({
      totalPagu: sql`COALESCE(SUM(${anggaran.pagu}), 0)`,
      totalRealisasi: sql`COALESCE(SUM(${anggaran.realisasi}), 0)`,
      totalSisa: sql`COALESCE(SUM(${anggaran.sisa}), 0)`,
    }).from(anggaran);
    
    const summary = {
      totalPagu: Number(summaryData[0].totalPagu) || 0,
      totalRealisasi: Number(summaryData[0].totalRealisasi) || 0,
      totalSisa: Number(summaryData[0].totalSisa) || 0,
    };
    
    res.render('anggaran', { 
      title: 'Anggaran',
      anggaranList,
      summary
    });
  } catch (error) {
    console.error('Anggaran error:', error);
    res.render('anggaran', { 
      title: 'Anggaran',
      anggaranList: [],
      summary: { totalPagu: 0, totalRealisasi: 0, totalSisa: 0 }
    });
  }
});

// Protokol page
router.get('/protokol', async (req, res) => {
  try {
    const protokolList = await db.select().from(protokol).orderBy(descOrder(protokol.tanggalRekam));
    console.log('📊 Protokol data fetched:', { 
      count: protokolList.length, 
      firstItem: protokolList[0] || 'No data',
      allIds: protokolList.map(p => p.id)
    });
    
    // CRITICAL FIX: Pass user session data explicitly
    const viewData = {
      title: 'Protokol',
      protokols: protokolList,
      user: req.session.user || null,  // ✅ Pass user data
      layout: 'layout'  // ✅ Explicitly use layout
    };
    console.log('✅ Rendering with data:', { 
      protokolsCount: viewData.protokols.length,
      hasUser: !!viewData.user 
    });
    
    res.render('protokol', viewData);
  } catch (error) {
    console.error('❌ Protokol error:', error);
    res.render('protokol', { 
      title: 'Protokol',
      protokols: [],
      user: req.session.user || null,
      layout: 'layout'
    });
  }
});

// Users page
router.get('/users', async (req, res) => {
  try {
    const usersList = await db.select().from(users).orderBy(users.username);
    res.render('users-ecc', { 
      title: 'Users',
      usersList
    });
  } catch (error) {
    console.error('Users error:', error);
    res.render('users-ecc', { 
      title: 'Users',
      usersList: [] 
    });
  }
});

export default router;
