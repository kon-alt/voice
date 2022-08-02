import React from 'react';
import { useNavigate} from 'react-router-dom';
import settingsIcon from '../../../assets/images/icon/settings.svg';
import {  IProjectListItem} from '../../projects/store/types';
import detailIcon from '../../../assets/images/icon/p2.svg';
import removeIcon from '../../../assets/images/icon/remove.svg';
import {useAppDispatch} from '../../../hooks';
import {getContentByProjectId, getProjectById, projectDelete} from '../../projects/store/project.slice';

export const ProjectItem = ({id, name, created_at}:IProjectListItem) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleJumpEditProject = () => {
        dispatch(getProjectById({id, navigate}));
    };

    const handleGetContent = () => {
        dispatch(getContentByProjectId({ id, navigate}));
    };

    const handleDelete = () => {
        dispatch(projectDelete({id}));
    };

    return (
        <div className="playerHistory_box">
            <div className="playerHistory_block">
                <p className="playerHistory_block-section">Создан</p>
                <span className="playerHistory_block-in">{created_at}</span>
            </div>
            <div className="playerHistory_block">
                <p className="playerHistory_block-section">Домен</p>
                <span className="playerHistory_block-in">{name}</span>
            </div>
            <div className="playerHistory_block">
                <span className="playerHistory_block-button">
                    Копировать JS
                </span>
            </div>
            <div className="playerHistory_block playerHistory_block--button">
                <span onClick={handleJumpEditProject} className="playerHistory_block-remove">
                    <img src={settingsIcon} alt={'icon'}/>
                </span>
            </div>
            <div className="playerHistory_block playerHistory_block--button">
                <span onClick={handleGetContent} className="playerHistory_block-remove">
                    <img src={detailIcon} alt={'icon'}/>
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
