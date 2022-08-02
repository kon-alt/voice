import React from 'react';
import crownIcon from '../../../assets/images/icon/crown.svg';

export const Tariffs = () => {
    return (
        <div className="playerHistory_item">
            <p className="playerHistory_item-sectionTitle">
                Тарифный план
            </p>

            <div className="playerHistory_plan">
                <img src={crownIcon} alt={'icon'} className="playerHistory_plan-icon" />
                <p className="playerHistory_plan-title">Тариф не подключен</p>
                <span className="playerHistory_plan-description">
                     Для работы системы озвучки сайта, необходимо подключить тарифный план, на данный момент мы создали один простой тарифный план, в дальнейшем предоставим выбор шире
                  </span>
                <span className="playerHistory_plan-button">
                    Выбрать тариф
                    <img src={crownIcon} alt={'icon'} />
                </span>
            </div>
        </div>
    );
};

