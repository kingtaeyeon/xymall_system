/**
 * 此文件只接受两个reducer  1个是sagaReducer  1个是thunkReducer
 * @author LiHao
 * @since 2020-08-04 22:02
 **/

import { combineReducers } from "redux";
import { History } from "history";
import  sagaReducer from './saga/reducers';
import thunkReducer from "./thunk/reducers";
import {connectRouter} from "connected-react-router";

// combineReducers接受一个对象，对象里面是一个一个的reducer
// const obj = {a: 1, b: 2}
const rootReducer = (history: History) => (
    combineReducers({
        router: connectRouter(history),
        ...sagaReducer,
        ...thunkReducer
    })
);

export default rootReducer;

