/**
 *
 **/
import React, { memo, useEffect, useState, useCallback } from 'react';
import {Layout, Spin, Drawer, Form, Radio, Button} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import useActions from "../hooks/useActions";
import {renderRoutes, RouteConfigComponentProps} from "react-router-config";
import {useSelector} from "react-redux";

import './index.less';
import TopMenu from "./components/top-menu";
import RightMenu from "./components/right-menu";
import LeftTopSidebar from "./left-top";
import BreadcrumbComponent from "./components/breadcrumb";
import {menuAction} from "../redux/saga/actions/menu";

const {Header, Content} = Layout;
const {Group} = Radio;
const {Item} = Form;

interface IProps extends RouteConfigComponentProps {
}

const MallLayout: React.FC<IProps> = (props) => {

    const {route, history, location} = props;
    const {topMenu, currentSidebar, theme, drawer, primary} = useSelector((state: IState) => state.menu);
    const [collapsed, setCollapsed] = useState(false);
    const actions = useActions({
        setMenu: menuAction.setMenu,
        setDrawer: menuAction.setDrawer,
        setTheme: menuAction.setTheme
    });

    const handleSettingClick = useCallback((values)  => {
        console.log(values);
        actions.setTheme(values);
    }, [actions]);


    useEffect(() => {

        if (route) {
            actions.setMenu({
                routes: route.routes
            });
        }
        console.log('11', renderRoutes(route?.routes));
    }, [actions, route]);

    if (topMenu.length === 0) return <Spin/>;

    const handleDrawerClose = () => {
        actions.setDrawer(false);
    };


    const toggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout className="layout">
            <LeftTopSidebar
                collapsed={collapsed}
                history={history}
                location={location}
            />
            <Layout className="layout-header">
                <Header className="layout-header-background">
                    <div className="layout-header-top">
                        {
                            currentSidebar.length !== 0
                            &&
                            <div className="trigger">
                                {
                                    React.createElement(
                                        collapsed ?
                                            MenuUnfoldOutlined :
                                            MenuFoldOutlined,
                                        {className: 'trigger', onClick: toggle}
                                    )
                                }
                            </div>
                        }
                        <div className="navigate">
                            <TopMenu
                                history={history}
                                location={location}
                            />
                        </div>
                        <div className="right">
                            <RightMenu/>
                        </div>
                    </div>
                    <Drawer
                        width={360}
                        visible={drawer}
                        onClose={ handleDrawerClose}
                    >
                        <Form
                            onFinish={handleSettingClick}
                            initialValues={{
                               theme
                            }}
                        >
                            <Item
                                label="导航主题"
                                name="theme"
                            >
                                <Group value={theme}>
                                    <Radio value="dark">dark-暗色系</Radio>
                                    <Radio value="light">light-亮色系</Radio>
                                </Group>
                            </Item>
                            <Item>
                                <Button
                                    htmlType="submit"
                                    style={{
                                        marginRight: "20px"
                                    }}
                                >
                                    恢复系统设置
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                >
                                    保存
                                </Button>
                            </Item>
                        </Form>
                    </Drawer>
                </Header>
                <Content
                    className="layout-content"
                >
                    <BreadcrumbComponent history={history} location={location}/>
                    {
                        renderRoutes(route?.routes)
                    }
                </Content>
            </Layout>
        </Layout>
    );
};

export default memo(MallLayout);
