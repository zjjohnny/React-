import {useNavigate} from 'react-router-dom'
import React, { useState,useEffect } from 'react';
import './quan.scss';
import { Input,Select,Radio,DatePicker,ConfigProvider,Tabs,Space, Table, Button, Modal,
  Cascader,
  Form,
  InputNumber,
  Switch,
  TreeSelect} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import RefForm from 'rc-field-form';
import http from "../../../utils/http"


// 选择框第一个
const { Option } = Select;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
// 券的张数
const handleChangesl = (value) => {
  console.log(`selected ${value}`);
};
// 日期选择器
const { RangePicker } = DatePicker

// 指定商品弹框内的搜索框
const { Search } = Input;
const onSearch = (value) => console.log(value);

const Addquan = () => {

   // 页面表格渲染
   const [data,setData]=useState([])

   const [datat,setDatat]=useState([])

   const [datatka,setDatatka]=useState([])
   
   const [datatk,setDatatk]=useState([])
  // 表单提交
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
// 表单提交函数
  
    // 单选框的函数
    const [value, setValue] = useState(1);

    const onChange = (e) => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    };
    
// 日期选择器
const [dates, setDates] = useState(null);
  const [hackValue, setHackValue] = useState(null);
  const [valuea, setValuea] = useState(null);

  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }

    const tooLate = dates[0] && current.diff(dates[0], 'days') > 7;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open) => {
    if (open) {
      setHackValue([null, null]);
      setDates([null, null]);
    } else {
      setHackValue(null);
    }
  };
// 保存返回按钮
  const navigate=useNavigate()

//   商品标签栏
   const TabonChange = (key) => {
    console.log(key);
  };

//   指定商品表格
const columns = [
    
    {
      title: 'ID',
      dataIndex: 'goodsId',
      key: 'goodsId',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsDescription',
      key: 'goodsDescription',
      render: (text) => <a>{text}</a>,
    }
   ,
    {
      title: '操作',
      key: 'action',
      render: (_) => (
        <Space size="middle">
          
          <a>删除</a>
        </Space>
      ),
    },
  ];
  

  //   指定商品表格弹框
const columnstka = [
    
    {
      title: 'ID',
      dataIndex: 'goodsId',
      key: 'goodsId',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsDescription',
      key: 'goodsDescription',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '原价',
      dataIndex: 'goodsOriginal',
      key: 'goodsOriginal',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '销售价',
      dataIndex: 'goodsPrice',
      key: 'goodsPrice',
      render: (text) => <a>{text}</a>,
    }
   ,
    {
      title: '操作',
      key: 'action',
      render: (_) => (
        <Space size="middle">
          
          <a>加入</a>
        </Space>
      ),
    },
  ];
  
//   指定分类表格

const columnst = [
    {
      title: '分类名称',
      dataIndex: 'classifyName',
      key: 'classifyName',
      render: (text) => <a>{text}</a>,
    }
   ,
    {
      title: '操作',
      key: 'action',
      render: (e) => (
        <Space size="middle">
          
          <a>删除</a>
        </Space>
      ),
    },
  ];
 
  // 分类弹框
  const columnsk = [
    {
      title: '分类名称',
      dataIndex: 'classifyName',
      key: 'classifyName',
      render: (text) => <a>{text}</a>,
    }
   ,
    {
      title: '操作',
      key: 'action',
      render: (e) => (
        <Space size="middle">
          
          <a>删除</a>
        </Space>
      ),
    },
  ]
   
//   指定商品弹框
  const [isModalOpena, setIsModalOpena] = useState(false);

  const showModala = () => {
    setIsModalOpena(true);
    http({
      url:"/admin/goods/seckilGetGoods",
     method:"get",
     params:{
       page:1,
       limit:5
     }
    }).then(res=>{
     console.log(res);
     setDatatka(res.date.list);
     // 数据库的数据存放地址
  })
  // 给个空数组只调用一次
}

 

  const handleOka = () => {
    setIsModalOpena(false);
  };

  const handleCancela = () => {
    setIsModalOpena(false);
  };

