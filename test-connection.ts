import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config();

const sql = postgres({
  host: process.env.DB_HOST,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

async function testConnection() {
  try {
    console.log('Attempting to connect with the following details:');
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`User: ${process.env.DB_USER_NAME}`);
    console.log(`Database: ${process.env.DB_NAME}`);
    console.log(`Port: ${process.env.DB_PORT}`);
    
    const result = await sql`SELECT version()`;
    console.log('Successfully connected to the database');
    console.log('PostgreSQL version:', result[0].version);
  } catch (err) {
    console.error('Error connecting to the database:', err);
  } finally {
    await sql.end();
  }
}

testConnection();