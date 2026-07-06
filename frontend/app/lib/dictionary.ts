export const dict = {
    // General
    app: {
        title: "Slovní hry",
        loading: "Načítání...",
    },

    // Navigation
    nav: {
        dashboard: "Hlavní stránka",
        menu: "Menu",
    },

    // Word of the Day
    wordOfTheDay: {
        heading: "Slovo dne",
        errorLoading: "Nepodařilo se načíst slovo dne.",
    },

    // Game info
    gameInfo: {
        howToPlay: "🎲 Jak hrát?",
        showInfo: "Ukázat informace",
        rules: "Pravidla hry",
        moreInfo: "Více informací",
    },

    // Found words display
    wordsDisplay: {
        heading: "Nalezená slova",
        empty: "Zatím žádná slova.",
    },

    // Spelling Bee
    spellingBee: {
        title: "🐝 Včelička",
        description:
            "Je zadáno sedm písmen, z nichž jedno je středové (zvýrazněno barevně). " +
            "Utvářejte slova, která mají alespoň 4 písmena a obsahují středové písmeno. " +
            "Každé písmeno může být ve slově použito více než jednou. ",
        detail:
            "Slovník neobsahuje vulgární a obskurní slova ani vlastní jména. " +
            "Slova tvořena čtyřmi písmeny jsou za jeden bod. " +
            "Delší slova mají bodovou hodnotu dle své délky (př. slovo tvořeno šesti písmeny má hodnotu 6 bodů). " +
            "Každý set písmen obsahuje alespoň jeden \"pangram\", neboli slovo, které využívá všechna písmena. " +
            "Takové slovo poté k hodnotě dle své délky navíc přidává 7 bodů.",
        startTyping: "Začněte psát",
        errorLetterSet: "Nepodařilo se načíst sadu písmen.",
        errorWordList: "Nepodařilo se načíst seznam slov.",
        alreadyFound: "Toto slovo jste už našlx.",
        pangram: "Našlx jste pangram!",
        correct: "Správně!",
        wrong: "Špatné slovo.",
        deleteTitle: "Smazat písmeno",
        shuffleTitle: "Zamíchat písmena",
        submitTitle: "Potvrdit",
        winHeading: "Gratulujeme!",
        winMessage: "Našlx jste všechna slova!",
        winPoints: "bodů",
        newGame: "Nová hra",
    },

    // Letterboxed
    letterBoxed: {
        title: "📦 Krabička",
        description:
            "Je zadáno dvanáct písmen na čtverci. Utvářejte z nich slova tak, abyste postupně použilx všechna písmena. " +
            "Slovo musí začínat koncovým písmenem slova předchozího. " +
            "Dvě po sobě jdoucí písmena nemohou náležet stejné straně čtverce. ",
        detail:
            "Slovník neobsahuje vulgární a obskurní slova ani vlastní jména. ",
        errorLetterSet: "Nepodařilo se načíst sadu písmen.",
        errorWordList: "Nepodařilo se načíst seznam slov.",
        alreadyFound: "Toto slovo jste už našlx.",
        correct: "Správně!",
        wrong: "Špatné slovo.",
        notInList: "Slovo není v seznamu.",
        wrongStart: "Slovo musí začínat písmenem",
        sameSide: "Dvě po sobě jdoucí písmena nemohou být ze stejné strany.",
        tooShort: "Slovo musí mít alespoň 3 písmena.",
        submitTitle: "Potvrdit",
        deleteTitle: "Smazat",
        restartTitle: "Restart",
        wordCount: (n: number) =>
            n === 1 ? "slovo" : n >= 2 && n <= 4 ? "slova" : "slov",
        winHeading: "Gratulujeme!",
        winMessage: "Použilx jste všechna písmena!",
        newGame: "Nová hra",
    },

    // Crossclimb
    crossclimb: {
        title: "🪜 Žebříček",
        description:
            "Uhádněte pět českých slov stejné délky podle nápověd. " +
            "Poté je přetažením seřaďte tak, aby každé sousední slovo se lišilo právě o jedno písmeno.",
        detail:
            "Ke každému slovu je zobrazena křížovková nápověda. " +
            "Nejprve uhádněte všechna slova a poté je přetažením seřaďte do správného pořadí. " +
            "Správné pořadí tvoří žebříček, kde se každé sousední slovo liší právě o jedno písmeno. " +
            "Změna diakritiky (např. a→á) se počítá jako jedna změna.",
        errorLoading: "Nepodařilo se načíst hádanku.",
        solveClues: "Uhádněte slova",
        arrangeWords: "Seřaďte slova přetažením",
        clueLabel: "Nápověda",
        submitAnswer: "Potvrdit",
        correctAnswer: "Správně!",
        wrongAnswer: "Špatná odpověď.",
        submitOrder: "Potvrdit pořadí",
        wrongOrder: "Pořadí není správné. Zkuste znovu.",
        winHeading: "Gratulujeme!",
        winMessage: "Sestavilx jste správný žebříček!",
        newGame: "Nová hra",
    },

    // Wordle (Pětka)
    wordle: {
        title: "🟪 Pětka",
        description:
            "Uhádněte pětipísmenné české slovo na šest pokusů. " +
            "Po každém pokusu se písmena obarví: fialová = správné místo, žlutá = špatné místo, šedá = písmeno ve slově není.",
        detail:
            "Zadejte pětipísmenné české slovo a stiskněte Enter. " +
            "Fialová barva znamená, že písmeno je na správném místě. " +
            "Žlutá barva znamená, že písmeno je ve slově, ale na jiném místě. " +
            "Šedá barva znamená, že písmeno ve slově není. " +
            "Máte šest pokusů na uhádnutí slova.",
        errorLoading: "Nepodařilo se načíst slovo.",
        tooShort: "Slovo musí mít 5 písmen.",
        notInDict: "Slovo není ve slovníku.",
        alreadyGuessed: "Toto slovo jste už zkusilx.",
        winHeading: "Výborně!",
        winMessage: "Uhádlx jste slovo!",
        lost: "Správné slovo bylo: ",
        newGame: "Nová hra",
    },

    // Progress bar ranks
    ranks: [
        "Začátečník",
        "Dobrý start!",
        "Pěkný pokrok!",
        "Dobrá práce!",
        "Solidní!",
        "Skvělé!",
        "Úžasné!",
        "Geniální!",
        "Perfektní skóre!",
    ],

} as const;
