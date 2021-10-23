import './index.scss';
import React, {useContext} from 'react';
import {Context} from "../../../index";

const ShowCount = () => {
    const {catalog} = useContext(Context)

    const onChange = ({currentTarget: {value}}) => {
        catalog.setPageLimit(+value)
    }

    return (
        <div className={'show-count shadow-wrapper shadow-wrapper_reverse'}>
            <span>Show count &nbsp;</span>
            <select name="pageLimit" id="pageLimit" onChange={onChange}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="50">50</option>
            </select>
        </div>
    );
};

export default ShowCount;