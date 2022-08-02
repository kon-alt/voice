import React from 'react';
import star from '../../../../assets/images/icon/star.svg';

export const Description = () => {
    return (
        <div className="login_item">
            <div className="login_item_box">
                <p className="login_item_box-description">
                    Только Качественные голоса
                </p>
                <h2 className="login_item_box-title">
                    Мы предлагаем больше<br />
                    возможностей для творчества и<br />
                    развития.
                </h2>
                <div className="login_item_box_advantages">
                    <b>NEW</b>
                    <span>Новые голоса, будь в тренде!</span>
                    <b>CLASSIC</b>
                    <span>Классические голоса, которые всегда в теме.</span>
                    <b>TOP</b>
                    <span>Голоса которые выбираете вы</span>
                    <b>TEL</b>
                    <span>Голоса как “из телефонной трубки”</span>
                </div>
                <div className="login_item_box_information">
                    <div className="login_item_box_information_box">
                        <img src={star} alt={'icon'}/>
                    </div>
                    <div className="login_item_box_information_box">
                        <p>
                            В нашей системе вы сможете найти более
                            <b>50 видов разных голосов</b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