//  指定分类弹框
  const [isModalOpenb, setIsModalOpenb] = useState(false);

  const showModalb = () => {
    setIsModalOpenb(true);
    http({
      url:"/admin/goods/selectGoods",
     method:"get",
     params:{
       page:1,
       limit:5,
       goodsState:0
     }
    }).then(res=>{
     console.log(res);
     setDatatk(res.date.list);
     // 数据库的数据存放地址
  })
  // 给个空数组只调用一次
}
  

  const handleOkb = () => {
    setIsModalOpenb(false);
  };

  const handleCancelb = () => {
    setIsModalOpenb(false);
    http({
      url:"/admin/goods/seckilGetGoods",
     method:"get",
     params:{
       page:1,
       limit:5
     }
    }).then(res=>{
     console.log(res);
     setData(res.date.list);
     // 数据库的数据存放地址
  })
  };

  useEffect(() => {
    http({
      url:"/admin/goods/seckilGetGoods",
     method:"get",
     params:{
       page:1,
       limit:5
     }
    }).then(res=>{
     console.log(res);
     setData(res.date.list);
     // 数据库的数据存放地址
  })
  // 给个空数组只调用一次
}, []);

useEffect(() => {
  http({
    url:"/admin/goods/getNameGoodsClass",
    method:"get",
   params:{
     page:1,
     limit:5
   }
  }).then(res=>{
   console.log(res);
   setDatat(res.date.list);
   // 数据库的数据存放地址
})
// 给个空数组只调用一次
}, []);


    return(
        <div>
             <Form
                  
                  ref={RefForm}
                  labelCol={{
                    span: 4,
                    }}
                   wrapperCol={{
                    span: 14,
                    }}
                   layout="horizontal"
                   initialValues={{
                    size: componentSize,
                    }}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize}
                     >
             <div className='yhqxx'>
                <p>优惠券信息</p>
                  <div className='quanbta'>
                    <button>取消</button>
                  </div>
                  <div className='quanbtb'>
                    <Form.Item>
                    <button onClick={()=>{
                         navigate('/main/YyYouHuiQuan') } 
                     }
                     htmlType="submit"
                     >
                       保存
                      </button>
                      </Form.Item>
                   </div>
             </div>

             <div>
             <Form.Item
             name="discountsType"
             >
               <p style={{marginTop:'30px',color:'red'}}>*</p>
                   <div style={{marginLeft:'15px',marginTop:'-34px',fontSize:'16px'}}>优惠券类型</div>
                  <div style={{marginLeft:'107px',marginTop:'-28px'}}>
                  <Select
                     defaultValue="注册赠送"
                     
                     style={{
                     width: 250,
                    }}
                     onChange={handleChange}
                      >
                    <Option value="jack">注册赠送</Option>
                   
                     <Option value="Yiminghe">全场赠送</Option>
                    </Select>
                  </div>
                  </Form.Item>
             </div>
             {/* 第二个输入框 */}
             <div>
             <Form.Item
              name="discountsName"
             >
                 <p style={{marginLeft:'130px',color:'red'}}>*</p>
                    <div style={{marginLeft:'144px',marginTop:'-35px',fontSize:'16px'}}>优惠券名称</div>
                     <div style={{marginLeft:'237px',marginTop:'-25px'}}>
                     <Input style={{width:'250px'}} placeholder='请输入优惠券名称'/>
                  </div>
                  </Form.Item>
             </div>
             {/* 第三个输入框 */}
             <div>
             <Form.Item
               name="discountsNumber"
             >
                 <p style={{marginLeft:'130px',marginTop:'5px',color:'red'}}>*</p>
                    <div style={{marginLeft:'146px',marginTop:'-35px',fontSize:'16px'}}>总发行量</div>
                     <div style={{marginLeft:'237px',marginTop:'-25px'}}>
                     <Input style={{width:'250px'}} placeholder='只能输入1张以上'/>
                  </div>
                </Form.Item>
             </div>
             {/* 第四个输入框 */}
             <div>
             <Form.Item
              name="discountsMoney"
             >
                 <p style={{marginLeft:'131px',marginTop:'0px',color:'red'}}>*</p>
                    <div style={{marginLeft:'148px',marginTop:'-30px',fontSize:'16px'}}>面额</div>
                     <div style={{marginLeft:'236px',marginTop:'-25px'}}>
                     <Input style={{width:'250px'}} placeholder='请输入面额'/>
                     <span style={{marginLeft:'7px',fontSize:'16px'}}>元</span>
                  </div>
                  </Form.Item>
             </div>
             {/* 第五个输入框 */}
             <div>
              <Form.Item
               
              >
                 <p style={{marginLeft:'131px',marginTop:'30px',color:'red'}}>*</p>
                    <div style={{marginLeft:'146px',marginTop:'-30px',fontSize:'16px'}}>每人限领</div>
                     <div style={{marginLeft:'250px',marginTop:'-25px'}}>
                     <Select
                        defaultValue="1张"
                        
                         style={{
                       width: 120,
                       
                     }}
                       onChange={handleChangesl}
                       >
                        <Option value="jack">1张</Option>
                        <Option value="lucy">2张</Option>
                        <Option value="disabled">3张</Option>
                        </Select>
                  </div>
                 </Form.Item>
             </div>
          {/* 第六个单选 */}
              <div>
              <Form.Item
              name="discountsAmount"
              >
                 <p style={{marginLeft:'131px',marginTop:'10px',color:'red'}}>*</p>
                    <div style={{marginLeft:'145px',marginTop:'-30px',fontSize:'16px'}}>使用门槛</div>
                     <div style={{marginLeft:'232px',marginTop:'-28px'}}>
                     <Radio.Group onChange={onChange} value={value} style={{marginLeft:'10px'}}>
                      <Radio value={1} style={{font:'26px'}}>无限制</Radio>
                      <Radio value={2}>满</Radio>
                      <Input style={{width:'60px'}}/>
                     </Radio.Group>
                     
                  </div>
                  <p style={{marginLeft:'455px',marginTop:'-25px'}}>元可用</p>
                  </Form.Item>
             </div>

             {/* 第七个时间 */}
             <div>
             <Form.Item
              name="discountsEndTime"
             >
                 <p style={{marginLeft:'132px',marginTop:'1px',color:'red'}}>*</p>
                    <div style={{marginLeft:'145px',marginTop:'-30px',fontSize:'16px'}}>使用时间</div>
                     <div style={{marginLeft:'255px',marginTop:'-25px'}}>
                     <ConfigProvider locale={zhCN}>
                     <RangePicker
                     style={{width:'250px',marginLeft:'-20px'}}
                     value={hackValue || valuea}
                     disabledDate={disabledDate}
                      onCalendarChange={(val) => setDates(val)}
                     onChange={(val) => setValuea(val)}
                      onOpenChange={onOpenChange}
                     />
                     </ConfigProvider>
                  </div>
                  </Form.Item>
             </div>

             {/* 备注输入框 */}
             <div>
             <Form.Item>
                 <p style={{marginLeft:'135px',marginTop:'10px',color:'red'}}>*</p>
                    <div style={{marginLeft:'150px',marginTop:'-30px',fontSize:'16px'}}>备注</div>
                     <div style={{marginLeft:'255px',marginTop:'-25px'}}>
                      <Input style={{width:"250px",marginLeft:'-20px'} }placeholder='请输入备注'/>
                  </div>
                  </Form.Item>
             </div>

             <div className='shopnav'>
                <p>可使用商品</p>
             </div>

             <div>
             <Tabs
                 style={{
                    marginLeft:'30px',
                  
                    width:'500px',
                    height:'400px'
                 }}
                defaultActiveKey="1"
                onChange={TabonChange}
                items={[
                      {
                      label: `全部商品`,
                      key: '1',
                      children: ``,
                      },
                      {
                      label: `指定商品`,
                      key: '2',
                      children: (
                      <div>
                        <Button onClick={showModala} 
                         style={{width:'120px',height:'40px',textAlign:'center',lineHeight:'20px'}}
                        >
                        选择商品
                       </Button>
       
                      <Table columns={columns} dataSource={data} />
                      </div>
                      ),
                      },
                      {
                      label: `指定分类`,
                      key: '3',
                      children: 
                      (
                        <div>
                          <Button  onClick={showModalb} 
                           style={{width:'120px',height:'40px',textAlign:'center',lineHeight:'20px'}}
                          >
                          选择分类
                         </Button>
         
                        <Table columns={columnst} dataSource={datat} />
                        </div>
                        ),
                      
                       },
                     ]}
                   />
             </div>

             {/* 商品弹框 */}
             <Modal title="选择商品" open={isModalOpena} onOk={handleOka} onCancela={handleCancela}>
             <Search
             style={{
                float:'left',
                
             }}
                  placeholder="请输入搜索内容"
                  allowClear
                  enterButton="搜索"
                  size="middle"
                  onSearch={onSearch}
                  />
             <Table columns={columnstka} dataSource={datatka} />
            </Modal>

            {/* 分类弹框 */}
            <Modal title="选择分类" open={isModalOpenb} onOk={handleOkb} onCancelb={handleCancelb}>
             <Table columns={columnsk} dataSource={datatk} />
            </Modal>
            </Form>
        </div>
    )
}
  
export default Addquan;