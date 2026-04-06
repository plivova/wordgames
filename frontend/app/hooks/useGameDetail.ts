import { useMemo } from "react";
import { gameDetails } from "@/app/lib/gameDetails";
import { usePathname } from "next/navigation";

const emptyDetail = { title: '', description: '', detail: '', image: '' };

export function useGameDetail() {
    const pathname = usePathname();

    return useMemo(() => {
        if (!pathname) return emptyDetail;
        const pathSegment = '/' + pathname.split('/').pop();
        return gameDetails[pathSegment] ?? emptyDetail;
    }, [pathname]);
}
