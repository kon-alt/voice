import {alertTypes, showAlert} from '../store/app.slice';

export const handleError = (e:any, dispatch:any) => {
    if(e?.response?.status === 401) {
       return dispatch(showAlert({type: alertTypes.ERROR, message: 'Что то с интернетом, попробуйте еще раз', show: true}));
    }
    const {message} = e?.response?.data;
    dispatch(showAlert({type: alertTypes.ERROR, message: message, show: true}));
};
