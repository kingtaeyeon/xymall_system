/**
 * 返回具体的路由导航
 * @author LiHao
 * @since 2020-08-19
 **/
import React from "react";
import { Switch, Route } from "react-router-dom";
import {RouteConfig, RouteConfigComponentProps} from 'react-router-config';

export default function (props:RouteConfigComponentProps) {
    const { route, match } = props;

        if( route ) {
            if(route.routes) {
                return (
                    <Switch>
                        {
                            route.routes.map((r: RouteConfig, i: number) => {
                                return (
                                    <Route
                                        key={r.key || i}
                                        // 路径实际上是被拼凑出来的
                                        // 拼起来 /a/b/c/create
                                        path={`${match.path}${r.path || ''}`}
                                        exact={r.exact}
                                        strict={r.strict}
                                        render={(props: RouteConfigComponentProps) => {
                                            if(r.render) {
                                                return r.render({...props, route: r})
                                            }
                                            if( r.component ) {
                                                return <r.component {...props} route={r} />
                                            }
                                            return null;
                                        }}
                                    />
                                )
                             })
                        }
                    </Switch>
                )
            }
        }

        return null;
}
