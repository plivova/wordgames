import { WordViewData } from "@/app/models/WordViewData";

const CZECH_LETTER_REGEX = /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]$/;

export function isValidCzechLetter(char: string): boolean {
    return CZECH_LETTER_REGEX.test(char.toUpperCase());
}

export function isWordValid(word: string, wordList: WordViewData[]): boolean {
    const normalized = word.toLowerCase();
    return wordList.some(w => w.text.toLowerCase() === normalized);
}

export function isAlreadyFound(word: string, foundWords: string[]): boolean {
    return foundWords.includes(word.toLowerCase());
}
