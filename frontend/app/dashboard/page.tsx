'use client'

import { WordOfTheDay } from "@/app/components/wordOfTheDay";
import { GameCard } from "@/app/components/gameCard";
import { gameDetails } from "@/app/lib/gameDetails";

export default function DashboardPage() {
    return (
        <div>
            <WordOfTheDay />
            <div className="flex justify-center items-center m-10">
                {Object.entries(gameDetails).map(([href, { title, image }]) => (
                    <GameCard key={href} title={title} imageSrc={image} href={'/dashboard'+ href} />
                ))}
            </div>
        </div>
    );
}