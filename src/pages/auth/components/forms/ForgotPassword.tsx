import React from 'react';
import emailIcon from '../../../../assets/images/icon/email.svg';

export const ForgotPassword = () => {
    return (
        <form className="login_item_box_form" data-attribute="forget">
            <label>
                <img src={emailIcon} alt={'icon'} />
                <input type="text" name="" placeholder="Email" />
            </label>
            <button>Восстановить пароль</button>
        </form>
    );
};
