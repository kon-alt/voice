import {ICategory, ILanguage, IVoice} from '../../../store/types';

interface IPlayer {
    project_id: string;
    title: string;
    padding: number;
    border_radius: number;
    main_color: string;
    text_color: string;
    title_color: string;
    border_color: string;
    background_color: string;
}

export interface IProject {
    project: {
        id: string;
        name: string;
        webhook_url:string;
    },
    integration: {
        project_id: string;
        type: string;
        voice: string;
        url: string;
    },
    player: IPlayer,
    voices?: IVoice[];
    languages?:ILanguage[];
    category?: ICategory[];
}

export interface IProjectResponse {
    data: IProject
}

export interface IProjectListItem {
    created_at: string;
    id: string;
    name: string;
}

export interface IProjectList {
    length: number;
    data:IProject[]
}

export interface IIntegrationRequest {
    project_id: string;
    integration: {
        type:string;
        voice:string;
        url:string;
    },
    player:IPlayer
}

export interface IContentItemList {
    id: string;
    project_id: string;
    title: string;
    symbols: number,
    source: string;
    status: number,
    created_at: string;
}

export interface IContentListResponse {
    data: IContentItemList[]
}

export interface IContent {
    id: string;
    title: string;
    symbols: number,
    mp3: string;
    m3u8: string;
    source: string;
    url: string;
    status: number,
    created_at: string;
}

export interface IById {
    id:string;
    navigate?:any
}
