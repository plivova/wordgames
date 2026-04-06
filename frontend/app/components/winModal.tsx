import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type WinModalProps = {
    show: boolean;
    onClose: () => void;
    heading: string;
    message: string;
    stats: string;
    buttonLabel: string;
    onNewGame: () => void;
};

export function WinModal({ show, onClose, heading, message, stats, buttonLabel, onNewGame }: WinModalProps) {
    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50" />
                </Transition.Child>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-sm transform rounded-2xl bg-white p-6 shadow-xl text-center">
                            <Dialog.Title className="text-2xl font-bold mb-2">
                                {heading}
                            </Dialog.Title>
                            <p className="text-gray-600 mb-1">
                                {message}
                            </p>
                            <p className="text-lg font-semibold mb-6">
                                {stats}
                            </p>
                            <button
                                onClick={onNewGame}
                                className="px-6 py-2 bg-primary text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
                            >
                                {buttonLabel}
                            </button>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
