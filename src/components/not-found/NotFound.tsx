/**
 * @func: 404页面
 * @author: LiHao
 * @since 2020/8/30 23:47
 **/
import React, {memo} from 'react';

interface IProps {

}

const NotFound: React.FC<IProps> = (props) => {
    return (
        <div>
            哎呀，你要的页面不见啦~
        </div>
    );
};

export default memo(NotFound);


