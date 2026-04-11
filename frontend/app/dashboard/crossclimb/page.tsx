'use client';

import React from 'react';
import { GameInfo } from "@/app/components/gameInfo";
import { WinModal } from "@/app/components/winModal";
import { ClueCard } from "@/app/components/crossclimb/clueCard";
import { OrderingPanel } from "@/app/components/crossclimb/orderingPanel";
import { useCrossclimb } from "@/app/hooks/useCrossclimb";
import { dict } from "@/app/lib/dictionary";

export default function CrossclimbPage() {
    const {
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
    } = useCrossclimb();

    if (!puzzle) return <p>{dict.app.loading}</p>;

    return (
        <div className="p-4">
            <GameInfo
                isModalOpen={isGameDetailModalOpen}
                setModalOpen={setIsGameDetailModalOpen}
            />

            <div className="flex flex-col items-center mt-8">
                {phase === 'solving' ? (
                    <div className="flex flex-col gap-3 w-full max-w-md relative">
                        {/* Vertical connector line */}
                        <div className="absolute left-4 top-4 bottom-4 w-px bg-secondary/40 -z-10" />

                        {/* Header row aligned with cards */}
                        <div className="flex items-center gap-3 w-full">
                            <div className="w-8 shrink-0" />
                            <div className="flex-1 text-center">
                                <h2 className="text-lg font-semibold text-gray-700">
                                    {dict.crossclimb.solveClues}
                                </h2>
                                <div className="text-sm text-gray-400">
                                    {solvedClues.size} / {gameWords.length}
                                </div>
                            </div>
                        </div>

                        {gameWords.map((word, index) => (
                            <ClueCard
                                key={word.text}
                                index={index}
                                clue={word.clue}
                                wordLength={puzzle.wordLength}
                                isSolved={solvedClues.has(index)}
                                solvedWord={word.text}
                                onSubmit={(answer) => {
                                    submitClueAnswer(index, answer);
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <OrderingPanel
                        words={gameWords}
                        onReorder={reorderWord}
                        onSubmit={submitOrder}
                    />
                )}
            </div>

            <WinModal
                show={showWinModal}
                onClose={() => setShowWinModal(false)}
                heading={dict.crossclimb.winHeading}
                message={dict.crossclimb.winMessage}
                stats=""
                buttonLabel={dict.crossclimb.newGame}
                onNewGame={startNewGame}
            />
        </div>
    );
}
