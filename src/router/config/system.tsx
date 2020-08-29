import RouterWithSubRouters from "../routerWithSubRouters";

/**
 * @func:
 * @author: LiHao
 * @since 2020/8/26 0:46
 **/
const system: any[] = [
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
                path: '/21',
                routes: [
                    {
                        component: RouterWithSubRouters,
                        name: '新建分类',
                        icon: '',
                        path: '/19',
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
        path: '/18',
        routes: [
            {
                // 3级路由
                component: RouterWithSubRouters,
                name: '品牌管理列表',
                icon: '',
                path: '/16',
                routes: [
                    {
                        component: RouterWithSubRouters,
                        name: '新建品牌',
                        icon: '',
                        path: '/17',
                    }
                ]
            }
        ]
    }
];

export default system;


