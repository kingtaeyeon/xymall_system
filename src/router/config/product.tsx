/**
 * @func:
 * @author: LiHao
 * @since 2020/8/26 0:43
 **/
import React from "react";
import RouterWithSubRouters from "../routerWithSubRouters";
import {
    ClusterOutlined,
    CrownOutlined,
    UnorderedListOutlined,
    ColumnHeightOutlined,
    RedEnvelopeOutlined,
    PullRequestOutlined
} from '@ant-design/icons';

const product: any[] = [
    {
        // 2级路由
        component: RouterWithSubRouters,
        name: '分类维护',
        icon: <ClusterOutlined />,
        path: '/classify_maintain'
    },
    {
        // 2级路由
        component: RouterWithSubRouters,
        name: '品牌管理',
        icon: <CrownOutlined />,
        path: '/brand'
    },
    {
        // 2级路由
        component: RouterWithSubRouters,
        name: '平台属性',
        icon: <CrownOutlined />,
        path: '/platform',
        routes: [
            {
                // 3级路由
                component: RouterWithSubRouters,
                name: '属性分组',
                icon: <UnorderedListOutlined />,
                path: '/property'
            },
            {
                // 3级路由
                component: RouterWithSubRouters,
                name: '规格参数',
                icon: <ColumnHeightOutlined />,
                path: '/specifications'
            },
            {
                // 3级路由
                component: RouterWithSubRouters,
                name: '销售属性',
                icon: <RedEnvelopeOutlined />,
                path: '/sales'
            }
        ]
    },
    {
        // 2级路由
        component: RouterWithSubRouters,
        name: '商品维护',
        icon: <PullRequestOutlined />,
        path: '/product_maintain',
        routes: [
            {
                // 3级路由
                component: RouterWithSubRouters,
                name: 'spu管理',
                icon: <UnorderedListOutlined />,
                path: '/spu'
            },
            {
                // 3级路由
                component: RouterWithSubRouters,
                name: '发布商品',
                icon: <ColumnHeightOutlined />,
                path: '/releaseProduct'
            },
            {
                // 3级路由
                component: RouterWithSubRouters,
                name: '商品管理',
                icon: <RedEnvelopeOutlined />,
                path: '/product_manage'
            }
        ]
    }
];

export default product;




