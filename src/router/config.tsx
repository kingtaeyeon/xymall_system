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
                        icon: '',
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
                                icon: '',
                                path: '/classifyMaintain',
                                routes: [
                                    {
                                        // 3级路由
                                        component: RouterWithSubRouters,
                                        name: '分类维护列表',
                                        icon: '',
                                        path: '/list',
                                        routes: [
                                            {
                                                component: RouterWithSubRouters,
                                                name: '新建分类',
                                                icon: '',
                                                path: '/create',
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                // 2级路由
                                component: RouterWithSubRouters,
                                name: '品牌管理',
                                icon: '',
                                path: '/brand',
                                routes: [
                                    {
                                        // 3级路由
                                        component: RouterWithSubRouters,
                                        name: '品牌管理列表',
                                        icon: 'icon组件',
                                        path: '/list',
                                        routes: [
                                            {
                                                component: RouterWithSubRouters,
                                                name: '新建品牌',
                                                icon: '',
                                                path: '/create',
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {

                        // 1级路由
                        component: RouterWithSubRouters,
                        name: '优惠营销',
                        icon: '',
                        path: '/discountMarket',
                        routes: [
                            {
                                // 2级路由
                                component: RouterWithSubRouters,
                                name: '分类维护',
                                icon: '',
                                path: '/classifyMaintain',
                                routes: [
                                    {
                                        // 3级路由
                                        component: RouterWithSubRouters,
                                        name: '分类维护列表',
                                        icon: '',
                                        path: '/list',
                                        routes: [
                                            {
                                                component: RouterWithSubRouters,
                                                name: '新建分类',
                                                icon: '',
                                                path: '/create',
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                // 2级路由
                                component: RouterWithSubRouters,
                                name: '品牌管理',
                                icon: '',
                                path: '/brand',
                                routes: [
                                    {
                                        // 3级路由
                                        component: RouterWithSubRouters,
                                        name: '品牌管理列表',
                                        icon: 'icon组件',
                                        path: '/list',
                                        routes: [
                                            {
                                                component: RouterWithSubRouters,
                                                name: '新建品牌',
                                                icon: '',
                                                path: '/create',
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {

                        // 1级路由
                        component: RouterWithSubRouters,
                        name: '库存系统',
                        icon: '',
                        path: '/stock',
                        routes: [
                            {
                                // 2级路由
                                component: RouterWithSubRouters,
                                name: '分类维护',
                                icon: '',
                                path: '/classifyMaintain',
                                routes: [
                                    {
                                        // 3级路由
                                        component: RouterWithSubRouters,
                                        name: '分类维护列表',
                                        icon: '',
                                        path: '/list',
                                        routes: [
                                            {
                                                component: RouterWithSubRouters,
                                                name: '新建分类',
                                                icon: '',
                                                path: '/create',
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                // 2级路由
                                component: RouterWithSubRouters,
                                name: '品牌管理',
                                icon: '',
                                path: '/brand',
                                routes: [
                                    {
                                        // 3级路由
                                        component: RouterWithSubRouters,
                                        name: '品牌管理列表',
                                        icon: 'icon组件',
                                        path: '/list',
                                        routes: [
                                            {
                                                component: RouterWithSubRouters,
                                                name: '新建品牌',
                                                icon: '',
                                                path: '/create',
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {

                        // 1级路由
                        component: RouterWithSubRouters,
                        name: '系统管理',
                        icon: '',
                        path: '/system',
                        routes: [
                            {
                                // 2级路由
                                component: RouterWithSubRouters,
                                name: '分类维护',
                                icon: '',
                                path: '/classifyMaintain',
                                routes: [
                                    {
                                        // 3级路由
                                        component: RouterWithSubRouters,
                                        name: '分类维护列表',
                                        icon: '',
                                        path: '/list',
                                        routes: [
                                            {
                                                component: RouterWithSubRouters,
                                                name: '新建分类',
                                                icon: '',
                                                path: '/create',
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                // 2级路由
                                component: RouterWithSubRouters,
                                name: '品牌管理',
                                icon: '',
                                path: '/brand',
                                routes: [
                                    {
                                        // 3级路由
                                        component: RouterWithSubRouters,
                                        name: '品牌管理列表',
                                        icon: 'icon组件',
                                        path: '/list',
                                        routes: [
                                            {
                                                component: RouterWithSubRouters,
                                                name: '新建品牌',
                                                icon: '',
                                                path: '/create',
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
