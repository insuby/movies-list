import './index.scss';
import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExternalLinkAlt, faEyeSlash, faStar} from '@fortawesome/free-solid-svg-icons';
import {Context} from '../../../index';
import {ucFirst} from '../../../utils/helpers';
import {NavLink} from 'react-router-dom';
import {PRODUCT_ROUTE} from '../../../utils/constants';

const Movies = observer(() => {
    const {catalog} = useContext(Context)

    return (
        <div id={'movies'} className={'movies'}>
            {catalog.list.map(({
                                   id, title, rating,
                                   medium_cover_image, url, genres
                               }) => {
                return <div key={id} className={'movie shadow-wrapper'} id={id}>
                    {!!genres && <div className={'movie__genres'}>
                        {genres.map(genre => <span className={'movie__genre'} key={genre + id}>{genre}</span>)}
                    </div>}
                    <a className={'movie__link'} href={url}
                       target={'_blank'} rel='noopener noreferrer' children={null}/>
                    <img className={'movie__img'} src={medium_cover_image} alt={title}/>
                    <div>
                            <span className={'movie__rating'}>
                                {rating}
                                <FontAwesomeIcon icon={faStar}/>
                            </span>
                        <span className={'movie__black-list'}
                              onClick={() => catalog.setToBlackList(id)}>
                                <FontAwesomeIcon icon={faEyeSlash} title={'add to black list'}/>
                            </span>
                    </div>
                    <p className={'movie__name strokes-count-1'} title={title}>{ucFirst(title)}</p>
                    <div className={'movie__btn_wrapper'}>
                        <NavLink to={PRODUCT_ROUTE + '/' + id} className={'btn movie__btn shadow-wrapper'}>
                            <FontAwesomeIcon icon={faExternalLinkAlt}/>
                            show more
                        </NavLink>
                    </div>
                </div>
            })}
        </div>
    );
});

export default Movies;
