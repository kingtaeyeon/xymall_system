/**
 * 公共reducer数据 比如 超时提示 公共的接口之类的
 * @author LiHao
 * @since 2020-08-05 12:05
 **/

import { createRoutine, promisifyRoutine } from "redux-saga-routines";
import extendRoutine from "../extendsRoutines";
import NAME_SPACE from "../../../constants/name-space";

// 超市提示  咱们发送请求，如果失败了，会重试请求
// 超时约定的重试次数后（axios二次封装的时候，去做处理），就会触发这个action 就会提示用户请求超时

export const setRetryTip = createRoutine(`NAME_SPACE.COMMON`);
