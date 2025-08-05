import { getEssayById } from "@/lib/contentful";
import RichTextRenderer from "@/lib/richtext";
import { Document } from "@contentful/rich-text-types";
import Link from "next/link";

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

export default async function EssayPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const essay = await getEssayById(id);
    console.log(essay);
    if (!essay) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
                <div className="text-center bg-newspaper-white p-8 rounded-lg shadow-2xl transform rotate-1">
                    <h1 className="text-4xl font-newspaper font-black text-black mb-4">ARTICLE NOT FOUND</h1>
                    <p className="text-newspaper-gray font-newspaper">The article you&apos;re looking for doesn&apos;t exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-150 to-gray-200 p-4">
            {/* Crumpled Paper Container */}
            <div className="max-w-5xl mx-auto">
                <div className="bg-newspaper-white shadow-2xl  relative">
                    {/* Paper Texture Overlay */}
                    <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-gray-300 to-gray-400 pointer-events-none rounded"></div>

                    {/* Header */}
                    <header className="border-b-4 border-black bg-newspaper-white relative z-10">
                        <div className="max-w-4xl mx-auto px-6 py-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-xs text-accent-red font-mono uppercase tracking-wider">
                                        {extractText(essay.category)}
                                    </h1>
                                    <h2 className="text-3xl md:text-4xl font-newspaper font-black text-black leading-tight">
                                        {extractText(essay.title)}
                                    </h2>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-newspaper-gray font-mono">
                                        {extractText(essay.publishDate)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Article Content */}
                    <main className="max-w-4xl mx-auto px-6 py-10 relative z-10">
                        {/* Author and Meta Info */}
                        <div className="border-b-2 border-gray-300 pb-6 mb-10">
                            <div className="flex items-center justify-between text-sm text-newspaper-gray font-mono">
                                <span>By {extractText(essay.author)}</span>
                                <span>Category: {extractText(essay.category)}</span>
                            </div>
                            {essay.tags && essay.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {essay.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="bg-gray-100 text-newspaper-gray px-3 py-1 text-xs font-mono border border-gray-300 shadow-sm"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Article Body */}
                        <article className="prose prose-lg max-w-none">
                            <div className="font-newspaper text-lg leading-relaxed text-black">
                                <RichTextRenderer content={essay.article as Document} />
                            </div>
                        </article>

                        {/* Footer */}
                        <footer className="mt-16 pt-10 border-t-2 border-gray-300">
                            <div className="text-center">
                                <p className="text-newspaper-gray font-newspaper italic mb-6 text-lg">
                                    &quot;{extractText(essay.nugget)}&quot;
                                </p>
                                <p className="text-newspaper-gray font-newspaper italic mb-6 text-lg">
                                    {extractText(essay.nuggetAuthor)}
                                </p>
                                <div className="flex justify-center space-x-8 text-sm text-newspaper-gray font-mono">
                                    <Link href="/" className="hover:text-black transition-colors duration-200">
                                        ← Back to Home
                                    </Link>
                                    <Link href="/#essays" className="hover:text-black transition-colors duration-200">
                                        ← All Essays
                                    </Link>
                                </div>
                            </div>
                        </footer>
                    </main>
                </div>
            </div>
        </div>
    );
}