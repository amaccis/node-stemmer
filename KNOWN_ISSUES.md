# Known Issues

This is a list of major known issues. 

## Buffer (pointer) sbStemmerList has length 0

libstemmer.sb_stemmer_list() returns a Buffer with lentgh 0. As a workaround you need to manually set a length to the Buffer.

## Wrong stems for sords with diacritics 

libstemmer.sb_stemmer_stem() returns a wrong stem when as input it receives words with diacritics (e.g. portuguese atribuição or obrigações'). That's why portuguese tests are commented.