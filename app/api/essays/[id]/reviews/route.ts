import { NextRequest, NextResponse } from 'next/server';
import { initializeDb } from '@/lib/db';
import { generateAnonymousName } from '@/lib/name-generator';

// GET /api/essays/[id]/reviews - Get all reviews for an essay
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const db = await initializeDb();

        const result = await db.execute({
            sql: `SELECT id, essay_id, review, generated_name, created_at
                  FROM reviews
                  WHERE essay_id = ?
                  ORDER BY created_at DESC`,
            args: [id]
        });

        const reviews = result.rows.map(row => ({
            id: row.id as number,
            essay_id: row.essay_id as string,
            review: row.review as string,
            generated_name: row.generated_name as string,
            created_at: row.created_at as string,
        }));

        return NextResponse.json({
            essayId: id,
            reviews
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json(
            { error: 'Failed to fetch reviews' },
            { status: 500 }
        );
    }
}

// POST /api/essays/[id]/reviews - Create a new review
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { review, anonId } = body as { review?: string; anonId?: string };

        if (!review || typeof review !== 'string' || review.trim().length === 0) {
            return NextResponse.json(
                { error: 'Review text is required' },
                { status: 400 }
            );
        }

        if (review.length > 2000) {
            return NextResponse.json(
                { error: 'Review must be less than 2000 characters' },
                { status: 400 }
            );
        }

        if (!anonId || typeof anonId !== 'string') {
            return NextResponse.json(
                { error: 'anonId is required' },
                { status: 400 }
            );
        }

        const db = await initializeDb();

        // Reuse existing generated_name for this anonId if they have reviewed before
        const existingReviewer = await db.execute({
            sql: `SELECT generated_name
                  FROM reviews
                  WHERE anon_id = ?
                  ORDER BY created_at ASC
                  LIMIT 1`,
            args: [anonId]
        });

        const generatedName = (existingReviewer.rows[0]?.generated_name as string) ?? generateAnonymousName();

        const result = await db.execute({
            sql: `INSERT INTO reviews (essay_id, review, generated_name, anon_id, created_at)
                  VALUES (?, ?, ?, ?, datetime('now'))`,
            args: [id, review.trim(), generatedName, anonId]
        });

        // Get the created review
        const insertId = result.lastInsertRowid?.toString() ?? '0';
        const newReviewResult = await db.execute({
            sql: `SELECT id, essay_id, review, generated_name, created_at
                  FROM reviews
                  WHERE id = ?`,
            args: [insertId]
        });

        const row = newReviewResult.rows[0];
        const newReview = {
            id: row.id as number,
            essay_id: row.essay_id as string,
            review: row.review as string,
            generated_name: row.generated_name as string,
            created_at: row.created_at as string,
        };

        return NextResponse.json({
            success: true,
            review: newReview
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating review:', error);
        return NextResponse.json(
            { error: 'Failed to create review' },
            { status: 500 }
        );
    }
}
