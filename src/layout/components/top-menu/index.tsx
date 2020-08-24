/**
 * @func: 顶部导航组件
 * @author: LiHao
 * @since  2020-08-21 16:49
 **/
import React, {memo, useCallback} from 'react';
import { useSelector } from "react-redux";
import { Menu, message } from "antd";

interface IProps {

}

const { Item } = Menu;
const TopMenu: React.FC<IProps> = (props) => {

    const { topMenu } = useSelector((state: IState) => state.menu);

   const handleGoPathClick = useCallback(() => {
        message.success("大哥，你点到我了~");
   }, []);

   // 侧边栏的数据结构
   // const sidebarMenu = {
   //     '/dashborad': [],
   //     '/product': [],
   //     '/discountMarket': [],
   //     '/stock': [],
   //     '/system': []
   // };

    return (
        <div className="top-menu">
            <Menu
                mode="horizontal"
                onClick={handleGoPathClick}
            >
                {
                    topMenu.map((item) => (
                        <Item
                            key={item.path}
                            icon={item.icon}
                        >
                            {
                                item.name
                            }
                        </Item>
                    ))
                }
            </Menu>
        </div>
    );
};

export default memo(TopMenu);


