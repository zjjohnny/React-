import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { Form, Input, Button,Space , Table ,Modal,Col, Row,Select,Radio ,message, Upload, } from 'antd';
import React, { useState } from 'react';
/* import {Link} from 'react-router-dom' */
import './adManage.scss'
//新建中的下拉框
const { Option } = Select;
//新建中的状态单选框

//新建中上传
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };


const Ad = () => {
  //搜索
    const [form] = Form.useForm();
    const [createForm] = Form.useForm();
    const onFinish = (values) => {
      console.log('Finish:', values);
    };
  //新建广告
    const [creategg, setcreategg] = useState(false);
    const createModal = () => {
        setcreategg(true);
    };
    const createAd=(values)=>{
        console.log('新建广告：',values);
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const createOk = () => {
        setcreategg(false);
    };
    const createCancel = () => {
        setcreategg(false);
    };
    //状态
    const [value, setValue] = useState(1);

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
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
  //表格
      const columns = [
        {
          title: '',//表格列名
          dataIndex: 'id',//对应数据字段
          key: 'id',      //该列的唯一值
      },
        {
            title: '广告名称',//表格列名
            dataIndex: 'ggName',//对应数据字段
            key: 'ggName',      //该列的唯一值
        },
        {
          title: '图片',
          dataIndex: 'ggPhoto',
          key: 'ggPhoto',
        },
        {
          title: '广告位值',
          dataIndex: 'ggAddress',
          key: 'ggAddress',
        },
        {
            title: '时间',
            dataIndex: 'ggTime',
            key: 'ggTime',
        },
        {
            title: '点击次数',
            dataIndex: 'ggNum',
            key: 'ggNum',
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
                <Button>编辑</Button>
                <Button onClick={showModal}>下线</Button>
                <Button>删除</Button>
            </Space>    
          )
        },
      ];
      const data = [
        {
          key: '1',
          id: 1,
          ggName: '夏季大热促销',
          ggPhoto:'1',
          ggAddress: "成都市时间大楼",
          ggTime: "2020-02-14 14:30:30",
          ggNum: '21',
          type: 1,
        },
        {
            key: '2',
            id: 2,
            ggName: '夏季大热促销2',
            ggPhoto: '2',
            ggAddress: "成都市时间大楼2",
            ggTime: "2022-02-14 14:30:45",
            ggNum: '232',
            type: 2,
          },
          {
            key: '3',
            id: 3,
            ggName: '夏季大热促销3',
            ggPhoto: '3',
            ggAddress: "成都市时间大楼3",
            ggTime: "2022-02-14 14:30:43",
            ggNum: '23',
            type: 2,
          },
          {
            key: '4',
            id: 4,
            ggName: '夏季大热促销4',
            ggPhoto: '34',
            ggAddress: "成都市时间大楼4",
            ggTime: "2022-02-14 14:30:40",
            ggNum: '4',
            type: 1,
          },
      ];
      //上传
      const [loading, setLoading] = useState(false);
      const [imageUrl, setImageUrl] = useState();
      const PhotoChange = (info) => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, (url) => {
            setLoading(false);
            setImageUrl(url);
          });
        }
      };
    
      const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{marginTop: 8,}}>Upload</div>
        </div>
      );

    return (
        <div>
            <div className={"header"}>
                <Form form={form}  layout="inline" onFinish={onFinish} className={'form'}>
                    <Form.Item name="thematicName" /* rules={[{required:true,message: '请输入您要搜索的内容!',}]} */>
                        <Input size='large' prefix={"广告名称"} placeholder='请输入内容' />
                    </Form.Item>
                    <Form.Item>
                        <Button size='large' htmlType="submit">检索</Button> 
                    </Form.Item>
                    <Form.Item>
                        <Button size='large' onClick={()=>{form.resetFields()}}>重置</Button> 
                    </Form.Item>
                    <Form.Item>
                        <Button size='large' style={{borderColor:'red' ,color:'red'}} onClick={createModal} >新建广告</Button> 
                    </Form.Item>
                </Form>
            </div>
            <div className={'main'}>
                <Table columns={columns} dataSource={data} pagination={{pageSize:5}}/>
            </div>
            <div>
              <Modal title="提示" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={'确认'} cancelText={'取消'}>
                <p style={{fontSize:'17px'}}>确定要下线<span style={{color:'red',fontSize:'17px'}}>广告名称</span>吗?</p>
              </Modal>
            </div>
            <div>
              <Modal title="新建广告" open={creategg} onOk={createOk} onCancel={createCancel} footer={null}>
                <Form form={createForm}  onFinish={createAd}>
                    <Form.Item name="AdName">
                        <Row> 
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={5} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>广告名称</Col>
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={16} style={{width:200}}><Input size='large'  placeholder='请输入广告名称' /></Col>
                        </Row>
                    </Form.Item>
                    <Form.Item name="AdAddress">
                        <Row> 
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={5} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>广告位置</Col>
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={16} style={{width:200}}>
                                <Select placeholder='请选择所属分类' onChange={handleChange} size={'large'}>
                                    <Option value="1">首页轮播图</Option>
                                    <Option value="2">首页推荐位置</Option>
                                </Select>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item name="AdOrder">
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
                                    <Radio value={1}>上线</Radio>
                                    <Radio value={2}>下线</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item name="AdPhoto">
                        <Row> 
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={5} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>上传</Col>
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={16} style={{width:300}}>
                            <Upload name="avatar" listType="picture-card" className="avatar-uploader" showUploadList={false} action="https://www.mocky.io/v2/5cc8019d300000980a055e76" beforeUpload={beforeUpload} onChange={PhotoChange}>
                                {imageUrl ? (<img src={imageUrl} alt="avatar"style={{width: '100%',}}/>) : (uploadButton)}
                            </Upload>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item name="AdClass">
                        <Row> 
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={5} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>跳转类型</Col>
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={16} style={{width:200}}>
                                <Select placeholder='请选择所属分类' onChange={handleChange} size={'large'}>
                                    <Option value="1">站内</Option>
                                    <Option value="2">外链</Option>
                                </Select>
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
        </div>
    )
    
}
export default Ad;