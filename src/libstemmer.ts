import * as ffi from 'ffi-napi';
import * as ref from 'ref-napi';
import * as array from 'ref-array-di';
import * as struct from 'ref-struct-di';

export class Libstemmer {
 
    static getLibstemmer() {

        const ArrayType = array(ref);
        const StructType = struct(ref)

        const sb_stemmer = ref.refType(StructType())

        return ffi.Library('libstemmer', {
            "sb_stemmer_list": [ ArrayType(ref.refType(ref.types.char)), [] ],
            "sb_stemmer_new": [ sb_stemmer, [ 'string', 'string' ] ],
            "sb_stemmer_delete": [ ref.types.void, [ sb_stemmer ]],
            "sb_stemmer_stem": [ ref.refType(ref.types.uchar), [ sb_stemmer, 'string', 'int' ] ],
            "sb_stemmer_length": [ ref.types.int, [ sb_stemmer ] ]
        });

    }

}