export interface Essays {
    id: string;
    blogImage: string;
    blogImageAlt?: string;
    title: unknown;
    article: unknown;
    author: unknown;
    publishDate: unknown;
    category: unknown;
    tags?: string[];
    sys: unknown;
}
export interface Essay {
    id: string;
    blogImage: string;
    blogImageAlt?: string;
    blogImageOwner: string;
    title: unknown;
    article: unknown;
    author: unknown;
    nugget: unknown;
    nuggetAuthor: unknown;
    publishDate: unknown;
    category: unknown;
    tags?: string[];
    sys: unknown;
}