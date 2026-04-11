import { CrossclimbSetViewData, CrossclimbWord } from "@/app/models/CrossclimbSetViewData";

// Parse API response into view data
export function parseCrossclimbSet(data: {
    id: number;
    wordLength: number;
    ladderSize: number;
    word1: string;
    word2: string;
    word3: string;
    word4: string | null;
    word5: string | null;
    clue1: string | null;
    clue2: string | null;
    clue3: string | null;
    clue4: string | null;
    clue5: string | null;
}): CrossclimbSetViewData {
    const allWords: { text: string; clue: string | null }[] = [
        { text: data.word1, clue: data.clue1 },
        { text: data.word2, clue: data.clue2 },
        { text: data.word3, clue: data.clue3 },
    ];
    if (data.ladderSize >= 4 && data.word4) {
        allWords.push({ text: data.word4, clue: data.clue4 });
    }
    if (data.ladderSize >= 5 && data.word5) {
        allWords.push({ text: data.word5, clue: data.clue5 });
    }

    if (allWords.length !== data.ladderSize) {
        throw new Error(`Expected ${data.ladderSize} words, got ${allWords.length}`);
    }

    const words: CrossclimbWord[] = allWords.map((w) => ({
        text: w.text,
        clue: w.clue ?? generatePlaceholderClue(w.text),
    }));

    return {
        id: data.id,
        wordLength: data.wordLength,
        ladderSize: data.ladderSize,
        words,
    };
}

// Generate a placeholder clue (anagram) until LLM clues are available
export function generatePlaceholderClue(word: string): string {
    const chars = word.split('');
    for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    const shuffled = chars.join('');
    if (shuffled === word && word.length >= 2) {
        return word[1] + word[0] + word.slice(2);
    }
    return shuffled;
}

// Check if two words differ at exactly one position
export function differsByOne(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    let diffs = 0;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) diffs++;
        if (diffs > 1) return false;
    }
    return diffs === 1;
}

// Check if an array of words forms a valid ladder
export function isValidLadder(words: string[]): boolean {
    for (let i = 0; i < words.length - 1; i++) {
        if (!differsByOne(words[i].toLowerCase(), words[i + 1].toLowerCase())) {
            return false;
        }
    }
    return true;
}

// Shuffle all words for initial presentation
export function shuffleWords(words: CrossclimbWord[]): CrossclimbWord[] {
    const shuffled = [...words];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
