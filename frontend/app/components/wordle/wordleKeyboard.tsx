import { Delete, CornerDownLeft } from "lucide-react";
import { LetterResult } from "@/app/models/WordleViewData";

type WordleKeyboardProps = {
    keyboardState: Record<string, LetterResult>;
    onKey: (key: string) => void;
    onDelete: () => void;
    onSubmit: () => void;
};

const ROWS = [
    ['q', 'w', 'e', 'é', 'ě', 'r', 'ř', 't', 'ť', 'z', 'ž', 'u', 'ú', 'ů', 'i', 'í', 'o', 'ó', 'p'],
    ['a', 'á', 's', 'š', 'd', 'ď', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['y', 'ý', 'x', 'c', 'č', 'v', 'b', 'n', 'ň', 'm'],
];

const keyColors: Record<LetterResult, string> = {
    correct: 'bg-primary text-white border-primary',
    present: 'bg-yellow-500 text-white border-yellow-500',
    absent: 'bg-gray-500 text-white border-gray-500',
    empty: 'bg-gray-200 text-gray-800 border-gray-200',
};

export function WordleKeyboard({ keyboardState, onKey, onDelete, onSubmit }: WordleKeyboardProps) {
    const getColor = (key: string) => keyColors[keyboardState[key] ?? 'empty'];

    return (
        <div className="flex flex-col items-center gap-1.5 w-full max-w-lg">
            {ROWS.map((row, rowIdx) => (
                <div key={rowIdx} className="flex gap-1 justify-center">
                    {rowIdx === 2 && (
                        <button
                            onClick={onSubmit}
                            className="px-3 py-3 rounded-lg bg-primary text-white font-bold text-xs hover:opacity-90 transition-opacity"
                        >
                            <CornerDownLeft size={16} />
                        </button>
                    )}
                    {row.map((key) => (
                        <button
                            key={key}
                            onClick={() => onKey(key)}
                            className={`min-w-[1.75rem] px-1.5 py-3 rounded-lg font-bold text-xs uppercase hover:opacity-90 transition-colors border ${getColor(key)}`}
                        >
                            {key}
                        </button>
                    ))}
                    {rowIdx === 2 && (
                        <button
                            onClick={onDelete}
                            className="px-3 py-3 rounded-lg bg-gray-200 text-gray-800 font-bold text-xs hover:bg-gray-300 transition-colors"
                        >
                            <Delete size={16} />
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
