import React from 'react';
import {useNavigate} from 'react-router-dom';
import removeIcon from '../../../assets/images/icon/remove.svg';
import settingsIcon from '../../../assets/images/icon/settings.svg';
import {IContentItemList} from '../store/types';
import {useAppDispatch} from '../../../hooks';
import {deleteContent, getContentById} from '../store/project.slice';

export const ProjectItem = (
    {
        id,
        project_id,
        title,
        created_at,
        status,
        symbols,
        source
    }: IContentItemList
) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleGetBuId = () => dispatch(getContentById({id, navigate}));

    const handleDelete = () => dispatch(deleteContent({id}));

    return (
        <div className="playerHistory_box">
            <div className="playerHistory_block">
                <p className="playerHistory_block-section">RSS Project Title</p>
                <p className="playerHistory_block-in">{title}</p>
            </div>
            <div className="playerHistory_block">
                <p className="playerHistory_block-section">Создан</p>
                <p className="playerHistory_block-in">{created_at}</p>
            </div>
            <div className="playerHistory_block">
                <p className="playerHistory_block-section">Символов</p>
                <p className="playerHistory_block-in">{symbols}</p>
            </div>
            <div className="playerHistory_block">
                <p className="playerHistory_block-section">Статус</p>
                <p className="playerHistory_block-in"
                   style={{color: status ? 'red' : '#62dd82'}}>{status ? 'Не озвучен' : 'Озвучен'}</p>
            </div>
            <div className="playerHistory_block playerHistory_block--button">
                <span className="playerHistory_block-remove" onClick={handleGetBuId}>
                    <img src={settingsIcon} alt={'icon'}/>
                </span>
            </div>
            <div className="playerHistory_block playerHistory_block--button">
                <span className="playerHistory_block-remove" onClick={handleDelete}>
                    <img src={removeIcon} alt={'icon'}/>
                </span>
            </div>
        </div>
    );
};
