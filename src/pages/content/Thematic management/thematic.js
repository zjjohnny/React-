import React, { useState } from 'react';
import { Form, Input, Button,Space , Table ,Modal } from 'antd';
import {NavLink} from 'react-router-dom'
import './thematic.scss'
const Thematic = () => {
  //搜索
    const [form] = Form.useForm();
    const onFinish = (values) => {
      console.log('Finish:', values);
    };
  //模态
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  //表格
      const columns = [
        {
          title: '',//表格列名
          dataIndex: 'id',//对应数据字段
          key: 'id',      //该列的唯一值
      },
        {
            title: '专题名称',//表格列名
            dataIndex: 'ztName',//对应数据字段
            key: 'ztName',      //该列的唯一值
        },
        {
          title: '相关单品',
          dataIndex: 'danpin',
          key: 'danpin',
        },
        {
          title: '发布时间',
          dataIndex: 'fbTime',
          key: 'fbTime',
        },
        {
          title: '状态',
          key: 'type',
          render: (text) => {
            return <span >{text.type===1?"正常":"禁用"}</span>
          },
        },
        {
          title:'操作',
          render:(_,record)=>(
            <Space size="middle">
                <Button>编辑</Button>
                <Button onClick={showModal}>禁用</Button>
                <Button>删除</Button>
            </Space>    
          )
        },
      ];
      const data = [
        {
          key: '1',
          id: 1,
          ztName: '农夫山泉',
          danpin: 4,
          fbTime: "2020-02-14 14:30:30",
          type: 1,
        },
        {
          key: '2',
          id: 2,
          ztName: '可口可乐',
          danpin: 5,
          fbTime: "2020-02-13 17:30:00",
          type: 1,
        },
        {
          key: '3',
          id: 3,
          ztName: '娃哈哈',
          danpin: 12,
          fbTime: "2022-02-14 14:30:30",
          type: 2,
        },
        {
            key: '4',
            id: 4,
            ztName: '娃哈',
            danpin: 12,
            fbTime: "2022-02-14 14:30:30",
            type: 2,
          },
          {
            key: '5',
            id: 5,
            ztName: '娃哈哈',
            danpin: 12,
            fbTime: "2022-02-14 14:30:30",
            type: 2,
          },
          {
            key: '6',
            id: 6,
            ztName: '娃哈哈',
            danpin: 12,
            fbTime: "2022-02-14 14:30:30",
            type: 2,
          },
      ];
    return (
        <div>
            <div className={"header"}>
                <Form form={form}  layout="inline" onFinish={onFinish} >
                    <Form.Item name="thematicName" /* rules={[{required:true,message: '请输入您要搜索的内容!',}]} */>
                        <Input size='large' prefix={"专题名称"} placeholder='请输入内容' />
                    </Form.Item>
                    <Form.Item>
                        <Button size='large' htmlType="submit">检索</Button> 
                    </Form.Item>
                    <Form.Item>
                        <Button size='large' onClick={()=>{form.resetFields()}}>重置</Button> 
                    </Form.Item>
                    <Form.Item>
                      <NavLink to={"/main/addTh"}><Button size='large' style={{borderColor:'red' ,color:'red'}}>新建专题</Button></NavLink>
                    </Form.Item>
                </Form>
            </div>
            <div className={'main'}>
                <Table columns={columns} dataSource={data} pagination={{pageSize:5}}/>
            </div>
            <div>
              <Modal title="提示" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={'确认'} cancelText={'取消'}>
                <p style={{fontSize:'17px'}}>确定要禁用<span style={{color:'red',fontSize:'17px'}}>专题名称</span>吗?</p>
              </Modal>
            </div>
        </div>
    )
    
}
export default Thematic;