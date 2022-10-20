import React, { useEffect, useState } from "react";
import http from "../../../utils/http";
import { NavLink } from "react-router-dom";
import {
  Col,
  Input,
  Row,
  Button,
  Select,
  Table,
  Tabs,
  DatePicker,
  Space,
  Modal,
  Form,
  Descriptions,
} from "antd";
import "./index.scss";

const SendOut = () => {
  const { Option } = Select;
  const { RangePicker } = DatePicker;

  // 发货模态
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal2 = () => {
    setIsModalOpen(true);
  };
  const handleOk2 = () => {
    setIsModalOpen(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen(false);
  };
  // 标签页
  const onChange = (key) => {
    console.log(key);
  };
  // 表格数据
  const columns = [
    {
      title: "发货单号",
      dataIndex: "orderNo",
      key: "orderNo",
      render: (text) => <a>{text}</a>,
      width: 100,
    },
    {
      title: "承运时间",
      dataIndex: "carrierTime",
      key: "carrierTime",
      width: 150,
    },
    {
      title: "所属团长",
      dataIndex: "regimentName",
      key: "regimentName",
      ellipsis: true,
    },
    {
      title: "货物数量",
      dataIndex: "goodsNumber",
      key: "goodsNumber",
      ellipsis: true,
    },
    {
      title: "运输司机",
      dataIndex: "driverName",
      key: "driverName",
      ellipsis: true,
    },
    {
      title: "联系方式",
      dataIndex: "driverPhone",
      key: "driverPhone",
      ellipsis: true,
    },
    {
      title: "车牌号",
      dataIndex: "carNumber",
      key: "carNumber",
      ellipsis: true,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
    },
    {
      title: "操作",
      // dataIndex: "address",
      // key: "address 6",
      ellipsis: true,
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <NavLink to="/main/SendDetails">查看</NavLink>
          <a onClick={showModal2}>发货</a>
          <NavLink to="/main/Print">打印</NavLink>
        </Space>
      ),
    },
  ];
  const colunsmodal = [
    {
      title: "发货单号",
      dataIndex: "orderNo",
      key: "orderNo",
      render: (text) => <a>{text}</a>,
      width: 100,
    },
    {
      title: "所属团长",
      dataIndex: "regimentName",
      key: "regimentName",
      ellipsis: true,
    },
    {
      title: "货物数量",
      dataIndex: "goodsNumber",
      key: "goodsNumber",
      ellipsis: true,
    },
  ];

  // 获取列表数据
  const [data, setData] = useState([]);
  useEffect(() => {
    // 表格数据、下拉框数据
    http({
      url: "/admin/invoice/getList",
      method: "get",
      params: {
        pageNum: 1,
        pageSize: 10,
      },
    }).then((res) => {
      console.log(res);
      setData(res.date.list);
    });
  }, []);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  return (
    <div className="container-order">
      <div className="container">
        <Row>
          <Col span={6} order={1}>
            <div className="input">
              <span className="span1">所属团长</span>
              <div className="select">
                <Select
                  defaultValue="全部"
                  style={{
                    width: "100%",
                  }}
                  bordered={false}
                >
                  {data &&
                    data.map((item) => (
                      <Option key={item.id}>{item.regimentName}</Option>
                    ))}
                </Select>
              </div>
            </div>
          </Col>
          <Col span={6} order={2}>
            <div className="input">
              <span className="span1">订单号</span>
              <Input placeholder="请输入内容" bordered={false} />
            </div>
          </Col>
          <Col span={6} order={3}>
            <div className="input">
              <span className="span1">承运时间</span>
              <div className="select">
                <RangePicker
                  placeholder="[开始日期,结束日期]"
                  bordered={false}
                />
              </div>
            </div>
          </Col>
          <Col span={6} order={4}>
            <div className="input">
              <span className="span1">团长区域</span>
              <div className="select">
                <Select
                  defaultValue="全部"
                  style={{
                    width: "100%",
                  }}
                  bordered={false}
                >
                  {data &&
                    data.map((item) => (
                      <Option key={item.id}>{item.regimentArea}</Option>
                    ))}
                </Select>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={6} order={4}>
            <div className="input">
              <span className="span1">司机</span>
              <Input placeholder="请输入内容" bordered={false} />
            </div>
          </Col>
          <Col span={6} order={3}>
            <div className="input">
              <span className="span1">姓名</span>
              <Input placeholder="请输入内容" bordered={false} />
            </div>
          </Col>
          <Col span={6} order={2}>
            <div className="input">
              <span className="span1">收件人</span>
              <Input placeholder="请输入内容" bordered={false} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={2} order={1}>
            <div className="button">
              <Button>检索</Button>
            </div>
          </Col>
          <Col span={2} order={1}>
            <div className="button">
              <Button>重置</Button>
            </div>
          </Col>
          <Col span={2} order={1}>
            <div className="button">
              <Button danger>导出</Button>
            </div>
          </Col>
        </Row>
      </div>
      <div className="container-T">
        <Tabs
          defaultActiveKey="1"
          onChange={onChange}
          items={[
            {
              label: `全部`,
              key: "1",
              children: <Table columns={columns} dataSource={data}  rowKey="orderNo"/>,
            },
            {
              label: `代发货`,
              key: "2",
              children: <Table columns={columns} dataSource={data} rowKey="orderNo"/>,
            },
            {
              label: `送货中`,
              key: "3",
              children: <Table columns={columns} dataSource={data} rowKey="orderNo"/>,
            },
            {
              label: `已收货`,
              key: "4",
              children: <Table columns={columns} dataSource={data} rowKey="orderNo"/>,
            },
          ]}
        />

        {/* 发货模态 */}
        <Modal
          title="发货"
          open={isModalOpen}
          onOk={handleOk2}
          onCancel={handleCancel2}
        >
          <Table
            rowSelection={rowSelection}
            columns={colunsmodal}
            dataSource={data}
            rowKey="orderNo"
          />
          <Descriptions>
            <Descriptions.Item label="共计货物">100件</Descriptions.Item>
          </Descriptions>
          <Select
                  defaultValue="全部"
                  style={{
                    width: "100%",
                  }}
                  bordered={false}
                >
                  {data &&
                    data.map((item) => (
                      <Option key={item.id}>{item.regimentName}</Option>
                    ))}
                </Select>
          <Form
            name="basic"
            labelCol={{span: 3}}
            wrapperCol={{span: 21}}
          >
            <Form.Item
              label="备注"
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default SendOut;
