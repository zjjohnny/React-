

import { Form, Input, Button,Space , Table ,Modal,Col, Row,Radio , } from 'antd';
import React, { useState } from 'react';
/* import {Link} from 'react-router-dom' */


const HotWord = () => {
  //搜索
    const [form] = Form.useForm();
    const [createForm] = Form.useForm();
    const [changedForm] = Form.useForm();
    const onFinish = (values) => {
      console.log('Finish:', values);
    };
  //新建广告
    const [createword, setcreateword] = useState(false);
    const createModal = () => {
        setcreateword(true);
    };
    const createWord=(values)=>{
        console.log('新建热词：',values);
    };
    const createOk = () => {
        setcreateword(false);
    };
    const createCancel = () => {
        setcreateword(false);
    };
    //状态
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

  //修改模态
    const [changeWord, setchangeWord] = useState(false);
    const changeModal = () => {
        setchangeWord(true);
    };
    const changedWord=(values)=>{
        console.log('新建热词：',values);
    };
    const changeOk = () => {
        setchangeWord(false);
    };
    const changeCancel = () => {
        setchangeWord(false);
    };
    //状态
    const [values, setValues] = useState(1);
    const onChanges = (e) => {
        console.log('radio checked', e.target.value);
        setValues(e.target.value);
    };

  //下线模态
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
  //删除模态
  const [delModal, setdelModal] = useState(false);
  const deleteModal = () => {
    setdelModal(true);
  };
  const delOk = () => {
    setdelModal(false);
  };

  const delCancel = () => {
    setdelModal(false);
  };
  //表格
      const columns = [
        {
          title: '',//表格列名
          dataIndex: 'id',//对应数据字段
          key: 'id',      //该列的唯一值
      },
        {
            title: '热词名称',//表格列名
            dataIndex: 'wordName',//对应数据字段
            key: 'wordName',      //该列的唯一值
        },
        {
          title: '排序',
          dataIndex: 'wordOrder',
          key: 'wordOrder',
        },
        {
            title: '添加时间',
            dataIndex: 'wordTime',
            key: 'wordTime',
        },
        {
          title: '状态',
          key: 'type',
          render: (text) => {
            return <span >{text.type===1?"上线":"下线"}</span>
          },
        },
        {
          title:'操作',
          render:(_,record)=>(
            <Space size="middle">
                <Button onClick={changeModal}>编辑</Button>
                <Button onClick={showModal}>下线</Button>
                <Button onClick={deleteModal}>删除</Button>
            </Space>    
          )
        },
      ];
      const data = [
        {
          key: '1',
          id: 1,
          wordName: '蛋糕',
          wordOrder:'1',
          wordTime: "2020-02-14 14:30:30",
          type: 1,
        },
        {
            key: '2',
            id: 2,
            wordName: '鸡蛋',
            wordOrder:'2',
            wordTime: "2022-02-14 09:30:30",
            type: 2,
          },
          {
            key: '3',
            id: 3,
            wordName: '雪糕',
            wordOrder:'3',
            wordTime: "2022-10-14 14:30:30",
            type: 1,
          },
      ];
      

    return (
        <div>
            <div className={"header"}>
                <Form form={form}  layout="inline" onFinish={onFinish} className={'form'}>
                    <Form.Item name="thematicName" /* rules={[{required:true,message: '请输入您要搜索的内容!',}]} */>
                        <Input size='large' prefix={"热词名称"} placeholder='请输入内容' />
                    </Form.Item>
                    <Form.Item>
                        <Button size='large' htmlType="submit">检索</Button> 
                    </Form.Item>
                    <Form.Item>
                        <Button size='large' onClick={()=>{form.resetFields()}}>重置</Button> 
                    </Form.Item>
                    <Form.Item>
                        <Button size='large' style={{borderColor:'red' ,color:'red'}} onClick={createModal} >新建热词</Button> 
                    </Form.Item>
                </Form>
            </div>
            <div className={'main'}>
                <Table columns={columns} dataSource={data} pagination={{pageSize:5}}/>
            </div>
            <div>
              <Modal title="提示" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={'确认'} cancelText={'取消'}>
                <p style={{fontSize:'17px'}}>确定要下线<span style={{color:'red',fontSize:'17px'}}>热词名称</span>吗?</p>
              </Modal>
            </div>
            <div>
              <Modal title="提示" open={delModal} onOk={delOk} onCancel={delCancel} okText={'确认'} cancelText={'取消'}>
                <p style={{fontSize:'17px'}}>确定要下线<span style={{color:'red',fontSize:'17px'}}>热词名称</span>吗?</p>
              </Modal>
            </div>
            <div>
              <Modal title="新建热词" open={createword} onOk={createOk} onCancel={createCancel} footer={null} destroyOnClose={true}>
                <Form form={createForm}  onFinish={createWord}>
                    <Form.Item name="wordName">
                        <Row> 
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={5} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>热词名称</Col>
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={16} style={{width:200}}><Input size='large'  placeholder='请输入广告名称' /></Col>
                        </Row>
                    </Form.Item>
                    <Form.Item name="wordOrder">
                        <Row> 
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={5} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>排序</Col>
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={16} style={{width:200}}><Input size='large'  placeholder='请输入排序号' /></Col>
                        </Row>
                    </Form.Item>
                    <Form.Item name="AdType">
                        <Row> 
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={5} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>状态</Col>
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={16} style={{width:300}}>
                                <Radio.Group onChange={onChange} value={value} style={{marginTop:10}}>
                                    <Radio value='1'>上线</Radio>
                                    <Radio value='2'>下线</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row>
                            <Col span={2} style={{visibility:'hidden'}}>1</Col>
                            <Col span={4} ><Button size='large' htmlType="submit">新建</Button></Col>
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={4} ><Button size='large' onClick={()=>{createForm.resetFields()}}>重置</Button></Col>
                        </Row>
                    </Form.Item>
                </Form>
              </Modal>
            </div>
            <div>
              <Modal title="编辑热词" open={changeWord} onOk={changeOk} onCancel={changeCancel} footer={null}>
                <Form form={changedForm}  onFinish={changedWord}>
                    <Form.Item name="wordName">
                        <Row> 
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={5} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>热词名称</Col>
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={16} style={{width:200}}><Input size='large'  placeholder='请输入广告名称' /></Col>
                        </Row>
                    </Form.Item>
                    <Form.Item name="wordOrder">
                        <Row> 
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={5} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>排序</Col>
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={16} style={{width:200}}><Input size='large'  placeholder='请输入排序号' /></Col>
                        </Row>
                    </Form.Item>
                    <Form.Item name="AdType">
                        <Row> 
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={5} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>状态</Col>
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={16} style={{width:300}}>
                                <Radio.Group onChange={onChanges} value={values} style={{marginTop:10}}>
                                    <Radio value='1'>上线</Radio>
                                    <Radio value='2'>下线</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row>
                            <Col span={2} style={{visibility:'hidden'}}>1</Col>
                            <Col span={4} ><Button size='large' htmlType="submit">编辑</Button></Col>
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={4} ><Button size='large' onClick={()=>{changedForm.resetFields()}}>重置</Button></Col>
                        </Row>
                    </Form.Item>
                </Form>
              </Modal>
            </div>
            
        </div>
    )
    
}
export default HotWord;