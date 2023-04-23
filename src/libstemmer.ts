import * as ffi from 'ffi-napi';
import * as ref from 'ref-napi';
import * as struct from 'ref-struct-di';

export class Libstemmer {
 
    static getLibstemmer() 
    {
        const StructType = struct(ref);
        const sb_stemmer = StructType();

        return ffi.Library('libstemmer', {
            'sb_stemmer_list': [ 
                ref.coerceType('char **'),
                [] 
            ],
            'sb_stemmer_new': [
                ref.refType(sb_stemmer),
                [
                    ref.types.CString,
                    ref.types.CString
                ]
            ],
            'sb_stemmer_delete': [
                ref.types.void, 
                [ 
                    ref.refType(sb_stemmer) 
                ]
            ],
            "sb_stemmer_stem": [ 
                ref.refType(ref.types.uchar), 
                [ 
                    ref.refType(sb_stemmer), 
                    ref.types.CString,
                    ref.types.int 
                ] 
            ],
            'sb_stemmer_length': [ 
                ref.types.int, 
                [ 
                    ref.refType(sb_stemmer) 
                ] 
            ]
        });
    }
}