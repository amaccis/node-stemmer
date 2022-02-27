# node-stemmer

![CI](https://github.com/amaccis/node-stemmer/workflows/CI/badge.svg)

## What is Node Stemmer?
Node Stemmer is a Node.js interface to the stemming algorithms from the [Snowball project](https://snowballstem.org/), largely inspired by Richard Boulton's [PyStemmer](https://github.com/snowballstem/pystemmer).
It uses [ffi-napi](https://github.com/node-ffi-napi/node-ffi-napi) and expects to find the file libstemmer.so (a version of [Libstemmer](https://snowballstem.org/dist/libstemmer_c.tgz) compiled as shared library) in LD_LIBRARY_PATH.  
In order to set-up this kind of environment you can take a look at [docker-node-libstemmer](https://github.com/amaccis/docker-node-libstemmer) Dockerfile or you can use the corresponding docker image: [amaccis/node-libstemmer](https://hub.docker.com/r/amaccis/node-libstemmer)

## Installation
You can install Node Stemmer using [npm](https://www.npmjs.com/package/node-stemmer).

```shell
npm i node-stemmer
```