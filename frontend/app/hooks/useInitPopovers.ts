'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function UseInitPopovers() {
    const pathname = usePathname();

    useEffect(() => {
        import('flowbite').then(({ initPopovers }) => {
            initPopovers();
        });
    }, [pathname]);

    return null;
}