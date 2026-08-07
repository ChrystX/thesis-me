import { useLocation, useParams } from "react-router-dom";
import ExamEditor from "../components/lessoneditor/exam/ExamEditor.jsx";

export default function ExamEditorPage() {
    const { lessonId } = useParams();
    const { state } = useLocation();

    return (
        <ExamEditor
            lessonId={Number(lessonId)}
            lessonTitle={state?.lessonTitle ?? "Untitled Exam"}
        />
    );
}