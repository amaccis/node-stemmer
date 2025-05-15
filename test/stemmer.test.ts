import Stemmer from '../src/stemmer'
import { UnavailableAlgorithmError } from '../src/error/unavailable-algorithm-error';
import { CharacterEncoding } from '../src/enum/character-encoding';
import { encode } from 'iconv-lite';

describe('test static method algorithms()', () => {
    test('should return an array not empty', () => {

        const algorithm = 'english';
        const word = Buffer.from('cycling');
        const stemmer = new Stemmer(algorithm); // default character encoding is UTF-8
        const stem = stemmer.stemWord(word);
        console.log(stem);


        const algorithms = Stemmer.algorithms();
        expect(algorithms).toBeInstanceOf(Array);
        expect(algorithms.length).toBeGreaterThan(0);
    });
});

describe('test new Stemmer()', () => {
    test(`should throw Error if the algorithm is unavailable`, () => {
        expect(() => {new Stemmer('dothraki')}).toThrow(UnavailableAlgorithmError);
    }),
    test(`should throw Error if the algorithm is available but the encoding is not`, () => {
        expect(() => {new Stemmer('italian', CharacterEncoding.KOI8_R)}).toThrow('Unavailable algorithm');
    })
});

const stemWordUtf8Charenc = [
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
    {
        algorithm: 'portuguese', 
        word: 'atribuição', 
        stem: 'atribuiçã'
    },
    {
        algorithm: 'basque', 
        word: 'aberatsenetakoa', 
        stem: 'aberatse'
    },
    {
        algorithm: 'catalan', 
        word: 'arruïnada', 
        stem: 'arru'
    },
    {
        algorithm: 'danish', 
        word: 'afbildningerne', 
        stem: 'afbildning'
    },
    {
        algorithm: 'hungarian', 
        word: 'lenyűgözőnek', 
        stem: 'lenyűgöző'
    },
    {
        algorithm: 'romanian', 
        word: 'luminișurile', 
        stem: 'luminișur'
    },
    {
        algorithm: 'russian', 
        word: 'взъерошенный', 
        stem: 'взъерошен'
    }
];
describe.each(stemWordUtf8Charenc)(`test stemWord() method with no charenc`, (item) => {
    test(`the algorithm ${item.algorithm} for the word ${item.word} should return the stem ${item.stem}`, () => {
        const stemmer = new Stemmer(item.algorithm);
        const word = Buffer.from(item.word);
        expect(stemmer.stemWord(word)).toStrictEqual(Buffer.from(item.stem).toString());
    });
});
describe.each(stemWordUtf8Charenc)(`test stemWord() method with charenc UTF_8`, (item) => {
    test(`the algorithm ${item.algorithm} for the word ${item.word} should return the stem ${item.stem}`, () => {
        const stemmer = new Stemmer(item.algorithm, CharacterEncoding.UTF_8);
        const word = Buffer.from(item.word);
        expect(stemmer.stemWord(word)).toStrictEqual(Buffer.from(item.stem).toString());
    });
});

const stemWordIso88591Charenc = [
    {
        algorithm: 'basque', 
        word: 'aberatsenetakoa', 
        stem: 'aberatse'
    },
    {
        algorithm: 'catalan', 
        word: 'arruïnada', 
        stem: 'arru'
    },
    {
        algorithm: 'danish', 
        word: 'afbildningerne', 
        stem: 'afbildning'
    }
];
describe.each(stemWordIso88591Charenc)(`test stemWord() method with charenc ISO_8859_1`, (item) => {
    test(`the algorithm ${item.algorithm} for the word ${item.word} should return the stem ${item.stem}`, () => {        
        const stemmer = new Stemmer(item.algorithm, CharacterEncoding.ISO_8859_1);
        const word = encode(item.word, 'ISO_8859_1');
        expect(stemmer.stemWord(word)).toStrictEqual(encode(item.stem, 'iso-8859-1').toString());
    });
});

const stemWordIso88592Charenc = [
    {
        algorithm: 'hungarian', 
        word: 'lenyűgözőnek', 
        stem: 'lenyűgöző'
    }
];
describe.each(stemWordIso88592Charenc)(`test stemWord() method with charenc ISO_8859_2`, (item) => {
    test(`the algorithm ${item.algorithm} for the word ${item.word} should return the stem ${item.stem}`, () => {
        const stemmer = new Stemmer(item.algorithm, CharacterEncoding.ISO_8859_2);
        const word = encode(item.word, 'iso-8859-2');
        expect(stemmer.stemWord(word)).toStrictEqual(encode(item.stem, 'iso-8859-2').toString());
    });
});

const stemWordKoi8rCharenc = [
    {
        algorithm: 'russian', 
        word: 'взъерошенный', 
        stem: 'взъерошен'
    }
];
describe.each(stemWordKoi8rCharenc)(`test stemWord() method with charenc KOI8_R`, (item) => {
    test(`the algorithm ${item.algorithm} for the word ${item.word} should return the stem ${item.stem}`, () => {
        const stemmer = new Stemmer(item.algorithm, CharacterEncoding.KOI8_R);
        const word = encode(item.word, 'koi8-r');
        expect(stemmer.stemWord(word)).toStrictEqual(encode(item.stem, 'koi8-r').toString());
    });
});

