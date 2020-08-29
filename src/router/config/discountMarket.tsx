import RouterWithSubRouters from "../routerWithSubRouters";

/**
 * @func:
 * @author: LiHao
 * @since 2020/8/26 0:44
 **/
const discountMarket: any[] = [
    {
        // 2级路由
        component: RouterWithSubRouters,
        name: '分类维护',
        icon: '',
        path: '/17',
        routes: [
            {
                // 3级路由
                component: RouterWithSubRouters,
                name: '分类维护列表',
                icon: '',
                path: '/79',
                routes: [
                    {
                        component: RouterWithSubRouters,
                        name: '新建分类',
                        icon: '',
                        path: '/78',
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
        path: '/67',
        routes: [
            {
                // 3级路由
                component: RouterWithSubRouters,
                name: '品牌管理列表',
                icon: '',
                path: '/44',
                routes: [
                    {
                        component: RouterWithSubRouters,
                        name: '新建品牌',
                        icon: '',
                        path: '/45',
                    }
                ]
            }
        ]
    }
];

export default discountMarket;


