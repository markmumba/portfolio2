import Link from "next/link";
import type { Essays } from "@/lib/definition";
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

const getFirstTwoSentences = (text: string): string => {
    if (!text) return '';

    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);

    if (sentences.length >= 2) {
        return sentences[0].trim() + '. ' + sentences[1].trim() + '.';
    } else if (sentences.length === 1) {
        return sentences[0].trim() + '.';
    }

    return text.substring(0, 150) + '...';
};

const formatDate = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            return '1 DAY AGO';
        } else if (diffDays < 30) {
            return `${diffDays} DAYS AGO`;
        } else if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            return months === 1 ? '1 MONTH AGO' : `${months} MONTHS AGO`;
        } else {
            const years = Math.floor(diffDays / 365);
            return years === 1 ? '1 YEAR AGO' : `${years} YEARS AGO`;
        }
    } catch (error) {
        return error as string;
    }
};

const EssayCard = ({ essay }: { essay: Essays }) => {
    const articleText = extractText(essay.article);
    const excerpt = getFirstTwoSentences(articleText);
    const publishDate = extractText(essay.publishDate);

    return (
        <article className="bg-white hover:bg-gray-50 transition-colors duration-200">
            {/* Essay Image */}
            <div className="relative h-48 bg-gray-100 overflow-hidden">
                {essay.blogImage ? (
                    <>
                        <Image
                            src={essay.blogImage}
                            alt={extractText(essay.title) || 'Essay image'}
                            fill
                            className="object-cover"
                        />
                        {/* Subtle overlay effect */}
                        <div className="absolute inset-0 bg-black opacity-5 mix-blend-multiply"></div>
                    </>
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No image</span>
                    </div>
                )}
            </div>

            {/* Essay Content */}
            <div className="p-6">
                {/* Category */}
                <div className="text-xs text-gray-600 font-inter mb-3">
                    {extractText(essay.category) || 'ARTICLE'} • {formatDate(publishDate)}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-black mb-3 leading-tight font-heading">
                    {extractText(essay.title) || 'Untitled'}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-700 font-inter leading-relaxed text-sm mb-4">
                    {excerpt}
                </p>

                {/* Author */}
                <div className="text-xs text-gray-600 font-inter mb-4">
                    By {extractText(essay.author) || 'Anonymous'}
                </div>

                {/* Read More Link */}
                <div>
                    <Link
                        href={`/essays/${essay.id}`}
                        className="text-xs text-gray-600 font-inter hover:text-black transition-colors duration-200"
                    >
                        Read Full Article →
                    </Link>
                </div>
            </div>
        </article>
    );
};

export { EssayCard };