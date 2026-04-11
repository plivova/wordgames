import { useRef, useState } from "react";
import { GripVertical } from "lucide-react";
import { CrossclimbWord } from "@/app/models/CrossclimbSetViewData";
import { dict } from "@/app/lib/dictionary";

type DropPosition = { index: number; half: 'top' | 'bottom' } | null;

type OrderingPanelProps = {
    words: CrossclimbWord[];
    onReorder: (fromIndex: number, toIndex: number) => void;
    onSubmit: () => void;
};

export function OrderingPanel({
    words,
    onReorder,
    onSubmit,
}: OrderingPanelProps) {
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [dropPos, setDropPos] = useState<DropPosition>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    const getInsertIndex = (pos: DropPosition): number | null => {
        if (!pos || dragIndex === null) return null;
        const target = pos.half === 'bottom' ? pos.index + 1 : pos.index;
        if (target === dragIndex || target === dragIndex + 1) return null;
        return target;
    };

    // --- Desktop drag and drop ---

    const handleDragStart = (index: number) => {
        setDragIndex(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const half = e.clientY < rect.top + rect.height / 2 ? 'top' : 'bottom';
        setDropPos({ index, half });
    };

    const handleDragLeave = () => {
        setDropPos(null);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const insertAt = getInsertIndex(dropPos);
        if (dragIndex !== null && insertAt !== null) {
            onReorder(dragIndex, insertAt > dragIndex ? insertAt - 1 : insertAt);
        }
        setDragIndex(null);
        setDropPos(null);
    };

    const handleDragEnd = () => {
        setDragIndex(null);
        setDropPos(null);
    };

    // --- Mobile touch support ---

    const touchStartIndex = useRef<number | null>(null);

    const handleTouchStart = (index: number) => {
        touchStartIndex.current = index;
        setDragIndex(index);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        const pos = findDropPosFromPoint(touch.clientX, touch.clientY);
        setDropPos(pos);
    };

    const handleTouchEnd = () => {
        if (touchStartIndex.current !== null && dropPos !== null) {
            const fromIndex = touchStartIndex.current;
            setDragIndex(fromIndex);
            const insertAt = getInsertIndex(dropPos);
            if (insertAt !== null) {
                onReorder(fromIndex, insertAt > fromIndex ? insertAt - 1 : insertAt);
            }
        }
        touchStartIndex.current = null;
        setDragIndex(null);
        setDropPos(null);
    };

    const findDropPosFromPoint = (x: number, y: number): DropPosition => {
        for (let i = 0; i < itemRefs.current.length; i++) {
            const el = itemRefs.current[i];
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            if (y >= rect.top && y <= rect.bottom && x >= rect.left && x <= rect.right) {
                const half = y < rect.top + rect.height / 2 ? 'top' : 'bottom';
                return { index: i, half };
            }
        }
        return null;
    };

    const getIndicatorClass = (index: number): string => {
        if (!dropPos || dragIndex === null) return '';
        if (dropPos.index === index && dropPos.half === 'top' && getInsertIndex(dropPos) !== null) {
            return 'border-t-4 border-t-primary';
        }
        if (dropPos.index === index && dropPos.half === 'bottom' && getInsertIndex(dropPos) !== null) {
            return 'border-b-4 border-b-primary';
        }
        return '';
    };

    return (
        <div className="flex flex-col gap-3 w-full max-w-md relative">
            {/* Vertical connector line */}
            <div className="absolute left-4 top-4 bottom-4 w-px bg-secondary/40 -z-10" />

            {/* Header row aligned with cards */}
            <div className="flex items-center gap-3 w-full">
                <div className="w-8 shrink-0" />
                <div className="flex-1 text-center">
                    <h2 className="text-lg font-semibold text-gray-700">
                        {dict.crossclimb.arrangeWords}
                    </h2>
                </div>
            </div>

            {words.map((word, index) => (
                    <div
                        key={word.text}
                        ref={(el) => { itemRefs.current[index] = el; }}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onDragEnd={handleDragEnd}
                        onTouchStart={() => handleTouchStart(index)}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        className={`flex items-center gap-3 w-full transition-all ${
                            dragIndex === index ? 'opacity-40' : ''
                        } ${getIndicatorClass(index)}`}
                    >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm shrink-0">
                            {index + 1}
                        </div>
                        <div className="flex-1 rounded-xl bg-secondary/10 border-2 border-secondary overflow-hidden">
                            <div className="flex items-center px-4 py-3">
                                <div className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 touch-none shrink-0 w-5">
                                    <GripVertical size={20} />
                                </div>
                                <div className="flex-1 font-bold tracking-wider uppercase text-center select-none">
                                    {word.text}
                                </div>
                                <div className="w-5 shrink-0" />
                            </div>
                        </div>
                    </div>
                ))}

            {/* Button aligned with cards */}
            <div className="flex items-center gap-3 w-full">
                <div className="w-8 shrink-0" />
                <div className="flex-1 text-center">
                    <button
                        onClick={onSubmit}
                        className="mt-2 px-6 py-2 bg-primary text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
                    >
                        {dict.crossclimb.submitOrder}
                    </button>
                </div>
            </div>
        </div>
    );
}
