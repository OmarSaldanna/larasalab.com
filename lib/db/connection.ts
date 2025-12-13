import { Pool } from 'pg';

// Lazy pool initialization to ensure env vars are loaded
let pool: Pool | null = null;

function getPool(): Pool {
    if (!pool) {
        const connectionString = process.env.DATABASE_URL;

        // Validate the connection string
        if (!connectionString || connectionString.includes('database_name')) {
            throw new Error('Database not configured - please update DATABASE_URL in .env.local');
        }

        pool = new Pool({
            connectionString,
            max: 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });
    }
    return pool;
}

// Helper function to query the database
export async function query<T>(text: string, params?: unknown[]): Promise<T[]> {
    const dbPool = getPool();
    const client = await dbPool.connect();
    try {
        const result = await client.query(text, params);
        return result.rows as T[];
    } finally {
        client.release();
    }
}
