export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Course {
    id: number;
    title: string;
    slug: string;
    short_description: string | null;
    level: 'beginner' | 'intermediate' | 'advanced';
    price: number;
    duration_minutes: number | null;
    is_published: boolean;
    category: Category | null;
    user: User; // instructor
    thumbnail_url?: string | null;
}
