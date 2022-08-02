import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AlertType} from 'react-alert';
import api from '../api';
import {
    ICategory,
    ILanguage,
    IResponseCategories,
    IResponseLanguages,
    IResponseVoices,
    IVoice,
} from './types';


export const enum alertTypes {
    INFO = 'info',
    SUCCESS = 'success',
    ERROR = 'error'
};

interface IAlert {
    message: string;
    type: AlertType | undefined;
    show:boolean;
}

interface IAppState {
    alerts: IAlert;
    voices: IVoice[];
    languages: ILanguage[];
    categories: ICategory[]
}

const alertDefault = {
    message: '',
    type: undefined,
    show: false
};


const initialState: IAppState = {
    alerts: alertDefault,
    voices: [],
    languages: [],
    categories: []
};

export const getVoices = createAsyncThunk(
    'app/getVoices',
     async (_, {dispatch, getState}) => {
        try {
            const {auth} = getState() as any;
            const res = await api.get<IResponseVoices>('/request/voices', {
                headers : {
                    'Authorization': `Bearer ${auth.access_token}`
                }
            });
            return res.data.data;
        } catch (e:any) {
            const {message} = e?.response?.data;
            dispatch(showAlert({type: alertTypes.ERROR, message: message, show: true}));
        }
     }
);

export const getLanguage = createAsyncThunk(
    'app/getLanguage',
    async (_, {dispatch, getState}) => {
        try {
            const {auth} = getState() as any;
            const res = await api.get<IResponseLanguages>('/request/languages', {
                headers : {
                    'Authorization': `Bearer ${auth.access_token}`
                }
            });
            return res.data.data;
        } catch (e:any) {
            const {message} = e?.response?.data;
            dispatch(showAlert({type: alertTypes.ERROR, message: message, show: true}));
        }
    }
);

export const getCategory = createAsyncThunk(
    'app/getCategory',
    async (_, {dispatch, getState}) => {
        try {
            const {auth} = getState() as any;
            const res = await api.get<IResponseCategories>('/request/category', {
                headers : {
                    'Authorization': `Bearer ${auth.access_token}`
                }
            });
            return res.data.data;
        } catch (e:any) {
            const {message} = e?.response?.data;
            dispatch(showAlert({type: alertTypes.ERROR, message: message, show: true}));
        }
    }
);

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        showAlert: (state, {payload}: { payload: IAlert }) => {
            state.alerts = payload;
        },
        clearAlert:(state) => {
            state.alerts = alertDefault;
        }
    },
    extraReducers: builder => {
        builder.addCase(getVoices.fulfilled, (state, {payload}:any) => {
            state.voices = payload;
        });
        builder.addCase(getLanguage.fulfilled, (state, {payload}:any) => {
            state.languages = payload;
        });
        builder.addCase(getCategory.fulfilled, (state, {payload}:any) => {
            state.categories = payload;
        });
    }
});

export const {showAlert, clearAlert} = appSlice.actions;

export default appSlice.reducer;
