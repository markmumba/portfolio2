import { createClient, Client } from '@libsql/client';

let client: Client | null = null;

export function getDb(): Client {
    if (!client) {
        client = createClient({
            url: process.env.TURSO_DATABASE_URL!,
            authToken: process.env.TURSO_AUTH_TOKEN,
        });
    }
    return client;
}

let initialized = false;

export async function initializeDb(): Promise<Client> {
    const db = getDb();

    if (!initialized) {
        await db.batch([
            `CREATE TABLE IF NOT EXISTS likes (
                essay_id TEXT PRIMARY KEY,
                count INTEGER NOT NULL DEFAULT 0
            )`,
            `CREATE TABLE IF NOT EXISTS likes_by_user (
                essay_id TEXT NOT NULL,
                anon_id TEXT NOT NULL,
                PRIMARY KEY (essay_id, anon_id)
            )`,
            `CREATE TABLE IF NOT EXISTS reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                essay_id TEXT NOT NULL,
                review TEXT NOT NULL,
                generated_name TEXT NOT NULL,
                anon_id TEXT,
                created_at TEXT NOT NULL DEFAULT (datetime('now'))
            )`,
            `CREATE INDEX IF NOT EXISTS idx_reviews_essay_id ON reviews(essay_id)`
        ]);
        initialized = true;
    }

    return db;
}
