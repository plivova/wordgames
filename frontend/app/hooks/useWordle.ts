import { useCallback, useEffect, useState } from "react";
import { WordleGuess, LetterResult } from "@/app/models/WordleViewData";
import { startWordleGame, submitWordleGuess } from "@/app/repositories/gamesRepository";
import { getKeyboardState, WORD_LENGTH, MAX_GUESSES } from "@/app/services/wordleService";
import { isValidCzechLetter } from "@/app/services/wordUtils";
import toast from "react-hot-toast";
import { dict } from "@/app/lib/dictionary";

export function useWordle() {
    const [gameId, setGameId] = useState<string | null>(null);
    const [guesses, setGuesses] = useState<WordleGuess[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [showWinModal, setShowWinModal] = useState(false);
    const [isGameDetailModalOpen, setIsGameDetailModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const keyboardState = getKeyboardState(guesses);

    // --- Data fetching ---

    const fetchGame = useCallback(async () => {
        try {
            const id = await startWordleGame();
            setGameId(id);
        } catch (err) {
            console.error("Failed to start wordle game:", err);
            toast.error(dict.wordle.errorLoading);
        }
    }, []);

    useEffect(() => { fetchGame(); }, [fetchGame]);

    // --- Input handling ---

    const addLetter = (char: string) => {
        if (gameOver || currentInput.length >= WORD_LENGTH) return;
        const upper = char.toUpperCase();
        if (!isValidCzechLetter(upper)) return;
        setCurrentInput(prev => prev + upper);
    };

    const deleteLetter = () => {
        if (gameOver) return;
        setCurrentInput(prev => prev.slice(0, -1));
    };

    const submitGuess = async () => {
        if (gameOver || isSubmitting || !gameId) return;
        if (currentInput.length !== WORD_LENGTH) {
            toast(dict.wordle.tooShort, { icon: "🟡" });
            return;
        }

        // Check for duplicate guess
        if (guesses.some(g => g.word === currentInput.toLowerCase())) {
            toast(dict.wordle.alreadyGuessed, { icon: "🟡" });
            return;
        }

        setIsSubmitting(true);
        try {
            const evaluation = await submitWordleGuess(gameId, currentInput);

            if (!evaluation.isValidWord) {
                toast.error(dict.wordle.notInDict);
                return;
            }

            const results = evaluation.results as LetterResult[];
            const newGuess: WordleGuess = { word: currentInput.toLowerCase(), results };
            const newGuesses = [...guesses, newGuess];
            setGuesses(newGuesses);
            setCurrentInput('');

            if (evaluation.isCorrect) {
                setWon(true);
                setGameOver(true);
                setShowWinModal(true);
            } else if (newGuesses.length >= MAX_GUESSES) {
                setGameOver(true);
                const revealed = evaluation.targetWord?.toUpperCase() ?? '???';
                toast(dict.wordle.lost + revealed, { icon: "😔", duration: 5000 });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Backspace') {
            deleteLetter();
            e.preventDefault();
        } else if (e.key === 'Enter') {
            submitGuess();
        } else if (e.key.length === 1) {
            addLetter(e.key);
        }
    };

    // --- Game actions ---

    const startNewGame = async () => {
        setShowWinModal(false);
        setGuesses([]);
        setCurrentInput('');
        setGameOver(false);
        setWon(false);
        await fetchGame();
    };

    return {
        guesses,
        currentInput,
        gameOver,
        won,
        keyboardState,
        showWinModal,
        setShowWinModal,
        isGameDetailModalOpen,
        setIsGameDetailModalOpen,

        addLetter,
        deleteLetter,
        submitGuess,
        handleKeyDown,

        startNewGame,
    };
}
