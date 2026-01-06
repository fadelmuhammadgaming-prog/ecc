import { pgTable, serial, varchar, text, timestamp, boolean, date, time, decimal, integer } from 'drizzle-orm/pg-core';

// Users table - Login System
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  nama: varchar('nama', { length: 100 }).notNull(),
  divisi: varchar('divisi', { length: 100 }),
  jobTitle: varchar('job_title', { length: 100 }),
  role: varchar('role', { length: 50 }).notNull(), // SEKRETARIS, PROTOKOLER, DIREKSI, PA
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Agenda table - Jadwal Kegiatan Direksi
export const agenda = pgTable('agenda', {
  id: serial('id').primaryKey(),
  tanggal: date('tanggal').notNull(),
  waktu: time('waktu').notNull(),
  kegiatan: text('kegiatan').notNull(),
  lokasi: varchar('lokasi', { length: 255 }),
  pesertaInternal: text('peserta_internal'),
  pesertaExternal: text('peserta_external'),
  status: varchar('status', { length: 50 }).default('ON SCHEDULE'), // ON SCHEDULE, PENDING, CANCEL
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Surat table - Manajemen Surat
export const surat = pgTable('surat', {
  id: serial('id').primaryKey(),
  idSurat: varchar('id_surat', { length: 50 }).notNull().unique(),
  kodeUser: integer('kode_user').references(() => users.id),
  namaUser: varchar('nama_user', { length: 100 }),
  tglRekam: timestamp('tgl_rekam').defaultNow(),
  jenisSurat: varchar('jenis_surat', { length: 100 }).notNull(), 
  // BERITA ACARA, BERITA ACARA (EXTERNAL), MEMO EXTERNAL, MEMO INTERNAL, SURAT BIASA, SURAT RAHASIA, SURAT RAHASIA PERSONAL
  noMemoSurat: varchar('no_memo_surat', { length: 100 }),
  statusSurat: varchar('status_surat', { length: 50 }).default('BELUM'), // ON PROGRESS, BELUM, DONE
  urgensi: varchar('urgensi', { length: 50 }).default('BIASA'), // BIASA, PENTING, MENDESAK
  uploadSurat: varchar('upload_surat', { length: 255 }), // File path
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Contact table - Daftar Kontak
export const contact = pgTable('contact', {
  id: serial('id').primaryKey(),
  nama: varchar('nama', { length: 100 }).notNull(),
  instansi: varchar('instansi', { length: 150 }),
  jabatan: varchar('jabatan', { length: 100 }),
  noTelepon: varchar('no_telepon', { length: 20 }),
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Anggaran table - Anggaran Direksi
export const anggaran = pgTable('anggaran', {
  id: serial('id').primaryKey(),
  mataAnggaran: varchar('mata_anggaran', { length: 255 }).notNull(),
  pagu: decimal('pagu', { precision: 15, scale: 2 }).notNull(),
  realisasi: decimal('realisasi', { precision: 15, scale: 2 }).default('0'),
  sisa: decimal('sisa', { precision: 15, scale: 2 }),
  tahunAnggaran: integer('tahun_anggaran').notNull(),
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Protokol table - Protokol Kegiatan
export const protokol = pgTable('protokol', {
  id: serial('id').primaryKey(),
  kodeUser: integer('kode_user').references(() => users.id),
  namaUser: varchar('nama_user', { length: 100 }),
  tanggalRekam: timestamp('tanggal_rekam').defaultNow(),
  uploadDisposisi: varchar('upload_disposisi', { length: 255 }), // File path
  agendaDinas: text('agenda_dinas'),
  tglKegiatan: date('tgl_kegiatan'),
  // New columns
  checklistKebutuhan: text('checklist_kebutuhan'), // Checklist kebutuhan kegiatan
  noSppd: varchar('no_sppd', { length: 100 }), // Nomor SPPD
  uploadEtiket: varchar('upload_etiket', { length: 255 }), // Upload etiket hotel dan pesawat
  uploadMateri: varchar('upload_materi', { length: 255 }), // Upload materi kegiatan
  monitoringPelaksanaan: text('monitoring_pelaksanaan'), // Monitoring pelaksanaan
  uploadDokumentasi: varchar('upload_dokumentasi', { length: 255 }), // Upload dokumentasi kegiatan
  uploadLaporan: varchar('upload_laporan', { length: 255 }), // Upload laporan kegiatan
  uploadSppdFinal: varchar('upload_sppd_final', { length: 255 }), // Upload SPPD final
  uploadBoardingPass: varchar('upload_boarding_pass', { length: 255 }), // Upload boarding pass
  mergedPdf: varchar('merged_pdf', { length: 255 }), // Merged PDF dari semua upload
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
