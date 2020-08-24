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

    routes.forEach(subMenu => {
       if( subMenu.routes ) {
           subMenu.routes.forEach(under => {

               const basePath = rootPath + subMenu.path;
               // if( permission ) { // 处理权限 }
               if( under.path ) {
                   breadcrumb[basePath + under.path] = {
                       icon: under.icon,
                       name: under.name
                   }
               }
               if( under.routes ) {
                   under.routes.forEach(lastRoute => {
                      if( lastRoute.path ) {
                          breadcrumb[basePath + under.path + lastRoute.path] = {
                              icon: under.icon,
                              name: under.name
                          }
                      }
                   });
               }

           });
       }
    });

    return {

    }
};



/**
 * 处理数据，返回路由所需数据的函数
 * @params: routes ===> 路由对象
 * @params: permissions ===> 后端返回的权限 是一个数组
 **/
export const recursiveMenu = (routers, permissions = []) => {

    const topMenu = [];
    const setMenu = {};

    routers.forEach(route => {
        const path = route.path;
        topMenu.push({
            name: route.name,
            path: route.path,
            icon: route.icon
        });
        if( route.routes ) {
            // 说明应该处理 breadcrumb
            createMenu(path, route.routes);

            setMenu[path] = route;

            breadcrumb[path] = {
                name: route.name,
                icon: route.icon
            };
            console.log(breadcrumb);
            console.log(setMenu);
        }
    });

    return {
        topMenu,
        breadcrumb
    }

};

