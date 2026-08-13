import TextBlockView from "./TextBlockView.jsx";
import VideoBlockView from "./VideoBlockView.jsx";
import ImageBlockView from "./ImageBlockView.jsx";
import QuizBlockView from "./QuizBlockView.jsx";
import { BLOCK_TYPE, parseDataJson } from "../../../../components/lessoneditor/index.js";

function renderChild(child) {
    const data = parseDataJson(child.dataJson);
    switch (child.blockTypeId) {
        case BLOCK_TYPE.TEXT:  return <TextBlockView data={data} />;
        case BLOCK_TYPE.VIDEO: return <VideoBlockView data={data} />;
        case BLOCK_TYPE.IMAGE: return <ImageBlockView data={data} />;
        case BLOCK_TYPE.QUIZ:  return <QuizBlockView data={data} />;
        default:                return null;
    }
}

export default function CompositeBlockView({ block }) {
    const children = block.children ?? [];
    if (!children.length) return null;

    return (
        <div className="flex flex-col gap-4 border border-gray-100 rounded-2xl p-4 bg-gray-50/50">
            {children.map(c => <div key={c.id}>{renderChild(c)}</div>)}
        </div>
    );
}