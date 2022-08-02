import React from 'react';

export const Balance = () => {
    return (
        <div className="header_item-balance">
            <p className="header_item-balance-box">
                <span>6014.02</span>
                <i className="fas fa-chevron-down"></i>
                <img src="https://apihost.ru/images/icon/balance.svg"
                     alt=""/>
            </p>
            <div className="header_item-balance-drodown">
                <a href="https://apihost.ru/payment"  className="header_item-balance-drodown-pay">
                    Пополнить счет
                </a>
                <a href="/" className="header_item-balance-drodown-unpay">Запросить вывод</a>
            </div>
        </div>
    );
};
