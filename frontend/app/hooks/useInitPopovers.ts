'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useInitPopovers() {
    const pathname = usePathname();

    useEffect(() => {
        const timeout = setTimeout(() => {
            import('flowbite').then(({ initPopovers, initDrawers }) => {
                initPopovers();
                initDrawers();
            });
        }, 50);

        return () => clearTimeout(timeout);
    }, [pathname]);
}
