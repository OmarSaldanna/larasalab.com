import { query } from './connection';
import type { Post, ContentBlock } from '@/lib/types';

interface PostRow {
    id: number;
    created_at: string;
    title: string;
    type: string;
    status: string;
    content: ContentBlock[];
}

function mapRowToPost(row: PostRow): Post {
    return {
        id: row.id,
        created_at: new Date(row.created_at),
        title: row.title,
        type: row.type as Post['type'],
        status: row.status as Post['status'],
        content: row.content,
    };
}

/**
 * Get the 3 most recent active ideas
 */
export async function getActiveIdeas(limit = 3): Promise<Post[]> {
    const rows = await query<PostRow>(
        `SELECT id, created_at, title, type, status, content 
     FROM posts 
     WHERE type = 'idea'
     ORDER BY created_at DESC 
     LIMIT $1`,
        [limit]
    );
    return rows.map(mapRowToPost);
}

/**
 * Get the 3 most recent active projects
 */
export async function getActiveProjects(limit = 3): Promise<Post[]> {
    const rows = await query<PostRow>(
        `SELECT id, created_at, title, type, status, content 
     FROM posts 
     WHERE type = 'project'
     ORDER BY created_at DESC 
     LIMIT $1`,
        [limit]
    );
    return rows.map(mapRowToPost);
}

/**
 * Get ongoing projects (active status)
 */
export async function getOngoingProjects(): Promise<Post[]> {
    const rows = await query<PostRow>(
        `SELECT id, created_at, title, type, status, content 
     FROM posts 
     WHERE type = 'project' AND status = 'active'
     ORDER BY created_at DESC`
    );
    return rows.map(mapRowToPost);
}

/**
 * Get a single post by ID
 */
export async function getPostById(id: number): Promise<Post | null> {
    const rows = await query<PostRow>(
        `SELECT id, created_at, title, type, status, content 
     FROM posts 
     WHERE id = $1`,
        [id]
    );

    if (rows.length === 0) {
        return null;
    }

    return mapRowToPost(rows[0]);
}

/**
 * Get all active ideas
 */
export async function getAllIdeas(): Promise<Post[]> {
    const rows = await query<PostRow>(
        `SELECT id, created_at, title, type, status, content 
     FROM posts 
     WHERE type = 'idea' AND status = 'active'
     ORDER BY created_at DESC`
    );
    return rows.map(mapRowToPost);
}

/**
 * Get all active projects
 */
export async function getAllProjects(): Promise<Post[]> {
    const rows = await query<PostRow>(
        `SELECT id, created_at, title, type, status, content 
     FROM posts 
     WHERE type = 'project' AND status = 'active'
     ORDER BY created_at DESC`
    );
    return rows.map(mapRowToPost);
}
