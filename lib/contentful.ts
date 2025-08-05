import { createClient } from "contentful";

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function getEssays() {
    try {
        const response = await client.getEntries({
            content_type: 'articles',
            order: ['-fields.publishDate'],
        });

        return response.items.map(item => {
            return {
                id: String(item.fields.id),
                title: item.fields.title,
                article: item.fields.article,
                author: item.fields.author,
                publishDate: item.fields.publishDate,
                category: item.fields.category,
                sys: item.sys
            };
        });
    } catch (error) {
        console.error('Error fetching essays:', error);
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
            : [];

        return {
            id: item.fields.id,
            title: item.fields.title,
            article: item.fields.article,
            author: item.fields.author,
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