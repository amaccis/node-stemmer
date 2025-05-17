import { isNullPointer } from "ffi-rs";
import { Libstemmer } from "./libstemmer";
import { UnavailableAlgorithmError } from "./error/unavailable-algorithm-error";
import { CharacterEncoding } from "./enum/character-encoding";

export default class Stemmer {

    private libstemmer;

    private stemmer;
 
    constructor(algorithm: string, charenc: CharacterEncoding = CharacterEncoding.UTF_8) 
    {
        this.libstemmer = Libstemmer.getLibstemmer();
        this.stemmer = this.libstemmer.sb_stemmer_new(
            algorithm, 
            charenc
        );
        if (isNullPointer(this.stemmer)) {
            throw new UnavailableAlgorithmError('Unavailable algorithm');
        }
    }
    
    static algorithms(): string[]
    {
        const libstemmer = Libstemmer.getLibstemmer();
                
        const sbStemmerList = <Array<string>>libstemmer.sb_stemmer_list();
        
        let algorithms: string[] = [];
        
        Array.from(sbStemmerList).forEach(item => {
            algorithms.push(<string>item);
        });
        
        return algorithms;
    }

    stemWord(word: Buffer): string
    {
        const size = word.length;

        const stem = this.libstemmer.sb_stemmer_stem(this.stemmer, word, size);
        const length = this.libstemmer.sb_stemmer_length(this.stemmer);
        
        return stem.slice(0, length);
    }

    stemWords(words: Buffer[]): string[]
    {
        let stems: string[] = [];
        words.forEach(word => stems.push(this.stemWord(word)));

        return stems;
    }

}