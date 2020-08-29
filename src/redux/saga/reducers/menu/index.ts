/**
 * @func: menu reducer
 * @author: LiHao
 * @since: 2020/8/24 0:16
 **/
import { menuAction } from "../../actions/menu";

const initialStateSetter = {
    menu: []
};

export default (state = initialStateSetter, action: ActionParams ) => {

    console.log("进来了");
    switch (action.type) {

        case menuAction.SET_MENU: {
            return {
                ...state
            }
        }

        default:
            return state;
    }


};
