import React, { useEffect, useState } from "react";
import { CornerDownLeft, Check } from "lucide-react";
import { dict } from "@/app/lib/dictionary";

type ClueCardProps = {
    index: number;
    clue: string;
    wordLength: number;
    isSolved: boolean;
    solvedWord: string;
    onSubmit: (answer: string) => void;
};

export function ClueCard({ index, clue, wordLength, isSolved, solvedWord, onSubmit }: ClueCardProps) {
    const [input, setInput] = useState('');

    useEffect(() => {
        setInput('');
    }, [clue]);

    const handleSubmit = () => {
        if (input.trim()) {
            onSubmit(input);
            setInput('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    if (isSolved) {
        return (
            <div className="flex items-center gap-3 w-full">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white font-bold text-sm shrink-0">
                    <Check size={16} />
                </div>
                <div className="flex-1 px-4 py-3 rounded-xl bg-green-50 border-2 border-green-300 font-bold tracking-wider uppercase text-center text-green-800">
                    {solvedWord}
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3 w-full">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm shrink-0">
                {index + 1}
            </div>
            <div className="flex-1 rounded-xl bg-secondary/10 border-2 border-secondary overflow-hidden">
                <div className="px-4 pt-3 pb-2 text-sm text-gray-600 text-center">
                    {clue}
                </div>
                <div className="flex items-center gap-2 px-3 pb-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        maxLength={wordLength}
                        placeholder={"_".repeat(wordLength)}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-secondary/60 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 tracking-widest uppercase font-bold text-center"
                    />
                    <button
                        onClick={handleSubmit}
                        className="p-2 rounded-full bg-primary text-white hover:bg-accentDark transition-colors shrink-0"
                        title={dict.crossclimb.submitAnswer}
                    >
                        <CornerDownLeft size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
