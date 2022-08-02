import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';

const API_URL = process.env.REACT_APP_BASE_URL;

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    // @ts-ignore
    const tokenStorage = localStorage.getItem('token');

    if (tokenStorage) {
        // @ts-ignore
        const token = JSON.parse(localStorage.getItem('token'));
        // @ts-ignore
        config.headers['Authorization'] = `Bearer ${token.access_token}`;
    }

    return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
    if (error.response) {
        // Access Token was expired
        if (
            error.response.status === 401
        ) {
            // @ts-ignore
            const tokenStorage =  localStorage.getItem('token');
            if (tokenStorage) {
                // @ts-ignore
                const storedToken = JSON.parse(localStorage.getItem('token'));

                try {
                    await refreshToken(storedToken.refresh_token);

                    throw error;
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
            // @ts-ignore
            return ;
        }
    }
    return Promise.reject(error);
};

export async function refreshToken (refresh_token:string) {
    const rs = await axios.post(`${API_URL}/token/refresh`, {
        refresh_token: refresh_token,
    });
    const {access_token,access_token_expires_at } = rs.data.data;
    localStorage.setItem('token', JSON.stringify({access_token, refresh_token, access_token_expires_at}));
}

export const setupInterceptorsTo = (
    axiosInstance: AxiosInstance
): AxiosInstance => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
};

const api = setupInterceptorsTo(
    axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    })
);

export default api;
