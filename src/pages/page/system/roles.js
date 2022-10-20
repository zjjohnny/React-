
import React, { useState, useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import style from './acess.module.scss'
import { Button, Table, Space, Modal, Form, Input, InputNumber, Select, Pagination, notification } from 'antd';
import { server } from '../../../api/api';
const Roles = () => {
  const navigate = useNavigate()
  const [InputValue, setSearchText] = useState('');
  const [data, setdata] = useState([]);
  const [current, setCurrent] = useState(1); //当前页数
  const [Total, setTotal] = useState(); //总条数
  const [pageSize, setPageSize] = useState(5); //每页条数
  // 表格数据
  const columns = [
    {
      title: 'id',//表格列名
      dataIndex: 'roleId',//对应数据字段
      key: 'roleId',//该列的唯一值
    },
    {
      title: '角色名称',
      dataIndex: 'roleRemark',
      key: 'roleId',
    },
    {
      title: '角色说明',
      dataIndex: 'roleDesc',
      key: 'id',
    },
    {
      title: '创建日期',
      dataIndex: 'roleCreatetime',
      key: 'id',
    },
    {
      title: '操作',
      render: (_, record) => (
        <Space size="middle">
          <Button type={"default"} onClick={() => {
            // 调用eidtroleDesc
            console.log('%c ======>>>>>>>>', 'color:orange;', record.roleId)
            navigate('addroles',{state:{roleRemark:record.roleRemark,roleDesc:record.roleDesc,roleId:record.roleId}})
            // 调用删除的接口
          }}>  编辑</Button>
          <Button type={"dashed"} onClick={() => {
            warning(record.roleId)
          }}>删除</Button>

        </Space>
      )

    },
  ];
  // 处理分页
  const onChange = (page, pageSize) => {
    // 当前页
    console.log(page);  //当前页
    console.log('%c ======>>>>>>>>', 'color:orange;', pageSize) //limit
    setPageSize(pageSize)
    setCurrent(page);
    // 获取角色列表接口
    getRoleLists(page, pageSize)
  };
  const Serchnamea = (e) => {
    console.log('%c ======>>>>>>>>', 'color:orange;', e.target.value)
    setSearchText(e.target.value)
  }
  useEffect(() => {
    // 调用获取角色列表接口
    getRoleLists(current, pageSize)  //current, pageSize
  }, [])

  // 删除提醒模态框
  const warning = (id) => {
    Modal.warning({
      title: '提醒',
      content: '你确定删除吗？删除操作不可逆',
      onOk() {
        Deletroles(id)
      },
    });
  };
  // 获取角色列表接口
  async function getRoleLists(current, pageSize) {
    try {
      const res = await server.getRoleList({
        page: current,
        limit: pageSize
      })
      console.log('%c ======>>>>>>>>', 'color:orange;', res)
      setdata(res.data)
      setTotal(res.count)
    }
    catch (err) {
      console.log(err)
    }
  }
  // 模糊查询接口
  async function SerchMes() {
    try {
      const res = await server.getSreachRoleList({
        page: current,
        limit: pageSize,
        msg: InputValue
      })
      console.log('%c ======>>>>>>>>', 'color:orange;', res)
      if (res.code === 200) {
        setdata(res.data)
        // setTotal(res.data.total)

      }
      if (res.code == 101) {
        setdata(res.data)
        notification.success({
          placement: 'top',
          message: '查询信息',
          description: res.msg
        })
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  // 删除接口
  async function Deletroles(id) {
    try {
      const res = await server.Deletroles(
        {
          id: id
        }
      )
      if (res.code == 200) {
        console.log('%c ======>>>>>>>>', 'color:orange;', res)
        notification.success({
          placement: 'top',
          message: '成功',
          description:
            '删除成功',
        });
        getRoleLists(current, pageSize)
      }
    }
    catch (err) {
      console.log('%c ======>>>>>>>>', 'color:orange;', err)
    }
  }




  return (
    <div className={style.acessbox}>
      {/* 模态框 */}
      {/* 搜索部分 */}
      <div>
        <div>
          <Input size="large" placeholder="请输入账号" prefix={'账号'} onChange={Serchnamea} value={InputValue} />
        </div>
        <div>
          <div>
            <Button onClick={() => {
              SerchMes(current, pageSize, InputValue)
            }}>搜索</Button>
            <Button onClick={() => {
              setSearchText('')
            }}>重置</Button>
            <Button onClick={() => {
              navigate("addroles", { state: { roleRemark: '', roleDesc: '', roleId: '' } });
            }} >新增角色</Button>
          </div>
          <p>当前条件共检索到<span>{Total}</span>条相关信息</p>
        </div>
      </div>
      {/* 表格 */}
      <div>
        <Table pagination={false} className={style.table} columns={columns} dataSource={data} rowKey={(record) => record.id}
          align='center'
        />
      </div>
      <div className={style.paginations}>
        <Pagination
          style={{ "marginLeft": "20px", 'backgroundColor': '#fff', 'height': '40px' }}
          current={current} onChange={onChange} total={Total} showSizeChanger
          pageSizeOptions={['5', '10', '20', '30', '40']}
          defaultPageSize={pageSize}
        />
      </div>
    </div>
  );
}

export default Roles;
