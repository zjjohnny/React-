import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Descriptions, Button, Table, Steps } from "antd";
import http from '../../../utils/http';
import "./index.scss";

const { Step } = Steps;
// 表格数据
const columns = [
  {
    title: "商品ID",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
    width: 150,
  },
  {
    title: "商品名称",
    dataIndex: "time",
    key: "time",
    width: 100,
  },
  {
    title: "原价",
    dataIndex: "leader",
    key: "leader",
    ellipsis: true,
  },
  {
    title: "销售价",
    dataIndex: "address",
    key: "address 2",
    ellipsis: true,
  },
  {
    title: "佣金",
    dataIndex: "address",
    key: "address 3",
    ellipsis: true,
  },
  {
    title: "数量",
    dataIndex: "address",
    key: "address 4",
    ellipsis: true,
  },
  {
    title: "总价",
    dataIndex: "address",
    key: "address 5",
    ellipsis: true,
  },
  {
    title: "状态",
    dataIndex: "address",
    key: "address 6",
    ellipsis: true,
  },
];

const OrderDetails = () => {

  const [data, setData] = useState();
  const {state:{record}} = useLocation();
  let id = record.orderNo;
  console.log(id)

  useEffect(() => {
    // 订单表格分页
    http({
     url: "/admin/orderGoods/getOrderDetails",
     method: "get",
     params:{
      orderNo: id
    }
   }).then((res) => {
     console.log(res);
     setData(res.date.list);
   });
     },[])

  return (
    <div className="container-OrderDetails">
      <div className="container">
        <div className="dingdan">
          <h2>订单号：{ id }</h2>
        </div>

        <div className="zhuangtai">
          <p> 订单状态</p>
          <div className="zhuangtai1">
          <Steps current={3} labelPlacement="vertical">
            <Step title="待付款"  />
            <Step title="待取货" />
            <Step title="已取货" />
          </Steps> 
            </div>
        </div>

        {/* 订单基础信息 */}
        <div className="jichu">
          <p>订单基础信息</p>
          <div className="Descriptions1">
          <Descriptions>
            <Descriptions.Item label="订单号">{ id }</Descriptions.Item>
            <Descriptions.Item label="下单时间">{record.orderTime}</Descriptions.Item>
            <Descriptions.Item label="订单来源">
              小程序
            </Descriptions.Item>
            <Descriptions.Item label="订单状态">已送达</Descriptions.Item>
            <Descriptions.Item label="下单人昵称">
              China
            </Descriptions.Item>
            <Descriptions.Item label="下单人电话">1376116380655648768</Descriptions.Item>
            <Descriptions.Item label="收货人">1810000000</Descriptions.Item>
            <Descriptions.Item label="收货电话">
              小程序
            </Descriptions.Item>
            <Descriptions.Item label="订单类型">平台订单</Descriptions.Item>
            <Descriptions.Item label="归属团长">
              China
            </Descriptions.Item>
            <Descriptions.Item label="团长地址">
            北京市石景山区万达广场A-1-1
            </Descriptions.Item>
            <Descriptions.Item label="运输单">
            1376116380655648768
            </Descriptions.Item>
          </Descriptions>
          </div>
        </div>

        {/* 商品详情 */}
        <div className="xiangqing">
          <p> 商品详情</p>
          <Table columns={columns} dataSource={data} pagination={false} />
          <div className="Descriptions1">
          <Descriptions>
            <Descriptions.Item label="商品金额">80.00</Descriptions.Item>
            <Descriptions.Item label="商品优惠">-20</Descriptions.Item>
            <Descriptions.Item label="优惠价">
             -20（满100-20）
            </Descriptions.Item>
            <Descriptions.Item label="运费">0</Descriptions.Item>
            <Descriptions.Item label="商品数">
              4
            </Descriptions.Item>
            <Descriptions.Item label="团长预估佣金">18.00</Descriptions.Item>
            <Descriptions.Item label="售后扣回佣金">0</Descriptions.Item>
            <Descriptions.Item label="实际所得佣金">
             18
            </Descriptions.Item>
            <Descriptions.Item label="实付金额">40</Descriptions.Item>
            <Descriptions.Item label="平台剩余金额">
              4
            </Descriptions.Item>
          </Descriptions>
          </div>
        </div>

        {/*操作日志 */}
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
};

export default OrderDetails;
