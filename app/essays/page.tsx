import { getEssays } from "@/lib/contentful";
import { Essays } from "@/lib/definition";
import Link from "next/link";
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

const getExcerpt = (text: string): string => {
    if (!text) return '';
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length >= 2) {
        return sentences[0].trim() + '. ' + sentences[1].trim() + '.';
    }
    return sentences[0]?.trim() + '.' || text.substring(0, 150) + '...';
};

function EssayListItem({ essay }: { essay: Essays }) {
    const title = extractText(essay.title);
    const author = extractText(essay.author) || 'Anonymous';
    const date = extractText(essay.publishDate);
    const articleText = extractText(essay.article);
    const excerpt = getExcerpt(articleText);
    const readTime = calculateReadTime(articleText);
    const imageUrl = optimizeContentfulImageUrl(essay.blogImage, { width: 400 });
    const category = extractText(essay.category);

    return (
        <article className="py-8 border-b border-gray-100">
            <Link href={`/essays/${essay.id}`} className="group block">
                <div className="flex gap-6">
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {/* Author & Category */}
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 bg-gray-900 flex items-center justify-center text-white text-xs font-medium">
                                {author.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm text-gray-900 font-inter">
                                {author}
                            </span>
                            {category && (
                                <>
                                    <span className="text-gray-400">in</span>
                                    <span className="text-sm text-gray-900 font-inter">{category}</span>
                                </>
                            )}
                        </div>

                        {/* Title */}
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-snug font-heading group-hover:text-gray-600 transition-colors">
                            {title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-gray-500 font-inter text-base leading-relaxed mb-3 line-clamp-2 hidden sm:block">
                            {excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center gap-3 text-sm text-gray-500 font-inter">
                            <span>{formatDate(date)}</span>
                            <span>·</span>
                            <span>{readTime} min read</span>
                            {essay.tags && essay.tags.length > 0 && (
                                <>
                                    <span className="hidden sm:inline">·</span>
                                    <span className="hidden sm:inline bg-gray-100 px-2 py-0.5 text-xs">
                                        {essay.tags[0]}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Image */}
                    {essay.blogImage && (
                        <div className="flex-shrink-0">
                            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-32 overflow-hidden bg-gray-100">
                                <Image
                                    src={imageUrl}
                                    alt={title}
                                    fill
                                    sizes="160px"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </Link>
        </article>
    );
}

export default async function EssaysPage() {
    const essays = await getEssays();

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200">
                <div className="max-w-[728px] mx-auto px-4 sm:px-6 py-6">
                    <nav className="flex items-center text-sm text-gray-500 font-inter mb-6">
                        <Link href="/" className="hover:text-gray-900 transition-colors">
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900">Essays</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-heading">
                        Essays
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-[728px] mx-auto px-4 sm:px-6">
                {essays.length > 0 ? (
                    <div>
                        {(essays as Essays[]).map((essay) => (
                            <EssayListItem key={String(essay.id)} essay={essay} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h3 className="text-xl font-medium text-gray-900 mb-2 font-heading">
                            No essays yet
                        </h3>
                        <p className="text-gray-500 font-inter">
                            Check back soon for new articles.
                        </p>
                    </div>
                )}

                {/* Back link */}
                <div className="py-12 border-t border-gray-100 mt-4">
                    <Link
                        href="/"
                        className="text-gray-500 font-inter hover:text-gray-900 transition-colors text-sm"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </main>
        </div>
    );
}
