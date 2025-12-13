import { Pool } from 'pg';

// Create a singleton pool instance
const globalForPg = globalThis as unknown as { pgPool: Pool | undefined };

export const pool =
    globalForPg.pgPool ??
    new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    });

if (process.env.NODE_ENV !== 'production') {
    globalForPg.pgPool = pool;
}

// Helper function to query the database
export async function query<T>(text: string, params?: unknown[]): Promise<T[]> {
    const client = await pool.connect();
    try {
        const result = await client.query(text, params);
        return result.rows as T[];
    } finally {
        client.release();
    }
}
