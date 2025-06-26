const posLabels: Record<string, string> = {
    N: "podstatné jméno",
    A: "přídavné jméno",
    V: "sloveso",
    D: "příslovce",
    P: "zájmeno",
    C: "spojka",
    R: "předložka",
    I: "citoslovce",
    T: "částice",
    X: "neznámé",
};

export function getPartOfSpeechLabel(code: string | undefined): string {
    if (!code) return "";
    return posLabels[code] ?? code;
}