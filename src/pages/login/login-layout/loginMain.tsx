/**
 *
 * @author LiHao
 * @since 2020-08-13
 **/
import React, { memo } from 'react';
import { Form, Button, Input, notification } from "antd";
import Login from "../index";
import {useSelector} from "react-redux";

interface IProps {
    fetch: (values: ILogin) => Promise<any>;
    loading: boolean
}


const { Item } = Form;
const LoginMain: React.FC<IProps> = (props) => {

    const { loading, fetch } = props;


    /**
     * value是登录表单的数据集合
     * 如果要给某个表单赋予初始值，就需要传递一个参数initialValues
     * 接收一个对象，键名就是Item里面定义的name
     * @param values
     */
    const handleLogin = ( values: any ) => {
        if( !values.username || !values.password) {
            notification.warn({
                message: '验证失败',
                description: '用户名或密码错误'
            })
        } else {
            /**
             * 执行登陆的逻辑
             **/
            fetch(values).then(
                res => { console.log('then里面的打印：', res)},
                error => { console.log('error里的打印：', error)}
            );
        }
    };

    return (
        <div className="login-layout-main">
            <div className="main-form">
                <h2>欢迎登陆xymall_system</h2>
                <Form
                    className="main-form-box"
                    onFinish={handleLogin}
                    initialValues={{
                        username: 'visitor',
                        password: '123'
                    }}
                >
                    <Item name="username" >
                        <Input placeholder="请输入用户名" />
                    </Item>
                    <Item name="password">
                        <Input type="password" placeholder="请输入密码" />
                    </Item>
                    <Item >
                        <Button type="primary"
                            className="main-form-box_button"
                                htmlType="submit"
                        >登录</Button>
                    </Item>
                    <Item>
                        <div className="main-form-box_other">
                            <p>其他登录方式</p>
                            <div className="any">
                                <span>QQ</span>
                                <span>微信</span>
                                <span>GitHub</span>
                            </div>
                        </div>
                    </Item>
                </Form>
            </div>
        </div>
    );
};

export default memo(LoginMain);
