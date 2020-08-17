/**
 *
 **/
import React, { memo } from 'react';

interface IProps {

}

const MallLayout: React.FC<IProps> = (props)  => {

    return (
        <div>
            我是布局组件
        </div>
    )
};

export default memo(MallLayout);
