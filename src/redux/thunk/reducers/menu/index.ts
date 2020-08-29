/**
 * 导航菜单相关
 **/

import { menuAction } from "../../../saga/actions/menu";
import { recursiveMenu } from "./utils";
import LocalStore from "../../../../utils/LocalStore";
import {IMenu} from "./menu";

const initialStateSetter: IMenu = {
    breadcrumb: {},
    topMenu: [],
    sideMenu: {},
    currentSidebar: [],
    currentTopMenu: null,

    theme: LocalStore.get('theme') || 'dark',
    drawer: false,
    primary: LocalStore.get('primary') || '#d214a2'
};

export default function (state = initialStateSetter, action: ActionParams) {

    switch (action.type) {
        case menuAction.SET_MENU: {

            const { routes } = action.payload;
            const { topMenu, breadcrumb, sideMenu } = recursiveMenu(routes);

            return {
                ...state,
                breadcrumb,
                topMenu,
                sideMenu
            }
        }

        case menuAction.SET_CURRENT_MENU: {

            return {
                ...state,
                ...action.payload,
                currentSidebar: state.sideMenu[action.payload.currentTopMenu] || []
            };
        }

        case menuAction.SET_DRAWER: {
            return {
                ...state,
                drawer: action.payload
            };
        }

        case menuAction.SET_THEME: {
            return {
                ...state,
                ...action.payload
            };
        }

        default:
            return state;
    }
}
