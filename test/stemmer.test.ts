import Stemmer from '../src/stemmer'

describe("test algorithms() method", () => {
    const algorithms = [
        'arabic',
        'armenian',
        'basque',
        'catalan',
        'danish',
        'dutch',
        'english',
        'finnish',
        'french',
        'german',
        'greek',
        'hindi',
        'hungarian',
        'indonesian',
        'irish',
        'italian',
        'lithuanian',
        'nepali',
        'norwegian',
        'porter',
        'portuguese',
        'romanian',
        'russian',
        'serbian',
        'spanish',
        'swedish',
        'tamil',
        'turkish',
        'yiddish'
    ];
    test(`should return these algorithms: ${algorithms}`, () => {
        expect(Stemmer.algorithms()).toStrictEqual(algorithms)
    });
});

const stemWordData = [
    {
        algorithm: 'english',
        word: 'cycling',
        stem: 'cycl'
    },
    {
        algorithm: 'italian',
        word: 'camminare',
        stem: 'cammin'
    },
    /*
    {
        algorithm: 'portuguese',
        word: 'atribuição',
        stem: 'atribuiçã'
    }
    */
];
describe.each(stemWordData)(`test stemWord() method`, (item) => {
    test(`using ${item.algorithm} algorithm for the word ${item.word} the stem should be ${item.stem}`, () => {
        const stemmer = new Stemmer(item.algorithm);
        expect(stemmer.stemWord(item.word)).toBe(item.stem);
    });
});

const stemWordsData = [
    {
        algorithm: 'english',
        words: [
            'cycling',
            'doors'
        ],
        stems: [
            'cycl',
            'door'
        ]
    },
    {
        algorithm: 'italian',
        words: [
            'camminare',
            'porte'
        ],
        stems: [
            'cammin',
            'port'
        ]
    },
    //{
    //    algorithm: 'portuguese',
    //    words: [
    //        'atribuição',
    //        'obrigações'
    //    ],
    //    stems: [
    //        'atribuiçã',
    //        'obrig'
    //    ]
    //}
];
describe.each(stemWordsData)(`test stemWords() method`, (item) => {
    test(`using ${item.algorithm} algorithm for the words ${item.words} the stems should be ${item.stems}`, () => {
        const stemmer = new Stemmer(item.algorithm);
        expect(stemmer.stemWords(item.words)).toStrictEqual(item.stems);
    });
});