import { useCallback, useEffect, useState } from "react";
import { LetterBoxedSetViewData } from "@/app/models/LetterBoxedSetViewData";
import { WordViewData } from "@/app/models/WordViewData";
import { getRandomLetterBoxedSet, getLetterBoxedWordList } from "@/app/repositories/gamesRepository";
import {
    getAllLetters,
    canAddLetter as isValidMove,
    isSameSideViolation,
    isWordValid,
    isAlreadyFound,
    checkAllLettersUsed,
    recalcUsedLetters,
    addLettersToUsed,
    parseSidesFromApi,
    isValidCzechLetter,
} from "@/app/services/letterBoxedService";
import toast from "react-hot-toast";
import { dict } from "@/app/lib/dictionary";

export function useLetterBoxed() {
    const [letterSet, setLetterSet] = useState<LetterBoxedSetViewData | null>(null);
    const [input, setInput] = useState('');
    const [isGameDetailModalOpen, setIsGameDetailModalOpen] = useState(false);
    const [wordListForSet, setWordListForSet] = useState<WordViewData[] | null>(null);
    const [foundWords, setFoundWords] = useState<string[]>([]);
    const [usedLetters, setUsedLetters] = useState<Set<string>>(new Set());
    const [showWinModal, setShowWinModal] = useState(false);

    const allLetters = letterSet ? getAllLetters(letterSet.sides) : [];

    const lastLetter = foundWords.length > 0
        ? foundWords[foundWords.length - 1].slice(-1).toUpperCase()
        : null;

    // --- Data fetching ---

    const fetchLetters = useCallback(async () => {
        try {
            const data = await getRandomLetterBoxedSet();
            setLetterSet({
                id: data.id,
                sides: parseSidesFromApi(data),
            });
        } catch (err) {
            console.error("Failed to fetch letter set:", err);
            toast.error(dict.letterBoxed.errorLetterSet);
        }
    }, []);

    const fetchWordList = useCallback(async () => {
        if (!letterSet) return;
        try {
            const sides = letterSet.sides.map(s => s.join('').toLowerCase());
            const words = await getLetterBoxedWordList(sides[0], sides[1], sides[2], sides[3]);
            setWordListForSet(words);
        } catch (err) {
            console.error("Failed to fetch word list:", err);
            toast.error(dict.letterBoxed.errorWordList);
        }
    }, [letterSet]);

    useEffect(() => { fetchLetters(); }, [fetchLetters]);
    useEffect(() => { fetchWordList(); }, [fetchWordList]);

    // --- Input handling ---

    const addLetter = (char: string) => {
        if (!letterSet) return;
        const upper = char.toUpperCase();

        if (!isValidMove(upper, input, lastLetter, letterSet.sides)) {
            if (isSameSideViolation(upper, input, letterSet.sides)) {
                toast(dict.letterBoxed.sameSide, { icon: "🟡" });
            }
            return;
        }
        setInput(prev => prev + upper);
    };

    const handleBeforeInput = (e: React.FormEvent<HTMLInputElement>) => {
        const inputEvent = e.nativeEvent as unknown as InputEvent;
        const inputChar = inputEvent.data;

        if (!inputChar || !isValidCzechLetter(inputChar)) {
            e.preventDefault();
            return;
        }

        addLetter(inputChar);
        e.preventDefault();
    };

    const handleChange = () => {
        // Handled by beforeInput
    };

    const editLastWord = () => {
        if (foundWords.length === 0) return;
        const lastWord = foundWords[foundWords.length - 1];
        const newFoundWords = foundWords.slice(0, -1);
        setFoundWords(newFoundWords);
        setUsedLetters(recalcUsedLetters(newFoundWords));
        setInput(lastWord.toUpperCase().slice(0, -1));
    };

    const deleteLetter = () => {
        if (input.length === 0) {
            editLastWord();
        } else if (input.length === 1 && foundWords.length > 0) {
            editLastWord();
        } else {
            setInput(prev => prev.slice(0, -1));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            if (input.length === 0) {
                editLastWord();
            } else {
                deleteLetter();
            }
            e.preventDefault();
        } else if (e.key === 'Enter') {
            submitWord();
        }
    };

    // --- Game actions ---

    const submitWord = () => {
        const normalizedInput = input.toLowerCase().trim();
        if (!normalizedInput || !wordListForSet) return;

        if (normalizedInput.length < 3) {
            toast(dict.letterBoxed.tooShort, { icon: "🟡" });
            setInput('');
            return;
        }

        if (isAlreadyFound(normalizedInput, foundWords)) {
            toast(dict.letterBoxed.alreadyFound, { icon: "🟡" });
        } else if (isWordValid(normalizedInput, wordListForSet)) {
            const newFoundWords = [...foundWords, normalizedInput];
            setFoundWords(newFoundWords);

            const newUsed = addLettersToUsed(usedLetters, normalizedInput);
            setUsedLetters(newUsed);

            toast.success(dict.letterBoxed.correct);

            if (letterSet && checkAllLettersUsed(newUsed, letterSet.sides)) {
                setShowWinModal(true);
                setInput('');
            } else {
                setInput(normalizedInput.slice(-1).toUpperCase());
            }
        } else {
            toast.error(dict.letterBoxed.notInList);
            setInput('');
        }
    };

    const restart = () => {
        setInput('');
        setFoundWords([]);
        setUsedLetters(new Set());
    };

    const startNewGame = async () => {
        setShowWinModal(false);
        setInput('');
        setFoundWords([]);
        setUsedLetters(new Set());
        setWordListForSet(null);
        await fetchLetters();
    };

    return {
        // State
        letterSet,
        input,
        allLetters,
        lastLetter,
        foundWords,
        usedLetters,
        showWinModal,
        setShowWinModal,
        isGameDetailModalOpen,
        setIsGameDetailModalOpen,

        // Input handlers
        addLetter,
        deleteLetter,
        handleBeforeInput,
        handleChange,
        handleKeyDown,

        // Game actions
        submitWord,
        restart,
        startNewGame,
    };
}
