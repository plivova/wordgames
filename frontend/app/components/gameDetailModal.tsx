import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { dict } from "@/app/lib/dictionary";

type GameDetailModalProps = {
    isOpen: boolean;
    onClose: () => void;
    description: string;
    detail: string;
    image: string;
};

export function GameDetailModal({ isOpen, onClose, description, detail, image }: GameDetailModalProps) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
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
                    <div className="fixed inset-0 bg-black/50"/>
                </Transition.Child>

                <div className="fixed inset-0 flex p-6 items-center justify-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel
                            className="w-1/3 fixed transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all"
                        >
                            <button
                                onClick={onClose}
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5 text-primary cursor-pointer"/>
                            </button>

                            <div>
                                <h2 className="text-xl font-bold mb-2">{dict.gameInfo.howToPlay}</h2>
                                <div className="flex justify-center items-center">
                                    {image && <Image className="w-1/4 m-2" src={image} alt="game image" width={150} height={150} />}
                                    <p className="ml-2">{description}</p>
                                </div>
                                <p>{detail}</p>
                            </div>

                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
