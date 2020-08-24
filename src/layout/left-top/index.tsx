/**
 * @func: left-top布局的sider组件
 * @author: LiHao
 * @since 2020/8/23 23:06
 **/
import React, {memo} from 'react';
import {Layout, Menu} from "antd";
import './index.less';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    CodepenOutlined
} from '@ant-design/icons';

interface IProps {
    collapsed: boolean
}

const { Sider } = Layout;
const { Item, SubMenu } = Menu;

const LeftTopSidebar: React.FC<IProps> = (props) => {

    const { collapsed } = props;

    return (
        <Sider
            className="sidebar"
            trigger={null}
            collapsible
            collapsed={collapsed}
        >
            <div className="logo">
                <CodepenOutlined className="logo-icon" />
                <span
                    className="logo-title"
                >
                    xy-mall
                </span>
            </div>
            <Menu
                theme="dark"
                mode="inline"
            >
                <SubMenu
                    title="嗯，我就是subMenu"
                >
                    <Menu.Item key="1" icon={<UserOutlined/>}>
                        nav 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined/>}>
                        nav 2
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined/>}>
                        nav 3
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    title="呵呵，我也是啊"
                >
                    <Menu.Item key="1" icon={<UserOutlined/>}>
                        nav 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined/>}>
                        nav 2
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined/>}>
                        nav 3
                    </Menu.Item>
                </SubMenu><SubMenu
                title="巧了，我也是"
            >
                <Menu.Item key="1" icon={<UserOutlined/>}>
                    nav 1
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined/>}>
                    nav 2
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined/>}>
                    nav 3
                </Menu.Item>
            </SubMenu>

            </Menu>
        </Sider>
    );
};

export default memo(LeftTopSidebar);


