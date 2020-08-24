/**
 * sagaReducer 的集合和导出
 * @author LiHao
 * @since 2020-08-04 21:25
 **/

import common from './common';
import user from "./user";
import menu from './menu';

const sagaReducer = {
    common,
    user,
    menu
};

export default sagaReducer;
