export interface IVoice {
    voice: string;
    voice_name: string;
    gender: string;
    language_code: string;
    voice_type: string;
    sample_url: string;
    effect: string;
    position: number;
}

export interface IVoices {
    data: IVoice[]
}

export interface IResponseVoices {
    data: IVoices
}

export interface ILanguage {
    language:string;
    language_code:string;
    language_flag: string;
    position: number
}

export interface ILanguages {
    data: ILanguage[]
}

export interface IResponseLanguages {
    data: ILanguages
}

export interface ICategory {
    id: string;
    title: string;
    position: number;
}

export interface ICategories {
    data: ICategory[]
}

export interface IResponseCategories {
    data: ICategories
}
