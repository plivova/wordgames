import { apiInstance } from "@/app/api/axiosInstance";
import { Word } from "@/app/models/Word";
import { WordViewData } from "@/app/components/wordOfTheDay";

export const getWords = async () => {
    const res = await apiInstance.get('/words');
    const words: WordViewData[] = res.data.map((word: Word) => {
        return {
            id: word.id,
            text: word.text,
        }
    });
    return words;
}

export const getWord = async (id: string) => {
    const res = await apiInstance.get(`/words/${id}`);
    const word: WordViewData = res.data.map((word: Word) => {
        return {
            id: word.id,
            text: word.text,
            partOfSpeech: word.partOfSpeech,
        }
    });
    return word;
}