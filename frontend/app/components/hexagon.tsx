import React from 'react';

const HEX_SIZE = 50;

interface HexagonProps {
    x: number;
    y: number;
    letter: string;
    isCenter?: boolean;
    onClick: () => void;
}

export default function Hexagon({ x, y, letter, onClick, isCenter }: HexagonProps) {
    const points = Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI / 3) * i;
        const px = x + HEX_SIZE * Math.cos(angle);
        const py = y + HEX_SIZE * Math.sin(angle);
        return `${px},${py}`;
    }).join(' ');

    return (
        <g onClick={onClick} className="hex" style={{ cursor: 'pointer' }}>
            <polygon
                points={points}
                fill="var(--hex-fill)"
                style={{ '--hex-fill': isCenter ? 'var(--color-secondary)' : '#ebebeb' } as React.CSSProperties}
            />
            <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                fontSize="30"
                fontWeight="bold"
                fill={isCenter ? "#fff" : "#000"}
                style={{ fontFamily: 'var(--font-sans)' }}
            >
                {letter}
            </text>
        </g>
    );
}
