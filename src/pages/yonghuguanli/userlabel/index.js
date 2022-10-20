import { Input,Button,Modal,Tag,Radio,Space,Table,Row,Col,Form,} from 'antd';
import './index.scss'
import React, { useState,useEffect,}  from 'react';
import http from '../../../utils/http'
// import { useLocation } from 'react-router-dom';

const Userlabel=()=>{
    // const {state:{record}} = useLocation();
    const columns = [
        {
            title: '标签名称',//表格列名
            //对应数据字段
            key: 'labelName',//该列的唯一值
            render: (text) => {
                if (text.color==="紫色") {
                    return <Tag color='purple'>{text.labelName}</Tag>
                }
                else if(text.color==="蓝色"){
                    return <Tag color='blue'>{text.labelName}</Tag>
                }
                else if(text.color==="橙色"){
                    return <Tag color='orange'>{text.labelName}</Tag>
                }
                else{
                    return <Tag color='black'>{text.labelName}</Tag>
                }
              }
        },
        {
            title: '状态',
            key: 'status',
            render: (text) => {
                return <span >{text.status==="启用"?"启用":"禁用"}</span>
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
            url:"/admin/users/getUserLabelListOrByLabelName",
            method:"get",
            params:{
                pageNum: 1,
                pageSize: 100,
                labelName: "",
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
        http({
            url:'/admin/users/getUserLabelListOrByLabelName',
            method:"get",
            params:{
                pageNum: 1,
                pageSize: 100,
                labelName: values.labelName,
            }
        }).then(res=>{
            console.log(res.date.list);
            setData(res.date.list);            
        })
      };

    //重置
    const allData = () => {
        form.resetFields();
        http({
            url:"/admin/users/getUserLabelListOrByLabelName",
            method:"get",
            params:{
                pageNum: 1,
                pageSize: 100,
                labelName: "",
            }
        }).then(res=>{
            console.log(res.date);
            setData(res.date.list);
        })
    }

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
            clientName:record.labelName,
            clientColor:record.color,
            clientState:record.status
        })
    };
    const changetip=(values)=>{
        console.log('编辑标签：',values.clientColor);     
        http({
            url:"/admin/users/saveOrUpdateUserLabel",
            method:"post",
            params:{
                color: values.clientColor,
                labelName: values.clientName,
                status: values.clientState,
                description:""
            }
        }).then(res=>{
            console.log(res);
            if(res.code===200)
            http({
                url:"/admin/users/getUserLabelListOrByLabelName",
                method:"get",
                params:{
                    pageNum: 1,
                    pageSize: 100,
                    labelName: "",
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
                    <Form.Item name="labelName" /* rules={[{required:true,message: '请输入您要搜索的内容!',}]} */>
                        <Input  className='myInpt' size='large' prefix={"内容"} placeholder='请输入内容' />
                    </Form.Item>
                    <Form.Item>
                        <Button size='large' htmlType="submit">检索</Button> 
                    </Form.Item>
                    <Form.Item>
                        <Button size='large' onClick={allData}>重置</Button>
                    </Form.Item>
                </Form>
            </div>
            
            <div className={"mytabs"} style={{marginTop:20,height:490}}>
                <Table  columns={columns} dataSource={Data} rowKey={(record)=> record.key} pagination={{pageSize:5}}
                align='center'/>
            </div>
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
                        <Col span={5} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>颜色</Col>
                        <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                        <Col span={16} style={{width:300}}>
                            <Form.Item name="clientColor">
                                <Radio.Group onChange={onChange} value={value} style={{marginTop:10}}>
                                    <Radio value={"紫色"}> <Tag color="purple">标签</Tag></Radio>
                                    <Radio value={"蓝色"}> <Tag color="blue">标签</Tag></Radio>
                                    <Radio value={"橙色"}> <Tag color="orange">标签</Tag></Radio>
                                    <Radio value={"黑色"}> <Tag color="black">标签</Tag></Radio> 
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
                                    <Radio value={"启用"}>启用</Radio>
                                    <Radio value={"禁用"}>禁用</Radio>
                                </Radio.Group>
                            </Form.Item>
                         </Col>
                    </Row>
                    
                    <Form.Item>
                        <Row>
                            <Col span={2} style={{visibility:'hidden'}}>1</Col>
                            <Col span={4} ><Button size='large' htmlType="submit" onClick={queren}>确认</Button></Col>
                            <Col span={1.5} style={{visibility:'hidden'}}>1</Col>
                            <Col span={4} ><Button size='large' onClick={()=>{setchangeLabel(false)}}>取消</Button></Col>
                        </Row>
                    </Form.Item>
                </Form>
              </Modal>
        </div>
    )
}
export default Userlabel