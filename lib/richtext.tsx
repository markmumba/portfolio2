// components/RichTextRenderer.js
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES, Document, Block, Inline } from '@contentful/rich-text-types';
import Image from 'next/image';

const renderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-bold text-black">{text}</strong>,
    [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic text-newspaper-gray">{text}</em>,
    [MARKS.UNDERLINE]: (text: React.ReactNode) => <u className="underline">{text}</u>,
    [MARKS.CODE]: (text: React.ReactNode) => (
      <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono border border-gray-300">
        {text}
      </code>
    ),
    [MARKS.STRIKETHROUGH]: (text: React.ReactNode) => <del className="line-through text-newspaper-gray">{text}</del>,
    [MARKS.SUPERSCRIPT]: (text: React.ReactNode) => <sup className="text-xs">{text}</sup>,
    [MARKS.SUBSCRIPT]: (text: React.ReactNode) => <sub className="text-xs">{text}</sub>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: React.ReactNode) => (
      <p className="mb-6 leading-relaxed text-black font-newspaper text-lg">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: Block | Inline, children: React.ReactNode) => (
      <h1 className="text-3xl font-newspaper font-black text-black mb-6 mt-8 border-b-2 border-black pb-2">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: React.ReactNode) => (
      <h2 className="text-2xl font-newspaper font-bold text-black mb-5 mt-7 border-b border-gray-300 pb-1">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (node: Block | Inline, children: React.ReactNode) => (
      <h3 className="text-xl font-newspaper font-bold text-black mb-4 mt-6">
        {children}
      </h3>
    ),
    [BLOCKS.HEADING_4]: (node: Block | Inline, children: React.ReactNode) => (
      <h4 className="text-lg font-newspaper font-bold text-black mb-3 mt-5">
        {children}
      </h4>
    ),
    [BLOCKS.HEADING_5]: (node: Block | Inline, children: React.ReactNode) => (
      <h5 className="text-lg font-newspaper font-bold text-black mb-2 mt-4">
        {children}
      </h5>
    ),
    [BLOCKS.HEADING_6]: (node: Block | Inline, children: React.ReactNode) => (
      <h6 className="text-base font-newspaper font-bold text-black mb-2 mt-4">
        {children}
      </h6>
    ),
    [BLOCKS.UL_LIST]: (node: Block | Inline, children: React.ReactNode) => (
      <ul className="list-disc list-inside mb-6 space-y-2 text-black font-newspaper pl-4">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (node: Block | Inline, children: React.ReactNode) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 text-black font-newspaper pl-4">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: Block | Inline, children: React.ReactNode) => (
      <li className="ml-4 leading-relaxed">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node: Block | Inline, children: React.ReactNode) => (
      <blockquote className="border-l-4 border-accent-red pl-6 py-4 mb-6 italic text-newspaper-gray bg-gray-50 rounded-r font-newspaper text-lg">
        &quot;{children}&quot;
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-8 border-2 border-black" />,
    [BLOCKS.TABLE]: (node: Block | Inline, children: React.ReactNode) => (
      <div className="overflow-x-auto mb-6 border-2 border-black">
        <table className="min-w-full border-collapse">
          <tbody className="font-newspaper">{children}</tbody>
        </table>
      </div>
    ),
    [BLOCKS.TABLE_ROW]: (node: Block | Inline, children: React.ReactNode) => (
      <tr className="border-b border-gray-300">{children}</tr>
    ),
    [BLOCKS.TABLE_CELL]: (node: Block | Inline, children: React.ReactNode) => (
      <td className="border border-gray-300 px-4 py-3 text-black">{children}</td>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: (node: Block | Inline, children: React.ReactNode) => (
      <th className="border border-gray-300 px-4 py-3 bg-gray-100 font-newspaper font-bold text-black">
        {children}
      </th>
    ),
    [INLINES.HYPERLINK]: (node: Block | Inline, children: React.ReactNode) => (
      <a
        href={(node as { data?: { uri?: string } }).data?.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-red hover:text-red-700 underline font-newspaper"
      >
        {children}
      </a>
    ),
    [INLINES.ENTRY_HYPERLINK]: (node: Block | Inline, children: React.ReactNode) => (
      <a
        href={`/articles/${(node as { data?: { target?: { sys?: { id?: string } } } }).data?.target?.sys?.id}`}
        className="text-accent-red hover:text-red-700 underline font-newspaper"
      >
        {children}
      </a>
    ),
    [INLINES.ASSET_HYPERLINK]: (node: Block | Inline, children: React.ReactNode) => (
      <a
        href={(node as { data?: { target?: { fields?: { file?: { url?: string } } } } }).data?.target?.fields?.file?.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-red hover:text-red-700 underline font-newspaper"
      >
        {children}
      </a>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
      const { title, description, file } = (node as { data?: { target?: { fields?: { title?: string; description?: string; file?: { url?: string } } } } }).data?.target?.fields || {};
      return (
        <div className="my-8 text-center">
          <Image
            src={file?.url || ''}
            width={1000}
            height={1000}
            alt={description || title || ''}
            className="w-full max-w-2xl h-auto rounded-lg shadow-lg border-2 border-black mx-auto"
          />
          {title && (
            <p className="text-center text-sm text-newspaper-gray font-newspaper mt-3 italic">
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
        <div className="my-6 p-6 border-2 border-black rounded-lg bg-gray-50">
          <p className="text-sm text-newspaper-gray font-newspaper">
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
    return <div className="text-newspaper-gray italic font-newspaper">No content available</div>;
  }

  return (
    <div className={`font-newspaper text-black leading-relaxed ${className}`}>
      {documentToReactComponents(content, renderOptions)}
    </div>
  );
}
