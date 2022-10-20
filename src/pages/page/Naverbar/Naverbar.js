
import * as Icons from '@ant-design/icons'
import { Menu } from 'antd';
import React, { useState, useEffect, } from 'react';
import 'antd/dist/antd.min.css';
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router';
// import store from "../../../store";
// import Routers from '../router/index.js';
// import Nverbar from '../../../router/Navbar.js';
import style from './Naverbar.module.scss'
import { observer } from "mobx-react";

// 自动生成菜单
// icon可以全部导入，提取就obj.icon使用
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}



const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const App = () => {
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const [NavbarData, setNavbarData] = useState([]);
  const navigate = useNavigate();
  const Location = useLocation();
  const items = [
    // 自动化生成菜单
    ...NavbarData.map((item,index) => {
      if (item.children) {
        let Icon=Icons[item.icon]
        return getItem(
          item.menuRemark,
          item.menuUrl,
          React.createElement(Icon),

          // React.createElement(Icon),
          [
            ...item.children.map((item, index) => {
              return getItem(<Link to={item.menuUrl} id={index}>{item.menuRemark}</Link>, item.menuId);
            }),
          ]
        );
      }
      // 没有子路由要写flag站位icon才会显示
      return getItem(<Link to={item.path} id={index}>{item.name}</Link>, '1', item.icon);
    }),
  ];
  useEffect(() => {
    // 获取路由传的参数
    console.log('%c ======>>>>>>>>', 'color:orange;', Location.state)
    // 路由传的参数 刷新会丢失
    // setNavbarData(Location.state)
    setNavbarData(JSON.parse(sessionStorage.getItem('navadata')))
    console.log('%c ======>>>>>>>>','color:orange;',)
    // console.log('%c ======>>>>>>>>', 'color:orange;', store.NavbarData.Nvadatalist)
  }, []);
  // 生命周期函数

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{
        width: 256,
      }}
      className={style.menu}
      items={items}
    />
  );
};

export default observer(App);