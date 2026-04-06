import Hexagon from "./hexagon";

const HEX_SIZE = 50;
const SPACING = 1.1;
const hexCoords = [
    { q: 0, r: -1 }, // top-left
    { q: -1, r: 0 }, // top-right
    { q: 1, r: -1 }, // mid-left
    { q: 0, r: 0 },  // center
    { q: -1, r: 1 },  // mid-right
    { q: 1, r: 0 },  // bottom-left
    { q: 0, r: 1 },  // bottom-right
];

type HoneycombProps = {
    letters?: string[];
    onLetterClick: (letter: string) => void;
};

function hexToPixel({ q, r }: { q: number; r: number }): { x: number; y: number } {
    const x = HEX_SIZE * 3 / 2 * q * SPACING;
    const y = HEX_SIZE * Math.sqrt(3) * (r + q / 2) * SPACING;
    return { x, y };
}

export default function Honeycomb({ letters = [], onLetterClick }: HoneycombProps) {
    return (
        <div>
            <svg width="300" height="300" viewBox="-170 -150 350 350">
                {hexCoords.map(({ q, r }, i) => {
                    const { x, y } = hexToPixel({q, r});
                    return (
                        <Hexagon
                            key={i}
                            x={x}
                            y={y}
                            letter={letters[i]}
                            isCenter={i === 3}
                            onClick={() => onLetterClick?.(letters[i])}
                        />
                    );
                })}
            </svg>
        </div>
    );
}
