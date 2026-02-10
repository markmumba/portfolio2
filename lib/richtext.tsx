import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES, Document, Block, Inline } from '@contentful/rich-text-types';
import Image from 'next/image';
import React from 'react';

interface TextNode {
    nodeType: 'text';
    value: string;
    marks?: Array<{
        type: string;
    }>;
}

interface ParagraphNode {
    content?: TextNode[];
}

const renderOptions = {
    renderMark: {
        [MARKS.BOLD]: (text: React.ReactNode) => (
            <strong className="font-bold text-gray-900">{text}</strong>
        ),
        [MARKS.ITALIC]: (text: React.ReactNode) => (
            <em className="italic">{text}</em>
        ),
        [MARKS.UNDERLINE]: (text: React.ReactNode) => (
            <u className="underline decoration-gray-400 underline-offset-2">{text}</u>
        ),
        [MARKS.CODE]: (text: React.ReactNode) => (
            <code className="bg-gray-100 text-gray-900 px-1.5 py-0.5 text-[0.9em] font-mono rounded">
                {text}
            </code>
        ),
        [MARKS.STRIKETHROUGH]: (text: React.ReactNode) => (
            <del className="line-through text-gray-500">{text}</del>
        ),
        [MARKS.SUPERSCRIPT]: (text: React.ReactNode) => (
            <sup className="text-xs">{text}</sup>
        ),
        [MARKS.SUBSCRIPT]: (text: React.ReactNode) => (
            <sub className="text-xs">{text}</sub>
        ),
    },
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: React.ReactNode) => {
            const paragraphNode = node as ParagraphNode;
            const isCodeBlock = paragraphNode.content?.every((child: TextNode) => {
                return child.nodeType === 'text' && child.marks?.some((mark) => mark.type === 'code');
            });

            if (isCodeBlock) {
                const codeContent = paragraphNode.content?.map((child: TextNode) => child.value).join('') || '';
                return (
                    <div className="my-8 rounded-lg overflow-hidden bg-gray-900">
                        <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed text-gray-100">
                            <code>{codeContent}</code>
                        </pre>
                    </div>
                );
            }

            return (
                <p className="mb-8 text-[21px] leading-[1.58] text-gray-700 font-serif">
                    {children}
                </p>
            );
        },
        [BLOCKS.HEADING_1]: (_node: Block | Inline, children: React.ReactNode) => (
            <h1 className="text-[32px] font-bold text-gray-900 mt-14 mb-4 font-heading leading-tight tracking-tight">
                {children}
            </h1>
        ),
        [BLOCKS.HEADING_2]: (_node: Block | Inline, children: React.ReactNode) => (
            <h2 className="text-[26px] font-bold text-gray-900 mt-12 mb-3 font-heading leading-snug">
                {children}
            </h2>
        ),
        [BLOCKS.HEADING_3]: (_node: Block | Inline, children: React.ReactNode) => (
            <h3 className="text-[22px] font-bold text-gray-900 mt-10 mb-3 font-heading leading-snug">
                {children}
            </h3>
        ),
        [BLOCKS.HEADING_4]: (_node: Block | Inline, children: React.ReactNode) => (
            <h4 className="text-[20px] font-bold text-gray-900 mt-8 mb-2 font-heading">
                {children}
            </h4>
        ),
        [BLOCKS.HEADING_5]: (_node: Block | Inline, children: React.ReactNode) => (
            <h5 className="text-[18px] font-bold text-gray-900 mt-6 mb-2 font-heading">
                {children}
            </h5>
        ),
        [BLOCKS.HEADING_6]: (_node: Block | Inline, children: React.ReactNode) => (
            <h6 className="text-[16px] font-bold text-gray-900 mt-6 mb-2 font-heading uppercase tracking-wide">
                {children}
            </h6>
        ),
        [BLOCKS.UL_LIST]: (_node: Block | Inline, children: React.ReactNode) => (
            <ul className="my-8 space-y-3 text-[21px] leading-[1.58] text-gray-700 font-serif">
                {children}
            </ul>
        ),
        [BLOCKS.OL_LIST]: (_node: Block | Inline, children: React.ReactNode) => (
            <ol className="my-8 space-y-3 text-[21px] leading-[1.58] text-gray-700 font-serif list-decimal list-outside ml-8">
                {children}
            </ol>
        ),
        [BLOCKS.LIST_ITEM]: (_node: Block | Inline, children: React.ReactNode) => {
            return (
                <li className="flex items-start gap-3 leading-[1.58]">
                    <span className="text-gray-400 mt-1 flex-shrink-0 text-lg">•</span>
                    <div className="flex-1">{children}</div>
                </li>
            );
        },
        [BLOCKS.QUOTE]: (_node: Block | Inline, children: React.ReactNode) => (
            <blockquote className="my-10 pl-6 border-l-[3px] border-gray-900">
                <div className="text-[21px] leading-[1.58] text-gray-700 italic font-serif">
                    {children}
                </div>
            </blockquote>
        ),
        [BLOCKS.HR]: () => (
            <div className="my-12 flex justify-center gap-2">
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            </div>
        ),
        [BLOCKS.TABLE]: (_node: Block | Inline, children: React.ReactNode) => (
            <div className="overflow-x-auto my-8 rounded-lg border border-gray-200">
                <table className="min-w-full">
                    <tbody className="font-inter text-base">{children}</tbody>
                </table>
            </div>
        ),
        [BLOCKS.TABLE_ROW]: (_node: Block | Inline, children: React.ReactNode) => (
            <tr className="border-b border-gray-100 last:border-b-0">{children}</tr>
        ),
        [BLOCKS.TABLE_CELL]: (_node: Block | Inline, children: React.ReactNode) => (
            <td className="px-4 py-3 text-gray-700">{children}</td>
        ),
        [BLOCKS.TABLE_HEADER_CELL]: (_node: Block | Inline, children: React.ReactNode) => (
            <th className="px-4 py-3 bg-gray-50 font-semibold text-gray-900 text-left">
                {children}
            </th>
        ),
        [INLINES.HYPERLINK]: (node: Block | Inline, children: React.ReactNode) => (
            <a
                href={(node as { data?: { uri?: string } }).data?.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-900 transition-colors"
            >
                {children}
            </a>
        ),
        [INLINES.ENTRY_HYPERLINK]: (node: Block | Inline, children: React.ReactNode) => (
            <a
                href={`/articles/${(node as { data?: { target?: { sys?: { id?: string } } } }).data?.target?.sys?.id}`}
                className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-900 transition-colors"
            >
                {children}
            </a>
        ),
        [INLINES.ASSET_HYPERLINK]: (node: Block | Inline, children: React.ReactNode) => (
            <a
                href={(node as { data?: { target?: { fields?: { file?: { url?: string } } } } }).data?.target?.fields?.file?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-900 transition-colors"
            >
                {children}
            </a>
        ),
        [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
            const { title, description, file } = (node as { data?: { target?: { fields?: { title?: string; description?: string; file?: { url?: string } } } } }).data?.target?.fields || {};
            return (
                <figure className="my-10 -mx-4 sm:mx-0">
                    <Image
                        src={file?.url || ''}
                        width={1000}
                        height={600}
                        alt={description || title || ''}
                        className="w-full h-auto sm:rounded-lg"
                    />
                    {title && (
                        <figcaption className="text-center text-sm text-gray-500 font-inter mt-3 italic px-4">
                            {title}
                        </figcaption>
                    )}
                </figure>
            );
        },
        [BLOCKS.EMBEDDED_ENTRY]: (node: Block | Inline) => {
            const entryType = (node as { data?: { target?: { sys?: { contentType?: { sys?: { id?: string } } } } } }).data?.target?.sys?.contentType?.sys?.id;
            return (
                <div className="my-8 p-6 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-sm text-gray-600 font-inter">
                        Embedded {entryType}: {(node as { data?: { target?: { fields?: { title?: string } } } }).data?.target?.fields?.title || 'Untitled'}
                    </p>
                </div>
            );
        },
    },
};

interface RichTextRendererProps {
    content: Document | null;
    className?: string;
}

export default function RichTextRenderer({ content, className = "" }: RichTextRendererProps) {
    if (!content) {
        return <div className="text-gray-500 italic font-inter">No content available</div>;
    }

    return (
        <div className={`${className}`}>
            {documentToReactComponents(content, renderOptions)}
        </div>
    );
}
