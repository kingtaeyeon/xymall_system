/**
 * @func: 面包屑组件
 * @author: LiHao
 * @since 2020/8/28 13:05
 **/
import React, {memo} from 'react';
import {useSelector} from "react-redux";
import {IRouteProps} from "../../layout";
import { CSSTransition } from 'react-transition-group';
import { LeftOutlined } from '@ant-design/icons';
import { Divider, Breadcrumb } from 'antd';
import {Link} from "react-router-dom";
interface IProps  extends IRouteProps{

}

const { Item } = Breadcrumb;
const BreadcrumbComponent: React.FC<IProps> = (props) => {

    const { breadcrumb, currentSidebar } = useSelector((state:IState) => state.menu );

    if( currentSidebar.length === 0 ) return null;
    const { history, location: { pathname } } = props;

    // 思路： 把pathname拆开 然后一个一个去匹配
    const pathSnippets = pathname.split("/").filter( i => i);
    const isShowBack = pathname.length > 0 && history['length'] > 1;

    return (
        <div className="breadcrumb">
            <CSSTransition
                in={isShowBack}
                timeout={480}
                className={{
                    enter: 'animated fadeInLeft faster',
                    exit: 'aninmted fadeOntLeft faster'

                }}
                unmountOnExit
            >
                <>
                    <LeftOutlined onClick={history['goBack']} />
                    <Divider type="vertical" />
                </>
            </CSSTransition>
            <Breadcrumb>
                {
                    pathSnippets.map((_, i) => {
                        const url = `/${pathSnippets.slice(0, i + 1).join('/')}`;
                        const breadcrumbUrl = breadcrumb[url];

                        return (
                            <Item key={url}>
                                {
                                    i > 1 && i !== pathSnippets.length -1
                                    ? (
                                        <Link to={url}>
                                            <span className="breadcrumb-icon">
                                                {breadcrumbUrl.icon}
                                            </span>
                                            {breadcrumbUrl.name}
                                        </Link>
                                        )
                                        : (
                                            <>
                                                <span className="breadcrumb-icon">
                                                    {breadcrumbUrl.icon}
                                                </span>
                                                {breadcrumbUrl.name}
                                            </>
                                        )
                                }
                            </Item>
                        )
                    })
                }

            </Breadcrumb>
        </div>
    );
};

export default memo(BreadcrumbComponent);


