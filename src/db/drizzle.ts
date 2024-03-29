import { NeonQueryFunction, neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql: NeonQueryFunction<boolean, boolean> = neon(process.env.DATABASE_URL!);

const db = drizzle(sql);

export default db;