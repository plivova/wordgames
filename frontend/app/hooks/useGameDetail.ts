import { useEffect, useState } from "react";
import { gameDetails } from "@/app/lib/gameDetails";
import { usePathname } from "next/navigation";

export function useGameDetail() {
    const pathname = usePathname();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [detail, setDetail] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        if (!pathname) return;

        const pathSegment = '/' + pathname.split('/').pop(); // grabs "spellingBee" → "/spellingBee"
        const info = gameDetails[pathSegment];

        if (info) {
            setTitle(info.title);
            setDescription(info.description);
            setDetail(info.detail);
            setImage(info.image);
        } else {
            setTitle('');
            setDescription('');
            setDetail('');
            setImage('');
        }
    }, [pathname]);

    return {title, description, detail, image}
}