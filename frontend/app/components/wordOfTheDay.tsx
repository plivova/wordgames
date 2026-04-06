'use client'
import { useCallback, useEffect, useState } from "react";
import { getWordOfTheDay } from "@/app/repositories/gamesRepository";
import toast from "react-hot-toast";
import { dict } from "@/app/lib/dictionary";

import { WordViewData } from "@/app/models/WordViewData";

export type { WordViewData };

export function WordOfTheDay() {
    const date = new Date();
    const [word, setWord] = useState<WordViewData>();

    const fetchWord = useCallback(async () => {
        try {
            const wordData = await getWordOfTheDay();
            setWord(wordData);
        } catch {
            toast.error(dict.wordOfTheDay.errorLoading);
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
                        {dict.app.title}
                    </div>
                    <div className="text-right dark:text-white">
                        <div className="text-sm">
                            {dict.wordOfTheDay.heading} ({date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()})
                        </div>
                        <div className="mb-3 font-normal">
                            <div className="m-2 text-2xl font-bold tracking-tight">{word?.text}</div>
                            <div className="text-sm">{word?.partOfSpeech}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}