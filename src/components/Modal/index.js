import './index.scss';
import React, {useContext} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const Modal = observer(({children}) => {
    const {modal} = useContext(Context)

    return (
        <div className={`modal ${modal.show ? 'show' : ''}`}>
            <div className={"modal__container"}>
                {children}
            </div>
        </div>
    );
});

export default Modal;