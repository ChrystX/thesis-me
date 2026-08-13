
import TextBlockView from "./blocks/TextBlockView.jsx";
import VideoBlockView from "./blocks/VideoBlockView.jsx";
import ImageBlockView from "./blocks/ImageBlockView.jsx";
import QuizBlockView from "./blocks/QuizBlockView.jsx";
import {BLOCK_TYPE, parseDataJson} from "../../../components/lessoneditor/index.js";
import CompositeBlockView from "./blocks/CompositeBlockView.jsx";

export default function LessonBlockRenderer({ block }) {
    const data = parseDataJson(block.data_json ?? block.dataJson);
    console.log("BLOCK:", block.block_type_id ?? block.blockTypeId, "GROUP=", BLOCK_TYPE.GROUP, "data:", data);

    switch (block.block_type_id ?? block.blockTypeId) {
        case BLOCK_TYPE.TEXT:  return <TextBlockView data={data} />;
        case BLOCK_TYPE.VIDEO: return <VideoBlockView data={data} />;
        case BLOCK_TYPE.IMAGE: return <ImageBlockView data={data} />;
        case BLOCK_TYPE.QUIZ:  return <QuizBlockView data={data} />;
        case BLOCK_TYPE.GROUP: return <CompositeBlockView data={data} />;
        default:               return null;
    }
}