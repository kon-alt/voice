import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import {MainLayout} from '../../layouts';
import {Header} from '../../components/header';
import {Footer} from '../../components/footer';
import {useAuth} from '../../hooks';
import {Forms} from './components/forms';
import {Description} from './components/descriptions';

export const LoginPage = () => {
    const { isAuth } = useAuth();

    return !isAuth ? (
        <MainLayout
            header={<Header/>}
            content={
                <div className="login">
                    <div className="center">
                        <div className="login_row">
                            <Description />
                            <Forms />
                        </div>
                    </div>
                </div>
            }
            footer={<Footer/>}
            />
    ): <Navigate to={'/'}/>;
};
