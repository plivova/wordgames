export { isValidCzechLetter, isWordValid, isAlreadyFound } from "@/app/services/wordUtils";

type Sides = [string[], string[], string[], string[]];

export function findSide(letter: string, sides: Sides): number {
    const upper = letter.toUpperCase();
    for (let s = 0; s < 4; s++) {
        if (sides[s].some(l => l.toUpperCase() === upper)) return s;
    }
    return -1;
}

export function getAllLetters(sides: Sides): string[] {
    return sides.flat().map(l => l.toUpperCase());
}

export function canAddLetter(
    char: string,
    currentInput: string,
    lastLetter: string | null,
    sides: Sides,
): boolean {
    const upper = char.toUpperCase();
    const allLetters = getAllLetters(sides);

    if (!allLetters.includes(upper)) return false;

    if (currentInput.length === 0) {
        if (lastLetter && upper !== lastLetter) return false;
        return true;
    }

    const prevChar = currentInput[currentInput.length - 1].toUpperCase();
    const prevSide = findSide(prevChar, sides);
    const newSide = findSide(upper, sides);

    return prevSide !== newSide;
}

export function isSameSideViolation(
    char: string,
    currentInput: string,
    sides: Sides,
): boolean {
    if (currentInput.length === 0) return false;
    const prevChar = currentInput[currentInput.length - 1].toUpperCase();
    const prevSide = findSide(prevChar, sides);
    const newSide = findSide(char.toUpperCase(), sides);
    return prevSide === newSide && prevSide !== -1;
}

export function checkAllLettersUsed(usedLetters: Set<string>, sides: Sides): boolean {
    const allLetters = getAllLetters(sides);
    return allLetters.length > 0 && allLetters.every(l => usedLetters.has(l));
}

export function recalcUsedLetters(foundWords: string[]): Set<string> {
    const used = new Set<string>();
    for (const word of foundWords) {
        for (const c of word.toUpperCase()) {
            used.add(c);
        }
    }
    return used;
}

export function addLettersToUsed(usedLetters: Set<string>, word: string): Set<string> {
    const newUsed = new Set(usedLetters);
    for (const c of word.toUpperCase()) {
        newUsed.add(c);
    }
    return newUsed;
}

export function parseSidesFromApi(data: { side1: string; side2: string; side3: string; side4: string }): Sides {
    return [
        data.side1.toUpperCase().split(''),
        data.side2.toUpperCase().split(''),
        data.side3.toUpperCase().split(''),
        data.side4.toUpperCase().split(''),
    ];
}
