import {useLocation, useParams} from "react-router-dom";
import LessonEditor from "../components/lessoneditor/index.js";

export default function LessonEditorPage() {
    const { lessonId } = useParams();
    const { state } = useLocation();

    return (
        <div className="h-[calc(100vh-64px)]">
            <LessonEditor
                lessonId={Number(lessonId)}
                lessonTitle  ={state?.lessonTitle}
            />

        </div>
    );
}