export interface Essay {
    id: string;
    title: any; // Rich text object from Contentful
    article: any; // Rich text object from Contentful
    author: any; // Rich text object from Contentful
    tags?: string[];
    publishDate: any; // Rich text object from Contentful
    category: any; // Rich text object from Contentful
    sys: any;
}