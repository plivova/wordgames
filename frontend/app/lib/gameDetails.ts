export const gameDetails: Record<string, { title: string; description: string, detail: string, image: string }> = {
    '/spellingBee': {
        title: '🐝 Spelling Bee',
        description:
            'Je zadáno sedm písmen, z nichž jedno je středové (zvýrazněno barevně). ' +
            'Utvářejte slova, která mají alespoň 4 písmena a obsahují středové písmeno.',
        detail:
            'Každé písmeno může být ve slově použito více než jednou. ' +
            'Slovník neobsahuje vulgární a obskurní slova ani vlastní jména. ' +
            'Slova tvořena čtyřmi písmeny jsou za jeden bod. ' +
            'Delší slova mají bodovou hodnotu dle své délky (př. slovo tvořeno šesti písmeny má hodnotu 6 bodů. ' +
            'Každý set písmen obsahuje alespoň jeden "pangram", neboli slovo, které využívá všechna písmena. ' +
            'Takové slovo poté k hodnotě dle své délky navíc přidává 7 bodů.'
            ,
        image: '',
    },
};
