/**
 * 基于axios二次封装
 * @author LiHao
 * @Since 2020-08-12
 **/
import AxiosInstance, { AxiosStatic, AxiosPromise, AxiosError, AxiosRequestConfig } from "axios";
import { message, notification } from "antd";
import { setRetryTip } from "../redux/saga/actions/common";
import store from "../redux";

// 定义一个请求的参数类型声明
type requestFn = (url: string, params?: object, data?: object | null) => AxiosPromise;

class Http {

    /**
     * 说明一下为什么要用 AxiosInstance 而不用 axios.create()这种方式
     * 可能将来此项目要拓展，需要请求另一个网站的数据
     * 那么就有一个问题，axios.create() 创建的对象，baseUrl有且只有一个，也就是说只可以制定一个
     * 比如指定了百度的 就不能指定腾讯的 指定了也不起作用
     * AxiosInstance 就是为了解决这个问题
     **/

    /**
     * 请求对象
     **/
    private axios: AxiosStatic = AxiosInstance;

    /**
     * 请求失败时的 重试请求的间隔时间
     **/
    private retryDelay: number = 1000;

    /**
     * 重试的次数
     * 一般来说，生产环境10次，开发环境4次（但也不是绝对，很具实际需要）
     **/
    private retry: number = Number(process.env.REACT_APP_API_URL || 4);

    constructor() {
        const { axios } = this;
        axios.defaults.timeout = 10000;
        axios.defaults.baseURL = process.env.REACT_APP_API_URL;
        axios.defaults.headers = {
            "Content-type": 'application/json;charset=UTF-8'
        }

        /**
         * 去执行 请求拦截器 和 响应拦截器
         **/
        this.useInterceptResponse();
        this.useInterceptRequest();
    }

    /**
     * 响应拦截器
     * 稍微复杂一点，因为逻辑涉及到状态码相关的一套东西，还有请求出错，如果进行错误判断，
     **/
    useInterceptResponse() {
        this.axios.interceptors.response.use(
            (res) => {

                /**
                 * 处理逻辑
                 * errorCode, errMsg这个字段，也是后端返回的，有可能是 status，也有可能是success
                 **/
                if( res.data.errorCode === '100500') {
                    message.error('服务器错误，请联系管理员');
                    /**
                     * 还需要跳转到login页面，但先不做处理
                     **/
                }

                /**
                 * token过期了
                 **/
                if( res.data.errorCode === '100501') {
                    message.error('身份信息已过期，请重新登录');
                    /**
                     * 还需要跳转到login页面，但先不做处理
                     **/
                }

                /**
                 * 其他情况
                 **/
                if( res.data.errorCode !== '000000') {
                    message.error(res.data.errMsg);
                }

                return Promise.resolve(res.data);
            },
            (error: AxiosError) => {
                /**
                 * 请求出错，大多可能是服务器问题
                 * 先来多次请求失败的情况
                 **/
                const { config } = error;
                let retryCont = config.headers['axios-retry'] || 0;
                if( retryCont >= this.retry) {
                    /**
                     * 告诉redux 重试次数已超过指定次数，应该修改状态，然后组件里自动感应，变为true后就会提示用户
                     * 提示方式有很多种，可以用notification，也可以用ant-design提供的alert组件
                     */
                    store.dispatch(setRetryTip(true));
                    return Promise.reject(error);
                }
                retryCont += 1;
                const backoff = new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, this.retryDelay || 1);

                });

                /**
                 * 修改重试次数
                 **/
                config.headers['axios-retry'] = retryCont;

                /**
                 * 必须要在error中的config中去显示绑定才会触发执行
                 **/
                return backoff.then(() => {
                    this.axios(config);
                })


            }
        )

    }

    /**
     * 请求拦截器
     **/
    useInterceptRequest() {

        this.axios.interceptors.request.use(
            async (config) =>{

                /**
                 * 这里传进来的config，是我们发出请求的时候，默认的config配置，包括url，method，data...
                 * 因为后面需要网服务器发请求的时候，携带一个token，但是这个token刚开始是不知道的，需要知道过后再配置
                 */

                const newConfig = config;

                /**
                 * 获取token
                 * 登录过后会下发一个token过来，我们就存在本地，用LocalStore存起来
                 * 然后再封装一个获取登录状态的工具函数，在里面去处理token保存和token过期时刷新token的逻辑
                 * 如： const token = loginUtils.getToken()
                 * 也就是说逻辑不应该放在这里处理
                 */
                const token = await 'abc.abs.abv';
                if( token ) newConfig.headers.authtoken = token;

                /**
                 * 如果还有别的需求要处理，就写在这里
                 **/

                return config;
            },
            (error: AxiosError) => Promise.reject(error)
        )
    }

    /**
     * 封装一个底层的公用方法
     */

    /**
     * @param type：请求的方式 GET POST...
     * @param url：请求的地址
     * @param options：请求的参数
     * @param isComplex ---> eg: {a: 1, b: 2} isComplex为true 时会转为 a=1$b=2这种格式
     */
    private fetchData(type: string, url: string, options?: object, isComplex?: boolean) {
        if( isComplex ) {
            return this.axios[type](url, null, options);
        }

        return this.axios[type](url, options);
    }

    /**
     * get请求封装
     * @param url 请求地址
     * @param params 请求参数
     */
    public get: requestFn = (url, params) => {
        /**
         * get 可以不传参数
         **/
        if( !params ) return this.fetchData('get', url);

        /**
         * 因为get请求，很有可能会被缓存，所以需要给它一个随机参数，
         * 实现： 因为params 是已经存在的，我们只需要给它拓展一个随机数的变量即可
         **/
        const newParams = Object.assign(params,{
            [`lh${new Date().getTime()}`]: 1
        });

        return this.fetchData('get', url, {params: newParams});
    };

    /**
     * 因为post put patch delete 逻辑处理都一样，所以直接可以把底层函数封装出来直接调用
     */
    private commonRequest(type: string, url: string, params?: object, data?: object | null ): AxiosPromise {
        /**
         * 合并一下参数
         **/
        let options: object = {
            params,
            data
        };

        if( params && data === undefined) {
            options = {
                data: params
            }
        }

        if (data === null) {
            options = {
                params
            }
        }

        return this.fetchData('get', url, options, true);
    }

    /**
     * 抽离公共逻辑，可能会存在一些问题，在实际运用这个请求时再做处理
     **/

    /**
     * post请求封装
     * @param url 请求地址
     * @param params 请求的url加上参数
     * @param data 请求体body内的数据
     * {a, b}
     */
    public post: requestFn = (url, params, data) => {
        return this.commonRequest('post', url, params, data);
    }

    /**
     * put请求封装
     * @param url 请求地址
     * @param params 请求的url加上参数
     * @param data 请求体body内的数据
     * {a, b}
     */
    public put: requestFn = (url, params, data) => {
        return  this.commonRequest('put', url, params, data);
    };

    /**
     * patch请求封装
     * @param url 请求地址
     * @param params 请求的url加上参数
     * @param data 请求体body内的数据
     * {a, b}
     */
    public patch: requestFn = (url, params, data) => {
        return  this.commonRequest('patch', url, params, data);
    };

    /**
     * delete请求封装
     * @param url 请求地址
     * @param params 请求的url加上参数
     * @param data 请求体body内的数据
     * {a, b}
     */
    public delete: requestFn = (url, params, data) => {
        return  this.commonRequest('delete', url, params, data);
    };
}

export default new Http();
