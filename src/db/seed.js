import { db } from './index.js';
import { users, agenda, surat, contact, anggaran, protokol } from './schema.js';
import bcrypt from 'bcryptjs';

async function seed() {
  try {
    console.log('🌱 Seeding ECC database...');

    // Create users with different roles
    console.log('Creating users...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const newUsers = await db.insert(users).values([
      {
        username: 'sekretaris1',
        password: hashedPassword,
        email: 'sekretaris@ecc.com',
        nama: 'Siti Aminah',
        divisi: 'Sekretariat',
        jobTitle: 'Sekretaris Direksi',
        role: 'SEKRETARIS',
        isActive: true,
      },
      {
        username: 'protokoler1',
        password: hashedPassword,
        email: 'protokoler@ecc.com',
        nama: 'Budi Santoso',
        divisi: 'Protokol',
        jobTitle: 'Kepala Protokol',
        role: 'PROTOKOLER',
        isActive: true,
      },
      {
        username: 'direksi1',
        password: hashedPassword,
        email: 'direksi@ecc.com',
        nama: 'Dr. Ahmad Fauzi',
        divisi: 'Direksi',
        jobTitle: 'Direktur Utama',
        role: 'DIREKSI',
        isActive: true,
      },
      {
        username: 'pa1',
        password: hashedPassword,
        email: 'pa@ecc.com',
        nama: 'Rina Kusuma',
        divisi: 'Personal Assistant',
        jobTitle: 'Personal Assistant',
        role: 'PA',
        isActive: true,
      },
    ]).returning();

    console.log(`✅ Created ${newUsers.length} users`);

    // Create agenda
    console.log('Creating agenda...');
    const newAgenda = await db.insert(agenda).values([
      {
        tanggal: '2025-12-28',
        waktu: '09:00:00',
        kegiatan: 'Rapat Koordinasi Bulanan',
        lokasi: 'Ruang Rapat Lt. 3',
        pesertaInternal: 'Direksi, Kepala Divisi, Sekretaris',
        pesertaExternal: null,
        status: 'ON SCHEDULE',
        createdBy: newUsers[0].id,
      },
      {
        tanggal: '2025-12-28',
        waktu: '14:00:00',
        kegiatan: 'Pertemuan dengan Stakeholder',
        lokasi: 'Hotel Grand Indonesia',
        pesertaInternal: 'Direktur Utama, PA',
        pesertaExternal: 'PT. Mitra Sejahtera',
        status: 'ON SCHEDULE',
        createdBy: newUsers[0].id,
      },
      {
        tanggal: '2025-12-29',
        waktu: '10:00:00',
        kegiatan: 'Site Visit Proyek A',
        lokasi: 'Lokasi Proyek, Jakarta Timur',
        pesertaInternal: 'Direksi, Tim Teknis',
        pesertaExternal: 'Kontraktor Proyek',
        status: 'PENDING',
        createdBy: newUsers[1].id,
      },
    ]).returning();

    console.log(`✅ Created ${newAgenda.length} agenda items`);

    // Create surat
    console.log('Creating surat...');
    const newSurat = await db.insert(surat).values([
      {
        idSurat: 'SRT-001/DIR/XII/2025',
        kodeUser: newUsers[0].id,
        namaUser: newUsers[0].nama,
        jenisSurat: 'MEMO INTERNAL',
        noMemoSurat: 'MEMO-001/2025',
        statusSurat: 'DONE',
        urgensi: 'BIASA',
        uploadSurat: null,
      },
      {
        idSurat: 'SRT-002/DIR/XII/2025',
        kodeUser: newUsers[0].id,
        namaUser: newUsers[0].nama,
        jenisSurat: 'SURAT RAHASIA',
        noMemoSurat: 'SR-002/2025',
        statusSurat: 'ON PROGRESS',
        urgensi: 'MENDESAK',
        uploadSurat: null,
      },
      {
        idSurat: 'SRT-003/DIR/XII/2025',
        kodeUser: newUsers[2].id,
        namaUser: newUsers[2].nama,
        jenisSurat: 'BERITA ACARA',
        noMemoSurat: 'BA-003/2025',
        statusSurat: 'BELUM',
        urgensi: 'PENTING',
        uploadSurat: null,
      },
    ]).returning();

    console.log(`✅ Created ${newSurat.length} surat`);

    // Create contacts
    console.log('Creating contacts...');
    const newContacts = await db.insert(contact).values([
      {
        nama: 'Ir. Sulaiman Hakim',
        instansi: 'PT. Mitra Sejahtera',
        jabatan: 'Direktur Operasional',
        noTelepon: '081234567890',
        createdBy: newUsers[0].id,
      },
      {
        nama: 'Dra. Maria Ulfah',
        instansi: 'Kementerian Keuangan',
        jabatan: 'Kepala Bagian Anggaran',
        noTelepon: '081234567891',
        createdBy: newUsers[0].id,
      },
      {
        nama: 'H. Rahman Wijaya',
        instansi: 'PT. Kontraktor Utama',
        jabatan: 'Project Manager',
        noTelepon: '081234567892',
        createdBy: newUsers[1].id,
      },
    ]).returning();

    console.log(`✅ Created ${newContacts.length} contacts`);

    // Create anggaran
    console.log('Creating anggaran...');
    const newAnggaran = await db.insert(anggaran).values([
      {
        mataAnggaran: 'Perjalanan Dinas Dalam Negeri',
        pagu: '500000000',
        realisasi: '325000000',
        sisa: '175000000',
        tahunAnggaran: 2025,
        createdBy: newUsers[0].id,
      },
      {
        mataAnggaran: 'Perjalanan Dinas Luar Negeri',
        pagu: '750000000',
        realisasi: '450000000',
        sisa: '300000000',
        tahunAnggaran: 2025,
        createdBy: newUsers[0].id,
      },
      {
        mataAnggaran: 'Rapat dan Pertemuan',
        pagu: '200000000',
        realisasi: '150000000',
        sisa: '50000000',
        tahunAnggaran: 2025,
        createdBy: newUsers[0].id,
      },
    ]).returning();

    console.log(`✅ Created ${newAnggaran.length} anggaran items`);

    // Create protokol
    console.log('Creating protokol...');
    const newProtokol = await db.insert(protokol).values([
      {
        kodeUser: newUsers[1].id,
        namaUser: newUsers[1].nama,
        uploadDisposisi: null,
        agendaDinas: 'Kunjungan Kerja ke Provinsi Jawa Barat',
        tglKegiatan: '2025-12-30',
      },
      {
        kodeUser: newUsers[1].id,
        namaUser: newUsers[1].nama,
        uploadDisposisi: null,
        agendaDinas: 'Upacara HUT Perusahaan',
        tglKegiatan: '2026-01-15',
      },
    ]).returning();

    console.log(`✅ Created ${newProtokol.length} protokol items`);

    console.log('\n🎉 ECC Database seeded successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('   Sekretaris - Username: sekretaris1, Password: password123');
    console.log('   Protokoler - Username: protokoler1, Password: password123');
    console.log('   Direksi    - Username: direksi1, Password: password123');
    console.log('   PA         - Username: pa1, Password: password123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
