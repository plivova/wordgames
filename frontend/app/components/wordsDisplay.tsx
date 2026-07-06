import React from "react";
import { dict } from "@/app/lib/dictionary";

type WordsDisplayProps = {
    words: string[];
};

export default function WordsDisplay({ words }: WordsDisplayProps) {
    return (
        <div className="min-w-64 h-80 border rounded-lg shadow-sm bg-white p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-2 flex-shrink-0">{dict.wordsDisplay.heading} ({words.length})</h2>
            {words.length === 0 ? (
                <p className="text-gray-400 italic">{dict.wordsDisplay.empty}</p>
            ) : (
                <ul className="flex flex-col flex-wrap content-start gap-x-6 gap-y-1 text-gray-800 text-base flex-1 min-h-0">
                    {[...words].sort().map((word) => (
                        <li key={word}>{word}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
