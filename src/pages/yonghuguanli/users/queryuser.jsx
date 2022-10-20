import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {Table,Tag,Descriptions,message} from 'antd';
import "./queryuser.scss";
import http from "../../../utils/http";
const Queryuser=()=>{
  const { state } = useLocation();
  //产看的用户
  const [queryuser, setQueryuser] = useState({});
  //用户标签
  const [biaoqian, setBiaoqian] = useState({});
  //订单
  const [dataSource,setDataSource] = useState([]);
  //提货人
  const [data,setData]= useState([]);
  useEffect(()=>{
    getCheckQueryuser();
      },[]);

  const getCheckQueryuser=()=>{
    http({
            url:"/admin/users/getUserById",
            method:"get",
            params:{
              pageNum:1,
              pageSize:5,
              userNo:state.userNo
           }
          }).then(res=>{
           console.log(res.date);
          if (res.code !== 200) return message.error("获取商品信息失败");
            setQueryuser(res.date[0])
            setBiaoqian(res.date[1][0])
            setDataSource(res.date[4].list)
            setData(res.date[2][0])
           // 数据库的数据存放地址
        })
        // 给个空数组只调用一次
  }
      
      const columns = [
        {
          title: '订单号',
          dataIndex: 'orderNo',
          key: 'orderNo',
        },
        {
          title: '订单金额',
          dataIndex: 'money',
          key: 'money',
        },
        {
          title: '实际支付金额',
          dataIndex: 'payAmount',
          key: 'payAmount',
        }, 
        {
            title: '状态',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
        }, 
        {
            title: '订单时间',
            dataIndex: 'orderTime',
            key: 'orderTime',
        },
      ];

    return (
    <div style={{marginTop:20,marginLeft:20}}>
    <Descriptions
      title="用户信息"
      bordered
      column={{
        xxl: 4,
        xl: 3,
        lg: 3,
        md: 3,
        sm: 2,
        xs: 1,
      }}
    >
      <Descriptions.Item label="昵称">{queryuser.userName}</Descriptions.Item>
      <Descriptions.Item label="用户ID">{queryuser.userNo}</Descriptions.Item>
      <Descriptions.Item label="手机号">{queryuser.userPhone}</Descriptions.Item>
      <Descriptions.Item label="授权微信信息">{queryuser.wechat}</Descriptions.Item>
      <Descriptions.Item label="性别：">{queryuser.sex===1?'男':'女'}</Descriptions.Item>
      <Descriptions.Item label="地区：">{queryuser.area}</Descriptions.Item>
      <Descriptions.Item label="注册时间">{queryuser.regTime}</Descriptions.Item>
      <Descriptions.Item label="消费金额">{queryuser.spendTotal}</Descriptions.Item>
      <Descriptions.Item label="账号状态：">{queryuser.accountStatus}</Descriptions.Item>
      <Descriptions.Item label="客户标签">                        
            <Tag color="#2db7f5">{biaoqian.labelName}</Tag>
      </Descriptions.Item>
    </Descriptions>
    <div className="content-container" style={{ marginTop:20}}>
    <div className="info-box">
        <div style={{ lineHeight: "40px", paddingLeft: "20px" }}>
          提货人
        </div>
        <table border="1">
          <tbody>
            <tr>
              <td>姓名：{data.consignee}</td>
              <td>手机号：{data.consigneePhone}</td>
              <td>地区：{data.regimentArea}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
      <div style={{marginTop:20}}>
        <Table dataSource={dataSource} columns={columns} />;
      </div>

  </div>
  )
}
export default Queryuser