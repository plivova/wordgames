'use client'

import {GameInfo} from "@/app/components/gameInfo";
import {useEffect, useState} from "react";
import 'flowbite';

export default function LetterBoxedPage() {
    const [isGameDetailModalOpen, setIsGameDetailModalOpen] = useState(false);

    useEffect(() => {
        // Flowbite's JS needs to run after mount
    }, []);

    return (
        <GameInfo isModalOpen={isGameDetailModalOpen}
                  setModalOpen={setIsGameDetailModalOpen}/>
    )
}