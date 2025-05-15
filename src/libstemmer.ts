import { open, load, DataType, JsExternal, arrayConstructor } from 'ffi-rs';

export class Libstemmer {
 
    static getLibstemmer() 
    {
        const LIBRARY = 'libstemmer';

        open({
            library: LIBRARY,
            path: 'libstemmer.so'
        });

        return {
            sb_stemmer_list: () => {
                return load({
                    library: LIBRARY,
                    funcName: 'sb_stemmer_list',
                    retType: arrayConstructor({
                        type: DataType.StringArray,
                        length: 32  // FIXME 
                    }),
                    paramsType: [],
                    paramsValue: []
                })
            },
            sb_stemmer_new: (algorithm: string, charenc: string) => {
                return load({
                    library: LIBRARY,
                    funcName: 'sb_stemmer_new',
                    retType: DataType.External,
                    paramsType: [
                        DataType.String, 
                        DataType.String
                    ],
                    paramsValue: [
                        algorithm, 
                        charenc
                    ]
                })
            },
            sb_stemmer_stem: (stemmer: JsExternal, word: Buffer, size: number) => {
                return load({
                    library: LIBRARY,
                    funcName: 'sb_stemmer_stem',
                    retType: DataType.String,
                    paramsType: [
                        DataType.External,
                        DataType.U8Array,
                        DataType.I32 
                    ],
                    paramsValue: [
                        stemmer,
                        word,
                        size
                    ] 
                })
            },
            sb_stemmer_length: (stemmer: JsExternal) => {
                return load({
                    library: LIBRARY,
                    funcName: 'sb_stemmer_length',
                    retType: DataType.I32,
                    paramsType: [ 
                        DataType.External 
                    ],
                    paramsValue: [
                        stemmer
                    ]
                })
            },
            sb_stemmer_delete: (stemmer: JsExternal) => {
                return load({
                    library: LIBRARY,
                    funcName: 'sb_stemmer_delete',
                    retType: DataType.Void,
                    paramsType: [
                        DataType.External
                    ],
                    paramsValue: [
                        stemmer
                    ]
                })
            }
        }
    }
}