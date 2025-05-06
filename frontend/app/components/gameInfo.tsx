import { useState } from 'react';
import { GameDetailModal } from "@/app/components/gameDetailModal";
import { useGameDetail } from "@/app/hooks/useGameDetail";

export function GameInfo() {
    const { title, description } = useGameDetail()

    const [isGameDetailLoginOpen, setIsGameDetailLoginOpen] = useState(false);

    const handleGameDetail = () => {
        setIsGameDetailLoginOpen(true);
    }

    return (
        <div className="relative ml-4 mt-8">
            <div className="flex items-center text-3xl text-black dark:text-black">
                <h1>{title}</h1>
                <button
                    data-popover-target="popover-description"
                    data-popover-placement="bottom"
                    type="button"
                    className="ml-2"
                >
                    <svg
                        className="w-4 h-4 text-gray-400 hover:text-gray-500"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        />
                    </svg>
                    <span className="sr-only">Ukázat informace</span>
                </button>
            </div>

            <div
                data-popover
                id="popover-description"
                role="tooltip"
                className="absolute z-10 invisible inline-block w-72 rounded-lg border border-gray-200 bg-white p-3 text-sm text-white opacity-0 shadow-xs transition-opacity duration-300 dark:border-light dark:bg-light dark:text-gray-700"
            >
                <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-900">
                        Pravidla hry
                    </h3>
                    <p>{description}</p>
                    <a
                        onClick={handleGameDetail}
                        className="flex items-center font-medium text-primary hover:text-accentDark hover:underline dark:text-primary dark:hover:text-accentDark"
                    >
                        Více informací
                        <svg
                            className="ms-1.5 h-2 w-2 rtl:rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                    </a>
                </div>
                {isGameDetailLoginOpen && (
                    <GameDetailModal
                        isOpen={isGameDetailLoginOpen}
                        onClose={() => setIsGameDetailLoginOpen(false)}
                    />
                )}
            </div>
        </div>
    );
}
