CREATE TABLE IF NOT EXISTS "agenda" (
	"id" serial PRIMARY KEY NOT NULL,
	"tanggal" date NOT NULL,
	"waktu" time NOT NULL,
	"kegiatan" text NOT NULL,
	"lokasi" varchar(255),
	"peserta_internal" text,
	"peserta_external" text,
	"status" varchar(50) DEFAULT 'ON SCHEDULE',
	"created_by" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anggaran" (
	"id" serial PRIMARY KEY NOT NULL,
	"mata_anggaran" varchar(255) NOT NULL,
	"pagu" numeric(15, 2) NOT NULL,
	"realisasi" numeric(15, 2) DEFAULT '0',
	"sisa" numeric(15, 2),
	"tahun_anggaran" integer NOT NULL,
	"created_by" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contact" (
	"id" serial PRIMARY KEY NOT NULL,
	"nama" varchar(100) NOT NULL,
	"instansi" varchar(150),
	"jabatan" varchar(100),
	"no_telepon" varchar(20),
	"created_by" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "protokol" (
	"id" serial PRIMARY KEY NOT NULL,
	"kode_user" integer,
	"nama_user" varchar(100),
	"tanggal_rekam" timestamp DEFAULT now(),
	"upload_disposisi" varchar(255),
	"agenda_dinas" text,
	"tgl_kegiatan" date,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "surat" (
	"id" serial PRIMARY KEY NOT NULL,
	"id_surat" varchar(50) NOT NULL,
	"kode_user" integer,
	"nama_user" varchar(100),
	"tgl_rekam" timestamp DEFAULT now(),
	"jenis_surat" varchar(100) NOT NULL,
	"no_memo_surat" varchar(100),
	"status_surat" varchar(50) DEFAULT 'BELUM',
	"urgensi" varchar(50) DEFAULT 'BIASA',
	"upload_surat" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "surat_id_surat_unique" UNIQUE("id_surat")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(50) NOT NULL,
	"password" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"nama" varchar(100) NOT NULL,
	"divisi" varchar(100),
	"job_title" varchar(100),
	"role" varchar(50) NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "agenda" ADD CONSTRAINT "agenda_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anggaran" ADD CONSTRAINT "anggaran_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contact" ADD CONSTRAINT "contact_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "protokol" ADD CONSTRAINT "protokol_kode_user_users_id_fk" FOREIGN KEY ("kode_user") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "surat" ADD CONSTRAINT "surat_kode_user_users_id_fk" FOREIGN KEY ("kode_user") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
