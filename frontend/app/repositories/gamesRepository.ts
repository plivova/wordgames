import { apiInstance } from "@/app/api/axiosInstance";
import { WordViewData } from "@/app/components/wordOfTheDay";
import { getPartOfSpeechLabel } from "@/app/lib/posUtils";

// Fetch word of the day
export const getWordOfTheDay = async () => {
    const res = await apiInstance.get(`/WordOfTheDay/word`);
    return {
        id: res.data.id,
        text: res.data.text,
        partOfSpeech: getPartOfSpeechLabel(res.data.partOfSpeech),
    };
};

// Fetch a random letter set for a game of spelling bee
export const getRandomLetterSet = async () => {
    const res = await apiInstance.get(`/SpellingBee/random-letter-set`);
    return {
        id: res.data.id,
        letters: res.data.letters,
        centralLetter: res.data.centralLetter,
    }
}

// Fetch words from SpellingBee API based on letter set and central letter
export const getWordListForLetterSet = async (
    letters: string,
    centralLetter: string
): Promise<WordViewData[]> => {
    const encodedLetters = encodeURIComponent(letters.toLowerCase());
    const encodedCentral = encodeURIComponent(centralLetter.toLowerCase());

    const res = await apiInstance.get(
        `/SpellingBee/${encodedLetters}/${encodedCentral}`
    );

    return res.data.map((word: WordViewData) => ({
        id: word.id,
        text: word.text,
        partOfSpeech: word.partOfSpeech,
    }));
};