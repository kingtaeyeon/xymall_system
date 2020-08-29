import RouterWithSubRouters from "../routerWithSubRouters";

/**
 * @func:
 * @author: LiHao
 * @since 2020/8/26 0:45
 **/
const stock: any[] = [
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
                path: '/15',
                routes: [
                    {
                        component: RouterWithSubRouters,
                        name: '新建分类',
                        icon: '',
                        path: '/14',
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
        path: '/2',
        routes: [
            {
                // 3级路由
                component: RouterWithSubRouters,
                name: '品牌管理列表',
                icon: '',
                path: '/11',
                routes: [
                    {
                        component: RouterWithSubRouters,
                        name: '新建品牌',
                        icon: '',
                        path: '/12',
                    }
                ]
            }
        ]
    }
];

export default stock;


