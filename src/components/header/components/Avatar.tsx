import React, {useState} from 'react';
import axios from 'axios';
import {useAppDispatch} from '../../../hooks';
import {clearAppAuth} from '../../../pages/auth/store/auth.slice';

export const Avatar = () => {
    const dispatch = useAppDispatch();
    const [isDrop, setDrop] = useState<boolean>(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(clearAppAuth());
    };

    return (
        <div
            className="header_item-login-block"
        >
            <p className="header_item-login">
                <span>apihost@yandex.com</span>
                <i className="fas fa-chevron-down"/>
                <img src="https://apihost.ru/images/icon/user.svg" alt={'icon'} onClick={() => setDrop(!isDrop)}/>
            </p>
            {isDrop
                ? (
                    <>
                    <div className="header_item-login-drodown">
                        <p className="header_item-login-drodown-username">apihost</p>
                        <span className="header_item-login-drodown-logout" onClick={handleLogout}>
                            <i className="fas fa-arrow-right"/>
                            Выйти из системы
                        </span>
                    </div>
                        <div className="header_item-login-drodown--overlay" onClick={() => setDrop(false)}/>
                    </>
                ) : null}
        </div>
    );
};
