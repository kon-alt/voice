import React from 'react';
import {useAppSelector} from '../../../hooks';
import {ProjectItem} from './ProjectItem';

export const Projects = () => {
    const { projectList} = useAppSelector(state => state.project);
    return (
            <div className="playerHistory_item">
                <p className="playerHistory_item-sectionTitle">
                    {projectList?.length > 0 ? 'Созданные проекты' : 'Создайте свой первый проект'}
                </p>
                {projectList?.map(item => (
                    <ProjectItem key={item.id} id={item.id} name={item.name} created_at={item.created_at.split('T')[0]} />
                ))}
            </div>
    );
};
