import { apiInstance } from "@/app/api/axiosInstance";
import { WordViewData } from "@/app/models/WordViewData";
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

// Fetch a random letter set for Letterboxed
export const getRandomLetterBoxedSet = async () => {
    const res = await apiInstance.get(`/LetterBoxed/random-letter-set`);
    return {
        id: res.data.id,
        side1: res.data.side1,
        side2: res.data.side2,
        side3: res.data.side3,
        side4: res.data.side4,
    };
}

// Fetch valid words for a Letterboxed set
export const getLetterBoxedWordList = async (
    side1: string,
    side2: string,
    side3: string,
    side4: string
): Promise<WordViewData[]> => {
    const s1 = encodeURIComponent(side1.toLowerCase());
    const s2 = encodeURIComponent(side2.toLowerCase());
    const s3 = encodeURIComponent(side3.toLowerCase());
    const s4 = encodeURIComponent(side4.toLowerCase());

    const res = await apiInstance.get(
        `/LetterBoxed/${s1}/${s2}/${s3}/${s4}`
    );

    return res.data.map((word: WordViewData) => ({
        id: word.id,
        text: word.text,
        partOfSpeech: word.partOfSpeech,
    }));
};

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