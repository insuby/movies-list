import './index.scss';
import React from 'react';

const Loader = ({load}) => {
    return (
        <div className={`loader__wrapper ${load ? "visible" : ""}`}>
            <div className="loader__container">
                <div className='loader'>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <div/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;