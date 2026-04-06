'use client';

import React from "react";
import { dict } from "@/app/lib/dictionary";

const rankPcts = [0, 0.02, 0.05, 0.08, 0.15, 0.25, 0.40, 0.70, 1.0];
const ranks = dict.ranks.map((label, i) => ({ label, pct: rankPcts[i] }));

type ProgressBarProps = {
    points: number;
    maxPoints: number;
};

export default function ProgressBar({ points, maxPoints }: ProgressBarProps) {
    const ratio = maxPoints > 0 ? points / maxPoints : 0;

    const currentRankIndex = ranks.reduce((acc, rank, i) => {
        return ratio >= rank.pct ? i : acc;
    }, 0);

    const currentRank = ranks[currentRankIndex];

    return (
        <div className="w-full mb-4">
            <div className="flex items-center gap-3">
                <span className="text-sm font-bold whitespace-nowrap">{currentRank.label}</span>
                <div className="flex items-center flex-1 relative">
                    {ranks.map((rank, i) => {
                        const isActive = i <= currentRankIndex;
                        const isCurrent = i === currentRankIndex;
                        const isLast = i === ranks.length - 1;

                        return (
                            <React.Fragment key={i}>
                                {/* Dot or current point indicator */}
                                <div className="relative flex items-center justify-center z-10">
                                    {isCurrent ? (
                                        <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                                            {points}
                                        </div>
                                    ) : (
                                        <div
                                            className={`w-2.5 h-2.5 rounded-full ${
                                                isActive ? 'bg-primary' : 'bg-gray-300'
                                            }`}
                                        />
                                    )}
                                </div>

                                {/* Connecting line */}
                                {!isLast && (
                                    <div
                                        className={`flex-1 h-0.5 ${
                                            i < currentRankIndex ? 'bg-primary' : 'bg-gray-300'
                                        }`}
                                    />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
