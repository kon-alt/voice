import React from 'react';
import {MainLayout} from '../../layouts';
import {Header} from '../../components/header';
import {Footer} from '../../components/footer';
import {useAppSelector} from '../../hooks';
import {Loader} from '../../components';
import {ProjectItem} from './components';

export const ProjectPage = () => {
    const { loader, contentList} = useAppSelector(state => state.project);
    return (
        <MainLayout
            header={<Header/>}
            content={
                <div className="playerHistory">
                    {loader && <Loader />}
                    <div className="playerHistory_center">
                        <p className="playerHistory-text">
                            Работает с любым сайтом
                        </p>
                        <h2 className="playerHistory-title">
                            Голосовая озвучка сайта
                        </h2>

                        <div className="playerHistory_row">
                            <div className="playerHistory_item_full">
                                <p className="playerHistory_item-sectionTitle">
                                    Контент
                                </p>
                                {contentList.map(i => (
                                    <ProjectItem
                                        key={i.id}
                                        project_id={i.project_id}
                                        id={i.id}
                                        source={i.source}
                                        status={i.status}
                                        title={i.title}
                                        symbols={i.symbols}
                                        created_at={i.created_at.split('T')[0]}
                                    />
                                )) }
                            </div>
                        </div>
                    </div>
                </div>
            }
            footer={<Footer/>} />
    );
};
