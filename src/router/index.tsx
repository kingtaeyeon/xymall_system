/**
 *
 **/
import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MallLayout from "../layout";
import Login from "../pages/login";

export default function () {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/"  component={ MallLayout } />
                <Route path="/login"  component={ Login } />
            </Switch>
        </BrowserRouter>
    )
}
