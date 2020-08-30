import React from "react";
import Loadable from 'react-loadable';
import RouterWithSubRouters  from './routerWithSubRouters';
import loadings from "./loadings";
import Auth from "./Auth";
import Login from "../pages/login";
import Dashboard from "../pages/dashborad";
import MallLayout from "../layout";
import {
    ShopOutlined,
    DashboardOutlined,
    GiftOutlined,
    ContainerOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import PageLoading from "../components/page-loading/PageLoading";
import product from "./config/product";
import discountMarket from "./config/discountMarket";
import stock from "./config/stock";
import system from "./config/system";

export default [
    {
        // 顶级路由 是一个单纯的路基组件，没有任何icon name这些和路由导航相关的东西
        // 路由鉴权 不管什么情况 都是需要走这个组件的 都是必须先过这个组件的关卡
        component: Auth,
        routes: [
            {
                // 1级路由
                component: Loadable({
                    loader: () => import('../pages/login'),
                    ...loadings
                }),
                path: '/login',
            },
            {
                // 404
                path: '/404',
                component: Loadable({
                    loader: () => import('../components/not-found/NotFound'),
                    ...loadings
                })
            },
            {
                // 403 暂无权限
                path: '/403',
                component: Loadable({
                    loader: () => import('../components/not-found/NotFound'),
                    ...loadings
                })
            },
            {
                component: MallLayout,
                path: '/',
                routes: [
                    {
                        // 1级路由
                        component: Dashboard,
                        name: '工作台',
                        icon: <DashboardOutlined />,
                        path: '/dashboard',
                    },
                    // 还有404的页面
                    {

                        // 1级路由
                        component: RouterWithSubRouters,
                        name: '商品系统',
                        icon: <ShopOutlined />,
                        path: '/product',
                        routes: product
                    },
                    {

                        // 1级路由
                        component: RouterWithSubRouters,
                        name: '优惠营销',
                        icon: <GiftOutlined />,
                        path: '/discountMarket',
                        routes: discountMarket
                    },
                    {

                        // 1级路由
                        component: RouterWithSubRouters,
                        name: '库存系统',
                        icon: <ContainerOutlined />,
                        path: '/stock',
                        routes: stock
                    },
                    {

                        // 1级路由
                        component: RouterWithSubRouters,
                        name: '系统管理',
                        icon: <SettingOutlined />,
                        path: '/system',
                        routes: system
                    }

                ]
            },


        ]
    }
]
