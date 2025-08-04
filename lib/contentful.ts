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
            // Handle tags properly - convert to string array and filter out nulls
            const rawTags = item.fields.tags;
            const tags = Array.isArray(rawTags)
                ? rawTags.filter(tag => tag !== null && tag !== undefined).map(tag => String(tag))
                : [];

            return {
                id: item.sys.id, // Use the system ID which is always a string
                title: item.fields.title,
                article: item.fields.article,
                author: item.fields.author,
                tags,
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
            'sys.id': id, // Use sys.id instead of fields.id
            limit: 1,
        });
        if (response.items.length === 0) {
            return null;
        }
        const item = response.items[0];

        // Handle tags properly - convert to string array and filter out nulls
        const rawTags = item.fields.tags;
        const tags = Array.isArray(rawTags)
            ? rawTags.filter(tag => tag !== null && tag !== undefined).map(tag => String(tag))
            : [];

        return {
            id: item.sys.id,
            title: item.fields.title,
            article: item.fields.article,
            author: item.fields.author,
            tags,
            publishDate: item.fields.publishDate,
            category: item.fields.category,
            sys: item.sys
        }
    } catch (error) {
        console.error('Error fetching essay by ID:', error);
        return null;
    }
}

export default client;