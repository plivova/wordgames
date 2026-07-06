'use client';

import React from 'react';
import { GameInfo } from "@/app/components/gameInfo";
import { WinModal } from "@/app/components/winModal";
import { WordleGrid } from "@/app/components/wordle/wordleGrid";
import { WordleKeyboard } from "@/app/components/wordle/wordleKeyboard";
import { useWordle } from "@/app/hooks/useWordle";
import { useFocusInput } from "@/app/hooks/useFocusInput";
import { dict } from "@/app/lib/dictionary";
import { MAX_GUESSES } from "@/app/services/wordleService";

export default function WordlePage() {
    const {
        gameId,
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
    } = useWordle();

    const { inputRef, handleGameAreaClick } = useFocusInput(isGameDetailModalOpen);

    if (!gameId) return <p>{dict.app.loading}</p>;

    return (
        <div className="p-4" onClick={handleGameAreaClick}>
            <GameInfo
                isModalOpen={isGameDetailModalOpen}
                setModalOpen={setIsGameDetailModalOpen}
            />

            {/* Hidden input for keyboard capture */}
            <input
                ref={inputRef}
                autoFocus
                onKeyDown={handleKeyDown}
                className="absolute opacity-0 pointer-events-none"
                readOnly
            />

            <div className="flex flex-col items-center mt-8 gap-6">
                <WordleGrid
                    guesses={guesses}
                    currentInput={currentInput}
                />

                <WordleKeyboard
                    keyboardState={keyboardState}
                    onKey={addLetter}
                    onDelete={deleteLetter}
                    onSubmit={submitGuess}
                />

                {gameOver && !won && (
                    <button
                        onClick={startNewGame}
                        className="px-6 py-2 bg-primary text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
                    >
                        {dict.wordle.newGame}
                    </button>
                )}
            </div>

            <WinModal
                show={showWinModal}
                onClose={() => setShowWinModal(false)}
                heading={dict.wordle.winHeading}
                message={dict.wordle.winMessage}
                stats={`${guesses.length} / ${MAX_GUESSES}`}
                buttonLabel={dict.wordle.newGame}
                onNewGame={startNewGame}
            />
        </div>
    );
}
