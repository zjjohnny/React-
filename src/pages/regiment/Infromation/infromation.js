import { Col, Row, List, Typography,Tag,Image, DatePicker, Space,Table  } from 'antd';
import React,{useState,useEffect} from 'react';
import http from "../../../utils/http";
import './informations.scss'
const Infromation=()=>{
    const mydata=[
       {
        time:'2021-01-31 12:93:20',
        money:'50元',
        biaoshi:'50元',
        id:'1018093299763100074',
        state:'已到账',
        mytime:'2020-02-24 14:12:30',
       },
       {
        time:'2021-01-31 12:93:20',
        money:'50元',
        biaoshi:'50元',
        id:'1018093299763100074',
        state:'已到账',
        mytime:'2020-02-24 14:12:30',
       },   {
        time:'2021-01-31 12:93:20',
        money:'50元',
        biaoshi:'50元',
        id:'1018093299763100074',
        state:'已到账',
        mytime:'2020-02-24 14:12:30',
       }

    ];
    const columns=[
        {
            title: '商品订单时间',//表格列名
            dataIndex: 'time',//对应数据字段
            key: 'time',//该列的唯一值
        },
        {
            title: '预计佣金金额',//表格列名
            dataIndex: 'money',//对应数据字段
            key: 'money',//该列的唯一值
          },
          {
            title: '实际到账佣金',//表格列名
            dataIndex: 'biaoshi',//对应数据字段
            key: 'biaoshi',//该列的唯一值
          },
          {
            title: '对应订单号',//表格列名
            dataIndex: 'id',//对应数据字段
            key: 'id',//该列的唯一值
          },
          {
            title: '状态',//表格列名
            dataIndex: 'state',//对应数据字段
            key: 'state',//该列的唯一值
          },
          {
            title: '到账时间',//表格列名
            dataIndex: 'mytime',//对应数据字段
            key: 'mytime',//该列的唯一值
          },
    ];
    const [datas, setDatas] = useState([]);
    useEffect(()=>{
        getLook()
        getSee()
    },[])
    const getLook=()=>{
        console.log(111);
        http({
          url:'/admin/regimentClient/showListRegimentUserByid',
          method:"get",
          params:{
            id:1
        },
        }).then(res=>{
          console.log(res.date.Regiment)
          setDatas(res.date.Regiment)
        })
    }
    const [datass, setDatass] = useState([]);
    const getSee=()=>{
        console.log(222);
        http({
          url:'/admin/regimentClient/showListRegimentUserByid',
          method:"get",
          params:{
            id:1
        },
        }).then(res=>{
          console.log(res.date.RegimentUser)
          setDatass(res.date.RegimentUser)
        })
    }
    const { RangePicker } = DatePicker;
    return (
        <div className={"mytabss"}>
            <div className="info-box">
            <div style={{ height: "50px",lineHeight: "50px", paddingLeft: "20px", fontSize: "16px"}}>
                 商品基础信息
            </div>
            <table border="1">
            <tbody>
                <tr>
                <td>团长ID:{datas.regimentId}</td>
                <td>审核通过时间:{datas.regimentAuditTime}</td>
                <td>状态：{datas.regimentState}</td>
                </tr>
                <tr>
                <td>授权微信信息：{datas.regimentWei}</td>
                <td>团长姓名：{datas.regimentName}</td>
                <td>手机号码：{datas.regimentPhone}</td>
                </tr>
                <tr>
                <td>备用电话：{datas.regimentSparePhone}</td>
                <td>自提点名称：{datas.regimentPick}</td>
                <td>
                  自提点类型:{datas.regimentPickType}
                </td>
                </tr>
                <tr>
                <td>自提点地址：{datas.regimentPickAddress}</td>
                <td>坐标位置：{datas.regimentCoord}</td>
                <td>门牌号:{datas.regimentHouse}</td>
                </tr>
                <tr>
                <td>开始营业：{datas.regimentStartTime}</td>
                <td>结束营业时间：{datas.regimentEndTime}</td>
                <td>邀请码:{datas.regimentInvitation}</td>
                </tr>
                <tr>
                <td>客户标签:星际团长</td>
                </tr>
            </tbody>
            </table>
            </div>
            {/* <div className={"shenhe"}>
               <div className={"shens"}> 团长审核资料</div>
               <div className={"photos"}>  
                    <Image
                        width={200}
                        src=""
                    />
                      <Image
                        width={200}
                        src=""
                    />
                      <Image
                        width={200}
                        src=""
                    />
                      <Image
                        width={200}
                        src=""
                    />
                </div>
                <div className={"shenfen"}>
                    <span>营业执照</span>
                    <span>自提点照片</span>
                    <span>身份证正面</span>
                    <span>身份证反面</span>
                </div>
              
            </div>
             */}
            <div className="info-boxse">
            <div style={{ height: "50px",lineHeight: "50px", paddingLeft: "20px", fontSize: "16px"}}>
                 团长账户
            </div>
            <table border="1">
            <tbody>
                <tr>
                <td>账户余额:{datass.regimentUserOrder}</td>
                <td>已提现金额：{datass.regimentUserAccountBalance}</td>
                <td>待到帐佣金：{datass.regimentUserDeposit}</td>
                </tr>
                <tr>
                <td>已到帐佣金：{datass.regimentUserPaySuccess}</td>
                <td>成交金额：{datass.regimentUserMoney}</td>
                <td>成交订单：{datass.regimentUserOrder}</td>
                </tr>
            </tbody>
            </table>
            </div>
            <div className={"yongjing"}>
            <div className={"context"}> 佣金记录</div> 
               <div className={"midle"}>
                <div className={"timexuan"}>
                    <span>下单时间:</span>
                    <Space className={"timezhe"} direction="vertical" size="large">
                        <RangePicker />
                    </Space>               
                 </div>            
                 <div className={"dingdan"}>
                        <span>订单状态:</span>
                        <select
                        name="goodsTag"
                        // onChange={getSearchInfo}            
                        >
                        <option value="全部">全部</option>
                        <option value="已到账">已到账</option>
                        <option value="未到账">未到账</option>                        
                        </select>
                 </div>  
                </div>
                <div className={"tabless"} >
                <Table  columns={columns} dataSource={mydata} rowKey={(record) => record.id} pagination={{pageSize:5}}
                    align='center'/>
                </div>
            </div>
        </div>
    )
}
export default Infromation