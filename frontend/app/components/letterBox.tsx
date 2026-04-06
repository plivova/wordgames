import React from 'react';

const BOX_SIZE = 300;
const PADDING = 40;
const PADDING_BOTTOM = 70;
const PADDING_RIGHT = 55;
const CIRCLE_R = 8;

type LetterBoxProps = {
    sides: [string[], string[], string[], string[]]; // top, right, bottom, left
    currentWord: string;
    usedLetters: Set<string>;
    lastLetter: string | null; // last letter of previous word (chain letter)
    onLetterClick: (letter: string) => void;
};

type LetterPosition = {
    x: number;
    y: number;
    letter: string;
    side: number;
};

function getLetterPositions(sides: [string[], string[], string[], string[]]): LetterPosition[] {
    const positions: LetterPosition[] = [];
    const min = PADDING;
    const max = PADDING + BOX_SIZE;
    const offsets = [0.15, 0.5, 0.85]; // distribute 3 letters evenly

    // Top side (left to right)
    for (let i = 0; i < 3; i++) {
        positions.push({
            x: min + offsets[i] * BOX_SIZE,
            y: min,
            letter: sides[0][i],
            side: 0,
        });
    }

    // Right side (top to bottom)
    for (let i = 0; i < 3; i++) {
        positions.push({
            x: max,
            y: min + offsets[i] * BOX_SIZE,
            letter: sides[1][i],
            side: 1,
        });
    }

    // Bottom side (left to right)
    for (let i = 0; i < 3; i++) {
        positions.push({
            x: min + offsets[i] * BOX_SIZE,
            y: max,
            letter: sides[2][i],
            side: 2,
        });
    }

    // Left side (top to bottom)
    for (let i = 0; i < 3; i++) {
        positions.push({
            x: min,
            y: min + offsets[i] * BOX_SIZE,
            letter: sides[3][i],
            side: 3,
        });
    }

    return positions;
}

function getTextOffset(side: number): { dx: number; dy: number } {
    switch (side) {
        case 0: return { dx: 0, dy: -20 };  // top — text above
        case 1: return { dx: 24, dy: 6 };   // right — text to right
        case 2: return { dx: 0, dy: 38 };   // bottom — text below
        case 3: return { dx: -24, dy: 6 };  // left — text to left
        default: return { dx: 0, dy: 0 };
    }
}

function getTextAnchor(side: number): string {
    switch (side) {
        case 1: return 'start';
        case 3: return 'end';
        default: return 'middle';
    }
}

export default function LetterBox({ sides, currentWord, usedLetters, lastLetter, onLetterClick }: LetterBoxProps) {
    const positions = getLetterPositions(sides);
    const svgWidth = PADDING + BOX_SIZE + PADDING_RIGHT;
    const svgHeight = PADDING + BOX_SIZE + PADDING_BOTTOM;
    const min = PADDING;

    // Build lines for current word
    const wordLetters = currentWord.toUpperCase().split('');
    const linePoints: { x: number; y: number }[] = [];

    for (const char of wordLetters) {
        const pos = positions.find(p => p.letter.toUpperCase() === char);
        if (pos) {
            linePoints.push({ x: pos.x, y: pos.y });
        }
    }

    // Letters that are part of the current word
    const currentWordLetters = new Set(wordLetters);

    return (
        <div>
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Square border */}
                <rect
                    x={min}
                    y={min}
                    width={BOX_SIZE}
                    height={BOX_SIZE}
                    fill="none"
                    stroke="#000"
                    strokeWidth="2"
                />

                {/* Lines connecting letters in current word */}
                {linePoints.length > 1 && linePoints.map((point, i) => {
                    if (i === 0) return null;
                    const prev = linePoints[i - 1];
                    return (
                        <line
                            key={`line-${i}`}
                            x1={prev.x}
                            y1={prev.y}
                            x2={point.x}
                            y2={point.y}
                            stroke="var(--color-secondary)"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                    );
                })}

                {/* Letter circles and labels */}
                {positions.map((pos, i) => {
                    const upperLetter = pos.letter.toUpperCase();
                    const isActive = currentWordLetters.has(upperLetter);
                    const isChainLetter = currentWord.length === 0 && lastLetter === upperLetter;
                    const isUsed = usedLetters.has(upperLetter);
                    const textOffset = getTextOffset(pos.side);
                    const textAnchor = getTextAnchor(pos.side);

                    return (
                        <g
                            key={i}
                            onClick={() => onLetterClick(pos.letter)}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onLetterClick(pos.letter); } }}
                            style={{ cursor: 'pointer' }}
                            role="button"
                            tabIndex={0}
                            aria-label={upperLetter}
                        >
                            {/* Circle */}
                            <circle
                                cx={pos.x}
                                cy={pos.y}
                                r={CIRCLE_R}
                                fill={isActive || isChainLetter ? 'var(--color-secondary)' : '#fff'}
                                stroke={isActive || isChainLetter ? 'var(--color-secondary)' : '#000'}
                                strokeWidth="2"
                            />

                            {/* Letter label */}
                            <text
                                x={pos.x + textOffset.dx}
                                y={pos.y + textOffset.dy}
                                textAnchor={textAnchor}
                                fontSize="20"
                                fontWeight="bold"
                                fill={isActive || isChainLetter || isUsed ? 'var(--color-primary)' : '#000'}
                                style={{ fontFamily: 'var(--font-sans)', userSelect: 'none' }}
                            >
                                {upperLetter}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

export { findSide } from "@/app/services/letterBoxedService";
