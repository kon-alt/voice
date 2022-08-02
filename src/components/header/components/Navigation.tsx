import React, {useState} from 'react';

interface INavList {
    href: string;
    name:string;
}

const items:INavList[] = [
    {href : 'https://apihost.ru/voice', name: 'Озвучка текста'},
    {href : 'https://apihost.ru/speech-to-text', name: 'Звук в текст'},
    {href : 'https://apihost.ru/record', name: 'Запись голоса'},
    {href : 'https://apihost.ru/tone', name: 'Изменить голос'},
    {href : 'https://apihost.ru/radio', name: 'Онлайн радио'},
    {href : 'https://apihost.ru/textcalc', name: 'нализ текста'},
    {href : 'https://apihost.ru/ip', name: 'Ваш IP'},
    {href : 'https://apihost.ru/youtube-mp3', name: 'YouTube в Mp3'},
    {href : 'https://apihost.ru/oplata-zarubezhnyh-servisov', name: 'Оплата зарубежных сервисов'},
];

export const Navigation = () => {
    const [isDrop, setDrop] = useState<boolean>();
    return (
        <ul>
            <li
                className="header_item-dropdown-show"
                data-attribute="unactive"
                onMouseOver={() => setDrop(true)}
                onMouseOut={() => setDrop(false)}
            >
                <p>
                    Все программы
                    <i className="fas fa-chevron-down" />
                </p>
                {isDrop
                ? (
                        <div className="header_item-dropdown">
                            {items.map((item, index:number) => <a key={`${item.name}-${index}`} href={item.href}>{item.name}</a> )}
                        </div>
                    ): null}

            </li>
            <li><a href="https://apihost.ru/price">Тарифы</a></li>
            <li><a href="https://apihost.ru/info/partnerskaya-programma/">Партнерство</a></li>
            <li><a href="https://apihost.ru/contact">Контакты</a></li>
        </ul>
    );
};
