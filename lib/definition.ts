export interface Essay {
    id: string;
    title: unknown; // Rich text object from Contentful
    article: unknown; // Rich text object from Contentful
    author: unknown; // Rich text object from Contentful
    tags?: string[];
    publishDate: unknown; // Rich text object from Contentful
    category: unknown; // Rich text object from Contentful
    sys: unknown;
}