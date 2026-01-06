# Setup Manual PostgreSQL (Tanpa Docker)

Karena Docker tidak tersedia, ikuti langkah berikut untuk setup PostgreSQL secara manual.

## 1. Install PostgreSQL

### macOS (menggunakan Homebrew)
```bash
brew install postgresql@16
brew services start postgresql@16
```

### Atau cek apakah sudah terinstall
```bash
which psql
postgres --version
```

## 2. Start PostgreSQL Service

```bash
# macOS dengan Homebrew
brew services start postgresql@16

# Atau manual
pg_ctl -D /usr/local/var/postgres start
```

## 3. Create Database

```bash
# Login ke PostgreSQL (biasanya tidak perlu password di local)
psql postgres

# Atau langsung create database
createdb ecc_db
```

### Dalam psql shell:
```sql
-- Create database
CREATE DATABASE ecc_db;

-- Create user (opsional, jika ingin user khusus)
CREATE USER ecc_user WITH PASSWORD 'your_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE ecc_db TO ecc_user;

-- Exit
\q
```

## 4. Update .env File

Edit file `.env` sesuai konfigurasi PostgreSQL Anda:

```env
# Jika menggunakan default user (biasanya username Mac Anda)
DATABASE_URL=postgresql://fadel.muhammad:@localhost:5432/ecc_db

# Atau jika membuat user khusus
DATABASE_URL=postgresql://ecc_user:your_password@localhost:5432/ecc_db
```

## 5. Test Connection

```bash
# Test dengan psql
psql -d ecc_db

# Atau test connection string
psql "postgresql://fadel.muhammad:@localhost:5432/ecc_db"
```

## 6. Continue Setup

Setelah PostgreSQL running dan database dibuat:

```bash
# Generate migrations
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database (opsional)
npm run db:seed

# Start app
npm run dev
```

## Troubleshooting

### PostgreSQL tidak ditemukan?
```bash
# Install via Homebrew
brew install postgresql@16

# Add to PATH (tambahkan ke ~/.zshrc)
export PATH="/usr/local/opt/postgresql@16/bin:$PATH"
source ~/.zshrc
```

### Cannot connect to database?
```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# Start if not running
brew services start postgresql@16

# Check port
lsof -i :5432
```

### Permission denied?
```bash
# Pastikan user memiliki akses
psql postgres -c "ALTER USER fadel.muhammad CREATEDB;"
```

### Database already exists?
```bash
# Drop dan recreate
dropdb ecc_db
createdb ecc_db
```

## Quick Commands Reference

```bash
# Start PostgreSQL
brew services start postgresql@16

# Stop PostgreSQL
brew services stop postgresql@16

# Restart PostgreSQL
brew services restart postgresql@16

# Check status
brew services list

# Connect to database
psql ecc_db

# List databases
psql -l

# Drop database
dropdb ecc_db

# Create database
createdb ecc_db
```

## Default PostgreSQL Info

- **Host**: localhost
- **Port**: 5432
- **Default User**: Your macOS username
- **Default Password**: (none for local)
- **Database**: ecc_db

## Connection String Format

```
postgresql://[user]:[password]@[host]:[port]/[database]

Examples:
postgresql://fadel.muhammad:@localhost:5432/ecc_db
postgresql://postgres:postgres@localhost:5432/ecc_db
```
