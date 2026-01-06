import dotenv from 'dotenv';

dotenv.config();

// Required environment variables
const requiredEnvVars = [
  'DATABASE_URL',
  'SESSION_SECRET',
];

// Validate environment variables
export function validateEnv() {
  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(envVar => {
      console.error(`   - ${envVar}`);
    });
    console.error('\nPlease check your .env file');
    process.exit(1);
  }
  
  console.log('✅ Environment variables validated');
}

// Get environment variable with default value
export function getEnv(key, defaultValue = '') {
  return process.env[key] || defaultValue;
}

// Check if running in production
export function isProduction() {
  return process.env.NODE_ENV === 'production';
}

// Check if running in development
export function isDevelopment() {
  return process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
}

export const config = {
  port: parseInt(getEnv('PORT', '3000'), 10),
  databaseUrl: getEnv('DATABASE_URL'),
  sessionSecret: getEnv('SESSION_SECRET'),
  nodeEnv: getEnv('NODE_ENV', 'development'),
  isProduction: isProduction(),
  isDevelopment: isDevelopment(),
};
