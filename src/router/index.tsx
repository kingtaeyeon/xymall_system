/**
 * @author: LiHao
 * @since 2020-08-19 22:38
 **/
import React from 'react';
import { BrowserRouter} from "react-router-dom";
import { renderRoutes } from "react-router-config";
import config from "./config";

const routes =  (
    <BrowserRouter>
        {
            renderRoutes( config )
        }
    </BrowserRouter>
);

export default routes;
