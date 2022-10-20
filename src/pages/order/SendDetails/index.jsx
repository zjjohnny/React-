import React from "react";
import { Link } from "react-router-dom";
import { Descriptions, Button, Table, Col, Row ,Steps } from "antd";
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
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park, New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 2 Lake Park, London No. 2 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "4",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "5",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const SendDetails = () => {
  return (
    <div className="container-OrderDetails">
      <div className="container">
      <div className="dingdan">
      <Row>
      <Col span={12}>运输单号：1</Col>
      <Col span={6} offset={6}>
      <Button><Link to="/main/Print">打印收货单</Link></Button>
      </Col>
      </Row>
    </div>
        

        <div className="zhuangtai">
          <p> 运输状态</p>
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
            <Descriptions.Item label="运输单号">1376116380655648768</Descriptions.Item>
            <Descriptions.Item label="收货单时间">1810000000</Descriptions.Item>
            <Descriptions.Item label="运输状态">
              已送达
            </Descriptions.Item>
            <Descriptions.Item label="归属团长">A-团长</Descriptions.Item>
            <Descriptions.Item label="团长电话">1355648768</Descriptions.Item>
            <Descriptions.Item label="司机">张三</Descriptions.Item>
            <Descriptions.Item label="车牌">
            渝A·MS220
            </Descriptions.Item>
            <Descriptions.Item label="司机电话">123456789</Descriptions.Item>
            <Descriptions.Item label="收货地址">
            北京市石景山区万达广场A-1-1
            </Descriptions.Item>
            <Descriptions.Item label="备注">
          38
            </Descriptions.Item>
          </Descriptions>
          </div>
        </div>

        {/* 商品详情 */}
        <div className="xiangqing">
          <p> 商品列表</p>
          <Table columns={columns} dataSource={data} pagination={false} />
          <div className="Descriptions1">
          {/* <Descriptions>
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
          </Descriptions> */}
          </div>
        </div>

        {/*操作日志 */}
        <p> 操作日志</p>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
};

export default SendDetails;
