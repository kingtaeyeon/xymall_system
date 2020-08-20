/**
 * 路由鉴权组件
 * @author LiHao
 * @since 2020-08-19 22:30
 **/
import React, { memo } from 'react';

interface IProps {

}

const Auth: React.FC<IProps> = (props) => {
    return (
        <div>
            路由鉴权组件
        </div>
    );
};

export default memo(Auth);
