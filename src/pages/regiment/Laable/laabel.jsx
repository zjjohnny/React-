import { Input,Button,Modal,Tag,Radio,Space,Table,Row,Col,Form,} from 'antd';
import './laabel.scss'
import React, { useState,useEffect,}  from 'react';
import http from '../../../utils/http'
// import { useLocation } from 'react-router-dom';

const Laabel=()=>{
    // const {state:{record}} = useLocation();
    const columns = [
        {
            title: '标签名称',//表格列名
            //对应数据字段
            key: 'clientName',//该列的唯一值
            render: (text) => {
                if (text.clientColor===0) {
                    return <Tag color='red'>{text.clientName}</Tag>
                }
                else if(text.clientColor===1){
                    return <Tag color='blue'>{text.clientName}</Tag>
                }
                else if(text.clientColor===2){
                    return <Tag color='green'>{text.clientName}</Tag>
                }
                else{
                    return <Tag color='purple'>{text.clientName}</Tag>
                }
              }
        },
        {
            title: '状态',
            key: 'clientState',
            render: (text) => {
                return <span >{text.clientState===0?"启用":"禁用"}</span>
              }
          },
        {
          title: '操作',
          render: (_, record) => (
            <Space size="middle">
               <Button type="default" onClick={()=>{changeModal(record)}}>编辑</Button>
            </Space>
          )
        },
    ]


    //获取所有标签
    const [Data,setData]=useState(null)
    useEffect(()=>{
        http({
            url:"/admin/client/list",
            method:"get",
            params:{
                page: 1,
                limit: 100,
                name: "",
            }
        }).then(res=>{
            console.log(res.date);
            setData(res.date.list);
        })
        // 给个空数组只调用一次
    },[])
    
    //搜索
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('搜索:', values);
        const myId=parseInt(values.searchID)
        http({
            url:`/admin/client/clientSeletById/${myId}`,
        }).then(res=>{
            console.log(res);
            let data1=[res.date]
            setData(data1);            
        })
      };

    //重置
    const allData = () => {
        form.resetFields();
        http({
            url:"/admin/client/list",
            method:"get",
            params:{
                page: 1,
                limit: 100,
                name: "",
            }
        }).then(res=>{
            console.log(res.date);
            setData(res.date.list);
        })
    }
    //新建标签表单数据
    const [createForm] = Form.useForm();

//新建标签模态
    const [createLabel, setcreateLabel] = useState(false);
    const createModal = () => {
        setcreateLabel(true);
        console.log(11111);
    };
    const createtip=(values)=>{
        console.log('新建标签：',values);
        http({
            url:"/admin/client/clientInsert",
            method:"post",
            params:{
                // clientId: '',
                clientColor: values.labelCol,
                clientDescription: values.labelDesc,
                clientName: values.labelName,
                clientState: values.labelType,
            }
        }).then(res=>{
            // console.log(res);
            // setData(res.date.list);     
            if(res.code===200)
            http({
                url:"/admin/client/list",
                method:"get",
                params:{
                    page: 1,
                    limit: 100,
                    name: "",
                }
            }).then(res=>{
                console.log(res.date);
                setData(res.date.list);
            })     
        })
        
    };
    const createOk = (value) => {
        setcreateLabel(false);
        console.log(value);
    };
    const createCancel = () => {
        setcreateLabel(false);
    };

