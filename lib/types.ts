export type PostType = 'idea' | 'project' | 'resource';
export type PostStatus = 'pending' | 'active' | 'finished' | 'archived';

export interface ContentBlock {
    type: 'text' | 'code' | 'image' | 'url' | 'quote' | 'list';
    details?: string;
    content: string;
}

export interface Post {
    id: number;
    created_at: Date;
    title: string;
    type: PostType;
    status: PostStatus;
    content: ContentBlock[];
}

// Theme colors from brand palette
export const colors = {
    amber: '#FDA303',
    pink: '#ED2D4C',
    black: '#05051B',
    blue: '#178EC5',
    cream: '#FFF5DF',
} as const;

// Mosaic grid positions
export const MOSAIC_POSITIONS = {
    // Diagonal (icons)
    DIAGONAL: [[0, 0], [1, 1], [2, 2]] as const,
    // Above diagonal (projects)
    PROJECTS: [[0, 1], [0, 2], [1, 2]] as const,
    // Below diagonal (ideas)
    IDEAS: [[1, 0], [2, 0], [2, 1]] as const,
} as const;
