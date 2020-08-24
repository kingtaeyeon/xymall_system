import  RouterWithSubRouters  from './routerWithSubRouters';
import Auth from "./Auth";
import Login from "../pages/login";
import Dashboard from "../pages/dashborad";
import MallLayout from "../layout";


export default [
    {
        // 顶级路由 是一个单纯的路基组件，没有任何icon name这些和路由导航相关的东西
        // 路由鉴权 不管什么情况 都是需要走这个组件的 都是必须先过这个组件的关卡
        component: Auth,
        routes: [
            {
                // 1级路由
                component: Login,
                path: '/login',
            },
            {
                component: MallLayout,
                path: '/',
                routes: [
                    {
                        // 1级路由
                        component: Dashboard,
                        name: '工作台',
                        icon: 'icon组件',
                        path: '/dashboard',
                    },
                    // 还有404的页面
                    {

                        // 1级路由
                        component: RouterWithSubRouters,
                        name: '商品系统',
                        icon: '',
                        path: '/product',
                        routes: [
                            {
                                // 2级路由
                                component: RouterWithSubRouters,
                                name: '分类维护',
                                icon: 'icon组件',
                                path: '/classifyMaintain',
                                routes: [
                                    {
                                        // 3级路由
                                        component: RouterWithSubRouters,
                                        name: '分类管理列表',
                                        icon: 'icon组件',
                                        path: '/list/create',
                                        routes: [
                                            {

                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                // 2级路由
                                component: RouterWithSubRouters,
                                name: '品牌管理',
                                icon: 'icon组件',
                                path: '/',
                                routes: [
                                    {
                                        // 3级路由
                                        component: RouterWithSubRouters,
                                        name: '分类管理列表',
                                        icon: 'icon组件',
                                        path: '/list/create',
                                        routes: [
                                            {

                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },


        ]
    }
]
