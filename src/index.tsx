import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/common.css';
import './styles/custom.css';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {persistStore} from 'redux-persist';
import {transitions, positions, Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import {store} from './store';
import App from './App';

const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_CENTER,
    offset: '100px',
    // you can also just use 'scale'
    transition: transitions.SCALE
};


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const persist = persistStore(store);

root.render(
    <Provider store={store}>
        <PersistGate loading={<></>} persistor={persist}>
            <BrowserRouter>
                <AlertProvider template={AlertTemplate} {...options}>
                    <App/>
                </AlertProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);

