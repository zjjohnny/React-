import React, { Component, useEffect, useState } from 'react';
import style from './Header.module.scss';
import { Button, Modal, Space, notification, Breadcrumb } from 'antd';
import { useNavigate } from "react-router-dom";
import { LoginOutlined, PoweroffOutlined, UserSwitchOutlined } from '@ant-design/icons';
import logo from '../../assest/logo.jpg'
const Header = () => {
  const navigate = useNavigate()
  const [userName, setuserName] = useState('');
  useEffect(() => {
    setuserName(sessionStorage.getItem('name'))
  }, []);
  const confirm = () => {
    // 确定执行的回调
    // 清楚本地存储的token

    // 跳转到登录页面
    sessionStorage.removeItem('token')
    // 三秒后跳转到登录页面
    setTimeout(() => {
      notification.info({
        placement: 'top',
        message: '退出成功',
      });
    }, 1000)
    setTimeout(() => {
      navigate('/')
    }, 2000)

  };


  return (

    <div className={style.titel}>
      <div>
        <img src={logo} alt="" className={style.img}/>
        <p>Axlab</p>
        <p>社区团购管理中心</p>
      </div>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/main/operate">首页</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={style.rigth}>
        <p> 欢迎你</p> <p>{userName}</p>

        <p onClick={() => [
          navigate('changePwd'),
        ]}><UserSwitchOutlined />修改密码</p>
        <p onClick={confirm}><PoweroffOutlined />退出</p>
      </div>
    </div>
  );

}

export default Header;
