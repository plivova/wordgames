'use client';

import React, { useEffect, useRef, useState } from 'react';
import { apiInstance } from "@/app/api/axiosInstance";
import { GameInfo } from "@/app/components/gameInfo";
import Honeycomb from "@/app/components/honeycomb";

type LetterSet = {
    id: number;
    letters: string;
    centralLetter: string;
};

export default function SpellingBeePage() {
    const [letterSet, setLetterSet] = useState<LetterSet | null>(null);
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [isGameDetailModalOpen, setIsGameDetailModalOpen] = useState(false);

    const orderedLetters = letterSet ? (() => {
        const allLetters = letterSet.letters.toUpperCase().split('');
        const central = letterSet.centralLetter.toUpperCase();
        const nonCentral = allLetters.filter(l => l !== central);
        nonCentral.splice(3, 0, central); // Inserts central letter at index 3

        return nonCentral;
    })() : [];

    const centralLetter = letterSet?.centralLetter.toUpperCase() ?? '';
    const allowedLetters = letterSet?.letters.toUpperCase().split('') ?? [];

    useEffect(() => {
        apiInstance.get<LetterSet>('/LetterSets/random-letter-set')
            .then((res) => setLetterSet(res.data))
            .catch((err) => {
                console.error('Error fetching letter set:', err);
                setError('Failed to load data.');
            });
    }, []);

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
            e.preventDefault();
            // TODO: Submit logic
            console.log('Submitted input:', input);
        }
    };

    if (error) return <p className="text-red-500">{error}</p>;
    if (!letterSet) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <GameInfo isModalOpen={isGameDetailModalOpen}
                      setModalOpen={setIsGameDetailModalOpen}/>
            <div className="max-w-sm flex flex-col items-center space-y-2 mt-16">
                {/* Hidden input */}
                <input name="userInput"
                       autoFocus
                       ref={inputRef}
                       onChange={handleChange}
                       onBeforeInput={handleBeforeInput}
                       onKeyDown={handleKeyDown}
                       className="absolute opacity-0 pointer-events-none"
                />
                {/* Custom visual display */}
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
                    {/* Placeholder if input is empty */}
                    {input.length === 0 ? (
                        <>
                            <span className="blinking-cursor text-primary font-light select-none">|</span>
                            <span className="text-slate-400 font-light text-xl">Začněte psát</span>
                        </>
                    ) : (
                        // Blinking cursor
                        <span className="blinking-cursor text-primary font-light select-none">|</span>
                    )}
                </div>
                {/* Honeycomb */}
                <Honeycomb letters={orderedLetters} onLetterClick={addLetter}/>
            </div>
        </div>
    );
}