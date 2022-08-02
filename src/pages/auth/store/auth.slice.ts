import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../../api';
import {handleError} from '../../../helpers/handleError';

export const enum switchTapList {
    login = 0,
    register = 1,
    forgot = 2
}

interface IAuthStore {
    loader: boolean;
    session_id: string | null;
    access_token: string;
    access_token_expires_at: string;
    refresh_token: string;
    refresh_token_expires_at: string;
    account: IAccount;
    switchTab: switchTapList.login | switchTapList.register | switchTapList.forgot;
}

interface IAccount {
    email: string;
    verified: boolean;
    language: string;
    role: string;
}

export interface IAuthRequest {
    email: string;
    password: string;
    navigate?: any;
    alert?: any;
}

interface ILoginResponse {
    data: {
        session_id: string | null;
        access_token: string;
        access_token_expires_at: string;
        refresh_token: string;
        refresh_token_expires_at: string;
        account: IAccount;
    }
}

const account: IAccount = {
    email: '',
    verified: false,
    language: '',
    role: '',
};

const initialState: IAuthStore = {
    loader: false,
    session_id: null,
    access_token: '',
    access_token_expires_at: '',
    refresh_token: '',
    refresh_token_expires_at: '',
    account: account,
    switchTab: switchTapList.login
};

export const authLogin = createAsyncThunk(
    'auth/login',
    async ({email, password, navigate}: IAuthRequest, {dispatch}) => {
        try {

            const res = await api.post<ILoginResponse>('/login', {email, password});
            if (res.status === 200) {
                navigate('/');
                localStorage.setItem('token', JSON.stringify({
                    access_token: res.data.data.access_token,
                    refresh_token: res.data.data.refresh_token,
                    access_token_expires_at: new Date(res.data.data.access_token_expires_at).getTime() / 1000
                }));
                return res.data.data;
            }

        } catch (e: any) {
            handleError(e, dispatch);
        }
    }
);

export const authRegister = createAsyncThunk(
    'auth/register',
    async ({email, password, navigate, alert}: IAuthRequest, {dispatch}) => {
        try {
            const res = await api.post('/registration', {email, password});
            if (res.status === 201) {
                navigate('/login');
            }
            return;
        } catch (e: any) {
            handleError(e, dispatch);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, {payload}: any) => {
            state.access_token = payload.access_token;
            state.access_token_expires_at = payload.access_token_expires_at;
        },
        switcherTap: (state, {payload}: { payload: number }) => {
            state.switchTab = payload;
        },
        clearAppAuth: (state) => {
            state.session_id = null;
            state.access_token = '';
            state.access_token_expires_at = '';
            state.refresh_token = '';
            state.refresh_token_expires_at = '';
            state.account.email = '';
            state.account.verified = false;
            state.account.language = '';
            state.account.role = '';
        }
    },
    extraReducers: builder => {
        builder.addCase(authRegister.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(authRegister.fulfilled, (state, {payload}) => {
            state.loader = false;
        });
        builder.addCase(authLogin.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(authLogin.fulfilled, (state, {payload}: { payload: any }) => {
            state.loader = false;
            state.session_id = payload.session_id;
            state.access_token = payload.access_token;
            state.access_token_expires_at = payload.access_token_expires_at;
            state.refresh_token = payload.refresh_token;
            state.refresh_token_expires_at = payload.refresh_token_expires_at;
            state.account = payload.account;
        });
    }
});

export const {clearAppAuth, switcherTap} = authSlice.actions;

export default authSlice.reducer;
