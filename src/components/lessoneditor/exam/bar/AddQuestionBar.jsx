import { useState } from "react";
import { Plus, ChevronDown, Search } from "lucide-react";
import RloSearchModal from "../../modal/contentobject/RloSearchModal.jsx";
import {BLOCK_TYPE} from "../../BlockTypes.js";

const QUESTION_TYPES = [
    { value: "multiple_choice", label: "Multiple choice" },
    { value: "multiple_select", label: "Multiple select" },
    { value: "true_false",      label: "True / false" },
    { value: "fill_in_blank",   label: "Fill in the blank" },
];

export default function AddQuestionBar({ onAdd, onAddRlo, disabled = false }) {
    const [typeMenuOpen, setTypeMenuOpen] = useState(false);
    const [searchingRlo, setSearchingRlo] = useState(false);

    function handleSelect(rlo) {
        onAddRlo(rlo);
        setSearchingRlo(false);
    }

    return (
        <>
            <div className="relative mt-4 flex gap-2">
                <div className="relative flex-1">
                    <button
                        onClick={() => setTypeMenuOpen((v) => !v)}
                        disabled={disabled}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-3 text-sm font-medium text-gray-500 transition hover:border-violet-400 hover:bg-violet-50 hover:text-violet-600 disabled:cursor-wait disabled:opacity-60"
                    >
                        <Plus className="h-4 w-4" />
                        {disabled ? "Adding…" : "Add Question"}
                        <ChevronDown className="h-3.5 w-3.5" />
                    </button>

                    {typeMenuOpen && (
                        <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                            {QUESTION_TYPES.map((t) => (
                                <button
                                    key={t.value}
                                    onClick={() => { onAdd(t.value); setTypeMenuOpen(false); }}
                                    className="block w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700"
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    disabled={disabled}
                    onClick={() => setSearchingRlo(true)}
                    title="Use an existing question"
                    className="flex items-center gap-2 rounded-xl border-2 border-dashed border-gray-200 px-4 py-3 text-sm font-medium text-gray-500 transition hover:border-violet-400 hover:bg-violet-50 hover:text-violet-600 disabled:cursor-wait disabled:opacity-60"
                >
                    <Search className="h-3.5 w-3.5" />
                    Use existing
                </button>
            </div>

            {searchingRlo && (
                <RloSearchModal
                    blockTypeId={BLOCK_TYPE.QUESTION}
                    onSelect={handleSelect}
                    onClose={() => setSearchingRlo(false)}
                />
            )}
        </>
    );
}