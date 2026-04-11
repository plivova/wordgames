import { LetterResult } from "@/app/models/WordleViewData";

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

// Build keyboard letter states from all guesses
export function getKeyboardState(
    guesses: { word: string; results: LetterResult[] }[]
): Record<string, LetterResult> {
    const state: Record<string, LetterResult> = {};

    for (const guess of guesses) {
        for (let i = 0; i < guess.word.length; i++) {
            const letter = guess.word[i].toLowerCase();
            const result = guess.results[i];

            // Priority: correct > present > absent
            if (state[letter] === 'correct') continue;
            if (state[letter] === 'present' && result !== 'correct') continue;
            state[letter] = result;
        }
    }

    return state;
}
