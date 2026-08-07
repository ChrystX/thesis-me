export const BLOCK_TYPE = {
    TEXT: 1,
    VIDEO: 2,
    IMAGE: 3,
    QUIZ: 4,
    EXTERNAL_LINK: 5,
    EXAM: 6,
    QUESTION: 7,
    GROUP: 8,
};

export const BLOCK_TYPE_META = {
    [BLOCK_TYPE.TEXT]: {
        id: BLOCK_TYPE.TEXT,
        name: "text",
        label: "Text",
        description: "Rich text content",
        color: "bg-blue-50 text-blue-700 border-blue-200",
        dotColor: "bg-blue-500",
        defaultData: { content: { type: "doc", content: [{ type: "paragraph" }] } },
    },
    [BLOCK_TYPE.VIDEO]: {
        id: BLOCK_TYPE.VIDEO,
        name: "video",
        label: "Video",
        description: "YouTube or Vimeo embed",
        color: "bg-orange-50 text-orange-700 border-orange-200",
        dotColor: "bg-orange-500",
        defaultData: { url: "", caption: "" },
    },
    [BLOCK_TYPE.IMAGE]: {
        id: BLOCK_TYPE.IMAGE,
        name: "image",
        label: "Image",
        description: "Upload or link an image",
        color: "bg-green-50 text-green-700 border-green-200",
        dotColor: "bg-green-500",
        defaultData: { url: "", alt_text: "", caption: "" },
    },
    [BLOCK_TYPE.QUIZ]: {
        id: BLOCK_TYPE.QUIZ,
        name: "quiz",
        label: "Quiz",
        description: "Multiple choice question",
        color: "bg-violet-50 text-violet-700 border-violet-200",
        dotColor: "bg-violet-500",
        defaultData: {
            question: "",
            options: ["", ""],
            correct_index: 0,
        },
    },
    [BLOCK_TYPE.QUESTION]: {
        id: BLOCK_TYPE.QUESTION,
        name: "question",
        label: "Question",
        description: "Exam question block",
        color: "bg-purple-50 text-purple-700 border-purple-200",
        dotColor: "bg-purple-500",
        defaultData: {
            type: "multiple_choice",
            question: "",
            options: ["", ""],
            correct_index: 0,
            points: 1,
            weight: 1,
        },
    },
    [BLOCK_TYPE.EXTERNAL_LINK]: {
        id: BLOCK_TYPE.EXTERNAL_LINK,
        name: "external_link",
        label: "External Link",
        description: "Reference to an external open resource",
        color: "bg-amber-50 text-amber-700 border-amber-200",
        dotColor: "bg-amber-500",
        defaultData: { title: "", description: "", url: "", creator: null, license: null },
        // not creatable from scratch — only populated via external import
        notManuallyCreatable: true,
    },
};

// parse data_json string from API
export function parseDataJson(dataJson) {
    try {
        return typeof dataJson === "string" ? JSON.parse(dataJson) : dataJson;
    } catch {
        return {};
    }
}

// serialize block data to data_json string
export function serializeDataJson(data) {
    return JSON.stringify(data);
}