# node-stemmer

![CI](https://github.com/amaccis/node-stemmer/workflows/CI/badge.svg)

## What is Node Stemmer?
Node Stemmer is a Node.js interface to the stemming algorithms from the [Snowball project](https://snowballstem.org/), largely inspired by Richard Boulton's [PyStemmer](https://github.com/snowballstem/pystemmer).
It uses [ffi-rs](https://github.com/zhangyuang/node-ffi-rs) and expects to find the file libstemmer.so (a version of [Libstemmer](https://snowballstem.org/dist/libstemmer_c.tgz) compiled as shared library) in LD_LIBRARY_PATH.  
In order to set-up this kind of environment you can take a look at [docker-node-libstemmer](https://github.com/amaccis/docker-node-libstemmer) Dockerfile or you can use the corresponding docker image: [amaccis/node-libstemmer](https://hub.docker.com/r/amaccis/node-libstemmer)

## Installation
You can install Node Stemmer using [npm](https://www.npmjs.com/package/node-stemmer).

```shell
npm i node-stemmer
```

## Compatibility

| node-stemmer    | libstemmer |
| -------- | ------- |
| 3.0.0  | 3.0.0, 3.0.1    |
| 1.0.0 | 2.0.0, 2.1.0, 2.2.0     |

## Usage

```typescript
import { Stemmer, CharacterEncoding } from 'node-stemmer';

const algorithms = Stemmer.algorithms();
console.log(algorithms);
/*
[
    'arabic',       'armenian',   'basque',
    'catalan',      'danish',     'dutch',
    'dutch_porter', 'english',    'esperanto',
    'estonian',     'finnish',    'french',
    'german',       'greek',      'hindi',
    'hungarian',    'indonesian', 'irish',
    'italian',      'lithuanian', 'nepali',
    'norwegian',    'porter',     'portuguese',
    'romanian',     'russian',    'serbian',
    'spanish',      'swedish',    'tamil',
    'turkish',      'yiddish'
]
*/

const algorithm = 'english';
const word = Buffer.from('cycling');
const stemmer = new Stemmer(algorithm); // default character encoding is UTF-8
const stem = stemmer.stemWord(word);
console.log(stem);
/*
cycl
*/

const algorithm = 'basque';
const word = Buffer.from('aberatsenetakoa');
const stemmer = new Stemmer(algorithm, CharacterEncoding.ISO_8859_1);
const stem = stemmer.stemWord(word);
console.log(stem);
/*
aberatse
*/
```

## License
All files are MIT &copy; [Andrea Maccis](https://twitter.com/andreamaccis).