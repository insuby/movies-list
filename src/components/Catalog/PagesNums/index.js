import './index.scss';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {useFetch} from "../../../hooks/useFetch";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDoubleLeft, faAngleDoubleRight} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";

const URL = 'https://yts.mx/api/v2/list_movies.json';
const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';
const PAGE_NEIGHBOURS = 1;

const PagesNums = observer(() => {
    const {catalog} = useContext(Context)
    const {request} = useFetch()
    const history = useHistory()

    const [pages, setPages] = useState([])
    const [active, setActive] = useState(1)

    const onClick = ({currentTarget: {textContent}}) => {
        catalog.setPage(+textContent)
        setActive(+textContent)
    }

    const onRightClick = () => {
        catalog.setPage(catalog.page + 1)
        setActive(catalog.page)
    }

    const onLeftClick = () => {
        catalog.setPage(catalog.page - 1)
        setActive(catalog.page)
    }

    const range = (from, to) => {
        let i = from;

        const range = [];
        while (i <= to) {
            range.push(i);
            i += 1;

        }
        return range;
    }

    const calcPages = useCallback(() => {
        const totalNumbers = (PAGE_NEIGHBOURS * 2) + 3;
        const totalBlocks = totalNumbers + 2;

        if (catalog.total > totalBlocks) {
            const startPage = Math.max(2, catalog.page - PAGE_NEIGHBOURS);
            const endPage = Math.min(catalog.total - 1, catalog.page + PAGE_NEIGHBOURS);
            let pages = range(startPage, endPage);

            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (catalog.total - endPage) > 1;
            const spillOffset = totalNumbers - (pages.length + 1);

            switch (true) {
                case (hasLeftSpill && !hasRightSpill): {
                    const extraPages = range(startPage - spillOffset, startPage - 1);
                    pages = [LEFT_PAGE, ...extraPages, ...pages];
                    break;
                }

                case (!hasLeftSpill && hasRightSpill): {
                    const extraPages = range(endPage + 1, endPage + spillOffset);
                    pages = [...pages, ...extraPages, RIGHT_PAGE];
                    break;
                }

                case (hasLeftSpill && hasRightSpill):
                default: {
                    pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                    break;
                }
            }
            return [1, ...pages, catalog.total];
        }
        return range(1, catalog.total);
    }, [catalog.page, catalog.total])

    useEffect(() => {
        setPages(calcPages)
    }, [calcPages])

    useEffect(() => {
        (async () => {
            console.log(history)
            const {
                data: {
                    movies,
                    limit,
                    movie_count
                }
            } = await request({url: `${URL}?limit=${catalog.pageLimit}&page=${catalog.page}`})

            catalog.setList(movies)
            catalog.setTotal(Math.ceil(movie_count / limit))
        })()
    }, [catalog, catalog.page, catalog.pageLimit, request])

    return (
        <div className={'pages-nums'}>
            {pages.map(num => {
                switch (num) {
                    case RIGHT_PAGE:
                        return <button key={RIGHT_PAGE} onClick={onRightClick}>
                            <FontAwesomeIcon icon={faAngleDoubleRight}/>
                        </button>
                    case LEFT_PAGE:
                        return <button key={LEFT_PAGE} onClick={onLeftClick}>
                            <FontAwesomeIcon icon={faAngleDoubleLeft}/>
                        </button>
                    default:
                        return <button className={active === num ? 'active' : null}
                                       key={num} onClick={onClick} children={num}/>
                }
            })}
        </div>
    );
});

export default PagesNums;