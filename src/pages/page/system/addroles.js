import React, { useState, useEffect } from 'react';
import { Button, Tree, Input, notification } from 'antd';
import { useNavigate } from "react-router-dom";
import style from './addroles.module.scss'
import { useLocation } from 'react-router';
import { server } from '../../../api/api';
// 树形结构


const Addroles = () => {
  const navigate = useNavigate()
  const Location = useLocation();
  const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
  const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  // 新增角色名称
  const [RoelsName, setRolesNmar] = useState('')
  const [RoelsDesc, setRolesDesc] = useState('')
  // 选择的数组
  const [SelectArr, setSlectArr] = useState([])
  // 权限数据
  const [TreeArr, setTreeArr] = useState([])
  // 选择内容的父亲的
  const [SlectFatehrID, setSlectFatehrID] = useState()
  const onExpand = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue);
    setSlectFatehrID(expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
    setSlectArr(checkedKeysValue)
  };

  const onSelect = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };
  useEffect(() => {
    console.log('%c ======>>>>>>>>', 'color:orange;', Location.state)
    setRolesDesc(Location.state.roleDesc)
    setRolesNmar(Location.state.roleRemark)
    // 回显到输入框
    GetAccess()
  }, []);
  // 获取权限数据接口
  async function GetAccess() {
    try {
      const res = await server.GetaccessArr()
      if (res.code == 200) {
        // console.log('%c ======>>>>>>>>', 'color:orange;', res)
        // console.log('%c ======>>>>>>>>', 'color:orange;', res.data)
        const objArr = [
        ]

        res.data.forEach((el, inex) => {
          const obj = {
            title: "",
            key: '',
            children: [
            ]
          }
          obj.title = el.menuRemark
          obj.key = el.menuId
          el.children.forEach((el1) => {
            const obj2 = {
              title: '',
              key: ''
            }
            obj2.title = el1.menuRemark
            obj2.key = el1.menuId
            obj.children.push(obj2)
          })
          objArr.push(obj)
        })
        // console.log('%c ======>>>>>>>>', 'color:orange;', objArr)
        setTreeArr(objArr)
      }
    } catch (err) {
      console.log('%c ======>>>>>>>>', 'color:orange;', err)
    }
  }

  // 新增权限接口
  async function AddRoles() {
    try {
      const Arrc = SelectArr.concat(SlectFatehrID)
      // 去重
      const Arr = [...new Set(Arrc)]
      // 数组正序排序
      Arr.sort(function (a, b) {
        return a - b;
      })

      const obj = {
        roleDesc: RoelsName,
        roleRemark: RoelsDesc,
        ids: Arr
      }
      const res = await server.AddroleAceess(obj)
      if (res.code == 200) {
        // 跳转
        navigate(-1);
      }
    }
    catch { }
  }

  // 编辑的接口
  async function EditRoles() {
    try {
      const obj = {
        roleDesc: RoelsDesc,
        roleRemark: RoelsName,
        ids: SelectArr,
        roleId: Location.state.roleId
      }
      const res = await server.getRoleClass(obj)
      if (res.code == 200) {
        notification.success({
          message: '修改成功',
          description:
            '修改成功',
          placement: 'top',
        });
        setInterval(() => {
          navigate(-1);
        }, 2000)
      }
    }
    catch { }
  }
  return (
    <div>
      {/*  */}
      {/* 适用于全局样式 */}
      {/* <div className={classnames({"style.title":true})}> */}
      {/* <div className={classnames(style.title)}> */}
      <div className={style.title}>
        <p>新增角色</p>
        <div>
          <Button onClick={() => {
            navigate(-1);
          }}>取消</Button>
          <Button onClick={() => {
            AddRoles()
            EditRoles()
          }}>保存</Button>
        </div>
      </div>
      <div className={style.conetnt}>
        <div><span>*</span>角色名称 <Input placeholder="请输入" onChange={(e) => {
          setRolesNmar(e.target.value)

        }} value={RoelsName} /></div>
        <div><span>*</span>角色介绍 <Input placeholder="请输入" onChange={(e) => {
          setRolesDesc(e.target.value)
        }} value={RoelsDesc} /></div>
        <Tree
          checkable
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          treeData={TreeArr}

        />
      </div>
    </div>
  );
}

export default Addroles;
