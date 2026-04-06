import { WordViewData } from "@/app/models/WordViewData";

const CZECH_LETTER_REGEX = /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]$/;
const MAX_INPUT_LENGTH = 12;

export function isValidCzechLetter(char: string): boolean {
    return CZECH_LETTER_REGEX.test(char.toUpperCase());
}

export function sanitizeInput(raw: string): string {
    let result = '';
    for (const char of raw.toUpperCase()) {
        if (isValidCzechLetter(char) && result.length < MAX_INPUT_LENGTH) {
            result += char;
        }
    }
    return result;
}

export function canAddLetter(currentInput: string, char: string): boolean {
    return isValidCzechLetter(char) && currentInput.length < MAX_INPUT_LENGTH;
}

export function orderLetters(letters: string, centralLetter: string): string[] {
    const allLetters = letters.toUpperCase().split('');
    const central = centralLetter.toUpperCase();
    const nonCentral = allLetters.filter(l => l !== central);
    nonCentral.splice(3, 0, central);
    return nonCentral;
}

export function calculateWordPoints(word: string, allowedLetters: string[]): number {
    const len = word.length;
    let pts = len === 4 ? 1 : len;
    if (isPangram(word, allowedLetters)) pts += 7;
    return pts;
}

export function calculateMaxPoints(wordList: WordViewData[], allowedLetters: string[]): number {
    return wordList.reduce((sum, word) => {
        return sum + calculateWordPoints(word.text, allowedLetters);
    }, 0);
}

export function isPangram(word: string, allowedLetters: string[]): boolean {
    const upper = word.toUpperCase();
    return allowedLetters.every(l => upper.includes(l));
}

export function isWordValid(word: string, wordList: WordViewData[]): boolean {
    const normalized = word.toLowerCase();
    return wordList.some(w => w.text.toLowerCase() === normalized);
}

export function isAlreadyFound(word: string, foundWords: string[]): boolean {
    return foundWords.includes(word.toLowerCase());
}

export function scrambleLetters(letters: string, centralLetter: string): string {
    const central = centralLetter.toLowerCase();
    const others = letters.split('').filter(l => l.toLowerCase() !== central);
    for (let i = others.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [others[i], others[j]] = [others[j], others[i]];
    }
    return others.join('') + centralLetter;
}
