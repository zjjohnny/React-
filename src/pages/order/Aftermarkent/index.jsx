import React, { useEffect, useState,useRef  } from "react";
import http from "../../../utils/http";
import {
  Col,
  Input,
  Row,
  Button,
  Select,
  Table,
  Tabs,
  Modal,
  Space,
  Descriptions,
  Radio,
  message
} from "antd";
import "./index.scss";
// import { reaction } from "mobx";
// const success = () => {
//   message.success('This is a success message');
// };
const Aftermarkent = () => {
  // 表格数据
  const columns = [
    {
      title: "售后ID",
      dataIndex: "salesId",
      key: "salesId",
      render: (text) => <a>{text}</a>,
      width: 100,
    },
    {
      title: "申请时间",
      dataIndex: "applicationTime",
      key: "applicationTime",
      width: 150,
    },
    {
      title: "关联订单",
      dataIndex: "regimentPickType",
      key: "regimentPickType",
      ellipsis: true,
      width: 100,
    },
    {
      title: "所属用户",
      dataIndex: "buyerName",
      key: "buyerName",
      ellipsis: true,
      width: 100,
    },
    {
      title: "自提点名称",
      dataIndex: "regimentPick",
      key: "regimentPick",
      ellipsis: true,
    },
    {
      title: "退款金额",
      dataIndex: "refundAmount",
      key: "refundAmount",
      ellipsis: true,
      width: 80,
    },
    {
      title: "售后类型",
      dataIndex: "afterSalesType",
      key: "afterSalesType",
      ellipsis: true,
      width: 80,
    },
    {
      title: "售后原因",
      dataIndex: "afterSalesReasons",
      key: "afterSalesReasons",
      ellipsis: true,
    },
    {
      title: "操作",
      // dataIndex: "link",
      // key: "address 7",
      // ellipsis: true,
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={()=>{showModal(record)}}>查看</a>
          <a onClick={showModal1}>通过</a>
          <a onClick={showModal2}>驳回</a>
        </Space>
      ),
    },
  ];

  // 获取列表数据
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const input2 = useRef(null)
  const [sentence,setdate3]=useState('');
  const change2 =(event)=>{
   setdate3(input2.current.input.value)
 //  sentence = input2.current.input.value
   // console.log(sentence)
 }
   const chaxun = () => {
     // const sentence = input2.current.input.value
     //   console.log(sentence)
       // console.log('搜索:', values);
       // const myId=parseInt(values.searchID)
       // console.log(sentence)
       console.log(sentence);
       http({
           url:'/admin/orderGoods/getListBy',
           method: "get",
           params:{
             pageNum:1,
             pageSize:10,
             salesId:sentence
          }
       }).then(res=>{
           console.log(res);
           // console.log(res);
             // let data1=[res.date.list]
             // setData(data1);
           setData(res.date.list);
           // let data=[res.date.list]
           // setData(data);            
       })
     };

  // 全部表格数据
  useEffect(() => {
    http({
      url: "/admin/afterOrder/getListBy",
      method: "get",
      params: {
        pageNum: 1,
        pageSize: 10,
      },
    }).then((res) => {
      console.log(res);
      setData(res.date.list);
    });

    // 售后类型下拉框
    http({
      url: "/admin/afterOrder/getAfterSalesType",
      method: "get",
    }).then((res) => {
      console.log(res);
      setData1(res.date);
    });

    // 自提点类型
    // 售后类型下拉框
    http({
      url: "/admin/afterOrder/getRegimentPickType",
      method: "get",
    }).then((res) => {
      console.log(res);
      setData2(res.date);
    });
  }, []);

  // 查看模态
  // const formref = React.createRef();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = (record) => {
    setOpen(true);
    setOpen(record.orderNo)

  };
  const handleOk = () => {
    message.success('操作成功');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  // 通过模态
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const handleOk1 = () => {
    setIsModalOpen1(false);
    message.success('操作成功');
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  // 驳回模态
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal2 = () => {
    setIsModalOpen(true);
  };
  const handleOk2 = () => {
    setIsModalOpen(false);
    message.success('操作成功');
  };
  const handleCancel2 = () => {
    setIsModalOpen(false);
  };

//   const changeModal = (record) => {
//     setchangeLabel(true);
//     console.log(record);    
   
//     setChangeID(record.clientId)
//     changeForm.setFieldsValue({
//         clientName:record.clientName,
//         clientDescription:record.clientDescription,
//         clientColor:record.clientColor,
//         clientState:record.clientState
//     })
// };

  const { Option } = Select;
  // 标签页
  const onChange = (key) => {
    console.log(key);
  };



//   let clearInput = () => {
//     this.setState({
//         user: "",
//         password: ""
//     });
//     // console.log(this.state.user)
//     // window.location.reload();
// };

  return (
    <div className="container-order">
      <div className="container">
        <Row>
          <Col span={6} order={1}>
            <div className="input">
              <span className="span1">订单号</span>
              <Input placeholder="请输入内容" bordered={false}  />
            </div>
          </Col>
          <Col span={6} order={2}>
            <div className="input">
              <span className="span1">售后ID</span>
              <Input placeholder="请输入内容" bordered={false} onChange={change2} ref={input2} />
            </div>
          </Col>
          <Col span={6} order={3}>
            <div className="input">
              <span className="span1">自提点</span>
              <Input placeholder="请输入内容" bordered={false} />
            </div>
          </Col>
          <Col span={6} order={4}>
            <div className="input">
              <span className="span1">用户</span>
              <Input placeholder="请输入内容" bordered={false}  />
              {/* onChange={this.user} id="user" value={this.state.user} */}
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={6} order={1}>
            <div className="input">
              <span className="span1">自提点类型</span>
              <div className="select">
                <Select
                  defaultValue="全部"
                  style={{
                    width: "100%",
                  }}
                  bordered={false}
                >
                  {data2 &&
                    data2.map((item) => (
                      <Option key={item.id}>{item.regimentPickType}</Option>
                    ))}
                </Select>
              </div>
            </div>
          </Col>
          <Col span={6} order={2}>
            <div className="input">
              <span className="span1">售后类型</span>
              <div className="select">
                <Select
                  defaultValue="全部"
                  style={{
                    width: "100%",
                  }}
                  bordered={false}
                >
                  {data1 &&
                    data1.map((item) => (
                      <Option key={item.id}>{item.afterSalesType}</Option>
                    ))}
                </Select>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={2} order={1}>
            <div className="button">
              <Button onClick={chaxun}>检索</Button>
            </div>
          </Col>
          <Col span={3} order={2}>
            <div className="button">
              <Button>重置</Button>
            </div>
          </Col>
          <Col span={3} order={3}>
            <div className="button">
              <Button danger>批量通过</Button>
            </div>
          </Col>
          <Col span={2} order={4}>
            <div className="button">
              <Button danger onClick={showModal2}>批量驳回</Button>
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
              label: `待审核`,
              key: "1",
              children: (
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={{ pageSize: 5 }}
                  rowKey="orderNo"
                />
              ),
            },
            {
              label: `已通过`,
              key: "2",
              children: (
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={{ pageSize: 5 }}
                  rowKey="orderNo"
                />
              ),
            },
            {
              label: `已作废`,
              key: "3",
              children: (
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={{ pageSize: 5 }}
                  rowKey="orderNo"
                />
              ),
            },
          ]}
        />
      </div>
      <Modal
        open={open}
        title="售后申请"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            审核驳回
          </Button>,
          <Button
            key="link"
            href="https://google.com"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            审核通过
          </Button>,
        ]}
      >
        <div className="modal-chakan">
          <Descriptions title="申请信息" bordered size="small">
            <Descriptions.Item label="申请ID">乔峰</Descriptions.Item>
            <Descriptions.Item label="关联订单">1810000000</Descriptions.Item>
            <Descriptions.Item label="状态">申请中 </Descriptions.Item>
            <Descriptions.Item label="售后类型">
              未收到货-仅退款
            </Descriptions.Item>
            <Descriptions.Item label="售后原因">少件/漏件</Descriptions.Item>
            <Descriptions.Item label="申请金额">9.9元</Descriptions.Item>
            <Descriptions.Item label="问题描述">0</Descriptions.Item>
            <Descriptions.Item label="申请凭证">小程序</Descriptions.Item>
          </Descriptions>
          <Descriptions title="退款信息" bordered size="small">
            <Descriptions.Item label="退款金额">98</Descriptions.Item>
            <Descriptions.Item label="退款渠道">
              付款账号原路返回
            </Descriptions.Item>
            <Descriptions.Item label="佣金影响">不扣除佣金</Descriptions.Item>
          </Descriptions>
          <Descriptions title="历史进度" bordered size="small">
            <Descriptions.Item label="申请时间">
              2021-01-29 22:24:46
            </Descriptions.Item>
            <Descriptions.Item label="审核时间">-</Descriptions.Item>
            <Descriptions.Item label="退款时间">-</Descriptions.Item>
          </Descriptions>
          <Descriptions title="审核情况" bordered size="small">
            <Descriptions.Item label="驳回原因：">不符合退款</Descriptions.Item>
          </Descriptions>
        </div>
      </Modal>
      <Modal
        title="提示"
        open={isModalOpen1}
        onOk={handleOk1}
        onCancel={handleCancel1}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk1}
          >
            取消
          </Button>,
          <Button
            key="link"
            type="primary"
            loading={loading}
            onClick={handleOk1 }
            
          >
            确定
          </Button>,
        ]}
      >
        <p>你确定要通过的 退款申请吗？</p>
      </Modal>
      <Modal
        title="驳回原因"
        open={isModalOpen}
        onOk={handleOk2}
        onCancel={handleCancel2}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk2}
          >
            取消
          </Button>,
          <Button
            key="link"
            type="primary"
            loading={loading}
            onClick={handleOk2}
          >
            确定
          </Button>,
        ]}
      >
        <Radio.Group
          defaultValue="a"
          size="small"
          style={{
            marginTop: 16,
          }}
        >
          <Radio.Button value="a">不符合退款</Radio.Button>
          <Radio.Button value="b">信息填写错误</Radio.Button>
          <Radio.Button value="c">恶意退款</Radio.Button>
          <Input
            placeholder="请手动输入退款原因"
            style={{
              marginTop: 16,
            }}
          />
        </Radio.Group>
      </Modal>
    </div>
  );
};

export default Aftermarkent;
