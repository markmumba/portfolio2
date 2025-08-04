import { getEssayById } from "@/lib/contentful";
import RichTextRenderer from "@/lib/richtext";
import { Document } from "@contentful/rich-text-types";

// Helper function to extract text from rich text objects
const extractText = (richText: any): string => {
    if (typeof richText === 'string') {
        return richText;
    }
    if (richText?.content?.[0]?.content?.[0]?.value) {
        return richText.content[0].content[0].value;
    }
    return '';
};

export default async function EssayPage({ params }: { params: { id: string } }) {
    const essay = await getEssayById(params.id);
    console.log(essay);

    if (!essay) {
        return (
            <div className="min-h-screen bg-newspaper-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-newspaper font-black text-black mb-4">ARTICLE NOT FOUND</h1>
                    <p className="text-newspaper-gray font-newspaper">The article you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-newspaper-white">
            {/* Header */}
            <header className="border-b-4 border-black bg-newspaper-white">
                <div className="max-w-4xl mx-auto px-4 py-6">
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
            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Author and Meta Info */}
                <div className="border-b-2 border-gray-300 pb-4 mb-8">
                    <div className="flex items-center justify-between text-sm text-newspaper-gray font-mono">
                        <span>By {extractText(essay.author)}</span>
                        <span>Category: {extractText(essay.category)}</span>
                    </div>
                    {essay.tags && essay.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {essay.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-gray-100 text-newspaper-gray px-2 py-1 text-xs font-mono border border-gray-300"
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
                <footer className="mt-12 pt-8 border-t-2 border-gray-300">
                    <div className="text-center">
                        <p className="text-newspaper-gray font-newspaper italic mb-4">
                            "The best code is no code at all, but when you must write it, make it readable."
                        </p>
                        <div className="flex justify-center space-x-6 text-sm text-newspaper-gray font-mono">
                            <a href="/" className="hover:text-black transition-colors">
                                ← Back to Home
                            </a>
                            <a href="/#essays" className="hover:text-black transition-colors">
                                ← All Essays
                            </a>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}