//编辑标签
  const formref = React.createRef();
    const [changeForm] = Form.useForm();
    const [changeLabel, setchangeLabel] = useState(false);
    const [changeID,setChangeID]=useState(null)

    const changeModal = (record) => {
        setchangeLabel(true);
        console.log(record);    
       
        setChangeID(record.clientId)
        changeForm.setFieldsValue({
            clientName:record.clientName,
            clientDescription:record.clientDescription,
            clientColor:record.clientColor,
            clientState:record.clientState
        })
    };
    const changetip=(values)=>{
        console.log('编辑标签：',values);
        console.log(changeID);       
        http({
            url:"/admin/client/clientInsert",
            method:"post",
            params:{
                clientId: changeID,
                clientColor: values.clientColor,
                clientDescription: values.clientDescription,
                clientName: values.clientName,
                clientState: values.clientState,
            }
        }).then(res=>{
            console.log(res);
            if(res.code===200)
            http({
                url:"/admin/client/list",
                method:"get",
                params:{
                    page: 1,
                    limit: 100,
                    name: "",
                }
            }).then(res=>{
                console.log(res.date);
                setData(res.date.list);
            })
            // setData(res.date.list);          
        })
        
    };
    const queren = () =>{
        setchangeLabel(false);
        
    }
    const changeOk = (value) => {
        setchangeLabel(false);
        console.log(value+111);
    };
    const changeCancel = () => {
        setchangeLabel(false);
    };

    //单选
    const [value, setValue] = useState(null);
    const onChange = (e) => {
        setValue(e.target.value);
    };
    const [values, setValues] = useState(null);
    const onChanges = (e) => {
        
        setValues(e.target.value);
    };
    



    return (
        <div>
            <div className={"myheader"}>
                <Form form={form}  layout="inline" onFinish={onFinish} className={'formBox'}>
                    <Form.Item name="searchID" /* rules={[{required:true,message: '请输入您要搜索的内容!',}]} */>
                        <Input  className='myInpt' size='large' prefix={"内容"} placeholder='请输入内容' />
                    </Form.Item>
                    <Form.Item>
                        <Button size='large' htmlType="submit">检索</Button> 
                    </Form.Item>
                    <Form.Item>
                        <Button size='large' onClick={allData}>重置</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button size='large' className='muBox' onClick={createModal}>新建标签</Button>
                    </Form.Item>
                </Form>
            </div>
            
            <div className={"mytabs"}>
                <Table  columns={columns} dataSource={Data} rowKey={(record)=> record.key} pagination={{pageSize:5}}
                align='center'/>
            </div>
                <Modal title="新建标签" open={createLabel} onOk={createOk} onCancel={createCancel} footer={null} destroyOnClose={true}>
                <Form form={createForm}  onFinish={createtip} preserve={false}>
                    <Form.Item name="labelName">
                        <Row> 
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={5} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>标签名称</Col>
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={16} style={{width:200}}><Input size='large'  placeholder='请输入' /></Col>
                        </Row>
                    </Form.Item>
                    <Form.Item name="labelDesc">
                        <Row> 
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={5} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>描述</Col>
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={16} style={{width:200}}><Input size='large'  placeholder='请输入' /></Col>
                        </Row>
                    </Form.Item>
                    <Form.Item name="labelCol">
                        <Row> 
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={5} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>颜色</Col>
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={16} style={{width:300}}>
                                <Radio.Group onChange={onChange} value={value} style={{marginTop:10}}>
                                    <Radio value={0}> <Tag color="#f50">标签</Tag></Radio>
                                    <Radio value={1}> <Tag color="#2db7f5">标签</Tag></Radio>
                                    <Radio value={2}> <Tag color="#87d068">标签</Tag></Radio>
                                    <Radio value={3}> <Tag color="#108ee9">标签</Tag></Radio> 
                                </Radio.Group> 
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item name="labelType">
                        <Row> 
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={5} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>状态</Col>
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={16} style={{width:300}}>
                                <Radio.Group onChange={onChanges} value={values} style={{marginTop:10}}>
                                    <Radio value={0}>启用</Radio>
                                    <Radio value={1}>禁用</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row>
                            <Col span={2} style={{visibility:'hidden'}}>1</Col>
                            <Col span={4} ><Button size='large' htmlType="submit" onClick={()=>{setcreateLabel(false);}}>确认</Button></Col>
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={4} ><Button size='large' onClick={()=>{createForm.resetFields();setcreateLabel(false);}}>取消</Button></Col>
                        </Row>
                    </Form.Item>
                </Form>
              </Modal>
              
              <Modal title="编辑标签" open={changeLabel} onOk={changeOk} onCancel={changeCancel} footer={null} destroyOnClose={true}>
                <Form form={changeForm}  onFinish={changetip} preserve={false} ref={formref}>
                    <Row> 
                        <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                        <Col span={5} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>标签名称</Col>
                        <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                        <Col span={16} style={{width:200}}>
                            <Form.Item name="clientName">
                                <Input size='large'  placeholder='请输入' />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Row> 
                        <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                        <Col span={5} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>描述</Col>
                        <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                        <Col span={16} style={{width:200}}>
                            <Form.Item name="clientDescription">
                                <Input size='large' placeholder='请输入' />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    
                    <Row> 
                        <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                        <Col span={5} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>颜色</Col>
                        <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                        <Col span={16} style={{width:300}}>
                            <Form.Item name="clientColor">
                                <Radio.Group onChange={onChange} value={value} style={{marginTop:10}}>
                                    <Radio value={0}> <Tag color="#f50">标签</Tag></Radio>
                                    <Radio value={1}> <Tag color="#2db7f5">标签</Tag></Radio>
                                    <Radio value={2}> <Tag color="#87d068">标签</Tag></Radio>
                                    <Radio value={3}> <Tag color="#108ee9">标签</Tag></Radio> 
                                </Radio.Group> 
                            </Form.Item>
                        </Col>
                    </Row>          
                    <Row> 
                        <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                        <Col span={5} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>状态</Col>
                        <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                        <Col span={16} style={{width:300}}>
                            <Form.Item name='clientState'>
                                <Radio.Group onChange={onChanges} value={values} style={{marginTop:10}}>
                                    <Radio value={0}>启用</Radio>
                                    <Radio value={1}>禁用</Radio>
                                </Radio.Group>
                            </Form.Item>
                         </Col>
                    </Row>
                    
                    <Form.Item>
                        <Row>
                            <Col span={2} style={{visibility:'hidden'}}>1</Col>
                            <Col span={4} ><Button size='large' htmlType="submit" onClick={queren}>确认</Button></Col>
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={4} ><Button size='large' onClick={()=>{createForm.resetFields();setchangeLabel(false)}}>取消</Button></Col>
                        </Row>
                    </Form.Item>
                </Form>
              </Modal>
        </div>
    )
}
export default Laabel