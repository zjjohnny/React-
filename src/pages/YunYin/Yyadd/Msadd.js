import {useNavigate} from 'react-router-dom'
import React, { useState } from 'react';
import './msadd.scss';
import { Input,DatePicker,ConfigProvider,Radio,Table,Button,Modal,Space} from 'antd';


// 以下4行引入解决日期控件英文的问题
import zhCN from 'antd/es/locale/zh_CN';
// 时间选择器的函数
const { RangePicker } = DatePicker;
// 线上和线下单选框函数
const onChange = (e) => {
  console.log(`radio checked:${e.target.value}`);
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
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '原价',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '销售价',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '秒杀价格',
    dataIndex: 'msjg',
    key: 'msjg',
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
    dataIndex: 'age',
    key: 'age',
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
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '排序',
    dataIndex: 'age',
    key: 'age',
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
    title: '操作',
    dataIndex: '',
    key: 'x',
    render: () => <p>删除</p>,
  },
];
const data = [
  {
    key: 1,
    id:'1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    id:'2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    id:'3',
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    id:'4',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];
// 弹窗数据存放
const columnsa = [
  {
    title: 'ID',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '商品名称',
    dataIndex: 'addressa',
    key: 'addressa',
  },
  {
    title: '原价',
    dataIndex: 'age',
    key: 'age',
  },{
    title: '销售价',
    dataIndex: 'addressb',
    key: 'address',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>加入</a>
      </Space>
    ),
  },
];
const dataa = [
  {
    key: '1',
    id:'1234',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    addressa: 'London No. 1 Lake Park',
    addressb: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const Addms=()=>{

  // 选择商品按钮弹窗
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

  //  时间选择器
  const [dates, setDates] = useState(null);
  const [hackValue, setHackValue] = useState(null);
  const [value, setValue] = useState(null);

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

  //  页面跳转
  const navigate=useNavigate()


//  const 
//   http({
//     url:`/admin/seckill/ScekillDeletGetId/${pid}`,
//     method:"post",

//   }).then((res)=>{
//     console.log(res);
//    if(res.code === 200){
//     message.info("删除成功");
//     http({
//       url:"/admin/seckill/showSeckill",
//      method:"get",
//      params:{
//        page:1,
//        limit:6
//      }
//     }).then(res=>{
//     //  console.log(res);
//      setData(res.date.list);
//      // 数据库的数据存放地址
//   }) 

  return(
    
    <div>
           <div className='navms'>
           
            <p>秒杀信息</p>
                <div className='msbta'>
                    <button>取消</button>
                </div>
                <div className='msbtb'>
                  
                    <button onClick={()=>{
                         navigate('/main/Yyms') 
                        //  onSave()}
                       
                          
                    }
                     }>
                       保存
                      </button>
                </div>

         {/* 输入框 */}
   
             <div style={{float:'left'}}>
                   <p style={{float:'left',marginLeft:'-31px',marginTop:'48px',color:'red'}}>*</p>
                   <div style={{float:'left',marginTop:'50px',marginLeft:'-20px',fontSize:'16px'}}>活动名称</div>
                  <div style={{width:'260px',height:'46px',marginTop:'40px',float:'left',marginLeft:'20px'}}>
                    <Input placeholder="请输入活动名称" style={{height:'46px'}} />
                  </div>

                  <p style={{float:'left',marginLeft:'-355px',marginTop:'138px',color:'red'}}>*</p>
                   <div style={{float:'left',marginTop:'140px',marginLeft:'-345px',fontSize:'16px'}}>活动时间</div>
                  <div style={{width:'260px',height:'46px',marginTop:'130px',float:'left',marginLeft:'-260px'}}>
                  <ConfigProvider locale={zhCN}>
                  <RangePicker
                  style={{height:'46px'}}
                    value={hackValue || value}
                    disabledDate={disabledDate}
                    onCalendarChange={(val) => setDates(val)}
                    onChange={(val) => setValue(val)}
                    onOpenChange={onOpenChange}
                    />
                   </ConfigProvider>
                  </div>

                  <p style={{float:'left', marginLeft:'-326px',marginTop:'218px',color:'red'}}>*</p>
                   <div style={{float:'left',marginTop:'220px',marginLeft:'-315px',fontSize:'16px'}}>状态</div>
                     <Radio.Group onChange={onChange} defaultValue="a" style={{float:'left',marginTop:'220px',marginLeft:'-260px',color:'red'}}>
                     <Radio.Button value="a">上线</Radio.Button>
                     <Radio.Button value="b">下线</Radio.Button>
                     </Radio.Group>

              </div>
             
          </div>
       
        <div className='msxx'>
                <p>商品信息</p>
        </div>

        <div style={{float:'left',marginLeft:'-1440px',marginTop:'360px'}}>
        <>
          <Button onClick={showModal} className={'Xzsp'}>
           选择商品
           </Button>
           <div>
            <Modal title="选择商品" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
             <div style={{width:'300px'}}>
             <Input placeholder="商品ID/商品名称" style={{height:'38px'}}/>
             <button style={{float:'left',marginLeft:'310px',marginTop:'-38px',width:'80px',height:'38px',borderColor:'rgba(235, 235, 235, 0.838)'}}
              className={'Ssuo'}
             >搜索</button>
             </div>
             <Table columns={columnsa} dataSource={dataa} />
           </Modal>
           </div>
        </>
        </div>

        <div style={{width:'95%',marginTop:'80px',float:'left',marginLeft:'30px'}}>
        <Table
               columns={columns}
               
             
               dataSource={data}
               />
        </div>
    </div>
  )
  

}


export default Addms;