export type CrossclimbWord = {
    text: string;
    clue: string;
};

export type CrossclimbSetViewData = {
    id: number;
    wordLength: number;
    ladderSize: number;
    words: CrossclimbWord[];
};
