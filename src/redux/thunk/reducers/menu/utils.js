/**
 * @func: 辅助生成导航所需数据的工具函数
 * @author: LiHao
 * @since: 2020/8/24 13:15
 **/

const breadcrumb = {};

/**
 * 抽离逻辑出来
 * 协助recursiveMenu 处理下级路由
 * @Param rootPath 根路径
 **/
export const createMenu = (rootPath, routes, permission) => {

    const menu = [];

    routes.forEach(subMenu => {
        const underMenu = [];
        if (subMenu.routes) {
            subMenu.routes.forEach(under => {

                const basePath = rootPath + subMenu.path;
                // if( permission ) { // 处理权限 }
                if ( under.path ) {
                    breadcrumb[basePath + under.path] = {
                        icon: under.icon,
                        name: under.name
                    };

                    // 处理underMenu
                    underMenu.push({
                        icon: under.icon,
                        name: under.name,
                        path: basePath + under.path
                    });
                }
                if (under.routes) {
                    under.routes.forEach(lastRoute => {
                        if ( lastRoute.path ) {
                            breadcrumb[basePath + under.path + lastRoute.path] = {
                                icon: lastRoute.icon,
                                name: lastRoute.name
                            }
                        }
                    });
                }

                // 还要在这里处理面包屑
                breadcrumb[`${rootPath}${subMenu.path}`] = {
                    name: subMenu.name,
                    icon: subMenu.icon
                }
            });

            if (underMenu.length !== 0) {
                menu.push({
                    icon: subMenu.icon,
                    name: subMenu.name,
                    path: `${rootPath}${subMenu.path}`,
                    routes: underMenu
                })
            }
        } else {
            menu.push({
                name: subMenu.name,
                icon: subMenu.icon,
                path: `${rootPath}${subMenu.path}`
            });

            // 还要在这里处理面包屑
            breadcrumb[`${rootPath}${subMenu.path}`] = {
                name: subMenu.name,
                icon: subMenu.icon
            }
        }
    });

    return menu;
};



/**
 * 处理数据，返回路由所需数据的函数
 * @params: routes ===> 路由对象
 * @params: permissions ===> 后端返回的权限 是一个数组
 **/
export const recursiveMenu = (routers, permissions = []) => {

    const topMenu = [];
    const sideMenu = {};

    routers.forEach(route => {
        const path = route.path;
        topMenu.push({
            name: route.name,
            path: route.path || '',
            icon: route.icon
        });
        if( route.routes ) {
            // 说明应该处理 breadcrumb
            sideMenu[path] = createMenu(path, route.routes);

            breadcrumb[path] = {
                name: route.name,
                icon: route.icon
            };
        }
    });

    return {
        topMenu,
        breadcrumb,
        sideMenu
    }

};

