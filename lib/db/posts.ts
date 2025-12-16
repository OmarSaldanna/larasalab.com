import { query } from './connection';
import type { Post, ContentBlock } from '@/lib/types';

interface PostRow {
    id: number;
    created_at: string;
    updated_at: string;
    tags: string[];
    title: string;
    type: string;
    status: string;
    content: ContentBlock[];
}

function mapRowToPost(row: PostRow): Post {
    // Handle content - it might come as a string from PostgreSQL JSONB
    let parsedContent: ContentBlock[] = [];
    if (row.content) {
        if (typeof row.content === 'string') {
            try {
                parsedContent = JSON.parse(row.content);
            } catch (e) {
                console.error('Failed to parse content JSON:', e);
                parsedContent = [];
            }
        } else if (Array.isArray(row.content)) {
            parsedContent = row.content;
        }
    }

    return {
        id: row.id,
        created_at: new Date(row.created_at),
        updated_at: new Date(row.updated_at),
        tags: row.tags || [],
        title: row.title,
        type: row.type as Post['type'],
        status: row.status as Post['status'],
        content: parsedContent,
    };
}

/**
 * Get the 3 most recent active ideas
 */
export async function getActiveIdeas(limit = 3): Promise<Post[]> {
    const rows = await query<PostRow>(
        `SELECT id, created_at, updated_at, tags, title, type, status, content 
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
        `SELECT id, created_at, updated_at, tags, title, type, status, content 
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
        `SELECT id, created_at, updated_at, tags, title, type, status, content 
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
        `SELECT id, created_at, updated_at, tags, title, type, status, content 
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
        `SELECT id, created_at, updated_at, tags, title, type, status, content 
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
        `SELECT id, created_at, updated_at, tags, title, type, status, content 
     FROM posts 
     WHERE type = 'project' AND status = 'active'
     ORDER BY created_at DESC`
    );
    return rows.map(mapRowToPost);
}
