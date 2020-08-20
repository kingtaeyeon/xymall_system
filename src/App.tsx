import React from 'react';
import Router from './router';
import { History } from "history";
import { ConnectedRouter } from "connected-react-router";

interface IApp {
    history: History
}

function App({ history }: IApp) {

    console.log("history", history);

    return (
        <ConnectedRouter history={ history }>
            <Router />
        </ConnectedRouter>
    );
}

export default App;
