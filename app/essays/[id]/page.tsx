import { getEssayById } from "@/lib/contentful";
import RichTextRenderer from "@/lib/richtext";
import { Document } from "@contentful/rich-text-types";
import Link from "next/link";
import Image from "next/image";
import { optimizeContentfulImageUrl } from "@/lib/contentful-image";
import LikesAndReviews from "@/components/shared/LikesAndReviews";
import ShareButton from "@/components/shared/ShareButton";
import { Metadata } from "next";

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

const richTextToPlainText = (rich: unknown): string => {
    if (!rich || typeof rich !== 'object') return '';
    const root = rich as { content?: unknown[] };
    const parts: string[] = [];

    const walk = (node: unknown) => {
        if (!node) return;
        const n = node as { value?: unknown; content?: unknown[] };
        if (typeof n.value === 'string') {
            parts.push(n.value);
        }
        if (Array.isArray(n.content)) {
            n.content.forEach(walk);
        }
    };

    if (Array.isArray(root.content)) {
        root.content.forEach(walk);
    }

    return parts.join(' ');
};

const formatDate = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return 'Today';
        } else if (diffDays === 1) {
            return '1 day ago';
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        }
    } catch {
        return '';
    }
};

const calculateReadTime = (article: unknown): number => {
    const wordsPerMinute = 200;
    const fullText = richTextToPlainText(article);
    const text = fullText || extractText(article);
    const words = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const essay = await getEssayById(id);

    if (!essay) {
        return {
            title: 'Essay Not Found | markian.fit',
            description: 'The essay you\'re looking for doesn\'t exist.',
        };
    }

    const title = extractText(essay.title);
    const authorName = extractText(essay.author) || 'Markian Mumba';
    const category = extractText(essay.category);
    const articleText = richTextToPlainText(essay.article) || extractText(essay.article);

    const excerpt = articleText.length > 160
        ? articleText.substring(0, 157) + '...'
        : articleText;

    const ogImageParams = new URLSearchParams({
        title: title,
        author: authorName,
    });
    if (category) {
        ogImageParams.append('category', category);
    }
    if (essay.blogImage) {
        ogImageParams.append('image', String(essay.blogImage));
    }
    const ogImageUrl = `/api/og?${ogImageParams.toString()}`;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
        || 'http://localhost:3000';
    const fullOgImageUrl = `${baseUrl}${ogImageUrl}`;

    return {
        title: `${title} | markian.fit`,
        description: excerpt,
        authors: [{ name: authorName }],
        openGraph: {
            title: title,
            description: excerpt,
            type: 'article',
            publishedTime: extractText(essay.publishDate),
            authors: [authorName],
            images: [
                {
                    url: fullOgImageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: excerpt,
            images: [fullOgImageUrl],
        },
    };
}

export default async function EssayPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const essay = await getEssayById(id);
    const imageUrl = essay?.blogImage
        ? optimizeContentfulImageUrl(essay.blogImage, { width: 1400 })
        : '';

    if (!essay) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4 font-heading">Essay Not Found</h1>
                    <p className="text-gray-600 font-inter mb-6">
                        The essay you&apos;re looking for doesn&apos;t exist or may have been moved.
                    </p>
                    <Link
                        href="/essays"
                        className="inline-block bg-gray-900 text-white px-6 py-3 font-inter text-sm hover:bg-gray-800 transition-colors"
                    >
                        View All Essays
                    </Link>
                </div>
            </div>
        );
    }

    const authorName = extractText(essay.author) || 'Anonymous';
    const readTime = calculateReadTime(essay.article);
    const category = extractText(essay.category);

    return (
        <div className="min-h-screen bg-white">
            <nav className="border-b border-gray-100 py-4">
                <div className="max-w-[728px] mx-auto px-4 sm:px-6">
                    <Link href="/essays" className="text-sm text-gray-500 hover:text-gray-900 font-inter transition-colors">
                        ← All Essays
                    </Link>
                </div>
            </nav>

            <main>
                <article className="max-w-[728px] mx-auto px-4 sm:px-6">
                    <header className="pt-10 md:pt-16 pb-8">
                        <h1 className="text-[32px] sm:text-[40px] md:text-[46px] font-bold text-gray-900 leading-[1.15] font-heading tracking-[-0.02em] mb-8">
                            {extractText(essay.title)}
                        </h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gray-900 flex items-center justify-center text-white text-lg font-medium flex-shrink-0">
                                {authorName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className="font-medium text-gray-900 font-inter">
                                        {authorName}
                                    </span>
                                    {category && (
                                        <>
                                            <span className="text-gray-400 text-sm">in</span>
                                            <span className="text-gray-900 font-inter text-sm">{category}</span>
                                        </>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500 font-inter mt-1">
                                    <span>{readTime} min read</span>
                                    <span>·</span>
                                    <span>{formatDate(extractText(essay.publishDate))}</span>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100 pt-6">
                            <div className="flex items-center justify-between mb-4">
                                {/* Tags */}
                                {essay.tags && essay.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {essay.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="bg-gray-100 text-gray-600 px-3 py-1 text-sm font-inter"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {/* Share Button */}
                                <ShareButton
                                    essayId={id}
                                    title={extractText(essay.title)}
                                    author={authorName}
                                    category={category}
                                    imageUrl={imageUrl}
                                />
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {essay.blogImage && (
                        <figure className="mb-10">
                            <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
                                <Image
                                    src={imageUrl}
                                    alt={essay.blogImageAlt || extractText(essay.title)}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 728px"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            {essay.blogImageOwner && (
                                <figcaption className="text-sm text-gray-500 font-inter mt-3 text-center">
                                    {extractText(essay.blogImageOwner)}
                                </figcaption>
                            )}
                        </figure>
                    )}

                    {/* Article Body */}
                    <div className="article-content pb-12">
                        <RichTextRenderer content={essay.article as Document} />
                    </div>

                    {/* Wisdom Nugget */}
                    {essay.nugget && (
                        <aside className="py-10 border-t border-gray-200">
                            <div className="bg-gray-50 p-8 border-l-4 border-gray-900">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-xl">💎</span>
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                                        Nugget of Wisdom
                                    </span>
                                </div>
                                <blockquote className="text-xl text-gray-900 font-serif italic leading-relaxed mb-4">
                                    &ldquo;{extractText(essay.nugget)}&rdquo;
                                </blockquote>
                                {essay.nuggetAuthor && (
                                    <cite className="text-gray-600 font-inter text-sm not-italic">
                                        — {extractText(essay.nuggetAuthor)}
                                    </cite>
                                )}
                            </div>
                        </aside>
                    )}

                    {/* Likes and Reviews */}
                    <LikesAndReviews essayId={id} />

                    {/* Footer */}
                    <footer className="py-10 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <Link
                                href="/essays"
                                className="text-gray-500 font-inter text-sm hover:text-gray-900 transition-colors"
                            >
                                ← All Essays
                            </Link>
                            <Link
                                href="/"
                                className="text-gray-500 font-inter text-sm hover:text-gray-900 transition-colors"
                            >
                                Home →
                            </Link>
                        </div>
                    </footer>
                </article>
            </main>
        </div>
    );
}
