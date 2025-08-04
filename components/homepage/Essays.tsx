import Link from "next/link";
import { getEssays } from "@/lib/contentful";
import { Essay } from "@/lib/definition";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

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

// Helper function to get first two sentences
const getFirstTwoSentences = (text: string): string => {
    if (!text) return '';

    // Split by sentence endings (.!?) and filter out empty strings
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);

    // Take first two sentences and add proper punctuation
    if (sentences.length >= 2) {
        return sentences[0].trim() + '. ' + sentences[1].trim() + '.';
    } else if (sentences.length === 1) {
        return sentences[0].trim() + '.';
    }

    return text;
};

const EssayCard = async ({ essay }: { essay: Essay }) => {
    // Extract plain text from article for sentence extraction
    const articleText = extractText(essay.article);
    const excerpt = getFirstTwoSentences(articleText);

    return (
        <article className="bg-newspaper-white border-2 border-black shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
                {/* Category Header */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-accent-red font-mono uppercase tracking-wider">
                        {extractText(essay.category) || 'Uncategorized'}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-newspaper font-bold text-black mb-3 leading-tight">
                    {extractText(essay.title) || 'Untitled'}
                </h3>

                {/* Excerpt - First two sentences only */}
                <p className="text-newspaper-gray font-newspaper leading-relaxed mb-4">
                    {excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {essay.tags && essay.tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-gray-100 text-newspaper-gray px-2 py-1 text-xs font-mono border border-gray-300"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-xs text-newspaper-gray font-mono border-t border-gray-300 pt-3">
                    <span>{extractText(essay.publishDate) || 'No date'}</span>
                    <span>{extractText(essay.author) || 'Anonymous'}</span>
                </div>

                {/* Read More Button */}
                <div className="mt-4">
                    <Link
                        href={`/essays/${essay.id}`}
                        className="inline-block border-2 border-black text-black px-4 py-2 text-sm font-newspaper-sans hover:bg-black hover:text-white transition-colors duration-200"
                    >
                        Read Full Article →
                    </Link>
                </div>
            </div>
        </article>
    );
};

const Essays = async () => {
    const essays = await getEssays();



    return (
        <section id="essays" className="py-12 bg-newspaper-white border-t-4 border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-newspaper font-black text-black mb-4">
                        ESSAYS & REFLECTIONS
                    </h2>
                    <p className="text-lg text-newspaper-gray font-newspaper italic">
                        Opinion columns and weekly thoughts from the editor's desk
                    </p>
                    <div className="w-24 h-1 bg-black mx-auto mt-4"></div>
                </div>

                {essays.map((essay) => (
                    <EssayCard key={essay.id} essay={essay} />
                ))}



                {/* Reach Out CTA */}
                <div className="mt-12 text-center bg-gray-100 p-8 border-2 border-black">
                    <h3 className="text-2xl font-newspaper font-bold text-black mb-4">
                        Have Thoughts to Share?
                    </h3>
                    <p className="text-newspaper-gray font-newspaper mb-6">
                        I love discussing backend architecture, team culture, and engineering challenges.
                        If you have ideas, questions, or just want to chat about code, let's connect.
                    </p>
                    <a
                        href="mailto:mumbamarkian@gmail.com"
                        className="inline-block bg-accent-red text-white px-8 py-3 text-lg font-newspaper-sans hover:bg-red-700 transition-colors duration-200 border-2 border-accent-red"
                    >
                        Reach Out
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Essays;