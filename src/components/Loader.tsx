import React from 'react';
import {Circles} from 'react-loader-spinner';

export const Loader = () => {
    return (
        <div className={'app-loader-wrapper'}>
            <div className={'app-loader'}>
                <Circles color="red" height={40} width={40}/>
            </div>
        </div>
    );
};

