import Link from "next/link";
import type { Essays } from "@/lib/definition";

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

const getFirstTwoSentences = (text: string): string => {
    if (!text) return '';

    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);

    if (sentences.length >= 2) {
        return sentences[0].trim() + '... ' + sentences[1].trim() + '...';
    } else if (sentences.length === 1) {
        return sentences[0].trim() + '.';
    }

    return text;
};



const EssayCard = async ({ essay }: { essay: Essays }) => {
    const articleText = extractText(essay.article);
    const excerpt = getFirstTwoSentences(articleText);

    return (
        <article className="bg-newspaper-white border-2 border-black shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-accent-red font-mono uppercase tracking-wider">
                        {extractText(essay.category) || 'Uncategorized'}
                    </span>
                </div>

                <h3 className="text-xl md:text-2xl font-newspaper font-bold text-black mb-3 leading-tight">
                    {extractText(essay.title) || 'Untitled'}
                </h3>

                <p className="text-newspaper-gray font-newspaper leading-relaxed mb-4">
                    {excerpt}
                </p>



                <div className="flex items-center justify-between text-xs text-newspaper-gray font-mono border-t border-gray-300 pt-3">
                    <span>{extractText(essay.publishDate) || 'No date'}</span>
                    <span>{extractText(essay.author) || 'Anonymous'}</span>
                </div>

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

export { EssayCard };