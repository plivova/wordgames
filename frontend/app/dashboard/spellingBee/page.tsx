'use client'

import { useEffect } from 'react';
import 'flowbite';
import { GameInfo } from "@/app/components/gameInfo";

export default function SpellingBeePage() {
    useEffect(() => {
        // Flowbite's JS needs to run after mount
    }, []);

    return (
        <GameInfo />
    );
}
