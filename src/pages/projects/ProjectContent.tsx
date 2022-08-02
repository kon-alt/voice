import React from 'react';
import {useNavigate} from 'react-router-dom';
import {MainLayout} from '../../layouts';
import {Header} from '../../components/header';
import {Footer} from '../../components/footer';
import {useAppSelector} from '../../hooks';
import {Player} from '../../components';

export const ProjectContent = () => {
    const navigate = useNavigate();
    const {
        id,
        status,
        symbols,
        source,
        created_at,
        url,
        title,
        m3u8,
        mp3
    } = useAppSelector(state => state.project.content);

    return (
        <MainLayout
            header={<Header/>}
            content={
                <div className="playerCode content-page">
                    <div className="playerCode_center">
                        <p className="playerCode-text">
                            Работает с любым сайтом
                        </p>
                        <h2 className="playerCode-title">
                            Голосовая озвучка сайта
                        </h2>

                        <div className="playerCode_row">
                            <div className="playerCode_item">
                                <p className="playerCode_item-sectionTitle">
                                    Детальная информация
                                </p>

                                <div className="playerCode_item-textarea">
                                    <span className="playerHistory_block-button">
                                        Статистика прослушиваний
                                    </span>
                                    <p className="contentitem-detail">
                                        Дата создания:
                                        <span className="contentitem-value">{created_at.split('T')[0]}</span>
                                    </p>
                                    <p className="contentitem-detail">
                                        ID озвучки:
                                        <span className="contentitem-value">{id}</span>
                                    </p>
                                    <p className="contentitem-detail">
                                        Количество символов:
                                        <span className="contentitem-value">{symbols}</span>
                                    </p>
                                    <p className="contentitem-detail">
                                        Стоимость:
                                        <span className="contentitem-value">12 ₽</span>
                                    </p>

                                    <div className="display_item_voice_result_box">
                                        <p className="display_item_voice_result_box-fileName">
                                            A1utomatic_file_name_generation.wav
                                        </p>
                                        <span className="display_item_voice_result_box-fileDownload"  >
                                            <img src="https://apihost.ru/images/icon/download.svg" alt={'icon'}/>
                                                Скачать файл
                                        </span>
                                        <Player
                                            radius={'0'}
                                            borderColor={'#293039'}
                                            background={'transparent'}
                                            controlColor={'#a4a4a4'}
                                            horizontal={true}
                                            jumpControls={false}
                                        />
                                    </div>


                                    <div className="display_item_voice_parametrs">
                                        <div className="display_item_voice_parametrs_textarea">
                                            <textarea>Текст импортированной статьи из RSS ленты</textarea>
                                            <div className="display_item_voice_parametrs_textarea-box">
                                                <div className="display_item_voice_parametrs_textarea-block">
                                                    <p>
                                                        <span className="change" >изменить</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="display_item_voice_parametrs_controler">
                                        <div className="display_item_voice_parametrs_controler-box">
                                            <button id="next" style={{color: 'rgb(145, 148, 151)', border: 'none!important'}}>
                                                <img id="iconplay" src="https://apihost.ru/images/icon/play_1.svg" alt={'icon'}
                                                     style={{filter: 'contrast(0.1)'}} />
                                                    Переозвучить
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <span className="playerCreater-generate" onClick={() => navigate(-1)}>Назад</span>
                    </div>
                </div>
            }
            footer={<Footer/>}
            />
    );
};
