import {useEffect, useState} from 'react';
import {refreshToken} from '../api';

interface IStorage {
    access_token: string;
    refresh_token: string;
    access_token_expires_at: number;
}

export const useRefreshToken = () => {
    const [update, setUpdate] = useState<number>(0);
    useEffect(() => {
        const tokenStorage = localStorage.getItem('token');

        if(tokenStorage) {
            const {refresh_token}:IStorage = JSON.parse(tokenStorage);
            const timeoutId = setTimeout(() => {
                refreshToken(refresh_token);
                clearTimeout(timeoutId);
                setUpdate(update + 1);
                return;
            }, 900500);
        }
    }, [update]);
};
