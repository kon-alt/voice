import React, {useEffect} from 'react';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
import {useAlert} from 'react-alert';
import {useAppDispatch, useAppSelector, useAuth, useRefreshToken} from './hooks';
import {LoginPage} from './pages/auth';
import {HomePage} from './pages/home';
import {ProjectContent, ProjectCreatePage, ProjectPage} from './pages/projects';
import {clearAlert} from './store/app.slice';


const App = () => {
    const alert = useAlert();
    const {alerts} = useAppSelector(state => state.app);
    const dispatch = useAppDispatch();

    useEffect(() => {
        alerts.show && alert.error(alerts.message, {
            type: alerts.type,
            timeout: 0,
            position: 'top center',
            offset: '100px',
            onOpen: () => {
            },
            onClose: () => {
                dispatch(clearAlert());
            }
        });

    }, [alerts, dispatch, alert]);

    return (
        <Routes>
            <Route path={'/login'} element={<LoginPage/>}/>
            <Route path={'/'} element={<PrivateRoutes/>}>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/project'} element={<ProjectPage/>}/>
                <Route path={'/project-create'} element={<ProjectCreatePage/>}/>
                <Route path={'/project-content'} element={<ProjectContent/>}/>
            </Route>
        </Routes>
    );
};

function PrivateRoutes() {
    const {isAuth} = useAuth();
    useRefreshToken();
    return isAuth ? (
        <Outlet/>
    ) : (
        <Navigate to={'/login'}/>
    );
}

export default App;
