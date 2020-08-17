/**
 * 登录组件
 * @author LiHao
 * @Since 2020-08-13 09:15
 *
 **/
import React, { memo } from "react";
import { Redirect } from 'react-router-dom';
import userActions from "../../hooks/useActions";
import { loginActionPromise } from "../../redux/saga/actions/user";
import ParticlesBg from 'particles-bg';
import LoginMain from "./login-layout/loginMain";
import './index.less';
import { useSelector } from "react-redux";
interface IProps {

}


const Login: React.FC<IProps> = (props ) => {

  // const { isLogin, loading } = useSelector((state: IState) => state.user);
    const isLogin = false;
    const loading = true;
    const action = userActions({
        loginActionPromise
    });

    if( isLogin ) return <Redirect to="/" />;

    return (
        <div className="login">
            <div className="login-layout">
                <div className="login-header" />
                <LoginMain
                    fetch={ action.loginActionPromise }
                    loading={ loading }
                />
                <div className="login-footer" />
                {/*<ParticlesBg*/}
                {/*    type="lines"*/}
                {/*    bg*/}
                {/*/>*/}
            </div>
        </div>
    );
};


export default memo(Login);
