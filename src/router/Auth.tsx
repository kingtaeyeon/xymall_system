/**
 * 路由鉴权组件
 * @author LiHao
 * @since 2020-08-19 22:30
 **/
import React, { memo } from 'react';
import { Alert, Button } from "antd";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import loginUtils from "../utils/loginUtils";
import {renderRoutes, RouteConfigComponentProps} from "react-router-config";

interface IProps extends RouteConfigComponentProps {}

/**
 * 路由鉴权需要做的事情：
 * 1、要处理全局的提示信息，比如：断网 或者服务器崩了
 * 2、有收集权限码，分发给redux，根据用户信息，来匹配他所拥有的权限，然后显示他能看到的东西。
 *    这个是属于路由层面的鉴权，也就是所谓的粗粒度鉴权
 * 3、判断路由，因为有些情况，可能token过期了，但是可能意外因素导致用户还是能访问这个页面，
 *    那么在用户对页面进行操作的时候，或者页面进行切换的时候，就需要判断这个用户是否登录，
 *    而决定是否登录的因素是token是否有效
 */

const Auth: React.FC<IProps> = (props) => {

    // TODO 为什么这个文件 初始化的时候会执行两次？

    const { retryTip } = useSelector((state: IState) => state.common);
    const { route, location } = props;
    const isLogin = loginUtils.getUserState();
    console.log("retryTip", retryTip);

    /**
     * 如果有些项目是需要登录过后，在路由鉴权这里去请求用户信息的，那么
     * useEffect(() => {
     *      异步处理，请求数据
     *      发起action
     * }, [ isLogin ])
     */
    const GlobalTip = (
        retryTip
            ?
            <Alert
                className="global-tip"
                type="error"
                message={(
                    <p>
                        请求数据多次超时，可能会影响到后续操作，请检查网络后
                        <Button
                            type="link"
                            onClick={() => window.location.reload()}
                        >
                            刷新页面
                        </Button>
                        !!!
                    </p>
                )}
                showIcon={ false }
                banner
                closable
            />
            :
            null
    );

    /**
     * 需要处理 判断路由
     * 如果没有登录，且不在登录页
     */
    // if( !isLogin && location.pathname !== '/login' ) return <Redirect to='/login' />;

    /**
     * 如果已经登录，还在登录页面
     */
    if( isLogin && location.pathname === '/login' ) return <Redirect to='/' />;

    /**
     * 在这里判断权限
     */
    // if( permission.length === 0 && isLogin ) return (
    //     <>
    //         { GlobalTip }
    //
    //          <Spin className="spin-center" />
    //     </>
    // )


    return (
        <>
            { GlobalTip }
            {
                route && route.routes && renderRoutes(route.routes)
            }
        </>
    );
};

export default memo(Auth);
