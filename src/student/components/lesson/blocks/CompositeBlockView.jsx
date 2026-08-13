// CompositeBlockView.jsx
import { useEffect, useState } from "react";
import TextBlockView from "./TextBlockView.jsx";
import VideoBlockView from "./VideoBlockView.jsx";
import ImageBlockView from "./ImageBlockView.jsx";
import QuizBlockView from "./QuizBlockView.jsx";
import {BLOCK_TYPE} from "../../../../components/lessoneditor/index.js";

function renderChild(child) {
    const data = JSON.parse(child.dataJson ?? "{}");
    switch (child.blockTypeId) {
        case BLOCK_TYPE.TEXT:  return <TextBlockView data={data} />;
        case BLOCK_TYPE.VIDEO: return <VideoBlockView data={data} />;
        case BLOCK_TYPE.IMAGE: return <ImageBlockView data={data} />;
        case BLOCK_TYPE.QUIZ:  return <QuizBlockView data={data} />;
        case BLOCK_TYPE.GROUP: return <CompositeBlockView data={data} />;
        default:                return null;
    }
}

export default function CompositeBlockView({ data }) {
    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const ids = data?.childContentObjectIds ?? [];
        if (!ids.length) { setLoading(false); return; }

        Promise.all(ids.map(id =>
            fetch(`/api/content-objects/${id}`).then(r => r.json())
        )).then(setChildren).finally(() => setLoading(false));
    }, [data]);

    if (loading) return <div className="text-xs text-gray-300">Loading…</div>;
    if (!children.length) return null;

    return (
        <div className="flex flex-col gap-4 border border-gray-100 rounded-2xl p-4 bg-gray-50/50">
            {children.map(c => <div key={c.id}>{renderChild(c)}</div>)}
        </div>
    );
}