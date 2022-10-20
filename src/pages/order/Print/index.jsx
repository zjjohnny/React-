import React from "react";
import { Descriptions, Button, Table,Upload,Space } from "antd";
import { NavLink } from "react-router-dom";
import "./index.scss";

// 表格数据
const columns = [
  {
    title: "商品列表",
    dataIndex: "id",
    key: "1",
    render: (text) => <a>{text}</a>,
    width: 150,
  },
  {
    title: "应发数量",
    dataIndex: "num1",
    key: "2",
    width: 100,
  },
  {
    title: "实发数量",
    dataIndex: "num2",
    key: "3",
    width: 100,
  },

];
const data = [
  {
    key: "1",
    id:333454545,
    num2:1,
    num1:1,

  },
  {
    key: "2",
    id:2222454545,
    num2:1,
    num1:1,

  },
  {
    key: "3",
    id:111454545,
    num2:1,
    num1:1,

  },
  {
    key: "4",
    id:454542335,
    num2:1,
    num1:1,

  },
  {
    key: "5",
    id:45454523,
    num2:1,
    num1:1,
  },
];

const Print = () => {
  return (
    <div className={"container-OrderDetails"}>
      <div className={"container1"}>
      <div className={"dingdan2"}>

          <Space align="center">
          <Button><NavLink to="/main/sendout">关闭</NavLink></Button>
          <Button>保存</Button>
          <Button danger>打印</Button>
          </Space>
          </div>
        <div className={"dingdan"}>
          <div className={"dingdan1"} >货运单号：1</div>
          {/* <div className={"dingdan2"}>
          <Button>关闭</Button>
          <Button>保存</Button>
          <Button danger>打印</Button>
          </div> */}
          
        </div>

        {/* 订单基础信息 */}
        <div className="jichu">
          <p>订单基础信息</p>
          <div className="Descriptions1">
          <Descriptions>
            <Descriptions.Item label="归属团长">A-团长</Descriptions.Item>
            <Descriptions.Item label="团长电话">18100000</Descriptions.Item>
            <Descriptions.Item label="收货地址">
            北京市石景山区万达广场A-1-1
            </Descriptions.Item>
          </Descriptions>
          <Table columns={columns} dataSource={data} pagination={false} />
          </div>
        </div>

        {/* 商品详情 */}
        <div className="xiangqing">
          <p> Axlab收货单明细</p>
          <div className="Descriptions1">
          <Descriptions>
            <Descriptions.Item label="归属团长">A-团长</Descriptions.Item>
            <Descriptions.Item label="团长电话">18100000</Descriptions.Item>
            <Descriptions.Item label="收货地址">
            北京市石景山区万达广场A-1-1
            </Descriptions.Item>
          </Descriptions>
          </div>
          <Table columns={columns} dataSource={data} pagination={false} />
          
        </div>
      </div>
    </div>
  );
};

export default Print;
