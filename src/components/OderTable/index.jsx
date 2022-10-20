import React,{ useEffect, useState } from "react";
import http from "../../utils/http";
import {useNavigate } from "react-router-dom";
import "./index.scss";
import { Table, Tabs ,Button} from "antd";

// 标签页
const onChange = (key) => {
  console.log(key);
};


const OderTable=()=>{
  // 全部表格数据
const columns = [
  {
    title: "订单号",
    dataIndex: "orderNo",
    key: "orderNo",
    render: (text) => <a>{text}</a>,
    width: 100,
  },
  {
    title: "下单时间",
    dataIndex: "orderTime",
    key: "orderTime",
    width: 150,
  },
  {
    title: "所属团长",
    dataIndex: "regimentName",
    key: "regimentName",
    ellipsis: true,
  },
  {
    title: "收货人",
    dataIndex: "consignee",
    key: "consignee",
    ellipsis: true,
  },
  {
    title: "联系方式",
    dataIndex: "consigneePhone",
    key: "consigneePhone",
    ellipsis: true,
  },
  {
    title: "商品数量",
    dataIndex: "goodsNumber",
    key: "goodsNumber",
    ellipsis: true,
  },
  {
    title: "实付金额",
    dataIndex: "payAmount",
    key: "payAmount",
    ellipsis: true,
  },
  {
    title: "订单状态",
    dataIndex: "orderStatus",
    key: "orderStatus",
    ellipsis: true,
  },
  {
    title: "操作",
    dataIndex: "link",
    key: "link",
    render: (_,record) => {
      // <NavLink to='/main/OrderDetails'>
      //   查看
      // </NavLink>
      return(
  
        <Button onClick={()=>{showDetail(record)}} type='link'>查看订单</Button>
      )} ,
    ellipsis: true,
  },
];

// 拼团订单页面
const columnss = [
  {
    title: "订单号",
    dataIndex: "orderNo",
    key: "orderNo",
    render: (text) => <a>{text}</a>,
    width: 100,
  },
  {
    title: "下单时间",
    dataIndex: "orderTime",
    key: "orderTime",
    width: 150,
  },
  {
    title: "所属团长",
    dataIndex: "regimentName",
    key: "regimentName",
    ellipsis: true,
  },
  {
    title: "收货人",
    dataIndex: "consignee",
    key: "consignee",
    ellipsis: true,
  },
  {
    title: "联系方式",
    dataIndex: "consigneePhone",
    key: "consigneePhone",
    ellipsis: true,
  },
  {
    title: "商品数量",
    dataIndex: "goodsNumber",
    key: "goodsNumber",
    ellipsis: true,
  },
  {
    title: "实付金额",
    dataIndex: "payAmount",
    key: "payAmount",
    ellipsis: true,
  },
  {
    title: "订单状态",
    dataIndex: "orderStatus",
    key: "orderStatus",
    ellipsis: true,
  },
  {
    title: "活动",
    dataIndex: "orderType",
    key: "orderType",
    render: (text) => <a>{text}</a>,
    width: 100,
  },
  {
    title: "操作",
    dataIndex: "link",
    key: "4",
    render: (_,record) => {
      console.log(_,record)
          // <NavLink  onClick={()=>{showDetail(record)}} to='/main/OrderDetails'>
      //   查看
      // </NavLink>
      return(
  
      <Button onClick={()=>{showDetail(record)}} type='link'>查看订单</Button>
    )} ,
    ellipsis: true,
  },
];
  const [data, setData] = useState([]);
  useEffect(() => {
 // 订单表格分页
 http({
  url: "/admin/orderGoods/getListBy",
  method: "get",
  params:{
    pageNum:1,
    pageSize:10
 }
}).then((res) => {
  console.log(res);
  setData(res.date.list);
});
  },[])

  const navigate = useNavigate();
  const showDetail=(record)=>{
    navigate('/main/OrderDetails',{state:{record:record}})
}
   
  
    return (
      <div className="container-T">
        <Tabs
          defaultActiveKey="1"
          onChange={onChange}
          items={[
            {
              label: `全部`,
              key: "1",
              children: <Table columns={columns} dataSource={data}  pagination={{pageSize:4}} rowKey="orderNo"/>,
            },
            {
              label: `普通订单`,
              key: "2",
              children: <Table columns={columnss} dataSource={data} pagination={{pageSize:4}} rowKey="orderNo"/>,
            },
            {
              label: `秒杀`,
              key: "3",
              children: <Table columns={columnss} dataSource={data} pagination={{pageSize:4}} rowKey="orderNo"/>,
            },
            {
              label: `拼团`,
              key: "4",
              children: <Table columns={columnss} dataSource={data} pagination={{pageSize:5}} rowKey="orderNo"/>,
            },
          ]}
        />
         {/* <Pagination defaultCurrent={1} total={50} columns={columns} dataSource={data}  pagination={{pageSize:5}}/> */}
      </div>
    );
  }


export default OderTable;
