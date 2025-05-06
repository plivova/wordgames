'use client'

import {GameInfo} from "@/app/components/gameInfo";
import {useEffect} from "react";
import 'flowbite';

export default function LetterBoxedPage() {
    useEffect(() => {
        // Flowbite's JS needs to run after mount
    }, []);

    return (
        <GameInfo />
    )
}