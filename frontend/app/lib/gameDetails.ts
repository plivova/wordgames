import { dict } from "@/app/lib/dictionary";

export const gameDetails: Record<string, { title: string; description: string, detail: string, image: string }> = {
    '/spellingBee': {
        title: dict.spellingBee.title,
        description: dict.spellingBee.description,
        detail: dict.spellingBee.detail,
        image: '/spelling-bee.png',
    },
    '/letterBoxed': {
        title: dict.letterBoxed.title,
        description: dict.letterBoxed.description,
        detail: dict.letterBoxed.detail,
        image: '/letter-boxed.png',
    },
    '/crossclimb': {
        title: dict.crossclimb.title,
        description: dict.crossclimb.description,
        detail: dict.crossclimb.detail,
        image: '/crossclimb.png',
    },
};
