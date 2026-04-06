import { useCallback, useEffect, useMemo, useState } from "react";
import { LetterSetViewData } from "@/app/models/LetterSetViewData";
import { WordViewData } from "@/app/models/WordViewData";
import { getRandomLetterSet, getWordListForLetterSet } from "@/app/repositories/gamesRepository";
import {
    orderLetters,
    calculateMaxPoints,
    calculateWordPoints,
    isPangram,
    isWordValid,
    isAlreadyFound,
    scrambleLetters as scrambleLettersUtil,
    sanitizeInput,
    canAddLetter,
} from "@/app/services/spellingBeeService";
import toast from "react-hot-toast";
import { dict } from "@/app/lib/dictionary";

export function useSpellingBee() {
    const [letterSet, setLetterSet] = useState<LetterSetViewData | null>(null);
    const [input, setInput] = useState('');
    const [isGameDetailModalOpen, setIsGameDetailModalOpen] = useState(false);
    const [wordListForSet, setWordListForSet] = useState<WordViewData[] | null>(null);
    const [foundWords, setFoundWords] = useState<string[]>([]);
    const [points, setPoints] = useState(0);
    const [showWinModal, setShowWinModal] = useState(false);

    const centralLetter = letterSet?.centralLetter?.toUpperCase() ?? '';
    const allowedLetters = useMemo(
        () => letterSet?.letters?.toUpperCase().split('') ?? [],
        [letterSet?.letters]
    );
    const orderedLetters = letterSet ? orderLetters(letterSet.letters, letterSet.centralLetter) : [];

    const maxPoints = useMemo(() => {
        if (!wordListForSet || !allowedLetters.length) return 0;
        return calculateMaxPoints(wordListForSet, allowedLetters);
    }, [wordListForSet, allowedLetters]);

    // --- Data fetching ---

    const fetchLetters = useCallback(async () => {
        try {
            const data = await getRandomLetterSet();
            setLetterSet(data);
        } catch (err) {
            console.error("Failed to fetch letter set:", err);
            toast.error(dict.spellingBee.errorLetterSet);
        }
    }, []);

    const fetchWordList = useCallback(async () => {
        if (!letterSet?.letters || !centralLetter) return;
        try {
            const words = await getWordListForLetterSet(letterSet.letters, centralLetter);
            setWordListForSet(words);
        } catch (err) {
            console.error("Failed to fetch word list:", err);
            toast.error(dict.spellingBee.errorWordList);
        }
    }, [letterSet, centralLetter]);

    useEffect(() => { fetchLetters(); }, [fetchLetters]);
    useEffect(() => { fetchWordList(); }, [fetchWordList]);

    // --- Input handling ---

    const addLetter = (char: string) => {
        const upperChar = char.toUpperCase();
        if (!canAddLetter(input, upperChar)) return;
        setInput(prev => (prev + upperChar).slice(0, 12));
    };

    const deleteLetter = () => {
        setInput(prev => prev.slice(0, -1));
    };

    const handleBeforeInput = (e: React.FormEvent<HTMLInputElement>) => {
        const inputEvent = e.nativeEvent as unknown as InputEvent;
        const inputChar = inputEvent.data;

        if (!inputChar || !canAddLetter(input, inputChar)) {
            e.preventDefault();
            return;
        }

        addLetter(inputChar);
        e.preventDefault();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(sanitizeInput(e.target.value));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            deleteLetter();
            e.preventDefault();
        } else if (e.key === 'Enter') {
            submitWord();
        }
    };

    // --- Game actions ---

    const submitWord = () => {
        const normalizedInput = input.toLowerCase().trim();
        if (!normalizedInput || !wordListForSet) return;

        if (isAlreadyFound(normalizedInput, foundWords)) {
            toast(dict.spellingBee.alreadyFound, { icon: "🟡" });
        } else if (isWordValid(normalizedInput, wordListForSet)) {
            setFoundWords(prev => [...prev, normalizedInput]);

            const earned = calculateWordPoints(normalizedInput, allowedLetters);
            const newPoints = points + earned;
            setPoints(newPoints);

            if (isPangram(normalizedInput, allowedLetters)) {
                toast.success(dict.spellingBee.pangram);
            } else {
                toast.success(dict.spellingBee.correct);
            }

            if (maxPoints > 0 && newPoints >= maxPoints) {
                setShowWinModal(true);
            }
        } else {
            toast.error(dict.spellingBee.wrong);
        }

        setInput('');
    };

    const scrambleLetters = () => {
        setLetterSet(prev => {
            if (!prev) return prev;
            return { ...prev, letters: scrambleLettersUtil(prev.letters, prev.centralLetter) };
        });
    };

    const startNewGame = async () => {
        setShowWinModal(false);
        setInput('');
        setFoundWords([]);
        setPoints(0);
        setWordListForSet(null);
        await fetchLetters();
    };

    return {
        // State
        letterSet,
        input,
        orderedLetters,
        centralLetter,
        allowedLetters,
        foundWords,
        points,
        maxPoints,
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
        scrambleLetters,
        startNewGame,
    };
}
