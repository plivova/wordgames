import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { X } from "lucide-react";

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
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
                    <div className="fixed inset-0 bg-black/50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
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
                                className="w-full fixed max-w-sm ml-64 transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                                <button
                                    onClick={onClose}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                    aria-label="Close"
                                >
                                    <X className="w-5 h-5 text-primary cursor-pointer"/>
                                </button>
                                <form className="space-y-6" action="#">
                                        <h5 className="text-xl font-medium text-gray-900 dark:text-primary">Přihlášení</h5>
                                        <div>
                                            <label htmlFor="email"
                                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-primary">
                                                Uživatelské jméno
                                            </label>
                                            <input type="email" name="email" id="email"
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-white dark:border-primary dark:placeholder-gray-500 dark:text-gray-900"
                                                   placeholder="jmeno@domena.com" required/>
                                        </div>
                                        <div>
                                            <label htmlFor="password"
                                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-primary">Heslo</label>
                                            <input type="password" name="password" id="password" placeholder="••••••••"
                                                   className="bg-primary border border-primary text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-white dark:border-primary dark:placeholder-gray-500 dark:text-gray-900"
                                                   required/>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input id="remember" type="checkbox" value=""
                                                           className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                                           required/>
                                                </div>
                                                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-500">Zapamatuj si mě</label>
                                            </div>
                                        </div>
                                        <button type="submit"
                                                className="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-accentDark dark:focus:ring-accentDark">Přihlásit se
                                        </button>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-500">
                                            <p>Jste tu poprvé? <a href="#" className="text-primary hover:underline dark:text-primary">
                                                    Založte si účet.
                                                </a>
                                            </p>
                                        </div>
                                    </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
