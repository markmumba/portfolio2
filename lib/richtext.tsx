// components/RichTextRenderer.js
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES, Document, Block, Inline } from '@contentful/rich-text-types';
import Image from 'next/image';
import React from 'react'; // Added missing import for React

const renderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-bold text-black">{text}</strong>,
    [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic text-gray-600">{text}</em>,
    [MARKS.UNDERLINE]: (text: React.ReactNode) => <u className="underline">{text}</u>,
    [MARKS.CODE]: (text: React.ReactNode) => (
      <code className="bg-gray-100 text-gray-800 px-2 py-1 text-sm font-mono border border-gray-300">
        {text}
      </code>
    ),
    [MARKS.STRIKETHROUGH]: (text: React.ReactNode) => <del className="line-through text-gray-600">{text}</del>,
    [MARKS.SUPERSCRIPT]: (text: React.ReactNode) => <sup className="text-xs">{text}</sup>,
    [MARKS.SUBSCRIPT]: (text: React.ReactNode) => <sub className="text-xs">{text}</sub>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: React.ReactNode) => (
      <p className="mb-4 leading-relaxed text-gray-800 font-inter">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: Block | Inline, children: React.ReactNode) => (
      <h1 className="text-2xl font-bold text-black mb-4 mt-6 border-b border-gray-300 pb-2">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: React.ReactNode) => (
      <h2 className="text-xl font-bold text-black mb-3 mt-5 border-b border-gray-200 pb-1">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (node: Block | Inline, children: React.ReactNode) => (
      <h3 className="text-lg font-bold text-black mb-3 mt-4">
        {children}
      </h3>
    ),
    [BLOCKS.HEADING_4]: (node: Block | Inline, children: React.ReactNode) => (
      <h4 className="text-base font-bold text-black mb-2 mt-4">
        {children}
      </h4>
    ),
    [BLOCKS.HEADING_5]: (node: Block | Inline, children: React.ReactNode) => (
      <h5 className="text-base font-bold text-black mb-2 mt-3">
        {children}
      </h5>
    ),
    [BLOCKS.HEADING_6]: (node: Block | Inline, children: React.ReactNode) => (
      <h6 className="text-sm font-bold text-black mb-2 mt-3">
        {children}
      </h6>
    ),
    [BLOCKS.UL_LIST]: (node: Block | Inline, children: React.ReactNode) => (
      <ul className="mb-4 space-y-1 text-gray-800 font-inter ml-0">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (node: Block | Inline, children: React.ReactNode) => (
      <ol className="mb-4 space-y-1 text-gray-800 font-inter ml-0" style={{ counterReset: 'list-counter' }}>
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: Block | Inline, children: React.ReactNode) => {
      // Check if this is inside an ordered list by looking at the parent
      return (
        <li className="flex items-start gap-3 leading-relaxed ml-0">
          <span className="text-gray-600 mt-0.5 flex-shrink-0">•</span>
          <div className="flex-1">{children}</div>
        </li>
      );
    },
    [BLOCKS.QUOTE]: (node: Block | Inline, children: React.ReactNode) => (
      <blockquote className="border-l-4 border-black pl-4 py-3 mb-4 italic text-gray-700 bg-gray-50 font-inter">
        &quot;{children}&quot;
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-6 border border-gray-300" />,
    [BLOCKS.TABLE]: (node: Block | Inline, children: React.ReactNode) => (
      <div className="overflow-x-auto mb-4 border border-gray-300">
        <table className="min-w-full border-collapse">
          <tbody className="font-inter">{children}</tbody>
        </table>
      </div>
    ),
    [BLOCKS.TABLE_ROW]: (node: Block | Inline, children: React.ReactNode) => (
      <tr className="border-b border-gray-200">{children}</tr>
    ),
    [BLOCKS.TABLE_CELL]: (node: Block | Inline, children: React.ReactNode) => (
      <td className="border border-gray-200 px-3 py-2 text-gray-800">{children}</td>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: (node: Block | Inline, children: React.ReactNode) => (
      <th className="border border-gray-200 px-3 py-2 bg-gray-100 font-bold text-black">
        {children}
      </th>
    ),
    [INLINES.HYPERLINK]: (node: Block | Inline, children: React.ReactNode) => (
      <a
        href={(node as { data?: { uri?: string } }).data?.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:text-gray-600 underline font-inter"
      >
        {children}
      </a>
    ),
    [INLINES.ENTRY_HYPERLINK]: (node: Block | Inline, children: React.ReactNode) => (
      <a
        href={`/articles/${(node as { data?: { target?: { sys?: { id?: string } } } }).data?.target?.sys?.id}`}
        className="text-black hover:text-gray-600 underline font-inter"
      >
        {children}
      </a>
    ),
    [INLINES.ASSET_HYPERLINK]: (node: Block | Inline, children: React.ReactNode) => (
      <a
        href={(node as { data?: { target?: { fields?: { file?: { url?: string } } } } }).data?.target?.fields?.file?.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:text-gray-600 underline font-inter"
      >
        {children}
      </a>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
      const { title, description, file } = (node as { data?: { target?: { fields?: { title?: string; description?: string; file?: { url?: string } } } } }).data?.target?.fields || {};
      return (
        <div className="my-6 text-center">
          <Image
            src={file?.url || ''}
            width={1000}
            height={1000}
            alt={description || title || ''}
            className="w-full max-w-2xl h-auto shadow-lg border border-gray-300 mx-auto"
          />
          {title && (
            <p className="text-center text-sm text-gray-500 font-inter mt-2 italic">
              {title}
            </p>
          )}
        </div>
      );
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node: Block | Inline) => {
      // Handle embedded entries - you can customize this based on your content types
      const entryType = (node as { data?: { target?: { sys?: { contentType?: { sys?: { id?: string } } } } } }).data?.target?.sys?.contentType?.sys?.id;
      return (
        <div className="my-4 p-4 border border-gray-300 bg-gray-50">
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
    return <div className="text-gray-600 italic font-inter">No content available</div>;
  }

  return (
    <div className={`font-inter text-gray-800 leading-relaxed ${className}`}>
      {documentToReactComponents(content, renderOptions)}
    </div>
  );
}
