import './index.scss';
import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {ADMIN_INFO, VOCABULARY} from "../../admin/info";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faShoppingBasket} from '@fortawesome/free-solid-svg-icons'
import {observer} from "mobx-react-lite";
import {routes} from "../../routes";
import {NavLink} from "react-router-dom";
import {Container} from "react-bootstrap";
import {BASKET_ROUTE, HOME_ROUTE, SIGNIN_ROUTE} from "../../utils/constants";
import LangSwitcher from "../LangSwitcher";
import Hamburger from "../Hamburger";
import Drawer from "../Drawer";
import Brand from "../Brand";

const SiteNav = observer(() => {
    const {user, basket} = useContext(Context)
    const {searchPlaceholder, signin, signout} = VOCABULARY[user.lang].auth

    const [showDrawer, setShowDrawer] = useState(false)

    const onClick = () => {
        setShowDrawer(!showDrawer)
    }

    return (
        <Container>
            <nav className={'nav'}>
                <div className="nav_sub">
                    <div>
                        <span className={'nav_desktop nav_sub__country'}>{ADMIN_INFO.country}</span>
                        <span><LangSwitcher/></span>
                    </div>
                    <div>
                        <span className="nav__login pe-3" onClick={() => {
                            showDrawer && onClick()
                        }}>
                            {user.isAuth ?
                                <NavLink to={HOME_ROUTE} onClick={() => user.setAuth(false)}>{signout}</NavLink> :
                                <NavLink to={SIGNIN_ROUTE}>{signin}</NavLink>
                            }
                        </span>
                        <span className={'nav_desktop'}>
                            <a className={'nav_sub__phone'} href={ADMIN_INFO.phone}>{ADMIN_INFO.phone}</a>
                        </span>
                        <span className={'nav_mobile'}>
                            <Hamburger onClick={onClick} active={showDrawer}/>
                        </span>
                    </div>
                </div>
                <hr/>
                <div className="nav_main">
                    <div className="nav_main__desktop nav_desktop">
                        <span className="nav__brand"><Brand link={HOME_ROUTE}/></span>
                        <ul className={'nav_main__links'}>
                            {
                                routes.map(({needAuth, icon, path, name, enable, className, exact}, index) => {
                                    if (icon || !enable || (needAuth && !user.isAuth)) return null;
                                    return <li key={index}>
                                        <NavLink to={path} exact={exact} children={VOCABULARY[user.lang].pages[name]}/>
                                    </li>
                                })
                            }
                        </ul>
                        <div className={'nav__search'}>
                            <input type="search" id="search" placeholder={searchPlaceholder}/>
                            <label htmlFor="search"><FontAwesomeIcon icon={faSearch}/></label>
                        </div>
                        <ul className={'nav_main__icons'}>
                            {
                                routes.map(({needAuth, icon, path, name, enable, className, exact}, index) => {
                                    if (!icon || !enable || (needAuth && !user.isAuth)) return null;
                                    return <li className={'nav__icon'} key={index} onClick={onClick}>
                                        <NavLink to={path} className={className} exact={exact}
                                                 title={VOCABULARY[user.lang].pages[name]}>
                                            {icon}
                                        </NavLink>
                                    </li>
                                })
                            }
                            {
                                <li className={'nav__icon'}>
                                    <NavLink className={'nav__basket'} to={BASKET_ROUTE}
                                             title={VOCABULARY[user.lang].pages.basket}>
                                        {!!basket.quantity && <span>{basket.quantity}</span>}
                                        <FontAwesomeIcon icon={faShoppingBasket}/>
                                    </NavLink>
                                </li>
                            }
                        </ul>
                    </div>
                    <div className="nav_main__mobile nav_mobile">
                        <div className="nav__brand"><Brand link={HOME_ROUTE}/></div>
                        <div className={'nav__search ps-3'}>
                            <input type="search" id="search" placeholder={searchPlaceholder}/>
                            <label htmlFor="search"><FontAwesomeIcon icon={faSearch}/></label>
                        </div>
                        <div className={"ps-3"}><NavLink
                            className={'nav__basket nav__icon'} to={BASKET_ROUTE}
                            title={VOCABULARY[user.lang].pages.basket}>
                            {!!basket.quantity && <span>{basket.quantity}</span>}
                            <FontAwesomeIcon icon={faShoppingBasket}/>
                        </NavLink></div>
                        <Drawer show={showDrawer} onClick={onClick}/>
                    </div>
                </div>
            </nav>
        </Container>
    );
});

export default SiteNav;