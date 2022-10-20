import React, { useState,useEffect } from 'react';
          
import { Input,Select,DatePicker,Space, Table,Pagination,ConfigProvider,Popconfirm,Button,message } from 'antd';
import './Yy.ms.scss';
import { NavLink} from 'react-router-dom'

import  http from '../../utils/http';
// 以下4行引入解决日期控件英文的问题
import moment from 'moment'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import 'moment/locale/zh-cn';
import zhCN from 'antd/es/locale/zh_CN';
moment.locale('zh-cn')


const { Option } = Select;
const onChange = (value) => {
  console.log(`selected ${value}`);
};

const { Search } = Input;
const onSearch = (value) => {
  console.log('search:', value);
};



 

const YunYin = () => {
  // 表格数据
const columns = [
  {
    title: '序号',
    dataIndex: 'discountsId',
    key: 'discountsId',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '优惠券名称',
    dataIndex: 'discountsName',
    key: 'discountsName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '优惠券类型',
    dataIndex: 'discountsType',
    key: 'discountsType',
  },

  {
    title: '使用门槛',
    key: 'discountsAmount',
    dataIndex: 'discountsAmount',
    
  },
  {
    title: '面值',
    key: 'discountsMoney',
    dataIndex: 'discountsMoney',
    
  },
  {
    title: '开始时间',
    key: 'discountsStartTime',
    dataIndex: 'discountsStartTime',
    
  },{
    title: '结束时间',
    key: 'discountsEndTime',
    dataIndex: 'discountsEndTime',
    
  },
  {
    title: '状态',
    key: 'state',
    dataIndex: 'state',
    
  },
  {
    title: '操作',
    key: 'action',
    render: (_,record) => (
      <Space size="middle">
         <Popconfirm okText="确定" cancelText="取消" title="你确定要下线该条数据吗？"
           onConfirm={()=>{
             xiaxian(record);
             console.log(record)
           }}
         >
            <Button >下线</Button>
       
        </Popconfirm>


        <Popconfirm okText="确定" cancelText="取消" title="你确定要删除该条数据吗？"
         onConfirm={()=>{ 
          handleDelete(record.seckillId);
          // console.log(record)
         }}
        >
            <Button type='primary'>删除</Button>
        </Popconfirm>
      </Space>
    ),
    }
];
 // 首页表格渲染函数
 const [data,setData]=useState([]);
  // 分页
  const [page,setPage] = useState(1)
  const [pageSize,setPageSize] = useState(5)
  const [pageCount ,setPageCount] =useState()
  // 时间选择器的函数
  const [dates, setDates] = useState(null);
  const [hackValue, setHackValue] = useState(null);
  const [value, setValue] = useState(null);

  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }

    const tooLate = dates[0] && current.diff(dates[0], 'days') > 30;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 30;
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

  const { RangePicker } = DatePicker;
  
   // 重置
const reset=()=>{
  http({
    url:"/admin/discounts/list",
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
};
   // 页面表格接口
   useEffect(() => {
    http({
       url:"/admin/discounts/list",
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
},[]);

 // 查询接口
 let par = [];
 const quanSearch = (values) => {
   http({
     url:`/admin/discounts/shoOne/${values}`,
     method:"get"
     
   }).then(res=>{
    console.log(res);
   
 
     par.push(res.date);
     setData(par);
     console.log(par)
   
    
    // 数据库的数据存放地址
}, )

 }

  //分页
  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };
  const changePage = (page, pageSize) => {
    console.log(page, pageSize);
    setPage(page);
    setPageSize(pageSize)
    sendHttp(page,pageSize)
  }
  const sendHttp = (page,pageSize)=>{
    http({
      url: '/admin/discounts/list',
      method: 'get',
      params: {
          page: page,
          limit: pageSize
      }
  }).then(res=>{
      console.log(res);
      setPageCount(res.date.count)
      setData(res.date.list)
  })
  }
  useEffect(()=>{
    sendHttp(page,pageSize)
      
  },[])
      
  // 下线商品
  const xiaxian = (data) => {
    console.log(data)
    http({
      url:`/admin/seckill/ScekillStateGetId/${data.seckillId}/${data.seckillState}`,
      method:"post",
    
    }).then((res)=>{
      console.log(res);
      if(res.code === 200){
        message.info("下线成功");
        console.log(res)

        http({
          url:"/admin/discounts/list",
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
    
       }else{
         message.error("下线失败");
       
      }
    })
  }
  
// 商品删除
  const handleDelete = (pid) => {
    console.log(pid)
  http({
    url:`/admin/discounts/deleteGoodsClass/${pid.discountsId}`,
    method:"post",

  }).then((res)=>{
    console.log(res);
   if(res.code === 200){
    message.info("删除成功");
    http({
      url:"/admin/discounts/list",
     method:"get",
     params:{
       page:1,
       limit:5
     }
    }).then(res=>{
    //  console.log(res);
     setData(res.date.list);
     // 数据库的数据存放地址
  })

   }else{
     message.error("删除失败");
   }
   // 数据库的数据存放地
})

};


  return (
    <div>
      <div className='putbj'>
        <div style={{width:'300px',height:'300px',marginLeft:'20px',
            marginTop:'20px'
        }} >
           <Search
             placeholder="请输入搜索内容"
              onSearch={quanSearch}
              style={{
              width: 250,
              }}
               />
        </div>

        {/* 活动状态输入框 */}
         <div  style={{width:'200px',marginLeft:'360px',float:'left',marginTop:'-300px'}}>
          <div className='ztput'>
            上线状态
          </div>
           <Select
           showSearch
           key={'jack'}
           defaultValue={'jack'}
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              style={{width:'200px',marginLeft:'80px',float:'left', marginTop:'-32px'}}
            >
            <Option value="jack" key={'jack'}>全部</Option>
            <Option value="lucy">进行中</Option>
            <Option value="tom">已结束</Option>
            </Select>
         </div>


         <div  style={{width:'200px',marginLeft:'690px',float:'left',marginTop:'-300px'}}>
          <div className='ztputa'>
            活动时间
          </div>
          <RangePicker
           style={{float:'left',position:'absolute',marginLeft:'79px',marginTop:'-32px'}}
           locale={locale}
           value={hackValue || value}
           disabledDate={disabledDate}
           onCalendarChange={(val) => setDates(val)}
           onChange={(val) => setValue(val)}
           onOpenChange={onOpenChange}
          />
         </div>

          <div className='btna'>
            检索
          </div>
          <div className='btnb' onClick={reset}>
            重置
          </div>
          <div className='btnc'>
          <NavLink to={"/main/Addquan"} style={{color:' #a7a5a5'}}>新建优惠券</NavLink>
          </div>
        </div>

        <div className='exclbj'>
        <Table columns={columns} dataSource={data} pagination={false} />
        <ConfigProvider locale={zhCN}>
        <Pagination 
              locale={locale}
              current = {page}
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              onChange={changePage}
              defaultCurrent={page}
              pageSize = {pageSize}
              total={pageCount}
              pageSizeOptions = {[5,10,15,20]}
              defaultPageSize = {5} />
          </ConfigProvider>
        </div>
    </div>
  )
};

export default YunYin;
