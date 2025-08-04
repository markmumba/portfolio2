// components/RichTextRenderer.js
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES, Document, Text } from '@contentful/rich-text-types';

const renderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-bold">{text}</strong>,
    [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic">{text}</em>,
    [MARKS.UNDERLINE]: (text: React.ReactNode) => <u className="underline">{text}</u>,
    [MARKS.CODE]: (text: React.ReactNode) => (
      <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
        {text}
      </code>
    ),
    [MARKS.STRIKETHROUGH]: (text: React.ReactNode) => <del className="line-through">{text}</del>,
    [MARKS.SUPERSCRIPT]: (text: React.ReactNode) => <sup className="text-xs">{text}</sup>,
    [MARKS.SUBSCRIPT]: (text: React.ReactNode) => <sub className="text-xs">{text}</sub>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
      <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => (
      <h1 className="text-4xl font-bold mb-6 text-gray-900">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
      <h2 className="text-3xl font-bold mb-5 text-gray-900">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
      <h3 className="text-2xl font-bold mb-4 text-gray-900">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (node: any, children: React.ReactNode) => (
      <h4 className="text-xl font-bold mb-3 text-gray-900">{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (node: any, children: React.ReactNode) => (
      <h5 className="text-lg font-bold mb-2 text-gray-900">{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (node: any, children: React.ReactNode) => (
      <h6 className="text-base font-bold mb-2 text-gray-900">{children}</h6>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => (
      <li className="ml-4">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-2 mb-4 italic text-gray-600 bg-gray-50 rounded-r">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-8 border-gray-300" />,
    [BLOCKS.TABLE]: (node: any, children: React.ReactNode) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border-collapse border border-gray-300">
          <tbody>{children}</tbody>
        </table>
      </div>
    ),
    [BLOCKS.TABLE_ROW]: (node: any, children: React.ReactNode) => (
      <tr className="border-b border-gray-300">{children}</tr>
    ),
    [BLOCKS.TABLE_CELL]: (node: any, children: React.ReactNode) => (
      <td className="border border-gray-300 px-4 py-2">{children}</td>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: (node: any, children: React.ReactNode) => (
      <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-bold">
        {children}
      </th>
    ),
    [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {children}
      </a>
    ),
    [INLINES.ENTRY_HYPERLINK]: (node: any, children: React.ReactNode) => (
      <a
        href={`/articles/${node.data.target.sys.id}`}
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {children}
      </a>
    ),
    [INLINES.ASSET_HYPERLINK]: (node: any, children: React.ReactNode) => (
      <a
        href={node.data.target.fields.file.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {children}
      </a>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { title, description, file } = node.data.target.fields;
      return (
        <div className="my-6">
          <img
            src={file.url}
            alt={description || title}
            className="w-full h-auto rounded-lg shadow-md"
          />
          {title && (
            <p className="text-center text-sm text-gray-600 mt-2">{title}</p>
          )}
        </div>
      );
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
      // Handle embedded entries - you can customize this based on your content types
      const entryType = node.data.target.sys.contentType.sys.id;
      return (
        <div className="my-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <p className="text-sm text-gray-600">
            Embedded {entryType}: {node.data.target.fields.title || 'Untitled'}
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
    return <div className="text-gray-500 italic">No content available</div>;
  }

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      {documentToReactComponents(content, renderOptions)}
    </div>
  );
}
