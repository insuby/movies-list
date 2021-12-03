import './index.scss';
import React from 'react';
import {Context} from "../index";
import AppRouter from "../components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {Container} from "react-bootstrap";
import SiteNav from "../components/SiteNav";
import Footer from "./Footer";
import CatalogStore from "../store/catalog";
import CommentsStore from "../store/comments";
import LoaderStore from "../store/loader";
import ModalStore from "../store/modal";

const Layout = () => {
    return (
        <Context.Provider value={{
            catalog: new CatalogStore(),
            commentsStore: new CommentsStore(),
           loader: new LoaderStore(),
            modal: new ModalStore(),
        }}>
            <BrowserRouter>
                <header>
                    <SiteNav/>
                </header>
                <main>
                    <Container>
                        <AppRouter/>
                    </Container>
                </main>
                <footer>
                    <Footer/>
                </footer>
                <Loader/>
                <Modal/>
            </BrowserRouter>
        </Context.Provider>
    );
};

export default Layout;
