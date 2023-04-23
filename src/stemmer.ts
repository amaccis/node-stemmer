import { Libstemmer } from "./libstemmer";
import * as ref from 'ref-napi';
import * as array from 'ref-array-di';


export default class Stemmer {

    private libstemmer;

    private stemmer;
 
    constructor(algorithm: string) 
    {
        this.libstemmer = Libstemmer.getLibstemmer();
        this.stemmer = this.libstemmer.sb_stemmer_new(
            algorithm, 
            'UTF_8'
        );
    }
    
    static algorithms(): string[]
    {
        const ArrayType = array(ref);

        const CStringType = ref.types.CString 
        const CStringArray = ArrayType(CStringType)

        const libstemmer = Libstemmer.getLibstemmer();
        const sbStemmerList = CStringArray.untilZeros(libstemmer.sb_stemmer_list());

        let algorithms: string[] = [];

        Array.from(sbStemmerList).forEach(item => {
            algorithms.push(<string>item);
        })

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