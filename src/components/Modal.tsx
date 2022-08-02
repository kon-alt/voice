import React from 'react';
import closeIcon from '../assets/images/icon/close.svg';

interface IModalProps {
    isVisible: boolean;
    handleClose: () => void;
    children:JSX.Element
}

export const Modal = (
    {isVisible, children, handleClose}:IModalProps
) => {
    return isVisible ? (
            <div className="modal_pay" style={{display: 'block'}}>
                <div className={'modal-overlay'} onClick={handleClose}/>
                <div className="modal_pay_row modal-content">
                    <img src={closeIcon} className="modal_pay-close" onClick={handleClose} alt={'icon'}/>
                    {children}
                </div>
            </div>
    ): null;
};
