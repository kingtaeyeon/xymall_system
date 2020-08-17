/**
 * 公共reducer数据 比如 超时提示 公共的接口之类的
 * @author LiHao
 * @since 2020-08-05 12:05
 **/
import { setRetryTip } from "../../actions/common";

const initialStateSetter = {
    retryTip: false
};

export default ( state = initialStateSetter, action: ActionParams ) => {

    switch (action.type) {

        // SUCCESS ==> 成功的时候
        // FAILURE ==> 失败的时候
        // TRIGGER ==> 发起请求的时候
        // TRIGGER ==> 发起请求的时候
        // FULFILL ==> 完成的时候
        // REQUEST ==> 一般不在这里使用
        case 'TRIGGER': {
            console.log('收到了请求');
            return {
                ...state,
                retryTip: true
            }
        }

    }

    return state;
};
