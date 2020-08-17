/**
 * 登录工具函数封装
 * @author LiHao
 * @since 2020-08-16
 * @return 暴露一个对象，里面有对登录状态的操作，
 *         1、登录过后保存登录信息
 *         2、退出登录删除信息
 *         3、获取用户信息
 *         4、获取token和刷新token
 **/
import store from "../redux";
import LocalStore from "./LocalStore";
import { refreshToken } from "../http/user";
import {loginAction} from "../redux/saga/actions/user";

const TokenKey = 'MALL_JWT::token';
const TokenDate = 'MALL_JWT::date';
let isRefreshing = false;

/**
 * 暴露一个对象，里面有对登录状态的操作，
 **/
export default {

    /**
     * 登录过后保存登录信息和token
     */
    saveLoginState(token: string) {
        LocalStore.set(TokenKey, token);

        /**
         * 过期时间处理 24小时过期
         */
        LocalStore.set(TokenDate, new Date().getTime() + 1860000);
    },

    /**
     * 退出登录删除用户信息
     **/
    deleteLoginState() {
        // 1、先从本地存储删除数据
        LocalStore.remove(TokenKey);
        LocalStore.remove(TokenDate);

        // 2、退出登录
        store.dispatch(loginAction.logOut());

        // 3、处理页面路由
        if(window.location.pathname !== '/login') window.location.href = '/login';
    },

    /**
     * 获取用户是否信息
     */
    getUserState() {
        // 1、判断用户是否登录
        const storeState = store.getState().user.isLogin;

        // 2、如果登录了，就返回teue，页面就会去响应这个值，去获取用户信息
        if( storeState ) return true;

        // 3、如果没有登录，就去验证本地的token信息，如果有token，就说明已经登录了，但是状态还是为改变
        const localToken = LocalStore.get(TokenKey);
        if( localToken ) {
            store.dispatch( loginAction.success({
                token: localToken
            }) )
        }

    },

    /**
     * 获取token和刷新token
     * 此方法是获取token/刷新token，就会跟服务器打交道，就会发起请求
     * 说明请求是异步处理的，现在需要让它同步执行，
     */
    async getToken() {
        /**
         * 在这里处理异步逻辑
         * 需求：过期前30分钟刷新
         */
        if( isRefreshing ) return LocalStore.get(TokenKey);

        // 获取过期时间
        // 因为LocalStore获取的值是一个字符串
        const overdue = parseInt(LocalStore.get(TokenDate) || '0', 10);

        // 获取当前时间
        const now = new Date().getTime();

        try {
            // 如果现在的时间小于过期时间
            // 并且大于过期时间 - 约定时间，就应该去刷新token
            if( now < overdue && now > overdue - 1800000 ) {
                isRefreshing = true;

                const res: any = await refreshToken(LocalStore.get(TokenKey) || '');
                const token: string =  res.payload;
                this.saveLoginState( token );
                isRefreshing = false;

                return token;
            }
        } catch (error) {
            return LocalStore.get(TokenKey);
        }
        return LocalStore.get(TokenKey);
    }
}

