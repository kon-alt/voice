import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import {ErrorMessage} from '@hookform/error-message';
import {MainLayout} from '../../layouts';
import {Header} from '../../components/header';
import {Footer} from '../../components/footer';
import './styles.css';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getCategory, getLanguage, getVoices} from '../../store/app.slice';
import {Loader, Modal} from '../../components';
import {createProject, getMyProjects} from '../projects/store/project.slice';
import address from '../../assets/images/icon/addres.svg';
import {Projects, Tariffs} from './components';


const schema = yup
    .object({
        name: yup.string().required('Имя обязательно для создания проекта')
    })
    .required();

export const HomePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {voices, languages, categories} = useAppSelector(state => state.app);
    const {loader} = useAppSelector(state => state.project);

    const [isVisible, setVisible] = useState<boolean>(false);

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const submit = handleSubmit((data) => {
        const {name} = data;
        dispatch(createProject({name, navigate}));
        setVisible(false);
    });

    useEffect(() => {
        if (voices.length === 0 && languages.length === 0 && categories.length === 0) {
            dispatch(getCategory());
            dispatch(getVoices());
            dispatch(getLanguage());
        }
        dispatch(getMyProjects());
    }, [voices, categories, languages, dispatch]);

    return (
        <MainLayout
            header={<Header/>}
            content={
                <div className="playerHistory">
                    <div className="playerHistory_center">
                        <p className="playerHistory-text">
                            Работает с любым сайтом
                        </p>
                        <h2 className="playerHistory-title">
                            Голосовая озвучка сайта
                        </h2>
                        <div className="playerHistory_row">
                            <Projects/>
                            <Tariffs/>
                        </div>
                        <span className="playerCreater-generate" onClick={() => setVisible(true)}>Новый проект</span>
                    </div>
                    {loader && <Loader/>}
                    <Modal isVisible={isVisible} handleClose={() => setVisible(!isVisible)}>
                        <>
                            <p className="modal_pay_row-title">
                                <span className="playerCreater-title">Создать новый проект</span>
                                Каждый проект содержит свои настройки<br/>
                                Голос, RSS лента, аналитика итд.
                            </p>
                            <div className="playerCreater_item-form-box">
                         <span>
                              <img src={address} alt={'icon'}/>
                              Url проекта
                          </span>
                                <form>
                                    <label>
                                        <input
                                            {...register('name')}
                                            type="text"
                                            name="name"
                                            className={errors?.name && 'error-input'}
                                            placeholder="https://exemple-site"/>
                                        <ErrorMessage
                                            errors={errors}
                                            name="name"
                                            render={({message}) =>
                                                <p style={{color: 'red', fontSize: '12px'}}>{message}</p>
                                            }/>
                                    </label>
                                    <button className={'modal_pay_row-button'} onClick={submit}>Создать</button>
                                </form>
                            </div>
                        </>
                    </Modal>
                </div>
            }
            footer={<Footer/>}
        />
    );
};
