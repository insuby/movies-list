import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import Layout from "./Layout";

export const Context = createContext(null)

ReactDOM.render(
    <React.StrictMode>
        <Layout/>
    </React.StrictMode>,
    document.getElementById('root')
);