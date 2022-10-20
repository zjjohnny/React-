import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom'
import React, { useState } from 'react';
import BraftEditor from 'braft-editor'// 引入编辑器组件
import { Form,Input,Radio,message, Upload,Button,Space,Row,Col,Modal,Table} from 'antd';
import './create.scss'

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
  

// 表格的数据
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '商品名称',
    dataIndex: 'goodsname',
    key: 'goodsname',
  },
  {
    title: '原价',
    dataIndex: 'oldprice',
    key: 'oldprice',
  },
  {
    title: '销售价',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '秒杀价格',
    dataIndex: 'msprice',
    key: 'msprice',
    render:()=>(
        <Input onChange={(e)=>{
          const [a,aSet]=useState([])
          let myA=[...a]
          myA.push(e.target.value)
          aSet(myA)
          console.log(a)

        }}/>
    )
  },
  {
    title: '秒杀数量',
    dataIndex: 'msNum',
    key: 'msNum',
    render:()=>(
        <Input onChange={(e)=>{
          const [a,aSet]=useState([])
          let myA=[...a]
          myA.push(e.target.value)
          aSet(myA)
          console.log(a)

        }}/>
    )
  },
  {
    title: '剩余数量',
    dataIndex: 'Num',
    key: 'Num',
  },
  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    render: () => <a><Button>Delete</Button></a>,
  },
];
const data = [
  {
    key: 1,
    id: 2,
    goodsname: '鸭儿',
    oldprice: 132,
    price: 130,
    msprice: 100,
    msNum: 100,
    Num: 1000,
  },
  {
    key: 2,
    id: 2,
    goodsname: '牙刷',
    oldprice: 50,
    price: 40,
    msprice: 10,
    msNum: 1020,
    Num: 1024,
  },
  {
    key: 3,
    id: 3,
    goodsname: '牙膏',
    oldprice: 132,
    price: 100,
    msprice: 10,
    msNum: 100,
    Num: 1000,
  },
  {
    key: 4,
    id: 4,
    goodsname: '小鸡',
    oldprice: 300,
    price: 200,
    msprice: 50,
    msNum: 1000,
    Num: 2000,
  },
];
// 弹窗数据存放
const tank = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '商品名称',
    dataIndex: 'goodsname',
    key: 'goodsname',
  },
  {
    title: '原价',
    dataIndex: 'oldprice',
    key: 'oldprice',
  },{
    title: '销售价',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a><Button>加入</Button></a>
      </Space>
    ),
  },
];
const dataL = [
  {
    key: '1',
    id:'1',
    goodsname: '鸭儿',
    oldprice: 132,
    price: 130,
  },
  {
    key: '2',
    id:'12',
    goodsname: '牙刷',
    oldprice: 20,
    price: 10,
  },
  {
    key: '3',
    id:'123',
    goodsname: '牙膏',
    oldprice: 40,
    price: 30,
  },
  {
    key: '4',
    id:'1234',
    goodsname: '苹果',
    oldprice: 32,
    price: 30,
  },
  {
    key: '5',
    id:'12345',
    goodsname: '葡萄',
    oldprice: 32,
    price: 30,
  },
  {
    key: '6',
    id:'12346',
    goodsname: '戒指',
    oldprice: 99999+1,
    price: 99999,
  },
];

const Addth=()=>{
    //表单存放在form中
    const [form] = Form.useForm();
    const onFinish = (values) => {
      console.log('Finish:', values);
    };
    //专题状态
    const [value, setValue] = useState(null);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
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

  //  页面跳转
  const navigate=useNavigate()

  // 副文本编辑框的值
  const [editorValue, seteditorValue] = useState('')
  const [editorState, seteditorState] = useState('');
  const [outputHTML, setoutputHTML] = useState('');
  const handleChange = (e) => {
    console.log('%c ======>>>>>>>>','color:orange;',e.toHTML().replace(/<[^>]+>/g, ""))
    seteditorValue(e.toHTML().replace(/<[^>]+>/g, ""))
    seteditorState(e)
    setoutputHTML(e.toHTML())
  }
  const submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const outputHTML = editorState.toHTML()
  }
