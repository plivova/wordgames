'use client';

import React from 'react';
import { Delete, Shuffle, CornerDownLeft } from "lucide-react";
import { GameInfo } from "@/app/components/gameInfo";
import Honeycomb from "@/app/components/honeycomb";
import WordsDisplay from "@/app/components/wordsDisplay";
import ProgressBar from "@/app/components/progressBar";
import { WinModal } from "@/app/components/winModal";
import { useSpellingBee } from "@/app/hooks/useSpellingBee";
import { useFocusInput } from "@/app/hooks/useFocusInput";
import { dict } from "@/app/lib/dictionary";

export default function SpellingBeePage() {
    const {
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
        addLetter,
        deleteLetter,
        handleBeforeInput,
        handleChange,
        handleKeyDown,
        submitWord,
        scrambleLetters,
        startNewGame,
    } = useSpellingBee();

    const { inputRef, handleGameAreaClick } = useFocusInput(isGameDetailModalOpen);

    if (!letterSet) return <p>{dict.app.loading}</p>;

    return (
        <div className="p-4" onClick={handleGameAreaClick}>
            <GameInfo isModalOpen={isGameDetailModalOpen}
                      setModalOpen={setIsGameDetailModalOpen}/>
            <div className="flex flex-col items-center mt-8 space-y-4 md:flex-row md:items-start md:space-y-0 md:space-x-8">
                {/* Honeycomb + Input Display */}
                <div className="flex flex-col items-center space-y-2">
                    <input name="userInput"
                           autoFocus
                           ref={inputRef}
                           onChange={handleChange}
                           onBeforeInput={handleBeforeInput}
                           onKeyDown={handleKeyDown}
                           className="absolute opacity-0 pointer-events-none"
                    />
                    <div
                        className="min-h-[40px] text-3xl font-bold tracking-wider cursor-text text-center"
                    >
                        {input.split('').map((char, index) => {
                            const isCentral = char === centralLetter;
                            const isValid = allowedLetters.includes(char);
                            const colorClass = isCentral
                                ? 'text-primary'
                                : isValid
                                    ? 'text-black'
                                    : 'text-slate-400';

                            return (
                                <span key={index} className={colorClass}>
                                    {char}
                                </span>
                            );
                        })}
                        {input.length === 0 ? (
                            <>
                                <span className="blinking-cursor text-primary font-light select-none">|</span>
                                <span className="text-slate-400 font-light text-xl">{dict.spellingBee.startTyping}</span>
                            </>
                        ) : (
                            <span className="blinking-cursor text-primary font-light select-none">|</span>
                        )}
                    </div>

                    <Honeycomb letters={orderedLetters} onLetterClick={addLetter}/>

                    {/* Action buttons */}
                    <div className="flex items-center gap-4 mt-4">
                        <button
                            onClick={deleteLetter}
                            className="p-3 rounded-full border-2 border-gray-300 hover:bg-gray-100 transition-colors"
                            title={dict.spellingBee.deleteTitle}
                        >
                            <Delete size={20} />
                        </button>
                        <button
                            onClick={scrambleLetters}
                            className="p-3 rounded-full border-2 border-gray-300 hover:bg-gray-100 transition-colors"
                            title={dict.spellingBee.shuffleTitle}
                        >
                            <Shuffle size={20} />
                        </button>
                        <button
                            onClick={submitWord}
                            className="p-3 rounded-full border-2 border-gray-300 hover:bg-gray-100 transition-colors"
                            title={dict.spellingBee.submitTitle}
                        >
                            <CornerDownLeft size={20} />
                        </button>
                    </div>
                </div>

                {/* Progress + Found Words */}
                <div className="flex flex-col">
                    <ProgressBar points={points} maxPoints={maxPoints} />
                    <WordsDisplay words={foundWords} />
                </div>
            </div>

            <WinModal
                show={showWinModal}
                onClose={() => setShowWinModal(false)}
                heading={dict.spellingBee.winHeading}
                message={dict.spellingBee.winMessage}
                stats={`${points} / ${maxPoints} ${dict.spellingBee.winPoints}`}
                buttonLabel={dict.spellingBee.newGame}
                onNewGame={startNewGame}
            />
        </div>
    );
}
