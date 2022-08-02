import React, {ChangeEvent, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {  useLocation} from 'react-router-dom';
import _ from 'lodash';
import {MainLayout} from '../../layouts';
import {Header} from '../../components/header';
import {Footer} from '../../components/footer';
import addressIcon from '../../assets/images/icon/addres.svg';
import rssLinkIcon from '../../assets/images/icon/rss-link.svg';
import {Selector} from '../../fields';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {ColorSettings} from '../home/components';
import {Modal, Player} from '../../components';
import {IIntegrationRequest} from './store/types';
import {setProjectName, updateProject, updateProjectName} from './store/project.slice';

const schema = yup
    .object({
        type: yup.string().required(),
        url: yup.string().required(),
        voice: yup.string().required()
    });

export const ProjectCreatePage = () => {
    const location = useLocation();
    const dispatch =useAppDispatch();
    const {voices, languages, categories} = useAppSelector(state => state.app);
    const {data} = useAppSelector(state => state.project);

    const [isEdit, setEdit] = useState<boolean>(false);
    const [radius, setRadius] = useState<string>(data.player.border_radius.toString());
    const [background, setBackground] = useState<string>(data.player.background_color);
    const [border, setBorder] = useState<string>(data.player.border_color);
    const [buttonColor, setButtonColor] = useState<string>(data.player.main_color);

    const [isVisible, setVisible] = useState<boolean>(false);

    const voiceItems = voices.map(i => i.voice);
    const languageItems = languages.map(i => i.language);
    const categoriesItems = categories.map(i => i.title);
    const defaultVoice = voices.filter(i => i.voice_name === data.integration.voice).map(i => i.voice)[0];
    const defaultType = categories.filter(i => i.id === data.integration.type).map(i => i.title)[0];

    const {register, handleSubmit, setValue, formState: {errors, isDirty, isValid} } = useForm({
        resolver: yupResolver(schema),
        defaultValues : {
            url: data.integration.url,
            voice: defaultVoice,
            type: defaultType
        }
    });

    useEffect(() => {
        const isEdit = location.search;
        setEdit(!!isEdit);
    }, [setEdit, location]);

    const handleGetCodePlayer = () => {
        setVisible(true);
    };

    const submitUpdate = handleSubmit(values => {
        const req:IIntegrationRequest = {
            project_id: data.integration.project_id,
            integration: {
                type: categories.filter(i => i.title === values.type).map(i => i.id)[0],
                voice: voices.filter(i => i.voice === values.voice).map(i => i.voice_name)[0],
                url: values.url
            },
            player: {
                project_id: data.integration.project_id,
                title: '',
                padding: 0,
                border_radius: Number(radius),
                main_color: buttonColor,
                text_color: '#000000',
                title_color: '#000000',
                border_color: border,
                background_color: background,
            }
        };

        dispatch(updateProject({...req}));
    });

    const handleChangeName = (text:string) => {
        dispatch(setProjectName(text));
    };

    return (
        <MainLayout
            header={<Header/>}
            content={
                <div className="playerCreater">
                    <div className="playerCreater_center">
                        <p className="playerCreater-text">
                            Работает с любым сайтом
                        </p>
                        <h2 className="playerCreater-title">
                            Голосовая озвучка сайта
                        </h2>
                        <div className="playerCreater_row">
                            <div className="playerCreater_item">
                                <p className="playerCreater_item-sectionTitle">
                                    Добавление сайта
                                </p>

                                <form className="playerCreater_item-form">
                                    <div className="playerCreater_item-form-label">
                                        <div className="playerCreater_item-form-box">
                                         <span>
                                              <img src={addressIcon} alt={'icon'}/>
                                              Адрес сайта
                                          </span>
                                            <input
                                                type="text"
                                                name="name"
                                                value={data.project?.name}
                                                onChange={(e:ChangeEvent<HTMLInputElement>) => handleChangeName(e.target.value)}
                                            />
                                        </div>

                                        <div className="playerCreater_item-text">
                                            <span>Текст подсказки здесь</span>
                                        </div>
                                    </div>
                                    <div className="playerCreater_item-form-label">
                                        <div className="playerCreater_item-form-box">
                                         <span>
                                             <img src={rssLinkIcon} alt={'icon'}/>
                                             Ссылка на RSS Ленту
                                         </span>
                                            <input
                                                {...register('url')}
                                                type="text"
                                                name="url"
                                                className={errors?.url && 'error-input'}
                                            />
                                        </div>
                                        <div className="playerCreater_item-text">
                                            <span>Текст подсказки здесь</span>
                                        </div>
                                    </div>
                                    <div className="playerCreater_item-form-label">
                                        <Selector
                                            label={'Тип озвучки'}
                                            items={categoriesItems}
                                            defaultValue={defaultType}
                                            error={errors?.type}
                                            name={'type'}
                                            handler={(text) => setValue('type', text)}/>
                                        <div className="playerCreater_item-text">
                                            <span>Текст подсказки здесь</span>
                                        </div>
                                    </div>
                                    <div className="playerCreater_item-form-label">
                                        <Selector
                                            label={'Голос озвучки'}
                                            items={voiceItems}
                                            defaultValue={defaultVoice}
                                            error={errors?.voice}
                                            name={'voice'}
                                            handler={(text) => setValue('voice', text)}/>
                                        <div className="playerCreater_item-text">
                                            <span>Текст подсказки здесь</span>
                                        </div>
                                    </div>

                                    <div className="playerCreater_item-form-label">
                                        <Selector
                                            label={'Язык озвучки'}
                                            items={languageItems}
                                            defaultValue={''}
                                            handler={() => null}/>
                                        <div className="playerCreater_item-text">
                                            <span>Текст подсказки здесь</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="playerCreater_item">
                                <p className="playerCreater_item-sectionTitle">
                                    Настройки плеера
                                </p>

                               <Player
                                   radius={radius}
                                   borderColor={border}
                                   controlColor={buttonColor}
                                   background={background}
                                   horizontal={false}
                                   jumpControls={true}
                               />

                                {/*<div className="playerCreater_box">*/}
                                {/*    <p className="playerCreater_box-title">Стиль плеера</p>*/}

                                {/*    <div className="playerCreater_box-type">*/}
                                {/*        <a href="#" className="active">Standart</a>*/}
                                {/*        <a href="#">Minimal</a>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <ColorSettings
                                    background={background}
                                    setBackground={setBackground}
                                    border={border}
                                    setBorder={setBorder}
                                    buttonColor={buttonColor}
                                    setButtonColor={setButtonColor}
                                />
                                <div className="playerCreater_box">
                                    <p className="playerCreater_box-title">Технические настройки</p>

                                    <div className="playerCreater_box-settings">
                                        <p>
                                            <input
                                                type="number"
                                                name="radius"
                                                value={radius}
                                                onChange={(e:ChangeEvent<HTMLInputElement>) => setRadius(e.target.value)}/>
                                            Радиус
                                        </p>
                                        {/*<p>*/}
                                        {/*    <input*/}
                                        {/*        type="text"*/}
                                        {/*        name="volume"*/}
                                        {/*        value={volume}*/}
                                        {/*        onChange={(e:ChangeEvent<HTMLInputElement>) => setVolume(e.target.value)}/>*/}
                                        {/*    Скорость*/}
                                        {/*</p>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'wrapper-button'}>
                            <button
                                type={'button'}
                                className="playerCreater-generate"
                                disabled={!_.isEmpty(errors)}
                                onClick={submitUpdate}>Обновить</button>
                            <button
                                type={'button'}
                                className="playerCreater-generate"
                                onClick={handleGetCodePlayer
                                }>Получить код плеера</button>
                        </div>
                    </div>
                    <Modal isVisible={isVisible} handleClose={() => setVisible(!isVisible)}>
                        <div style={{minHeight: '300px', display: 'flex', alignItems: 'center'}}>
                            <p style={{color: '#ffffff', fontWeight: 'bold'}}>ID: {data.project.id}</p>
                        </div>

                    </Modal>
                </div>
            }
            footer={<Footer/>}
        />
    );
};
