/**
 *
 **/
import React, {memo, useEffect, useState} from 'react';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import useActions from "../hooks/useActions";
import { RouteConfigComponentProps } from "react-router-config";

import './index.less';
import TopMenu from "./components/top-menu";
import RightMenu from "./components/right-menu";
import LeftTopSidebar from "./left-top";
import { menuAction } from "../redux/saga/actions/menu";

const { Header, Content } = Layout;

interface IProps extends RouteConfigComponentProps{

}

const MallLayout: React.FC<IProps> = (props)  => {

    const { route } = props;
    const [ collapsed, setCollapsed ] = useState(false);
    const actions = useActions({
       setMenu: menuAction.setMenu
    });

    useEffect(() => {
        if ( route ) {
            actions.setMenu({
                routes: route.routes
            });
        }

    }, []);


    const toggle = () => {
        setCollapsed( !collapsed );
    };

    return (
        <Layout className="layout">
            <LeftTopSidebar collapsed={collapsed} />
            <Layout className="layout-header">
                <Header className="layout-header-background">
                    <div className="layout-header-top">
                        <div className="trigger">
                            {
                                React.createElement(
                                    collapsed ?
                                        MenuUnfoldOutlined :
                                        MenuFoldOutlined,
                                    { className: 'trigger', onClick: toggle}
                                    )
                            }
                        </div>
                        <div className="navigate">
                            <TopMenu />
                        </div>
                        <div className="right">
                            <RightMenu />
                        </div>
                    </div>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    )
};

export default memo(MallLayout);
