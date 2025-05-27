'use client';

import { useEffect, useState } from 'react';
import { apiInstance } from "@/app/api/axiosInstance";
import { GameInfo } from "@/app/components/gameInfo";
import 'flowbite';

type LetterSet = {
    id: number;
    letters: string;
    centralLetter: string;
};

export default function SpellingBeePage() {
    const [letterSet, setLetterSet] = useState<LetterSet | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        apiInstance.get<LetterSet>('/SpellingBee/random-letter-set')
            .then((res) => setLetterSet(res.data))
            .catch((err) => {
                console.error('Error fetching letter set:', err);
                setError('Failed to load data.');
            });
    }, []);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!letterSet) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <GameInfo />
            <p>Letters: {letterSet.letters}</p>
            <p>Central Letter: {letterSet.centralLetter}</p>
        </div>
    );
}