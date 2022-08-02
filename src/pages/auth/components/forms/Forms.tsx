import React from 'react';
import {NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../../hooks';
import {switcherTap, switchTapList} from '../../store/auth.slice';
import {LoginForm} from './LoginForm';
import {RegistrationForm} from './RegistrationForm';
import {ForgotPassword} from './ForgotPassword';

export const Forms = () => {
    const dispatch = useAppDispatch();
    const {switchTab} = useAppSelector(state => state.auth);
    const renderTab = (index:number) => {
        switch (index) {
            case 0:
                return <LoginForm handler={() => handleSwitchTab(switchTapList.forgot)} />;
            case 1:
                return <RegistrationForm />;
            default:
                return <ForgotPassword />;
        }
    };

    const handleSwitchTab = (num: switchTapList.login | switchTapList.register | switchTapList.forgot) => {
        dispatch(switcherTap(num));
    };

    return (
        <div className="login_item">
            <div className="login_box">
                <div className="login_item_box_section">
                    <span
                        data-attribute="login"
                        className={switchTab === switchTapList.login ? 'active' : ''}
                        onClick={() => handleSwitchTab(switchTapList.login)}
                    >ВХОД</span>
                    <span
                        data-attribute="registration"
                        className={switchTab === switchTapList.register ? 'active' : ''}
                        onClick={() => handleSwitchTab(switchTapList.register)}
                    >РЕГИСТРАЦИЯ</span>
                </div>
                {renderTab(switchTab)}
            </div>

            <p className="login_item-polytic">
                Входя в систему вы автоматически соглашаетесь с<br />
                <NavLink to={'/'}>политикой конфиденциальности</NavLink>
            </p>
        </div>
    );
};
