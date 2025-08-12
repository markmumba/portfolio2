import { getEssayById } from "@/lib/contentful";
import RichTextRenderer from "@/lib/richtext";
import { Document } from "@contentful/rich-text-types";
import Link from "next/link";
import Image from "next/image";

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
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        return error as string;
    }
};

export default async function EssayPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const essay = await getEssayById(id);

    if (!essay) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center bg-white p-12 shadow-lg max-w-md">
                    <div className="text-6xl mb-6">📄</div>
                    <h1 className="text-2xl font-bold text-black mb-4">Essay Not Found</h1>
                    <p className="text-gray-600 font-inter mb-6">
                        The essay you&apos;re looking for doesn&apos;t exist or may have been moved.
                    </p>
                    <Link
                        href="/essays"
                        className="inline-block bg-black text-white px-6 py-3 font-inter hover:bg-gray-800 transition-colors duration-200"
                    >
                        View All Essays
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200 py-4">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center text-sm text-gray-600 font-inter">
                        <Link href="/" className="hover:text-black transition-colors">
                            Home
                        </Link>
                        <span className="mx-2">→</span>
                        <Link href="/essays" className="hover:text-black transition-colors">
                            Essays
                        </Link>
                        <span className="mx-2">→</span>
                        <span className="text-black font-medium truncate">
                            {extractText(essay.title)}
                        </span>
                    </div>
                </div>
            </nav>

            {/* Article Content */}
            <main className="py-16">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <header className="mb-10">
                        <div className="mb-4">
                            <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 text-xs font-inter">
                                {extractText(essay.category)}
                            </span>
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold text-black mb-4 leading-tight">
                            {extractText(essay.title)}
                        </h1>

                        <div className="flex items-center gap-4 text-xs text-gray-600 font-inter">
                            <span>By {extractText(essay.author)}</span>
                            <span>•</span>
                            <span>{formatDate(extractText(essay.publishDate))}</span>
                        </div>

                        {essay.tags && essay.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {essay.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-gray-100 text-gray-700 px-2 py-1 text-xs font-inter border border-gray-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </header>

                    {/* Featured Image */}
                    {essay.blogImage && (
                        <div className="mb-10">
                            <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
                                <Image
                                    src={essay.blogImage}
                                    alt={essay.blogImageAlt || extractText(essay.title)}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {essay.blogImageOwner && (
                                <p className="text-xs text-gray-500 font-inter mt-2 italic">
                                    {extractText(essay.blogImageOwner)}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Article Body */}
                    <div className="prose prose-base prose-gray max-w-none">
                        <div className="font-inter text-base leading-relaxed text-gray-800">
                            <RichTextRenderer content={essay.article as Document} />
                        </div>
                    </div>

                    {/* Wisdom Nugget */}
                    {essay.nugget && (
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="bg-gray-100 p-6 border-l-4 border-black">
                                <h3 className="text-base font-bold text-black mb-3">💎 Random Nugget</h3>
                                <blockquote className="text-gray-700 font-inter italic text-base leading-relaxed mb-3">
                                    &quot;{extractText(essay.nugget)}&quot;
                                </blockquote>
                                {essay.nuggetAuthor && (
                                    <cite className="text-gray-600 font-inter font-medium text-sm">
                                        — {extractText(essay.nuggetAuthor)}
                                    </cite>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Navigation Footer */}
                    <footer className="mt-12 pt-8 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <Link
                                href="/essays"
                                className="text-gray-600 font-inter text-sm hover:text-black transition-colors duration-200"
                            >
                                ← All Essays
                            </Link>
                            <Link
                                href="/"
                                className="text-gray-600 font-inter text-sm hover:text-black transition-colors duration-200"
                            >
                                Back to Home →
                            </Link>
                        </div>
                    </footer>
                </article>
            </main>
        </div>
    );
}