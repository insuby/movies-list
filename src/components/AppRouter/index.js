import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {routes} from "../../routes";
import {CATALOG_ROUTE} from "../../utils/constants";

const AppRouter = () => {
    return (
        <Switch>
            {routes.map(({path, comp}, index) =>
                <Route key={index} path={path} component={comp} exact/>
            )}
            <Redirect to={CATALOG_ROUTE}/>
        </Switch>
    );
};

export default AppRouter;