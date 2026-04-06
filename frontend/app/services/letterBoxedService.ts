import { WordViewData } from "@/app/models/WordViewData";

type Sides = [string[], string[], string[], string[]];

const CZECH_LETTER_REGEX = /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]$/;

export function isValidCzechLetter(char: string): boolean {
    return CZECH_LETTER_REGEX.test(char.toUpperCase());
}

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

export function isWordValid(word: string, wordList: WordViewData[]): boolean {
    const normalized = word.toLowerCase();
    return wordList.some(w => w.text.toLowerCase() === normalized);
}

export function isAlreadyFound(word: string, foundWords: string[]): boolean {
    return foundWords.includes(word.toLowerCase());
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

// ─── Debug: log valid words and find winning chains ───

export function debugLogSolutions(words: WordViewData[], sides: Sides) {
    const allLettersSet = new Set(getAllLetters(sides));
    const wordTexts = words.map(w => w.text.toLowerCase());

    console.log("=== LETTERBOXED DEBUG ===");
    console.log("Sides:", sides.map(s => s.join('')).join(' | '));
    console.log(`Valid words (${wordTexts.length}):`, wordTexts.sort().join(', '));

    // Build index: starting letter -> words
    const byStart = new Map<string, string[]>();
    for (const w of wordTexts) {
        const s = w[0];
        if (!byStart.has(s)) byStart.set(s, []);
        byStart.get(s)!.push(w);
    }

    // Sort by unique letter coverage (descending) for faster/better results
    for (const [, ws] of byStart) {
        ws.sort((a, b) => new Set(b).size - new Set(a).size);
    }

    const solutions: string[][] = [];
    const MAX_SOLUTIONS = 30;
    const MAX_DEPTH = 5;

    function solve(chain: string[], covered: Set<string>, lastChar: string | null) {
        if (solutions.length >= MAX_SOLUTIONS) return;
        if (covered.size === allLettersSet.size) {
            solutions.push([...chain]);
            return;
        }
        if (chain.length >= MAX_DEPTH) return;

        const candidates = lastChar ? (byStart.get(lastChar) || []) : wordTexts;
        for (const w of candidates) {
            if (solutions.length >= MAX_SOLUTIONS) return;
            let addsNew = false;
            for (const c of w.toUpperCase()) {
                if (!covered.has(c)) { addsNew = true; break; }
            }
            if (!addsNew) continue;

            const newCovered = new Set(covered);
            for (const c of w.toUpperCase()) newCovered.add(c);
            chain.push(w);
            solve(chain, newCovered, w[w.length - 1]);
            chain.pop();
        }
    }

    solve([], new Set(), null);

    console.log(`\nWinning combinations (${solutions.length}, max ${MAX_SOLUTIONS}):`);
    solutions.forEach((s, i) =>
        console.log(`  ${i + 1}. ${s.join(' → ')} (${s.length} words)`)
    );
    console.log("========================");
}

export function parseSidesFromApi(data: { side1: string; side2: string; side3: string; side4: string }): Sides {
    return [
        data.side1.toUpperCase().split(''),
        data.side2.toUpperCase().split(''),
        data.side3.toUpperCase().split(''),
        data.side4.toUpperCase().split(''),
    ];
}
