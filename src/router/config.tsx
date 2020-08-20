import Auth from "./Auth";
import Dashboard from "../pages/dashborad";

export default [
    {
        // 顶级路由
        component: Auth,
        name: '工作台',
        icon: 'icon组件',
        path: '',
        router: [
            {
                // 1级路由
                component: Dashboard,
                name: '工作台',
                icon: 'icon组件',
                path: '/dashboard',
            },
            {
                // 1级路由
                component: '二级组件',
                name: '产品管理',
                icon: 'icon组件',
                path: '',
                router: [
                    {
                        // 2级路由
                        component: '三级组件',
                        name: '分类管理',
                        icon: 'icon组件',
                        path: '',
                        router: [
                            {
                                // 3级路由
                                component: '四级组件',
                                name: '分类管理列表',
                                icon: 'icon组件',
                                path: '/list/create',
                                router: [
                                    {

                                    }
                                ]
                            }
                        ]
                    }
                ]
            }


        ]
    }
]
