# Known Issues

This is a list of major known issues. 

## Wrong stems for words with diacritics 

libstemmer.sb_stemmer_stem() returns a wrong stem when as input it receives words with diacritics (e.g. portuguese atribuição or obrigações). That's why portuguese tests are commented.