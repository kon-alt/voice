import React from 'react';
import {Avatar, Balance, Navigation} from './components';

export const Header = () => {
    return (
        <>
            <header className="header">
                <div className="center">
                    <div className="header_row">
                        <div className="header_item">
                            <a href="https://apihost.ru">
                                <img src="https://apihost.ru/images/logo-header.png"
                                     alt="APIHOST.RU"
                                     srcSet="https://apihost.ru/images/logo-header@2x.png 2x, https://apihost.ru/images/logo-header@3x.png 3x"
                                     className="header_logo"/>
                            </a>
                            <img src="images/icon/bar.svg" alt="" className="bar"/>
                        </div>
                        <div className="header_item navbar">
                            <div className="navbar_login">
                                <div className="header_item-authorized">
                                    <div className="header_item-authorized-panel">
                                        <form>
                                            <label>
                                                <input type="text" name="email"
                                                       readOnly
                                                       value="apihost@yandex.com"
                                                />
                                            </label>
                                            <label>
                                                <input type="text"
                                                       name="cost"
                                                       placeholder="0.00"/>
                                            </label>
                                            <button>Пополнить счет</button>
                                            <a href="/">Запросить вывод</a>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <Navigation />
                            <img src="https://apihost.ru/images/icon/close.svg" alt="" className="bar_close"/>
                            <span className="bar_website">“APIHOST.RU”</span>
                        </div>
                        <div className="header_item authorize">
                           {/*<Balance />*/}
                            <Avatar />
                        </div>
                    </div>
                </div>
            </header>
            <div className="information">
                <div className="center">
                    <p>
                        Работаем только на качество, выполняем постоянные обновления и улучшения функционала всего
                        списка программ. По всем вопросам <a href="mailto:support@apihost.ru">пишите нам</a>
                    </p>
                </div>
            </div>
        </>
    );
};
