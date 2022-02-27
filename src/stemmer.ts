import { Libstemmer } from "./libstemmer";
import * as ref from 'ref-napi';

export default class Stemmer {

    private libstemmer;

    private stemmer;
 
    constructor(algorithm: string) {
        this.libstemmer = Libstemmer.getLibstemmer();
        this.stemmer = this.libstemmer.sb_stemmer_new(algorithm, 'UTF_8')
    }

    static algorithms(): string[]
    {
        const libstemmer = Libstemmer.getLibstemmer()
        const sbStemmerList = libstemmer.sb_stemmer_list();
        // FIXME
        // does it exist a way to get the Buffer length without setting it?
        sbStemmerList.length = 100
        let algorithms: string[] = [];
        let i = 0;
        while (sbStemmerList[i].length) {
            algorithms.push(ref.readCString(sbStemmerList[i]));
            i++;
        }
        return algorithms;
    }

    stemWord(word: string): string
    {
        const sbStemmerStem = this.libstemmer.sb_stemmer_stem(this.stemmer, word, word.length);
        const sbStemmerLength = this.libstemmer.sb_stemmer_length(this.stemmer);
        
        return ref.readCString(sbStemmerStem).substring(0, sbStemmerLength);
    }

    stemWords(words: string[]): string[]
    {
        let stems: string[] = [];
        words.forEach(word => stems.push(this.stemWord(word)));
        return stems;
    }

}