import { WordleGuess, LetterResult } from "@/app/models/WordleViewData";
import { WORD_LENGTH, MAX_GUESSES } from "@/app/services/wordleService";

type WordleGridProps = {
    guesses: WordleGuess[];
    currentInput: string;
};

const resultColors: Record<LetterResult, string> = {
    correct: 'bg-primary text-white border-primary',
    present: 'bg-yellow-500 text-white border-yellow-500',
    absent: 'bg-gray-500 text-white border-gray-500',
    empty: 'bg-white border-gray-300',
};

export function WordleGrid({ guesses, currentInput }: WordleGridProps) {
    const rows: { letter: string; result: LetterResult }[][] = [];

    // Completed guesses
    for (const guess of guesses) {
        rows.push(
            guess.word.split('').map((letter, i) => ({
                letter: letter.toUpperCase(),
                result: guess.results[i],
            }))
        );
    }

    // Current input row
    if (rows.length < MAX_GUESSES) {
        const currentRow = [];
        for (let i = 0; i < WORD_LENGTH; i++) {
            currentRow.push({
                letter: i < currentInput.length ? currentInput[i].toUpperCase() : '',
                result: 'empty' as LetterResult,
            });
        }
        rows.push(currentRow);
    }

    // Empty remaining rows
    while (rows.length < MAX_GUESSES) {
        rows.push(
            Array.from({ length: WORD_LENGTH }, () => ({
                letter: '',
                result: 'empty' as LetterResult,
            }))
        );
    }

    return (
        <div className="flex flex-col items-center gap-1.5">
            {rows.map((row, rowIdx) => (
                <div key={rowIdx} className="flex gap-1.5">
                    {row.map((cell, colIdx) => (
                        <div
                            key={colIdx}
                            className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg font-bold text-2xl uppercase transition-colors ${resultColors[cell.result]} ${
                                cell.result === 'empty' && cell.letter ? 'border-gray-500' : ''
                            }`}
                        >
                            {cell.letter}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
