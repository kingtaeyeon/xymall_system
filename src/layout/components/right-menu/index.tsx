/**
 * @func: 顶部右侧导航组件
 * @author: LiHao
 * @since  2020-08-21 17:20
 **/
import React, { memo, useCallback } from 'react';
import './index.less'
import PickColor from "../../../components/pick-color";
import UserInfo from "./UserInfo";

interface IProps {

}

const RightMenu: React.FC<IProps> = (props) => {

    const handleColorChange = useCallback((color) => {
    }, []);

    return (
        <div className="right-menu">
            <PickColor
                themColor={"#ce13a0"}
                onChangeComplete={handleColorChange}
            />
            <div className="language">
                简体中文
            </div>
            <UserInfo />
        </div>
    );
};

export default memo(RightMenu);


