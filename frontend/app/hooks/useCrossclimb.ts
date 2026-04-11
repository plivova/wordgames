import { useCallback, useEffect, useState } from "react";
import { CrossclimbSetViewData, CrossclimbWord } from "@/app/models/CrossclimbSetViewData";
import { getRandomCrossclimbSet } from "@/app/repositories/gamesRepository";
import {
    parseCrossclimbSet,
    shuffleWords,
    isValidLadder,
} from "@/app/services/crossclimbService";
import toast from "react-hot-toast";
import { dict } from "@/app/lib/dictionary";

export function useCrossclimb() {
    const [puzzle, setPuzzle] = useState<CrossclimbSetViewData | null>(null);
    const [gameWords, setGameWords] = useState<CrossclimbWord[]>([]);
    const [solvedClues, setSolvedClues] = useState<Set<number>>(new Set());
    const [phase, setPhase] = useState<'solving' | 'ordering'>('solving');
    const [showWinModal, setShowWinModal] = useState(false);
    const [isGameDetailModalOpen, setIsGameDetailModalOpen] = useState(false);

    // --- Data fetching ---

    const fetchPuzzle = useCallback(async () => {
        try {
            const data = await getRandomCrossclimbSet();
            const parsed = parseCrossclimbSet(data);
            setPuzzle(parsed);

            const shuffled = shuffleWords(parsed.words);
            setGameWords(shuffled);
            setSolvedClues(new Set());
            setPhase('solving');
        } catch (err) {
            console.error("Failed to fetch crossclimb set:", err);
            toast.error(dict.crossclimb.errorLoading);
        }
    }, []);

    useEffect(() => { fetchPuzzle(); }, [fetchPuzzle]);

    // --- Phase 1: Solving clues ---

    const submitClueAnswer = (index: number, answer: string) => {
        const normalized = answer.trim().toLowerCase();
        if (!normalized || !gameWords[index]) return;

        if (normalized === gameWords[index].text.toLowerCase()) {
            const newSolved = new Set(solvedClues);
            newSolved.add(index);
            setSolvedClues(newSolved);
            toast.success(dict.crossclimb.correctAnswer);

            if (newSolved.size === gameWords.length) {
                setPhase('ordering');
            }
        } else {
            toast.error(dict.crossclimb.wrongAnswer);
        }
    };

    // --- Phase 2: Ordering ---

    const reorderWord = (fromIndex: number, toIndex: number) => {
        setGameWords(prev => {
            const arr = [...prev];
            const [moved] = arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, moved);
            return arr;
        });
    };

    const submitOrder = () => {
        if (!puzzle) return;

        const fullLadder = gameWords.map(w => w.text);

        if (isValidLadder(fullLadder)) {
            setShowWinModal(true);
        } else {
            toast.error(dict.crossclimb.wrongOrder);
        }
    };

    // --- Game actions ---

    const startNewGame = async () => {
        setShowWinModal(false);
        await fetchPuzzle();
    };

    return {
        puzzle,
        gameWords,
        solvedClues,
        phase,
        showWinModal,
        setShowWinModal,
        isGameDetailModalOpen,
        setIsGameDetailModalOpen,

        submitClueAnswer,

        reorderWord,
        submitOrder,

        startNewGame,
    };
}
