/**
 * @func:
 * @author: LiHao
 * @since 2020/8/23 20:15
 **/
import React, { memo, useCallback } from 'react';
import useActions from "../../../hooks/useActions";
import {Badge, Avatar, Dropdown, Menu, message} from "antd";
import {CaretDownOutlined} from '@ant-design/icons';
import { menuAction } from "../../../redux/saga/actions/menu";

interface IProps {

}

const {Item} = Menu;
const UserInfo: React.FC<IProps> = (props) => {

    const actions = useActions({
        setMenu: menuAction.setMenu,
        setDrawer: menuAction.setDrawer
    });

    const handleSystemSettingClick = useCallback(() => {
        actions.setDrawer(true)
    }, [actions]);

    const userMenu = (
        <Menu>
            <Item onClick={() => message.info('你点击了修改密码')}>修改密码</Item>
            <Item onClick={handleSystemSettingClick}>系统设置</Item>
            <Item onClick={() => message.info('你点击了清除缓存')}>清除缓存</Item>
            <Item onClick={() => message.info('你点击了退出登录')}>退出登录</Item>
        </Menu>
    );

    return (
        <div className="user">
            <Badge
                overflowCount={99}
                count={99}
                title="您有99条信息"
            >
                <Avatar
                    size="small"
                >
                    LH
                </Avatar>
            </Badge>
            <Dropdown
                overlay={userMenu}
                trigger={['hover']}
            >
                <span className="name">
                    超级管理员
                    <CaretDownOutlined/>
                </span>
            </Dropdown>
        </div>
    );
};

export default memo(UserInfo);


