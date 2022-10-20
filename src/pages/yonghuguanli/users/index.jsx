/* 搜索，新增，表格展示 */
import React, { useEffect, useState } from 'react';
import { Button, Form, Input ,Space, Table,Select,DatePicker,Col,Row,Modal,Tag,message} from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import http from '../../../utils/http';

const { Option } = Select;
const { RangePicker } = DatePicker;
//标签
const { CheckableTag } = Tag;
const tagsData = ['高端用户', '优质用户', '多社区'];

const Users=()=>{
    const [form] = Form.useForm();
    const navigate = useNavigate();
    // const [ forceUpdate] = useState({}); // To disable submit button at the beginning.
    //模态框
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [data,setData]=useState([])
      useEffect(() => {
          http({
            url:"/admin/users/getUserList",
            method:"post",
            params:{
              pageNum:1,
              pageSize:5,
           }
          }).then(res=>{
           console.log(res.date.list);
           setData(res.date.list)
           // 数据库的数据存放地址
        })
        // 给个空数组只调用一次
      },[]);

    const columns = [
        {
            title: '用户ID',//表格列名
            dataIndex: 'userNo',//对应数据字段
            key: 'userNo',//该列的唯一值
          },
          {
            title: '昵称',
            dataIndex: 'userName',
            key: 'userName',
          },
          {
            title: '注册时间',
            dataIndex: 'regTime',
            key: 'regTime',
          },
          {
            title: '手机号',
            dataIndex: 'userPhone',
            key: 'userPhone',
          },
          {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
          },
          {
            title: '地区',
            dataIndex: 'area',
            key: 'area',
          },
          {
            title: '消费金额',
            dataIndex: 'spendTotal',
            key: 'spendTotal',
          },
          {
            title: '消费订单',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
          },
          {
            title: '状态',
            dataIndex: 'accountStatus',
            key: 'accountStatus',
          },
          {
            title: '操作',
            render:(_,record)=>(
                <Space size="middle">
                    <Button type="link" onClick={() => {
                      navigate("/main/queryuser", {
                        state: { userNo: record.userNo },
                      });
                    }}>查看</Button>
                    <Button type="link" onClick={() => {
                      wuxiao(record);
                    }}>无效</Button>
                    <Button type="link" onClick={() => {
                      youxiao(record);
                    }}>有效</Button>
                 </Space>
            )

        },
    ];
    //无效按钮函数
    const wuxiao=(record)=>{
      console.log(record);
      http({
             url:'/admin/users/updateUserStatus',
             method:"post",
             params:{
                  userNos:record.userNo,
                  accountStatus:'无效'
                }
           }).then(res=>{
              if(res.code === 200){
                 message.info("无效");
                 console.log(res)
            http({
                    url:"/admin/users/getUserList",
                    method:"post",
                    params:{
                      pageNum:1,
                      pageSize:5,
                   }
                  }).then(res=>{
                   console.log(res.date.list);
                   setData(res.date.list)
                   // 数据库的数据存放地址
                }) }
              else{
                 message.error("无效失败");      
              }
            })
    }
    //有效按钮函数
    const youxiao=(record)=>{
      console.log(record);
      http({
             url:'/admin/users/updateUserStatus',
             method:"post",
             params:{
                  userNos:record.userNo,
                  accountStatus:'有效'
                }
           }).then(res=>{
              if(res.code === 200){
                 message.info("有效");
                 console.log(res)
            http({
                    url:"/admin/users/getUserList",
                    method:"post",
                    params:{
                      pageNum:1,
                      pageSize:5,
                   }
                  }).then(res=>{
                   console.log(res.date.list);
                   setData(res.date.list)
                   // 数据库的数据存放地址
                }) }
              else{
                 message.error("有效失败");      
              }
            })
    }
    const [selectedTags, setSelectedTags] = useState([]);

    const handleChange = (tag, checked) => {
      const nextSelectedTags = checked
        ? [...selectedTags, tag]
        : selectedTags.filter((t) => t !== tag);
      console.log('You are interested in: ', nextSelectedTags);
      setSelectedTags(nextSelectedTags);
    };

    //搜索框
    const onFinish = (values) => {
      let userName=''
      let identityCard=''
      let sex=''
      let userNo=''
      let userPhone=''
        console.log('Finish:', values);
        if(!values.userName){userName=''}else{userName=values.userName}
        if(!values.identityCard){identityCard=''}else{identityCard=values.identityCard}
        if(!values.sex){sex=''}else{sex=values.sex}
        if(!values.userNo){userNo=''}else{userNo=values.userNo}
        if(!values.userPhone){userPhone=''}else{userPhone=values.userPhone}

         http({
               url:'/admin/users/getUserList',
               method:"post",
               params:{
                  pageNum:1,
                  pageSize:5,
                  identityCard:identityCard,
                  sex:sex,
                  userName:userName,
                  userNo:userNo,
                  userPhone:userPhone
                  }
             }).then(res=>{
              console.log(res);
               setData(res.date.list);
          //      console.log(shuju)
        })
    };

    //时间表
function onChange(value, dateString) {
    console.log('Selected Time: ', value); 
    console.log('Formatted Selected Time: ', dateString);
  }
  
    // //模态框
    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

    return (
        <div className='usersbox'>
            <Form form={form} name="advanced_search" 
                className="ant-advanced-search-form" 
                onFinish={onFinish}
            >
                <Row gutter={24} style={{marginLeft:20,marginRight:0,marginTop:20}}>
                    <Col span={6}>
                        <Form.Item name="userName">
                            <Input size="large" placeholder="请输入内容" prefix={'用户名：'} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="identityCard">
                            <Input size="large" placeholder="请输入内容" prefix={'身份证：'}/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="userPhone">
                            <Input size="large" placeholder="请输入内容" prefix={'手机号：'} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="userNo">
                            <Input size="large" placeholder="请输入内容" prefix={'用户ID：'} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="starTime">
                            <RangePicker className={"shijian"}
                            onChange={onChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="sex">
                                <Select
                                    showSearch
                                    placeholder="性别："
                                    optionFilterProp="children"
                                       style={{
                                         width: 275,
                                        }}
                                    size='large'
                                    >               
                                    <Option value="1">男</Option>
                                    <Option value="2">女</Option>
                                </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="label">
                                <Select
                                    showSearch
                                    placeholder="标签："
                                    optionFilterProp="children"
                                       style={{
                                         width: 275,
                                        }}
                                    size='large'
                                    >
                                    <Option value="1">全部</Option>                
                                    <Option value="2">优质用户</Option>
                                    <Option value="3">其他</Option>
                                </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={1.5} style={{marginLeft:30}}>
                        <Form.Item shouldUpdate>
                            {() => (<Button htmlType="submit">
                                    搜索
                                </Button>
                            )}
                        </Form.Item>
                        </Col>
                        <Col span={1.5}>
                        <Form.Item>
                        <Button style={{ margin: '0 8px', }}
                              onClick={() => {
                                form.resetFields();
                                http({
                                        url:"/admin/users/getUserList",
                                        method:"post",
                                        params:{
                                          pageNum:1,
                                          pageSize:5,
                                       }
                                      }).then(res=>{
                                       console.log(res.date.list);
                                       setData(res.date.list)
                                       // 数据库的数据存放地址
                                    })
                              }}
                            >重置
                            </Button>
                        </Form.Item>
                        </Col>
                        <Col span={1.5}>
                            <Button type="primary" onClick={showModal}>
                              添加标签
                            </Button>
                            <Modal title="添加标签" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                              <p>
                                {tagsData.map((tag) => (<CheckableTag key={tag}
                                    checked={selectedTags.indexOf(tag) > -1}
                                    onChange={(checked) => handleChange(tag, checked)}>
                                    {tag}
                                    </CheckableTag>))}
                              </p>
                            </Modal>
                        </Col>
                </Row>
            </Form>
            <div className="search-result-list">
                <Table columns={columns} dataSource={data} rowKey={(record) => record.id} pagination={{pageSize:5}}
                align='center'/>
            </div>
            {/*新增弹框*/}

        </div>

    );
}
export default Users;