//模态 j加入商品
    const [addGood] = Form.useForm();
    const [addGoods, setaddGood] = useState(false);
    const createModal = () => {
        setaddGood(true);
    };
    const addFinish=(values)=>{
        console.log('加入商品',values);
    };
    const addOk = () => {
        setaddGood(false);
    };
    const addCancel = () => {
        setaddGood(false);
    };

  return(
    
    <div className='alBox'>
        <Form form={form}  layout="inline" onFinish={onFinish}> 
            <div className='firstBox'>
                <i style={{fontSize:'18px',width:"200px",textAlign:'center',lineHeight:'40px'}}>专题基本信息</i>
            
                <Button size='large' style={{float:'right',width:"100px",margin:'0 30px'}} htmlType="submit"  /* onClick={()=>{navigate('/main/thematic')}} */>保存</Button> 
                <Button size='large' style={{float:'right',width:"100px"}} onClick={()=>{form.resetFields()}}>取消</Button>
            </div>
            <div className='secondBox'>
                <Form.Item name="tipName" className='padBox'>
                    <Row> 
                        <Col span={1} style={{visibility:'hidden'}}>1</Col>
                        <Col span={2} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>专题名称</Col>
                        <Col span={1} style={{visibility:'hidden'}}>1</Col>
                        <Col span={7} style={{width:200}}><Input size='large'  placeholder='请输入广告名称' /></Col>
                    </Row>
                </Form.Item>
                <Form.Item name="tipDes" className='padBox'>
                    <Row> 
                        <Col span={1} style={{visibility:'hidden'}}>1</Col>
                        <Col span={2} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>专题描述</Col>
                        <Col span={1} style={{visibility:'hidden'}}>1</Col>
                        <Col span={10} style={{width:200}}><Input size='large'  placeholder='请输入排序号' /></Col>
                    </Row>
                </Form.Item>
                <Form.Item name="tipType" className='padBox'>
                    <Row> 
                        <Col span={1} style={{visibility:'hidden'}}>1</Col>
                        <Col span={2} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>专题状态</Col>
                        <Col span={1} style={{visibility:'hidden'}}>1</Col>
                        <Col span={6} style={{width:300}}>
                            <Radio.Group onChange={onChange} value={value} style={{marginTop:10}}>
                                <Radio value='1'>上线</Radio>
                                <Radio value='2'>下线</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                </Form.Item>    
            </div>
            <div className='firstBox'>
                <i style={{fontSize:'18px',width:"200px",textAlign:'center',lineHeight:'40px'}}>展示图片</i>
            </div>
            <div className='secondBox'>
                <Form.Item name="tipPhoto">
                    <Row> 
                        <Col span={1} style={{visibility:'hidden'}}>1</Col>
                        <Col span={2} style={{fontSize:'16px',textAlign:"right",lineHeight:'40px',height:'40px'}}>头图</Col>
                        <Col span={1} style={{visibility:'hidden'}}>1</Col>
                        <Col span={6} style={{width:300}}>
                            <Upload name="avatar" listType="picture-card" className="avatar-uploader" showUploadList={false} action="https://www.mocky.io/v2/5cc8019d300000980a055e76" beforeUpload={beforeUpload} onChange={PhotoChange}>
                                    {imageUrl ? (<img src={imageUrl} alt="avatar"style={{width: '100%',}}/>) : (uploadButton)}
                            </Upload>
                        </Col>
                    </Row>
                </Form.Item>
            </div>
            <div className='firstBox'>
                <i style={{fontSize:'18px',width:"200px",textAlign:'center',lineHeight:'40px'}}>文字描述</i>
            </div>
            <div className='secondBox'>
                {/* <div className='thirdBox'> */}
                    <Form.Item name="tipFont">
                        <BraftEditor value={editorState} onChange={handleChange} onSave={submitContent} /> 
                    </Form.Item>
                {/* </div> */}
            </div>
            <div className='firstBox'>
                <i style={{fontSize:'18px',width:"200px",textAlign:'center',lineHeight:'40px'}}>关联商品</i>
            </div>
            <div className='secondBox'>
                
                <Button className='changeC' size='large' onClick={createModal}>选择商品</Button>

                <Modal title="加入商品" open={addGoods} onOk={addOk} onCancel={addCancel} footer={null}>
                <Form form={addGood}  onFinish={addFinish}>
                    <Form.Item name="goodsName">
                        <Row>      
                            <Col span={12} ><Input size='large'  placeholder='商品ID/商品名称' /></Col>
                            <Col span={1} style={{visibility:'hidden'}}>1</Col>
                            <Col span={4} style={{}}><Button size='large' htmlType="submit">搜索</Button></Col>
                        </Row>
                    </Form.Item>
                    <Form.Item name="goodsmenu">
                        <Table columns={tank} dataSource={dataL} pagination={{pageSize:5}}/>
                    </Form.Item>
                    <Form.Item>
                        <Row>
                            <Col span={15} style={{visibility:'hidden'}}>1</Col>
                            <Col span={2} ><Button size='large' htmlType="submit">确定</Button></Col>
                            <Col span={1} style={{visibility:'hidden'}}>1</Col>
                            <Col span={2} ><Button size='large' >取消</Button></Col>
                        </Row>
                    </Form.Item>
                </Form>
              </Modal>
            </div>
            <div className='secondBox'>
            <Table columns={columns} dataSource={data} pagination={{pageSize:5}}/>
            </div>
        </Form>
        
    </div>
  )
}


export default Addth;