import { createClient } from "contentful";
import type { Asset } from "contentful";

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// Helper function to extract image URL from Contentful asset
function getImageUrl(blogImage: Asset): string {
    try {
        // Check if blogImage is an asset with the expected structure
        if (blogImage && typeof blogImage === 'object' && 'fields' in blogImage) {
            const asset = blogImage as Asset;
            if (asset.fields?.file && typeof asset.fields.file === 'object' && 'url' in asset.fields.file) {
                // Add https: protocol if missing
                const url = String(asset.fields.file.url);
                return url.startsWith('//') ? `https:${url}` : url;
            }
        }
        return '/default-image.webp'; // Fallback image
    } catch (error) {
        console.error('Error extracting image URL:', error);
        return '/default-image.webp';
    }
}

// Helper function to get image alt text
function getImageAlt(blogImage: Asset, fallbackTitle: string): string {
    try {
        if (blogImage && typeof blogImage === 'object' && 'fields' in blogImage) {
            const asset = blogImage as Asset;
            const title = asset.fields?.title;
            return typeof title === 'string' ? title : fallbackTitle;
        }
        return fallbackTitle;
    } catch (error) {
        return error as string;
    }
}

export async function getEssays() {
    try {
        const response = await client.getEntries({
            content_type: 'articles',
            order: ['-fields.publishDate'],
        });
        console.log(response.items);

        return response.items.map(item => {
            return {
                id: String(item.fields.id),
                blogImage: getImageUrl(item.fields.blogImage as Asset),
                blogImageAlt: getImageAlt(item.fields.blogImage as Asset, String(item.fields.title || '')),
                blogImageOwner: item.fields.blogImageOwner,
                title: item.fields.title,
                article: item.fields.article,
                author: item.fields.author,
                publishDate: item.fields.publishDate,
                category: item.fields.category,
                tags: item.fields.tags,
                nugget: item.fields.nugget,
                nuggetAuthor: item.fields.nuggetAuthor,
                sys: item.sys
            };
        });
    } catch (error) {
        console.error('Error fetching essays:', error);
        return [];
    }
}

export async function getEssaysForHomepage() {
    try {
        const response = await client.getEntries({
            content_type: 'articles',
            order: ['-fields.publishDate'],
            limit: 4, // Only get the latest 4 essays
        });

        return response.items.map(item => {
            return {
                id: String(item.fields.id),
                blogImage: getImageUrl(item.fields.blogImage as Asset),
                blogImageAlt: getImageAlt(item.fields.blogImage as Asset, String(item.fields.title || '')),
                blogImageOwner: item.fields.blogImageOwner,
                title: item.fields.title,
                article: item.fields.article,
                author: item.fields.author,
                publishDate: item.fields.publishDate,
                category: item.fields.category,
                tags: item.fields.tags,
                nugget: item.fields.nugget,
                nuggetAuthor: item.fields.nuggetAuthor,
                sys: item.sys
            };
        });
    } catch (error) {
        console.error('Error fetching essays for homepage:', error);
        return [];
    }
}

export async function getEssayById(id: string) {
    try {
        const response = await client.getEntries({
            content_type: 'articles',
            'fields.id': id,
            limit: 1,
        });
        if (response.items.length === 0) {
            return null;
        }
        const item = response.items[0];

        const rawTags = item.fields.tags;
        const tags = Array.isArray(rawTags)
            ? rawTags.filter(tag => tag !== null && tag !== undefined).map(tag => String(tag))
            : typeof rawTags === 'string'
                ? rawTags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
                : [];

        return {
            id: item.fields.id,
            title: item.fields.title,
            article: item.fields.article,
            author: item.fields.author,
            blogImage: getImageUrl(item.fields.blogImage as Asset),
            blogImageAlt: getImageAlt(item.fields.blogImage as Asset, String(item.fields.title || '')),
            blogImageOwner: item.fields.blogImageOwner,
            tags,
            publishDate: item.fields.publishDate,
            category: item.fields.category,
            nugget: item.fields.nugget,
            nuggetAuthor: item.fields.nuggetAuthor,
            sys: item.sys
        }
    } catch (error) {
        console.error('Error fetching essay by ID:', error);
        return null;
    }
}

export default client;