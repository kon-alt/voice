import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
const defaultFile = require('../assets/images/Kalimba.mp3');

interface IPlayerProps {
    radius:string;
    borderColor: string;
    background: string;
    controlColor:string;
    file?: string;
    horizontal: boolean;
    jumpControls: boolean
}

export const Player = (
    {
        radius,
        borderColor,
        background,
        controlColor,
        file,
        horizontal,
        jumpControls
    }:IPlayerProps
) => {

    return (

        <div className="playerCreater_box">
                <AudioPlayer
                    src={file ?? defaultFile}
                    style={{
                        borderRadius: `${radius}px`,
                        backgroundColor: background,
                        border: `1px solid ${borderColor}`,
                        fill: `${controlColor}`
                    }}
                    layout={horizontal ? 'horizontal-reverse' : 'stacked'}
                    customAdditionalControls={[]}
                    customVolumeControls={[]}
                    showJumpControls={jumpControls}
                />
        </div>
    );
};



