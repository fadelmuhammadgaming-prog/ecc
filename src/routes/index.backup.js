import express from 'express';
import { db } from '../db/index.js';
import { users, agenda, surat, contact, anggaran, protokol } from '../db/schema.js';
import { eq, desc, sql } from 'drizzle-orm';

const router = express.Router();

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
    
    const agendaList = await db.select().from(agenda).orderBy(desc(agenda.tanggal)).limit(5);
    const suratList = await db.select().from(surat).orderBy(desc(surat.created_at)).limit(5);
    
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
    const allAgenda = await db.select().from(agenda).orderBy(desc(agenda.tanggal));
    res.render('agenda', { 
      title: 'Agenda Direksi',
      agenda: allAgenda 
    });
// Agenda page
router.get('/agenda', async (req, res) => {
  try {
    const agendaList = await db.select().from(agenda).orderBy(desc(agenda.tanggal));
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
    const suratList = await db.select().from(surat).orderBy(desc(surat.created_at));
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
    const protokolList = await db.select().from(protokol).orderBy(desc(protokol.created_at));
    res.render('protokol', { 
      title: 'Protokol',
      protokolList
    });
  } catch (error) {
    console.error('Protokol error:', error);
    res.render('protokol', { 
      title: 'Protokol',
      protokolList: [] 
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

