/**
 * 导航菜单相关
 **/

import { menuAction } from "../../../saga/actions/menu";

const initialStateSetter = {

};

export default function (state = initialStateSetter, action: ActionParams) {

    switch (action.type) {
        case menuAction.SET_MENU: {
            console.log('请求我收到了', action.payload);

            return {
                ...state,
            }
        }

        default:
            return state;
    }
}
