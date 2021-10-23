import './index.scss';
import React from 'react';
import {Context} from "../index";
import AppRouter from "../components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import CatalogStore from "../store/catalog";
import CommentsStore from "../store/comments";
import LoaderStore from "../store/loader";
import ModalStore from "../store/modal";

const Layout = () => {
    return (
        <Context.Provider value={{
            catalog: new CatalogStore(),
            commentsStore: new CommentsStore(),
            loading: new LoaderStore(),
            modal: new ModalStore(),
        }}>
            <BrowserRouter>
                <header>
                    <nav/>
                </header>
                <main>
                    <div className="container">
                        <AppRouter/>
                    </div>
                </main>
                <footer/>
            </BrowserRouter>
        </Context.Provider>
    );
};

export default Layout;