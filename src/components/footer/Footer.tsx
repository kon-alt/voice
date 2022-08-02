import React from 'react';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="center">
                <div className="footer_row">
                    <div className="footer_item">
                        <p className="footer_logo">
                            <img src="https://apihost.ru/images/logo-header.png" alt="APIHOST.RU"
                                 srcSet="https://apihost.ru/images/logo-header@2x.png 2x, https://apihost.ru/images/logo-header@3x.png 3x"/>
                        </p>
                    </div>
                    <div className="footer_item">
                        <a href="https://apihost.ru/voice">Озвучка текста</a>
                        <a href="https://apihost.ru/speech-to-text">Звук в текст</a>
                        <a href="https://apihost.ru/record">Запись голоса</a>
                        <a href="https://apihost.ru/tone">Изменение голоса</a>
                        <a href="https://apihost.ru/radio">Онлайн радио</a>
                    </div>
                    <div className="footer_item">
                        <a href="https://apihost.ru/textcalc">Анализ текста</a>
                        <a href="https://apihost.ru/ip">Ваш IP</a>
                        <p>YouTube в Mp3</p>
                        <a href="https://apihost.ru/info/api-text-to-speech/">API</a>
                        <a href="https://apihost.ru/terms">Пользовательское соглашение</a>
                    </div>
                    <div className="footer_item">
                        <a href="https://apihost.ru/info/information/">Новости и Акции</a>
                        <a href="https://apihost.ru/price/">Тарифы</a>
                        <a href="https://apihost.ru/info/partnerskaya-programma/">Партнерство</a>
                        <a href="https://apihost.ru/contact">Контакты</a>
                    </div>
                    <div className="footer_item">
                        <div className="footer_network">
                            <a href="https://vk.com/apihost.official">
                                <img src="https://apihost.ru/images/icon/vk.svg"
                                     alt=""/>
                            </a>
                            <a href="https://www.youtube.com/channel/UCZY2aOrh0zWvJYrUwqa8PQQ">
                                <img src="https://apihost.ru/images/icon/youtube.svg" alt=""/>
                            </a>
                            <a href="https://www.facebook.com/SpeechToTextOnline/">
                                <img src="https://apihost.ru/images/icon/facebook.svg" alt=""/>
                            </a>
                            <a href="https://api.whatsapp.com/send?phone=79261960788">
                                <img src="https://apihost.ru/images/icon/whatsapp.svg" alt=""/>
                            </a>
                            <a href="https://t.me/apihost">
                                <img src="https://apihost.ru/images/icon/telegram.svg" alt=""/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="copyright">
                <div className="center">
                    <div className="copyright_row">
                        <div className="copyright_item">
                            <p>“APIHOST.RU”</p>
                            <p>Все права защищены</p>
                        </div>
                        <div className="copyright_item">
                            <p>Copyright @2021</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
