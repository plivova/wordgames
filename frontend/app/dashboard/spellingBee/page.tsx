'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GameInfo } from "@/app/components/gameInfo";
import Honeycomb from "@/app/components/honeycomb";
import { getRandomLetterSet, getWordListForLetterSet } from "@/app/repositories/gamesRepository";
import toast from "react-hot-toast";
import { WordViewData } from "@/app/components/wordOfTheDay";
import WordsDisplay from "@/app/components/wordsDisplay";

export type LetterSetViewData = {
    id: number;
    letters: string;
    centralLetter: string;
};

export default function SpellingBeePage() {
    const [letterSet, setLetterSet] = useState<LetterSetViewData | null>(null);
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [isGameDetailModalOpen, setIsGameDetailModalOpen] = useState(false);
    const [wordListForSet, setWordListForSet] = useState<WordViewData[] | null>(null);
    const [foundWords, setFoundWords] = useState<string[]>([]);
    const [points, setPoints] = useState<number>(0);

    const orderedLetters = letterSet ? (() => {
        const allLetters = letterSet.letters.toUpperCase().split('');
        const central = letterSet.centralLetter.toUpperCase();
        const nonCentral = allLetters.filter(l => l !== central);
        nonCentral.splice(3, 0, central); // Inserts central letter at index 3

        return nonCentral;
    })() : [];

    const centralLetter = letterSet?.centralLetter.toUpperCase() ?? '';
    const allowedLetters = letterSet?.letters.toUpperCase().split('') ?? [];

    // Fetch a random letter set
    const fetchLetters = useCallback(async () => {
        try {
            const lettersData = await getRandomLetterSet();
            setLetterSet(lettersData);
        } catch {
            toast.error("Failed to load letter set");
        }
    }, []);

    useEffect(() => {
        fetchLetters();
    }, [fetchLetters]);

    // Fetch words that can be created with the given letter set
    const fetchWordList = useCallback(async () => {
        if (!letterSet?.letters || !centralLetter) return;

        try {
            const words = await getWordListForLetterSet(letterSet.letters, centralLetter);
            setWordListForSet(words);
        } catch (err) {
            console.error("Failed to fetch word list:", err);
            toast.error("Failed to load word list:.");
        }
    }, [letterSet, centralLetter]);

    useEffect(() => {
        fetchWordList();
    }, [fetchWordList, letterSet, centralLetter]);

    useEffect(() => {
        if (!isGameDetailModalOpen) {
            inputRef.current?.focus();
        }
    }, [isGameDetailModalOpen]);

    useEffect(() => {
        const handleClick = () => {
            if (!isGameDetailModalOpen) {
                inputRef.current?.focus();
            }
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [isGameDetailModalOpen]);

    const handleBeforeInput = (e: React.FormEvent<HTMLInputElement>) => {
        const inputEvent = e.nativeEvent as unknown as InputEvent;
        const inputChar = inputEvent.data;

        if (!inputChar || !/^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]$/i.test(inputChar)) {
            e.preventDefault(); // Disallow invalid character
            return;
        }

        if (input.length >= 12) {
            e.preventDefault(); // Prevent overflow
            return;
        }

        addLetter(inputChar);
        e.preventDefault(); // Prevent native update
    };

    const addLetter = (char: string) => {
        const upperChar = char.toUpperCase();
        if (!/^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]$/.test(upperChar)) return;
        if (input.length >= 12) return;

        setInput((prev) => (prev + upperChar).slice(0, 12));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.toUpperCase();
        let newInput = '';
        for (let i = 0; i < raw.length; i++) {
            const char = raw[i];
            if (/^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]$/.test(char) && newInput.length < 12) {
                newInput += char;
            }
        }
        setInput(newInput);
    };

    // Custom handling backspace and enter buttons
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            setInput((prev) => prev.slice(0, -1));
            e.preventDefault();
        } else if (e.key === 'Enter') {
            const normalizedInput = input.toLowerCase().trim();
            if (!normalizedInput || !wordListForSet) return;

            const alreadyFound = foundWords.includes(normalizedInput);
            const isValid = wordListForSet.some(word => word.text.toLowerCase() === normalizedInput);

            const isPangram = allowedLetters.every(letter =>
                normalizedInput.includes(letter.toLowerCase())
            );

            if (alreadyFound) {
                toast("Toto slovo jste už našli.", { icon: "🟡" });

            } else if (isValid) {
                setFoundWords(prev => [...prev, normalizedInput]);

                // Setting points
                if(normalizedInput.length == 4) {
                    setPoints(prev => prev + 1)
                } else {
                    setPoints(prev => prev + (normalizedInput.length));
                }

                // Check for pangram
                if(isPangram){
                    toast.success("Našlx jste pangram!")
                    setPoints(prev => prev + 7)
                } else {
                    toast.success("Správně!");
                }
            } else {
                toast.error("Špatné slovo.");
            }

            setInput('');
        }
    };

    useEffect(() => {
        console.log("Updated points:", points);
    }, [points]);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!letterSet) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <GameInfo isModalOpen={isGameDetailModalOpen}
                      setModalOpen={setIsGameDetailModalOpen}/>
            <div className="flex flex-col items-center mt-16 space-y-4 md:flex-row md:space-y-0 md:space-x-8">
                {/* Honeycomb + Input Display */}
                <div className="flex flex-col items-center space-y-2">
                    {/* Hidden input and visual display */}
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
                        onClick={() => inputRef.current?.focus()}
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
                                <span className="text-slate-400 font-light text-xl">Začněte psát</span>
                            </>
                        ) : (
                            <span className="blinking-cursor text-primary font-light select-none">|</span>
                        )}
                    </div>

                    <Honeycomb letters={orderedLetters} onLetterClick={addLetter}/>
                </div>

                {/* Found Words */}
                <WordsDisplay words={foundWords} />
            </div>

        </div>
    );
}