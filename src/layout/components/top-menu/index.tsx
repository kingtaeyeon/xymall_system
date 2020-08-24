/**
 * @func: 顶部导航组件
 * @author: LiHao
 * @since  2020-08-21 16:49
 **/
import React, {memo} from 'react';
import { Menu } from "antd";

interface IProps {

}

const { Item } = Menu;
const TopMenu: React.FC<IProps> = (props) => {
    return (
        <div className="top-menu">
            <Menu
                mode="horizontal"
            >
                <Item>工作台</Item>
                <Item>商品管理</Item>
                <Item>优惠营销</Item>
                <Item>库存系统</Item>
                <Item>系统管理</Item>
            </Menu>
        </div>
    );
};

export default memo(TopMenu);


