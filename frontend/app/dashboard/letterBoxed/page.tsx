'use client';

import React from 'react';
import { Delete, CornerDownLeft, RotateCcw } from "lucide-react";
import { GameInfo } from "@/app/components/gameInfo";
import LetterBox from "@/app/components/letterBox";
import { WinModal } from "@/app/components/winModal";
import { useLetterBoxed } from "@/app/hooks/useLetterBoxed";
import { useFocusInput } from "@/app/hooks/useFocusInput";
import { dict } from "@/app/lib/dictionary";

export default function LetterBoxedPage() {
    const {
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
        addLetter,
        deleteLetter,
        handleBeforeInput,
        handleChange,
        handleKeyDown,
        submitWord,
        restart,
        startNewGame,
    } = useLetterBoxed();

    const { inputRef, handleGameAreaClick } = useFocusInput(isGameDetailModalOpen);

    if (!letterSet) return <p>{dict.app.loading}</p>;

    return (
        <div className="p-4" onClick={handleGameAreaClick}>
            <GameInfo isModalOpen={isGameDetailModalOpen}
                      setModalOpen={setIsGameDetailModalOpen}/>

            <div className="flex flex-col items-center mt-8 md:flex-row md:items-start md:space-x-12">
                {/* Left column: Input + found words */}
                <div className="flex flex-col items-center space-y-4 min-w-[250px]">
                    <input name="userInput"
                           autoFocus
                           ref={inputRef}
                           onChange={handleChange}
                           onBeforeInput={handleBeforeInput}
                           onKeyDown={handleKeyDown}
                           className="absolute opacity-0 pointer-events-none"
                    />

                    {/* Visual input display */}
                    <div
                        className="w-full text-center cursor-text"
                    >
                        <div className="min-h-[40px] text-3xl font-bold tracking-wider">
                            {input.length === 0 && (
                                <span className="blinking-cursor text-primary font-light select-none">|</span>
                            )}
                            {input.split('').map((char, index) => {
                                const isOnBoard = allLetters.includes(char);
                                return (
                                    <span key={index} className={isOnBoard ? 'text-primary' : 'text-slate-400'}>
                                        {char}
                                    </span>
                                );
                            })}
                            {input.length > 0 && (
                                <span className="blinking-cursor text-primary font-light select-none">|</span>
                            )}
                        </div>
                        <div className="border-b-2 border-black mt-1"></div>
                    </div>

                    {/* Word count and found words list */}
                    <div className="text-center text-gray-600">
                        {foundWords.length} {dict.letterBoxed.wordCount(foundWords.length)}
                    </div>
                    {foundWords.length > 0 && (
                        <div className="text-center space-y-1">
                            {foundWords.map((word, i) => (
                                <div key={i} className="text-sm font-semibold tracking-wider uppercase">
                                    {word}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right column: Letter box */}
                <div className="flex flex-col items-center">
                    <LetterBox
                        sides={letterSet.sides}
                        currentWord={input}
                        usedLetters={usedLetters}
                        lastLetter={lastLetter}
                        onLetterClick={addLetter}
                    />

                    {/* Action buttons */}
                    <div className="flex items-center gap-4 mt-4">
                        <button
                            onClick={submitWord}
                            className="p-3 rounded-full border-2 border-gray-300 hover:bg-gray-100 transition-colors"
                            title={dict.letterBoxed.submitTitle}
                        >
                            <CornerDownLeft size={20} />
                        </button>
                        <button
                            onClick={deleteLetter}
                            className="p-3 rounded-full border-2 border-gray-300 hover:bg-gray-100 transition-colors"
                            title={dict.letterBoxed.deleteTitle}
                        >
                            <Delete size={20} />
                        </button>
                        <button
                            onClick={restart}
                            className="p-3 rounded-full border-2 border-gray-300 hover:bg-gray-100 transition-colors"
                            title={dict.letterBoxed.restartTitle}
                        >
                            <RotateCcw size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <WinModal
                show={showWinModal}
                onClose={() => setShowWinModal(false)}
                heading={dict.letterBoxed.winHeading}
                message={dict.letterBoxed.winMessage}
                stats={`${foundWords.length} ${dict.letterBoxed.wordCount(foundWords.length)}`}
                buttonLabel={dict.letterBoxed.newGame}
                onNewGame={startNewGame}
            />
        </div>
    );
}
