import './index.scss';
import React, {useContext} from 'react';
import {Container} from 'react-bootstrap';
import {Context} from '../../index';
import {routes} from '../../routes';
import {NavLink} from 'react-router-dom';
import {ADMIN_INFO, SOCIALS, VOCABULARY} from '../../admin/info';
import {observer} from 'mobx-react-lite';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCcAmazonPay, faCcMastercard, faCcPaypal, faCcVisa,} from '@fortawesome/free-brands-svg-icons';
import {faLocationArrow} from '@fortawesome/free-solid-svg-icons';

const Footer = observer(() => {
    const {user} = useContext(Context)

    return (
        <Container className='footer'>
            <div className='footer__column'>
                <div className='footer__row'>
                    <h2 className='footer__title' children={VOCABULARY[user.lang].footer.support}/>
                    <ul className='footer__list list'>
                        {routes.map(({needAuth, path, name, enable}, index) => {
                            return enable &&
                                <li className='list__item' key={index}>
                                    <NavLink
                                        rel='noreferrer' target='_blank' to={path}
                                        children={VOCABULARY[user.lang].pages[name]}/>
                                </li>
                        })}
                    </ul>
                </div>
                <div className='footer__row'>
                    <h2 className='footer__title' children={VOCABULARY[user.lang].footer.about}/>
                    <ul className='footer__list list'>
                        {routes.map(({needAuth, path, name, enable}, index) => {
                            return enable &&
                                <li className='list__item' key={index}>
                                    <NavLink
                                        rel='noreferrer' target='_blank' to={path}
                                        children={VOCABULARY[user.lang].pages[name]}
                                    />
                                </li>
                        })}
                    </ul>
                </div>
                <div className='footer__row'>
                    <h2 className='footer__title' children={VOCABULARY[user.lang].footer.socials}/>
                    <ul className='footer__social footer__list social'>
                        {SOCIALS.map(({icon, link, name}, index) => {
                            return <li className='social__item' key={index + Math.random()}>
                                <a rel='noopener noreferrer' target='_blank' href={link}
                                   className='social__link' title={name} children={icon}/>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
            <div className='footer__column'>
                <div className='footer__row'>
                    <div className='company'>
                        <address className='company__row company__address'>
                            <span><FontAwesomeIcon icon={faLocationArrow}/></span>
                            <span children={ADMIN_INFO.address[user.lang]}/>
                        </address>
                        <p className='company__row company__name'>© 2021—2021&nbsp;{ADMIN_INFO.companyName}</p>
                        <p className='company__row company__copyright'>{ADMIN_INFO.companyLicense}</p>
                    </div>
                </div>
                <div className='footer__row footer__row_payments'>
                    <div className='footer__payments payments'>
                        <FontAwesomeIcon className='payments__type' icon={faCcVisa} title='Visa'/>
                        <FontAwesomeIcon className='payments__type' icon={faCcMastercard} title='Mastercard'/>
                        <FontAwesomeIcon className='payments__type' icon={faCcPaypal} title='Paypal'/>
                        <FontAwesomeIcon className='payments__type' icon={faCcAmazonPay} title='AmazonPay'/>
                    </div>
                </div>
            </div>
        </Container>
    );
});

export default Footer;