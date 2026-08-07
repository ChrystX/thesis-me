function renderNode(node, idx) {
    if (!node) return null;

    switch (node.type) {
        case "doc":
            return <div key={idx}>{node.content?.map((n, i) => renderNode(n, i))}</div>;

        case "paragraph":
            return (
                <p key={idx} className="mb-3 leading-relaxed text-gray-700">
                    {node.content?.map((n, i) => renderNode(n, i)) ?? <br />}
                </p>
            );

        case "heading": {
            const Tag = `h${node.attrs?.level ?? 2}`;
            const sizes = { 1: "text-2xl", 2: "text-xl", 3: "text-lg" };
            return (
                <Tag key={idx} className={`${sizes[node.attrs?.level ?? 2]} font-bold text-gray-900 mb-3 mt-6 leading-snug`}>
                    {node.content?.map((n, i) => renderNode(n, i))}
                </Tag>
            );
        }

        case "text": {
            const marks = node.marks?.map(m => m.type) ?? [];
            let el = <span key={idx}>{node.text}</span>;
            if (marks.includes("bold"))      el = <strong key={idx} className="font-semibold text-gray-900">{node.text}</strong>;
            if (marks.includes("italic"))    el = <em key={idx} className="italic">{node.text}</em>;
            if (marks.includes("underline")) el = <u key={idx} className="underline">{node.text}</u>;
            if (marks.includes("strike"))    el = <s key={idx} className="line-through text-gray-400">{node.text}</s>;
            if (marks.includes("code"))      el = <code key={idx} className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono">{node.text}</code>;
            return el;
        }

        case "bulletList":
            return (
                <ul key={idx} className="list-disc pl-5 mb-3 space-y-1">
                    {node.content?.map((n, i) => renderNode(n, i))}
                </ul>
            );

        case "orderedList":
            return (
                <ol key={idx} className="list-decimal pl-5 mb-3 space-y-1">
                    {node.content?.map((n, i) => renderNode(n, i))}
                </ol>
            );

        case "listItem":
            return (
                <li key={idx} className="text-gray-700">
                    {node.content?.map((n, i) => renderNode(n, i))}
                </li>
            );

        case "blockquote":
            return (
                <blockquote key={idx} className="border-l-4 border-pink-300 pl-4 italic text-gray-500 my-4">
                    {node.content?.map((n, i) => renderNode(n, i))}
                </blockquote>
            );

        case "codeBlock":
            return (
                <pre key={idx} className="bg-gray-900 text-green-400 rounded-xl p-4 overflow-x-auto text-sm font-mono my-4">
                    {node.content?.map((n, i) => renderNode(n, i))}
                </pre>
            );

        case "hardBreak":
            return <br key={idx} />;

        default:
            return null;
    }
}

export default function TextBlockView({ data }) {
    const content = data?.content;
    if (!content) return null;

    const doc = typeof content === "string" ? JSON.parse(content) : content;
    return <div className="prose-sm max-w-none">{renderNode(doc, 0)}</div>;
}