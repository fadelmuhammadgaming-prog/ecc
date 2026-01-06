import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import dotenv from 'dotenv';
import * as schema from './schema.js';

dotenv.config();

const { Pool } = pg;

// Create PostgreSQL connection pool
// Support both local development and production (Render/Railway)
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false } 
    : false,
});

// Create Drizzle instance
export const db = drizzle(pool, { schema });

// Test database connection
export async function testConnection() {
  try {
    await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}
