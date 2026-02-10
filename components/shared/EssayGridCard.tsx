import Link from "next/link";
import type { Essays } from "@/lib/definition";
import Image from "next/image";
import { optimizeContentfulImageUrl } from "@/lib/contentful-image";

const extractText = (richText: unknown): string => {
    if (typeof richText === 'string') {
        return richText;
    }
    if (richText && typeof richText === 'object' && 'content' in richText) {
        const richTextObj = richText as { content?: Array<{ content?: Array<{ value?: string }> }> };
        const content = richTextObj.content?.[0]?.content?.[0]?.value;
        return content || '';
    }
    return '';
};

const formatDate = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    } catch {
        return '';
    }
};

const calculateReadTime = (text: string): number => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
};

const EssayGridCard = ({ essay }: { essay: Essays }) => {
    const articleText = extractText(essay.article);
    const publishDate = extractText(essay.publishDate);
    const imageUrl = optimizeContentfulImageUrl(essay.blogImage, { width: 600 });
    const readTime = calculateReadTime(articleText);
    const authorName = extractText(essay.author) || 'Anonymous';
    const title = extractText(essay.title) || 'Untitled';

    return (
        <Link href={`/essays/${essay.id}`} className="block h-full">
            <article className="bg-white h-full flex flex-col group hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden border border-gray-100">
                {/* Image */}
                {essay.blogImage && (
                    <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                        <Image
                            src={imageUrl}
                            alt={essay.blogImageAlt || title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                    {/* Author */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                            {authorName.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm text-gray-700 font-inter truncate">
                            {authorName}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug font-heading group-hover:text-gray-600 transition-colors line-clamp-2">
                        {title}
                    </h3>

                    {/* Spacer */}
                    <div className="flex-1"></div>

                    {/* Meta */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-inter mt-3">
                        <span>{formatDate(publishDate)}</span>
                        <span>·</span>
                        <span>{readTime} min read</span>
                        {essay.tags && essay.tags.length > 0 && (
                            <>
                                <span>·</span>
                                <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                                    {essay.tags[0]}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );
};

export { EssayGridCard };
