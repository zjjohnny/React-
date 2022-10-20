import React, { useEffect, useState } from 'react';
import { Button, Form, Input, notification } from 'antd';
import style from './login.module.css'
import { useNavigate } from 'react-router-dom'
import { server } from '../../../api/api';
import store from "../../../store";
import { makeAutoObservable } from "mobx";
const Login = () => {
  const [NavbarData, setNavbarData] = useState([]);
  useEffect(() => {
    // window.addEventListener('keyup', (e) => {
    //   if (e.keyCode === 13) {
    //     console.log('%c ======>>>>>>>>', 'color:orange;', 'w')
    //     Submit()
    //   }
    // })
  }, []);
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log('%c ======>>>>>>>>', 'color:orange;', this)
    // 登录成功时的回调
    console.log('Success:', values);
    // 跳转到首页
    Submit(values)

    // 跳转到登录页面
  };
  // 绑定keycode事件

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    console.log('%c ======>>>>>>>>', 'color:orange;', this)
  };

  // 登录接口
  const Submit = async (values) => {
    try {
      // 绑定this
      console.log('%c ======>>>>>>>>', 'color:orange;', values)
      const res = await server.toLogin(values)
      if (res.code === 200) {
        console.log('%c ======>>>>>>>>', 'color:red;', res.data)
        // 存在mobx

        setNavbarData(res.data)
        store.NavbarData.Nvadatalist = res.data
        // makeAutoObservable(res.data)
        sessionStorage.setItem('name', values.name)

        sessionStorage.setItem('navadata', JSON.stringify(res.data))
        // 存token
        sessionStorage.setItem('token', res.msg)
        // 这里不能保存本地
        notification.info({
          placement: 'top',
          message: '登录成功',
        });
        setTimeout(() => {
          navigate('main/operate', { state: res.data, replace: true })
        }, 1000)
      } else {
        notification.error({
          placement: 'top',
          message: '账号密码错误',
        });
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div className={style.loginbox}>
      <div className={style.loginboxleft}>
        <div>
          <p>社区团购</p>
          <span>Axlab社区团管理中心</span>
        </div>
      </div>
      <div className={style.loginboxrigth}>
        <div className={style.loginboxleftbox}>
          <p>Axlab社区团购</p>
          <span>系统管理账号登录</span>
          <div>
            <Form
              name="basic"
              labelCol={{
                span: 5,
              }}
              wrapperCol={{
                span: 20,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              onValuesChange={(e) => {
                console.log('%c ======>>>>>>>>', 'color:orange;', e)
                window.addEventListener('keyup', (e) => {
                  if (e.keyCode === 13) {
                    console.log('%c ======>>>>>>>>', 'color:orange;', 'w')
                    Submit()
                  }
                })
              }}
            >
              <Form.Item
                label="用户名"
                name="name"
                rules={[
                  {
                    required: true,
                    message: '请输入你的用户名!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="密码"
                name="pwd"
                // 密码自动填充
                autoComplete="new-password"
                rules={[
                  {
                    required: true,
                    message: '请输入你的密码!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 7,
                  span: 20,
                }}
              >
                <Button type="primary" htmlType="submit" className={style.submitbtn}>
                  立即登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
