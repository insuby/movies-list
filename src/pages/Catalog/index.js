import './index.scss';
import React, {useContext} from 'react';
import PagesNums from "../../components/Catalog/PagesNums";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import Movies from "../../components/Catalog/Movie";
import BlackList from "../../components/Catalog/BlackList";
import ShowCount from "../../components/Catalog/ShowCount";
import Loader from "../../components/Loader";

const MoviesList = observer(() => {
    const {loading:{load}} = useContext(Context)

    return (
        <div className={'catalog'}>
            <Loader load={load}/>
            <BlackList/>
            <ShowCount/>
            <Movies/>
            <PagesNums/>
        </div>
    );
});

export default MoviesList;