const stemWordsUtf8Charenc = [
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
    {   
        algorithm: 'portuguese', 
        words: [
            'atribuição', 
            'obrigações'
        ], 
        stems: [
            'atribuiçã', 
            'obrig'
        ]
    },
    {
        algorithm: 'basque', 
        words: [
            'aberatsenetakoa', 
            'txotxongilo'
        ], 
        stems: [
            'aberatse', 
            'txotxongilo'
        ]
    },
    {
        algorithm: 'catalan', 
        words: [
            'gratuïtament', 
            'cuaespinós'
        ], 
        stems: [
            'gratuit', 
            'cuaespin'
        ]
    },
    {
        algorithm: 'danish', 
        words: [
            'afbildningerne', 
            'linnedklæderne'
        ], 
        stems: [
            'afbildning', 
            'linnedklæd'
        ]
    },
    {
        algorithm: 'hungarian', 
        words: [
            'lenyűgözőnek', 
            'megháromszorozódott'
        ], 
        stems: [
            'lenyűgöző', 
            'megháromszorozódot'
        ]
    },
    {
        algorithm: 'romanian', 
        words: [
            'luminișurile', 
            'personalităţilor'
        ], 
        stems: [
            'luminișur', 
            'personal'
        ]
    },
    {
        algorithm: 'russian', 
        words: [
            'взъерошенный', 
            'затруднительное'
        ], 
        stems: [
            'взъерошен', 
            'затруднительн'
        ]
    },
];
describe.each(stemWordsUtf8Charenc)(`test stemWords() method with no charenc`, (item) => {
    test(`the algorithm ${item.algorithm} for the words ${item.words} should return the stems ${item.stems}`, () => {
        const stemmer = new Stemmer(item.algorithm);
        const words = item.words.map(word => Buffer.from(word));
        const stems = item.stems.map(stem => Buffer.from(stem).toString());
        expect(stemmer.stemWords(words)).toStrictEqual(stems);
    });
});
describe.each(stemWordsUtf8Charenc)(`test stemWords() method with charenc UTF_8`, (item) => {
    test(`the algorithm ${item.algorithm} for the words ${item.words} should return the stems ${item.stems}`, () => {
        const stemmer = new Stemmer(item.algorithm, CharacterEncoding.UTF_8);
        const words = item.words.map(word => Buffer.from(word));
        const stems = item.stems.map(stem => Buffer.from(stem).toString());
        expect(stemmer.stemWords(words)).toStrictEqual(stems);
    });
});

const stemWordsIso88591Charenc = [
    {
        algorithm: 'basque', 
        words: [
            'aberatsenetakoa', 
            'txotxongilo'
        ], 
        stems: [
            'aberatse', 
            'txotxongilo'
        ]
    },
    {
        algorithm: 'catalan', 
        words: [
            'gratuïtament', 
            'cuaespinós'
        ], 
        stems: [
            'gratuit', 
            'cuaespin'
        ]
    },
    {
        algorithm: 'danish', 
        words: [
            'afbildningerne', 
            'linnedklæderne'
        ], 
        stems: [
            'afbildning', 
            'linnedklæd'
        ]
    }
];
describe.each(stemWordsIso88591Charenc)(`test stemWords() method with charenc ISO_8859_1`, (item) => {
    test(`the algorithm ${item.algorithm} for the words ${item.words} should return the stems ${item.stems}`, () => {
        const stemmer = new Stemmer(item.algorithm, CharacterEncoding.ISO_8859_1);
        const words = item.words.map(word => encode(word, 'iso-8859-1'));
        const stems = item.stems.map(stem => encode(stem, 'iso-8859-1').toString());
        expect(stemmer.stemWords(words)).toStrictEqual(stems);
    });
});

const stemWordsIso88592Charenc = [
    { 
        algorithm: 'hungarian', 
        words: [
            'lenyűgözőnek', 
            'megháromszorozódott'
        ], 
        stems: [
            'lenyűgöző', 
            'megháromszorozódot'
        ]
    },
];
describe.each(stemWordsIso88592Charenc)(`test stemWords() method with charenc ISO_8859_2`, (item) => {
    test(`the algorithm ${item.algorithm} for the words ${item.words} should return the stems ${item.stems}`, () => {
        const stemmer = new Stemmer(item.algorithm, CharacterEncoding.ISO_8859_2);
        const words = item.words.map(word => encode(word, 'iso-8859-2'));
        const stems = item.stems.map(stem => encode(stem, 'iso-8859-2').toString());
        expect(stemmer.stemWords(words)).toStrictEqual(stems);
    });
});

const stemWordsKoi8rCharenc = [
    {
        algorithm: 'russian', 
        words: [
            'взъерошенный', 
            'затруднительное'
        ], 
        stems: [
            'взъерошен', 
            'затруднительн'
        ]
    }
];
describe.each(stemWordsKoi8rCharenc)(`test stemWords() method with charenc KOI8_R`, (item) => {
    test(`the algorithm ${item.algorithm} for the words ${item.words} should return the stems ${item.stems}`, () => {
        const stemmer = new Stemmer(item.algorithm, CharacterEncoding.KOI8_R);
        const words = item.words.map(word => encode(word, 'koi8-r'));
        const stems = item.stems.map(stem => encode(stem, 'koi8-r').toString());
        expect(stemmer.stemWords(words)).toStrictEqual(stems);
    });
});
