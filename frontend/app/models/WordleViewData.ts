export type LetterResult = 'correct' | 'present' | 'absent' | 'empty';

export type WordleGuess = {
    word: string;
    results: LetterResult[];
};
