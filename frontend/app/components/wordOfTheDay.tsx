'use client'
import {useCallback, useEffect, useState} from "react";
import {getWord} from "@/app/repositories/gamesRepository";
import toast from "react-hot-toast";

export type WordViewData = {
    id: string;
    text: string;
    partOfSpeech: string;
}

export function WordOfTheDay() {
    const date = new Date();
    const [word, setWord] = useState<WordViewData>();

    const fetchWord = useCallback(async () => {
        try {
            const wordData = await getWord("1050")
            setWord(wordData);
        } catch {
            toast.error("Failed to load word of the day!");
        }
    }, []);

    useEffect(() => {
        fetchWord();
    }, [fetchWord]);

    return (
        <div className="flex justify-center items-center">
            <div className="w-3/4 p-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-secondary dark:border-secondary">
                <div className="flex justify-between items-center m-2">
                    <div className="text-4xl font-bold tracking-tight dark:text-white">
                        Slovní hry
                    </div>
                    <div className="text-right dark:text-white">
                        <div className="text-sm">
                            Slovo dne ({date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()})
                        </div>
                        <div className="mb-3 font-normal">
                            {/*TODO: fetch word of the day & part of speech from db*/}
                            <div className="m-2 text-2xl font-bold tracking-tight">{word?.text}</div>
                            <div className="text-sm">{word?.partOfSpeech}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}