import { useCallback, useEffect, useRef } from "react";

/**
 * Manages focus on a hidden input element:
 * - Refocuses when modal closes
 * - Refocuses when the game area is clicked
 *
 * Returns { inputRef, gameAreaRef } — attach gameAreaRef to the game container div.
 */
export function useFocusInput(isModalOpen: boolean) {
    const inputRef = useRef<HTMLInputElement>(null);
    const gameAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isModalOpen) return;
        inputRef.current?.focus();
    }, [isModalOpen]);

    const handleGameAreaClick = useCallback(() => {
        if (!isModalOpen) {
            inputRef.current?.focus();
        }
    }, [isModalOpen]);

    return { inputRef, gameAreaRef, handleGameAreaClick };
}
