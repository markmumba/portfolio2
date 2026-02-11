import { NextRequest, NextResponse } from 'next/server';
import { initializeDb } from '@/lib/db';

// GET /api/essays/[id]/likes - Get like count for an essay
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const db = await initializeDb();

        const result = await db.execute({
            sql: 'SELECT count FROM likes WHERE essay_id = ?',
            args: [id]
        });

        const count = result.rows[0]?.count as number | undefined;

        return NextResponse.json({
            essayId: id,
            count: count || 0
        });
    } catch (error) {
        console.error('Error fetching likes:', error);
        return NextResponse.json(
            { error: 'Failed to fetch likes' },
            { status: 500 }
        );
    }
}

// POST /api/essays/[id]/likes - Increment like count for an essay
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const body = await request.json().catch(() => ({}));
        const { anonId } = body as { anonId?: string };

        if (!anonId || typeof anonId !== 'string') {
            return NextResponse.json(
                { error: 'anonId is required' },
                { status: 400 }
            );
        }

        const { id } = await params;
        const db = await initializeDb();

        // Check if this anonymous user already liked this essay
        const existingLike = await db.execute({
            sql: 'SELECT 1 FROM likes_by_user WHERE essay_id = ? AND anon_id = ?',
            args: [id, anonId]
        });

        if (existingLike.rows.length > 0) {
            // Already liked – return current count without incrementing
            const current = await db.execute({
                sql: 'SELECT count FROM likes WHERE essay_id = ?',
                args: [id]
            });
            return NextResponse.json({
                essayId: id,
                count: (current.rows[0]?.count as number) || 0
            });
        }

        // Use a transaction to ensure atomicity
        await db.batch([
            {
                sql: 'INSERT INTO likes_by_user (essay_id, anon_id) VALUES (?, ?)',
                args: [id, anonId]
            },
            {
                sql: `INSERT INTO likes (essay_id, count) VALUES (?, 1)
                      ON CONFLICT(essay_id) DO UPDATE SET count = count + 1`,
                args: [id]
            }
        ]);

        // Get updated count
        const result = await db.execute({
            sql: 'SELECT count FROM likes WHERE essay_id = ?',
            args: [id]
        });

        return NextResponse.json({
            essayId: id,
            count: result.rows[0]?.count as number
        });
    } catch (error) {
        console.error('Error incrementing likes:', error);
        return NextResponse.json(
            { error: 'Failed to increment likes' },
            { status: 500 }
        );
    }
}
