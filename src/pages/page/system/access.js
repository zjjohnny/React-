import React, { useState, useEffect } from 'react';
import style from './acess.module.scss'
import { server } from '../../../api/api';
import { useRequest } from 'ahooks';
import { Button, Table, Space, Modal, Form, Input, Select, Pagination, notification } from 'antd';
const { Option } = Select;
const Access = () => {
  const [RolsCurretid, setRolsCurretid] = useState(null);

  const columns = [
    {
      title: '账号',//表格列名
      dataIndex: 'adminAccount',//对应数据字段
      key: 'adminId',//该列的唯
    },
    {
      title: '姓名',
      dataIndex: 'adminName',
      key: 'adminId',
    },
    {
      title: '手机号',
      dataIndex: 'adminPhone',
      key: 'adminId',
    },
    {
      title: '角色',
      dataIndex: 'roleRemark',
      key: 'adminId',
    },
    {
      title: '创建时间',
      dataIndex: 'adminCreatetime',
      key: 'adminId',
    },
    {
      title: '操作',
      render: (_, record) => (
        <Space size="middle">
          <Button type={"default"} onClick={() => {
            // 调用eidt
            console.log('%c ======>>>>>>>>', 'color:orange;', record)
            const { roleId } = record
            // 咱就是说这样formh
            form.setFieldsValue({
              roleId
            })
            // 弹出框
            Getadmin(record.adminId)
            // 角色数据
            Getrole()
            setadminId(record.adminId)
            setIsModalOpen(true);
            // 调用编辑的接口
            setIsDisabled(true);
          }
          }>  编辑</Button>
          <Button type={"dashed"} onClick={() => {
            Deleteadmin(record.adminId)
          }}>删除</Button>

        </Space>
      )

    },
  ];
  // 表单的值
  const formref = React.createRef();
  // 搜索框的值
  const [InputValue, setSearchText] = useState('');
  // 角色下拉框的值
  const [roleValue, setRoleValue] = useState([]);
  // 当前所选的角色回显
  const [role, setRole] = useState('');
  const [data, setdata] = useState([
  ]);
  // 分页数据
  // 模态框内容
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [current, setCurrent] = useState(1); //当前页数
  const [Total, setTotal] = useState(); //总条数
  const [pageSize, setPageSize] = useState(5); //每页条数
  const [form] = Form.useForm();
  // 是否为编辑状态禁用
  const [isDisabled, setIsDisabled] = useState(false);
  // 当前的adminId
  const [adminId, setadminId] = useState();
  // 表单成功的回调
  const onFinish = (values) => {
    // console.log('Success:', values);
    // 新建的回调
    Addadmin(values);
    console.log('%c ======>>>>>>>>', 'color:orange;', values.adminAccount)
    // data.map((item, index) => {
    //   if (item.adminAccount == values.adminAccount) {
    //     alert('账号已存在')
    //   }
    // })
    setIsModalOpen(false);
    // 编辑的回调
    Updataadmin(values)
    formref.current.resetFields()
  };
  const onFinishFailed = (errorInfo) => {
    // 提交信息
    console.log('Failed:', errorInfo);
  };
  const showModal = () => {
    // 调用获取角色列表接口
    Getrole()
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    formref.current.resetFields()
  };
  const handleCancel = () => {
    console.log('%c ======>>>>>>>>', 'color:orange;', '取消')
    formref.current.resetFields()
    // 清空表单
    setIsModalOpen(false);
  };

  // 新建取消
  const putOff = () => {
    formref.current.resetFields()
    setIsDisabled(false);
    console.log('%c ======>>>>>>>>', 'color:orange;', RolsCurretid)
    console.log('%c ======>>>>>>>>', 'color:orange;', '取消')
    console.log('%c ======>>>>>>>>', 'color:red;', RolsCurretid)
    setIsModalOpen(false);
    // 清空表单
  }
  // 清空搜索框
  const Serchnamea = (e) => {
    // console.log('%c ======>>>>>>>>', 'color:orange;', e.target.value)
    setSearchText(e.target.value)
  }

  const onChange = (page, pageSize, size) => {
    setPageSize(pageSize) //每页条数
    setCurrent(page); //当前页
    // 调用列表接口
    GetAdminst(page, pageSize)
  };
  useEffect(() => {
    // loading
    run(current, pageSize)

  }, []);

  // 列表接口
  const GetAdminst = async (current, pageSize) => {
    try {
      const obj = {
        page: current,
        limit: pageSize,
      }
      const res = await server.getAdminList(
        obj
      )
      if (res.code == 200) {
        // console.log('%c ======>>>>>>>>', 'color:red;', res)
        res.data.forEach((item, index) => {
          Object.assign(item, item.roles[0])
        })
        setTotal(res.count)
        setdata(res.data)
      }
      return res.d
    }
    catch (err) {
      console.log(err)
    }
  }
  const { datass, loading, run } = useRequest(GetAdminst, {
    debounceInterval: 500, // 防抖间隔
    manual: true,
    loadingDelay: 500, // 延迟显示loading
    refreshDeps: [], // manual为false，可以按被动式触发
  });


  //获取角色列表的值
  const onGenderChange = (value, e) => {
    console.log('%c ======>>>>>>>>', 'color:orange;', '当前所选择角色id', value);
    setRole(value);
  };


  // 新建的接口
  const Addadmin = async (values) => {
    try {
      const res = await server.Addadmins({
        ...values, adminId: ''
      })
      if (res.code == 200) {
        notification.success({
          placement: 'top',
          message: '成功',
          description:
            '新建成功',
        });
        // 调用列表接口
        GetAdminst(current, pageSize)
        // 清空表单
        formref.current.resetFields()
      }
      // GetAdminst(current, pageSize)

    }
    catch (err) {
      console.log(err)
    }
  }
  // 搜索的接口
  const Serchname = async (current, pageSize, InputValue) => {
    try {
      const obj = {
        limit: pageSize,
        page: current,
        msg: InputValue
      }
      const res = await server.searchAdmin(obj)
      if (res.code == 200) {
        res.data.forEach((item, index) => {
          Object.assign(item, item.roles[0])
        })
        setTotal(res.count)
        setdata(res.data)
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
  // 修改的接口
  const Updataadmin = async (values) => {
    try {
      const res = await server.updateAdmin({
        ...values, adminId: adminId, adminPwd: ''
      })
      if (res.code == 200) {
        console.log('%c ======>>>>>>>>', 'color:red;', res)
        // 调用列表接口
        GetAdminst(current, pageSize)
        // 状态重置
        setIsDisabled(false)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  // 获取下拉框角色的接口
  const Getrole = async () => {
    try {
      const res = await server.getRoleListSlect()
      if (res.code == 200) {
        // console.log('%c ======>>>>>>>>', 'color:red;', res)
        setRoleValue(res.data)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  // 编辑回显数据接口
  const Getadmin = async (id) => {
    try {
      const res = await server.getAdminById({
        id: id
      })
      if (res.code == 200) {
        // 在这儿都晓得通过setFieldsValue去修改表单的值
        form.setFieldsValue({
          adminAccount: res.data.adminAccount,
          adminName: res.data.adminName,
          adminPhone: res.data.adminPhone,
          adminEmail: res.data.adminEmail,
          role: res.data.roles.roleId
        })
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  // 删除的接口
  const Deleteadmin = async (id) => {
    try {
      const res = await server.deleteAdmin({
        id: id
      })
      if (res.code == 200) {
        notification.success({
          placement: 'top',
          message: '成功',
          description:

            '删除成功',
        });
        // 调用列表接口
        GetAdminst(current, pageSize)
      }
    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <div className={style.acessbox}>
      {/* 模态框 */}
      <Modal title="新建账号" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]} >
        {/* 新建表单 */}
        <Form
          ref={formref}
          name="basic"
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="账号"
            name="adminAccount"
            rules={[{ required: true, message: '请输入账号!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="角色"
            name="roleId" // 咱就是说这个id是接受form表单的roleId
            rules={[{ required: true, message: '请选择角色!' }]}
          // initialvalues={RolsCurretid}
          >
            {/* form会自己给里面的元素赋值value */}
            <Select
              placeholder="请选择角色"
              allowClear
            >
              {/*动态生成 optin  */}
              {
                roleValue.map((item, index) => {
                  return <Option key={index} value={item.roleId}>{item.roleRemark}</Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="姓名"
            name="adminName"
            rules={[{ message: '请输入姓名!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="adminPhone"
            rules={[{ message: '请输入手机号!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="初始密码"
            name="adminPwd"
            rules={[{ required: isDisabled ? false : true, message: '请输入密码!' }]}

          >
            <Input.Password disabled={isDisabled ? true : false} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button type="primary" style={{ "marginLeft": "30px" }} onClick={putOff}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 搜索部分 */}
      <div>
        <div>
          <Input size="large" placeholder="请输入账号" prefix={'账号'} onChange={Serchnamea} value={InputValue} />
        </div>
        <div>
          <div>
            <Button  onClick={() => {
              Serchname(current, pageSize, InputValue)
            }}>搜索</Button>
            <Button onClick={() => {
              // console.log('%c ======>>>>>>>>', 'color:orange;', InputValue)
              // 清空搜索框
              setSearchText('')
            }}>重置</Button>
            <Button onClick={showModal}>新建账号</Button>
          </div>
          <p>当前条件共检索到<span>{Total}</span>条相关信息</p>
        </div>
      </div>
      {/* 表格 */}
      <div>
        <Table
          pagination={false}
          className={style.table}
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.id}
          align='center'
        />

      </div>
      <div className={style.paginations}>
        <Pagination
          style={{ "marginLeft": "20px", 'backgroundColor': '#fff', 'height': '40px' }}
          current={current} onChange={onChange} total={Total} showSizeChanger
          pageSizeOptions={['5', '10', '20', '30', '40']}
          defaultPageSize={pageSize}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default Access;