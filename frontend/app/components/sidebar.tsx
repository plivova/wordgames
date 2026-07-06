'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home } from 'lucide-react';
import { dict } from "@/app/lib/dictionary";

export function Sidebar() {
    const pathname = usePathname();

    const links = [
        { href: '/dashboard', label: dict.nav.dashboard, icon: Home },
    ];

    return (
        <div>
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-accentDark rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-primary dark:hover:bg-primary dark:focus:ring-primary">
                <span className="sr-only">{dict.nav.menu}</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd"
                          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <aside id="logo-sidebar"
                   className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                   aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-primary dark:primary">

                    <div className="flex items-center ps-2.5 mb-5">
                        <div
                            className="mr-2 relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-white p-5">
                            <span className="font-medium text-primary dark:text-primary text-2xl">SH</span>
                        </div>
                        <span
                            className="self-center text-l font-semibold whitespace-nowrap dark:text-white">{dict.app.title}</span>
                    </div>

                    {links.map((link) => {
                        const LinkIcon = link.icon;
                        const isActive = pathname === link.href;

                        return (
                            <div key={link.label}>
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center space-x-2 px-4 py-2 mb-1 rounded-full text-sm font-medium transition-colors duration-200
                                    ${isActive
                                        ? 'bg-blue-100 text-primary dark:bg-accentDark dark:text-white'
                                        : 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-secondary'
                                    }`}
                                >
                                    <LinkIcon className="w-5 h-5"/>
                                    <span className="hidden md:inline">{link.label}</span>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </aside>
        </div>
    );
}