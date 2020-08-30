/**
 * @func: left-top布局的sider组件
 * @author: LiHao
 * @since 2020/8/23 23:06
 **/
import React, {memo, useCallback, useEffect, useState, useMemo } from 'react';


import {useSelector} from "react-redux";
import {matchPath} from 'react-router-dom';
import {Layout, Menu} from "antd";
import {
    CodepenOutlined
} from '@ant-design/icons';
import classNames from "classnames";
import {IRouteProps} from "../layout";
import {IMenuItem, ISidebarItem} from "../../redux/thunk/reducers/menu/menu";


interface IProps extends IRouteProps{
    collapsed: boolean
}

const { Sider } = Layout;
const { Item, SubMenu } = Menu;

const LeftTopSidebar: React.FC<IProps> = (props) => {

    const { collapsed, history, location: {pathname} } = props;
    const { currentSidebar, currentTopMenu, theme, primaryColor } = useSelector((state: IState) => state.menu);

    //
    const [ keys, setKeys ] = useState<{ currentOpenSubs: string[], currentSideMenu: string }>({
        currentOpenSubs: [],
        currentSideMenu: ''
    });

    const handleMenuItemClick = useCallback(({key}) => {
        // 设置当前选中的selectKeys
        setKeys({
            ...keys,
            currentSideMenu: key
        });

        history.push(key);
    }, [history, keys]);

    // subMenu的展开关闭 监听事件
    const handleSubChange = useCallback((openKeys) => {
        setKeys({
            ...keys,
            currentOpenSubs: openKeys
        })
    }, [keys]);




    useEffect(() => {
        if (
            !keys.currentSideMenu
            || (currentTopMenu && !matchPath(pathname, {path: keys.currentSideMenu}))
        ) {
            let currentSideMenu = '';
            let currentOpenSubs: any[] = [];

            // 当前打开的菜单，默认是第一个
            if (currentSidebar.length !== 0) {
                // 如果当前的第0项有下级路由，就要设置当前展开的subMenu为第0项
                if (currentSidebar[0].routes) {
                    currentOpenSubs = [currentSidebar[0].path];
                    currentSideMenu = currentSidebar[0].routes[0].path;
                } else {
                    currentOpenSubs = [];
                    currentSideMenu = currentSidebar[0].path;
                }
            }

            // 优先匹配2级菜单
            const subMenu = currentSidebar.find((sub: { path: any; }) => {
                const matchedRoute = matchPath(pathname, {
                   path: sub.path
                });

                return !!matchedRoute;
            });

            if( subMenu ) {
                if( subMenu.routes ) {
                    const { routes } = subMenu;
                    currentSideMenu = routes?.[0].path;
                    currentOpenSubs = [ subMenu.path ];

                    // 匹配3级路由
                    const selectSide: any = routes.find((sub: IMenuItem) => {
                        const matchedRoute = matchPath(pathname, {
                            path: sub.path
                        });

                        return !!matchedRoute;
                    });

                    if( selectSide ) {
                        // 判断还有没有4级路由
                        if( selectSide.routes ) {
                            const { routes } = selectSide;
                            currentSideMenu = selectSide.routes?.[0].path;
                            currentOpenSubs = [selectSide.path];

                            // 匹配最后一级路由
                            const lastRoute: any = routes.find((sub: IMenuItem) => {
                                const matchedRoute = matchPath(pathname, {
                                    path: sub.path
                                });

                                return !!matchedRoute;
                            });

                            if( lastRoute ) {
                                currentSideMenu = lastRoute.path;
                            }
                        } else {
                            currentSideMenu = selectSide.path;
                        }
                    }
                } else {
                    currentSideMenu = subMenu.path;
                    currentOpenSubs = [subMenu.path];
                }
            }

            // 匹配出来的路由要和当前路径match 保证万无一失
            // 如果匹配失败，就要重定向
            if( !matchPath(pathname, { path: currentSideMenu }) )  history.push(currentSideMenu);

            setKeys({
                currentOpenSubs,
                currentSideMenu
            })
        }
    }, [currentSidebar, currentTopMenu, history, keys.currentSideMenu, pathname]);

    const style = useMemo(() => ({
        sidebar: {
            boxShadow: `1px 0 6px ${primaryColor}`,
            background: theme === 'light' ? '#fff' : primaryColor,
        },
        logoColor: {
            backgroundColor: theme === 'light' ? '#fff' : primaryColor,
            color: theme === 'light' ? primaryColor : '#fff',
        }
    }), [primaryColor, theme]);

    if (currentSidebar.length === 0) return null;


    return (
        <Sider
            className="sidebar"
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={ style.sidebar }
        >
            <div
                className="logo"
                style={ style.logoColor }
            >
                <CodepenOutlined
                    style={ style.logoColor }
                    className="logo-icon"
                />
                <span
                    className="logo-title"
                    style={style.logoColor}
                >
                    xy-mall
                </span>
            </div>
            <Menu
                theme={theme}
                mode="inline"
                onClick={handleMenuItemClick}
                selectedKeys={[keys.currentSideMenu]}
                openKeys={keys.currentOpenSubs}
                onOpenChange={handleSubChange}
            >
                {
                    currentSidebar.map((menu: ISidebarItem) => {
                        if (menu.routes) {
                            return (
                                <SubMenu
                                    key={menu.path}
                                    title={(<span>{menu.name}</span>)}
                                    icon={menu.icon}
                                >
                                    {
                                        menu.routes.map((menuItem: IMenuItem) => (
                                            <Item
                                                key={menuItem.path}
                                                icon={menuItem.icon}
                                            >
                                                {menuItem.name}
                                            </Item>
                                        ))
                                    }
                                </SubMenu>
                            )
                        } else {
                            return (
                                <Item
                                    key={menu.path}
                                    icon={menu.icon}
                                >
                                    {menu.name}
                                </Item>
                            )
                        }
                    })
                }

            </Menu>
        </Sider>
    );
};

export default memo(LeftTopSidebar);




