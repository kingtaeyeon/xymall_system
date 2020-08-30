/**
 * @func: 顶部右侧导航组件
 * @author: LiHao
 * @since  2020-08-21 17:20
 **/
import React, {memo, useCallback, useState, useEffect} from 'react';
import useActions from "../../../hooks/useActions";
import {useSelector} from "react-redux";
import {menuAction} from "../../../redux/saga/actions/menu";
import LocalStore from "../../../utils/LocalStore";
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
// 这个 less.win.js 是我们需要创建的，是这个less文件 里面放的是 an-design 的样式表
const LESS_URL = `${ROUTE_BASE_NAME}/less.min.js`;

// 根据相应的路径 添加相应的便签
function loadScript(src: string) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

const RightMenu: React.FC<IProps> = (props) => {

    const [lessLoaded, setLessLoaded] = useState(false);
    const { primaryColor } = useSelector((state: IState) => state.menu);
    const actions = useActions({
       setPrimaryColor: menuAction.setPrimaryColor
    });

    const handleColorChange = useCallback((color) => {

        // 1、通知redux改变颜色
        actions.setPrimaryColor(color);

        const changeColor = () => {
            // @ts-ignore
            window['less'].modifyVars({
                '@primary-color': color
            }).then(() => {
                // 先清除掉这个缓存的样式
                const oldStyle = document.getElementById(OLD_LESS_ID);
                if( oldStyle ) oldStyle.remove();

                // 将生成之后的style标签插入到document的第一个
                const lessColor = document.getElementById(LESS_ID);
                if( !lessColor ) return;

                // 由于每个页面的css也是异步加载的（无论是生产环境，海慧寺开发环境）
                // 所以就会导致样式插入在生成的style标签之后，就导致主题失效
                // 所以要加到body里面的第一个
                document.body.insertBefore(lessColor, document.body.firstChild);
                LocalStore.set('theme-style-content', lessColor.innerHTML);
            });
        };

        if( lessLoaded ) {
            changeColor();
        } else {
            window['less'] = {
                logLevel: 2,
                async: true,
                javascriptEnabled: true,
                modifyVars: {
                 '@primary-color': '#d214a2'
                }
            };
            loadScript(LESS_URL).then(() => {
               setLessLoaded(true);
               changeColor();
            });
        }
    }, [actions, lessLoaded]);

    // 只需要页面首次加载的时候，执行一次就可以了，所以不能添加依赖
    useEffect(() => {
       // 快速生效的办法
        const  themeStyleContent = LocalStore.get('theme-style-content');
        if( themeStyleContent ) {
            const themeStyle = document.createElement('style');
            themeStyle.id = OLD_LESS_ID;
            themeStyle.innerHTML = themeStyleContent;
            document.body.insertBefore(themeStyle, document.body.firstChild);
        }

        // .less文件加载完成之后，就要生成主题，因为localStorage中的数据可能已经过期了
        if( primaryColor ) handleColorChange(primaryColor);
    }, []);

    const themeColor = primaryColor;

    return (
        <div className="right-menu">
            <PickColor
                themColor={themeColor}
                onChangeComplete={handleColorChange}
                small
                type="sketch"
            />
            <div className="language">
                简体中文
            </div>
            <UserInfo />
        </div>
    );
};

export default memo(RightMenu);


