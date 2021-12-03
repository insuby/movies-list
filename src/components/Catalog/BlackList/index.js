import './index.scss'
import React, {useContext} from 'react';
import {Context} from '../../../index';
import {observer} from 'mobx-react-lite';

const RemovedMovies = observer(() => {
    const {catalog} = useContext(Context)

    const onClick = ({currentTarget: {id}}) => {
        catalog.returnFromBlackList(+id)
    }

    return (
        <div className={'black-list'}>
            <ul className={'shadow-wrapper'}>
                {catalog.blackList.length ?
                 catalog.blackList.map(({title, id}, index) => {
                     return <li key={id} id={id} onClick={onClick}
                                title={'click to remove from the black list'}>
                         <span>{index + 1}</span>
                         <span className={'black-list__title strokes-count-2'}>{title}</span>
                     </li>
                 }) : <li>Black list is empty</li>}
            </ul>
        </div>
    );
});

export default RemovedMovies;
