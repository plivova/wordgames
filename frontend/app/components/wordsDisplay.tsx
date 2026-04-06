import React from "react";
import { dict } from "@/app/lib/dictionary";

type WordsDisplayProps = {
    words: string[];
};

export default function WordsDisplay({ words }: WordsDisplayProps) {
    return (
        <div className="w-64 h-80 overflow-y-auto border rounded-lg shadow-sm bg-white p-4">
            <h2 className="text-lg font-semibold mb-2">{dict.wordsDisplay.heading} ({words.length})</h2>
            {words.length === 0 ? (
                <p className="text-gray-400 italic">{dict.wordsDisplay.empty}</p>
            ) : (
                <ul className="space-y-1 text-gray-800 text-base">
                    {words.sort().map((word, index) => (
                        <li key={index} className="truncate">{word}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
