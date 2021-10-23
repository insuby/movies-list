import React from 'react';
import './index.scss'

const Hamburger = ({onClick, active}) => {
    return (
        <span className={'hamburger hamburger--spin ' + (active ? 'is-active' : '')} onClick={onClick}>
            <span className={"hamburger-box"}>
                <span className={"hamburger-inner"}/>
            </span>
        </span>
    );
};

export default Hamburger;