/**
 *
 * @author LiHao
 * @since 2020-08-13
 **/
import React, { memo } from 'react';
import { Form, Button, Input, notification } from "antd";
import MD5 from 'crypto-js/md5';


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
    const handleLogin = async ( values: any ) => {
        if( !values.userName || !values.password) {
            notification.warn({
                message: '验证失败',
                description: '用户名或密码错误'
            })
        } else {

            const { REACT_APP_MD5_SUFFIX } = process.env;
            // 加密密码
            const newPassword = MD5(`${values.password}${REACT_APP_MD5_SUFFIX}`).toString();

            console.log(newPassword);
            /**
             * 执行登陆的逻辑
             * 假设有这样一个需求，我们希望在组件中去处理请求过后返回的数据，
             * async await 用一个变量去接收一个值的话，
             * 如果await后面是一个promise，那么变量收到的值是成功的值
             * 如果该promise失败，则程序会终止运行。
             * 因为 async await 本身就是一个promise 它不能捕获自身的错误
             * 所以我们一般是配合 try catch 使用，保证程序的正常运行。
             *
             **/
            try {
               await fetch({
                   userName: values.userName,
                   password: newPassword
               });

            } catch (error) {

            }

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
                        userName: 'visitor',
                        password: '123'
                    }}
                >
                    <Item name="userName" >
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
