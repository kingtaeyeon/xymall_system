/**
 * 导航菜单相关
 **/

import { menuAction } from "../../../saga/actions/menu";
import { recursiveMenu } from "./utils.js";

const initialStateSetter: IMenu = {
    breadcrumb: {},
    topMenu: []
};

export default function (state = initialStateSetter, action: ActionParams) {

    switch (action.type) {
        case menuAction.SET_MENU: {

            const { routes } = action.payload;
            const { topMenu, breadcrumb } = recursiveMenu(routes);


            return {
                ...state,
                breadcrumb,
                topMenu
            }
        }

        default:
            return state;
    }
}
