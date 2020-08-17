/**
 * 用户信息相关
 * @author LiHao
 * @since 2020-08-05 12:05
 **/
import { createRoutine, promisifyRoutine} from "redux-saga-routines";
import extendRoutine from "../extendsRoutines";
import NAME_SPACE from "../../../constants/name-space";

export const loginAction = extendRoutine(
    createRoutine(`${NAME_SPACE.USER}`),
    [
        {
            type: 'LOG_OUT',
            action: 'logOut'
        }
    ]
);
export const loginActionPromise = promisifyRoutine( loginAction );
