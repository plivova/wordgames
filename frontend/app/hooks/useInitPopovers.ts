'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function UseInitPopovers() {
    const pathname = usePathname();

    useEffect(() => {
        const timeout = setTimeout(() => {
            import('flowbite').then(({ initPopovers }) => {
                initPopovers();
            });
        }, 50); // slight delay to ensure the DOM is ready

        return () => clearTimeout(timeout);
    }, [pathname]);

    return null;
}