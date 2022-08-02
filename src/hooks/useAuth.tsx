import {useAppSelector} from './app.hooks';

export const useAuth = () => {
    const {session_id} = useAppSelector(state => state.auth);

    return {
        isAuth: session_id
    };
};
