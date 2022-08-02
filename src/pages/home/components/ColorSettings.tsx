import React, {ChangeEvent} from 'react';

interface IColorSettingsProps {
    background: string;
    setBackground: (color:string) => void;
    border:string;
    setBorder: (color:string) => void;
    buttonColor: string;
    setButtonColor: (color:string) => void;
}

export const ColorSettings = (
    {
        background,
        setBackground,
        border,
        setBorder,
        buttonColor,
        setButtonColor
    }:IColorSettingsProps
) => {
    return (
        <div className="playerCreater_box">
            <p className="playerCreater_box-title">Цветовые настройки</p>

            <div className="playerCreater_box-color">
                <p>
                    <input
                        type="color"
                        name="background"
                        value={background}
                        style={{backgroundColor: background}}
                        onChange={(e:ChangeEvent<HTMLInputElement>) => setBackground(e.target.value)}
                    />
                    Фон
                </p>
                {/*<p>*/}
                {/*    <input type="color" name=""/>*/}
                {/*    Текст*/}
                {/*</p>*/}
                <p>
                    <input
                        type="color"
                        name="buttons"
                        value={buttonColor}
                        style={{backgroundColor: buttonColor}}
                        onChange={(e:ChangeEvent<HTMLInputElement>) => setButtonColor(e.target.value)}
                    />
                    Кнопки
                </p>
                <p>
                    <input
                        type="color"
                        name="border"
                        value={border}
                        style={{backgroundColor: border}}
                        onChange={(e:ChangeEvent<HTMLInputElement>) => setBorder(e.target.value)}
                    />
                    Контур
                </p>
            </div>
        </div>
    );
};
