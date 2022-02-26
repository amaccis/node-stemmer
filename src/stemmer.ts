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
        console.log('word: ' + word + ' length: ' + word.length)
        // let sbStemmerStem = ref.readCString(this.libstemmer.sb_stemmer_stem(this.stemmer, word, word.length))
        // console.log('word.lenght ' + word.length)

        const sbStemmerStem = this.libstemmer.sb_stemmer_stem(this.stemmer, word, word.length)
        // const sbStemmerStem = this.libstemmer.sb_stemmer_stem(this.stemmer, word, 100)
        const sbStemmerLength = this.libstemmer.sb_stemmer_length(this.stemmer)
        console.log('word: ' + word + ' sbStemmerLength: ' + sbStemmerLength)

        console.log('stem: ' + ref.readCString(sbStemmerStem))
        
        // const sbStemmerStem = this.libstemmer.sb_stemmer_stem(this.stemmer, word, sbStemmerLength)
        // console.log('sbStemmerLength ' + sbStemmerLength)
        // return ref.reinterpretUntilZeros(sbStemmerStem, sbStemmerLength).toString('utf8')

        // return ref.readCString(sbStemmerStem)
        return ref.readCString(sbStemmerStem).substring(0, sbStemmerLength)

        // let sbStemmerLength = this.libstemmer.sb_stemmer_length(this.stemmer)

        // let buf = ref.allocCString(sbStemmerStem, 'utf8');

        // console.log(buf.toString());
        // return sbStemmerStem
        // return sbStemmerStem.toString();
        // return buf.toString()

    }

    stemWords(words: string[]): string[]
    {
        let stems: string[] = [];
        words.forEach(word => stems.push(this.stemWord(word)));
        return stems;
    }

}