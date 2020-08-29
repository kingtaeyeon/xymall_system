/**
 * @func: 顶部右侧导航组件
 * @author: LiHao
 * @since  2020-08-21 17:20
 **/
import React, {memo, useCallback, useState} from 'react';
import './index.less'
import PickColor from "../../../components/pick-color";
import UserInfo from "./UserInfo";

interface IProps {

}

// 在线换肤的原理 实际上是借助 window.less这个属性

const ROUTE_BASE_NAME = process.env.PUBLIC_URL || '';
const BASE_NAME = ROUTE_BASE_NAME ? ROUTE_BASE_NAME.replace('/', '') : '';

const OLD_LESS_ID = `less:${BASE_NAME ? BASE_NAME + '-' : ''}color:old`;
const LESS_ID = `less:${BASE_NAME ? BASE_NAME + '-' : ''}color`;
const LESS_URL = `${ROUTE_BASE_NAME}/less.min.js`;

const RightMenu: React.FC<IProps> = (props) => {

    const [ lessLoaded, setLessLoaded ] = useState(false);

    const handleColorChange = useCallback((color) => {
    }, []);

    return (
        <div className="right-menu">
            <PickColor
                themColor={"#ce13a0"}
                onChangeComplete={handleColorChange}
                small
            />
            <div className="language">
                简体中文
            </div>
            <UserInfo />
        </div>
    );
};

export default memo(RightMenu);


