import React, {useState} from 'react';
import langIcon from '../assets/images/icon/lang.svg';
import dropDownIcon from '../assets/images/icon/droper.svg';

interface ISelector {
    label:string;
    items: string[];
    handler: (item: string) => void;
    defaultValue: string;
    error?: any;
    name?: string
}


export const Selector = ({label, items, handler, defaultValue, error}: ISelector) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [isSelected, setSelected] = useState<string>(defaultValue);

    const handleSelect = (item:string) => {
        setSelected(item);
        setOpen(false);
        handler(item);
    };
    return (
        <div className="playerCreater_item-form-box">
            <span>
                <img src={langIcon} alt={'icon'}/>
                {label}
            </span>

            <div className="playerCreater_item-select">
                <input
                    type="text"
                    value={isSelected}
                    className={error ? 'error-input' : ''}
                    readOnly onClick={() => setOpen(!isOpen)}
                />
                <img src={dropDownIcon}
                     className="playerCreater_item-select-icon" alt={'icon'}/>
                { isOpen && (
                        <div className="playerCreater_item-sectionDropdown">
                            {items.map((i:string, index:number) => (
                                <p key={`${i}-${index}`} onClick={() => handleSelect(i)}>{i}</p>
                            ))}
                        </div>
                    ) }
            </div>
        </div>
    );
};
