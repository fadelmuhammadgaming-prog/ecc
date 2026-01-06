// Test script to check protokol data
import { db } from './src/db/index.js';
import { protokol } from './src/db/schema.js';
import { desc as descOrder } from 'drizzle-orm';

async function test() {
  try {
    console.log('🔍 Testing protokol query...\n');
    
    const protokolList = await db.select().from(protokol).orderBy(descOrder(protokol.tanggalRekam));
    
    console.log('📊 Result:');
    console.log('  Count:', protokolList.length);
    console.log('  Data:', JSON.stringify(protokolList, null, 2));
    
    console.log('\n✅ Query successful!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

test();
