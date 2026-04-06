export const dict = {
    // General
    app: {
        title: "Slovní hry",
        loading: "Načítání...",
    },

    // Navigation
    nav: {
        dashboard: "Hlavní stránka",
        scores: "Výsledky",
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
        title: "🐝 Spelling Bee",
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
        title: "📦 Letterboxed",
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
        wordCount: "slov",
        winHeading: "Gratulujeme!",
        winMessage: "Použilx jste všechna písmena!",
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

    // Scores page
    scores: {
        title: "Výsledky",
    },
} as const;
