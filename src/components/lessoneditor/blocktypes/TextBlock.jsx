import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";

const TOOLBAR_BUTTONS = [
    { action: "bold",        label: "B",   style: "font-bold",       tip: "Bold" },
    { action: "italic",      label: "I",   style: "italic",          tip: "Italic" },
    { action: "underline",   label: "U",   style: "underline",       tip: "Underline" },
    { action: "strike",      label: "S",   style: "line-through",    tip: "Strikethrough" },
];

const HEADING_LEVELS = [1, 2, 3];

function ToolbarButton({ active, onClick, children, title }) {
    return (
        <button
            type="button"
            title={title}
            onMouseDown={(e) => { e.preventDefault(); onClick(); }}
            className={`rounded px-2 py-1 text-xs transition ${
                active
                    ? "bg-gray-800 text-white"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            }`}
        >
            {children}
        </button>
    );
}

export default function TextBlock({ data, onChange, readOnly = false }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Placeholder.configure({ placeholder: "Write your lesson content here…" }),
        ],
        content: data.content ?? "",
        editable: !readOnly,
        onUpdate({ editor }) {
            // emit TipTap JSON — structured, safe, portable
            onChange({ ...data, content: editor.getJSON() });
        },
    });

    // Sync readOnly changes (e.g. preview mode toggle)
    useEffect(() => {
        editor?.setEditable(!readOnly);
    }, [editor, readOnly]);

    useEffect(() => {
        if (!editor) return;
        const current = editor.getJSON();
        const incoming = data.content ?? "";
        // Only reset if content actually differs to avoid cursor jumps
        if (JSON.stringify(current) !== JSON.stringify(incoming)) {
            editor.commands.setContent(incoming, false); // false = don't emit update
        }
    }, [data.content]);

    if (!editor) return null;

    return (
        <div className="flex flex-col">
            {/* Toolbar — hidden in readOnly */}
            {!readOnly && (
                <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-100 px-3 py-1.5">
                    {/* Marks */}
                    {TOOLBAR_BUTTONS.map(({ action, label, style, tip }) => (
                        <ToolbarButton
                            key={action}
                            title={tip}
                            active={editor.isActive(action)}
                            onClick={() => editor.chain().focus().toggleMark(action).run()}
                        >
                            <span className={style}>{label}</span>
                        </ToolbarButton>
                    ))}

                    <span className="mx-1 h-4 w-px bg-gray-200" />

                    {/* Headings */}
                    {HEADING_LEVELS.map((level) => (
                        <ToolbarButton
                            key={level}
                            title={`Heading ${level}`}
                            active={editor.isActive("heading", { level })}
                            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                        >
                            H{level}
                        </ToolbarButton>
                    ))}

                    <span className="mx-1 h-4 w-px bg-gray-200" />

                    {/* Lists */}
                    <ToolbarButton
                        title="Bullet list"
                        active={editor.isActive("bulletList")}
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                    >
                        • List
                    </ToolbarButton>
                    <ToolbarButton
                        title="Ordered list"
                        active={editor.isActive("orderedList")}
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    >
                        1. List
                    </ToolbarButton>

                    <span className="mx-1 h-4 w-px bg-gray-200" />

                    {/* Code & blockquote */}
                    <ToolbarButton
                        title="Inline code"
                        active={editor.isActive("code")}
                        onClick={() => editor.chain().focus().toggleCode().run()}
                    >
                        <span className="font-mono">`code`</span>
                    </ToolbarButton>
                    <ToolbarButton
                        title="Code block"
                        active={editor.isActive("codeBlock")}
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    >
                        <span className="font-mono">{"</>"}</span>
                    </ToolbarButton>
                    <ToolbarButton
                        title="Blockquote"
                        active={editor.isActive("blockquote")}
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    >
                        ❝
                    </ToolbarButton>

                    <span className="mx-1 h-4 w-px bg-gray-200" />

                    {/* Undo / Redo */}
                    <ToolbarButton
                        title="Undo"
                        active={false}
                        onClick={() => editor.chain().focus().undo().run()}
                    >
                        ↩
                    </ToolbarButton>
                    <ToolbarButton
                        title="Redo"
                        active={false}
                        onClick={() => editor.chain().focus().redo().run()}
                    >
                        ↪
                    </ToolbarButton>
                </div>
            )}

            {/* Editor area */}
            <EditorContent
                editor={editor}
                className="tiptap-editor px-4 py-3 text-sm leading-relaxed text-gray-800 outline-none"
            />
        </div>
    );
}