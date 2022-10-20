
import "./index.scss";
import { React, useEffect, useState } from "react"
import { Table, Col, Input, Row, Button,Select,DatePicker,ConfigProvider } from "antd";
import zhCN from 'antd/es/locale/zh_CN';
const { RangePicker } = DatePicker;


const { Option } = Select;
// 标签页

// 表格数据
const columns = [
  {
    title: "申请时间",
    dataIndex: "orderTime",
    key: "orderTime",
    width: 100,
  },
  {
    title: "申请团长",
    dataIndex: "header",
    key: "header",
    width: 80,
  },
  {
    title: "提现金额",
    dataIndex: "comMoney",
    key: "comMoney",
    width: 80,
  },
  {
    title: "提现方式",
    dataIndex: "actMoney",
    key: "actMoney",
    width: 80,
  },
  {
    title: "提现流水号",
    dataIndex: "orderNum",
    key: "orderNum",
    width: 120,
  },
  {
    title: "状态",
    dataIndex: "orderState",
    key: "orderState",
    width: 60,
  },
  {
    title: "操作时间",
    dataIndex: "daoTime",
    key: "daoTime",
    ellipsis: true,
  }
];
const data = [
  {
    key: "1",
    orderTime: '2022-01-03',
    header: "John Brown",
    comMoney: 132,
    actMoney: '微信提现',
    orderNum: '1018093299763100074',
    orderState: '已到账',
    daoTime: '2020-02-24 14:12:30'
  },
  {
    key: '2',
    orderTime: '2022-10-03',
    header: "John",
    comMoney: 52,
    actMoney: '微信提现',
    orderNum: '1018093299763123474',
    orderState: '处理中',
    daoTime: '2020-10-24 14:12:30'
  }
];


const CommissionMa = () => {

  //时间选择器
  const [dates, setDates] = useState(null);
  const [hackValue, setHackValue] = useState(null);
  const [value, setValue] = useState(null);
  //时间格式转换
  const formatDateTime =(inputTime)=>{
     var date = new Date(inputTime);
     var y = date.getFullYear();
     var m = date.getMonth() + 1;
     m = m < 10 ? "0" + m : m;
     var d = date.getDate();
     d = d < 10 ? "0" + d : d;
     return y + "-" + m + "-" + d ;
   }
  
  //时间选择框
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
    const beginTime = formatDateTime(value[0]._d);
    const endTime = formatDateTime(value[1]._d)
    console.log(beginTime,endTime);
    
    }
};


   return (
        <div className="commBox">
            <div className="container">
                <Row>
                  <Col span={6} order={2}>
                    <div className="input">
                      <span className="span1">团长</span>
                      <Input placeholder="请输入内容" bordered={false} />
                    </div>
                  </Col>
                  <Col span={6} order={2}>
                    <div className="input">
                      <span className="span1">流水号</span>
                      <Input placeholder="请输入内容" bordered={false} />
                    </div>
                  </Col>
                  <Col span={6} order={3}>
                    <div className="input">
                      <span className="span1">账单时间</span>
                      <div className="select">
                      <ConfigProvider locale={zhCN}>
                            <RangePicker bordered={false} 
                              value={hackValue || value}
                              disabledDate={disabledDate}
                              onCalendarChange={(val) => setDates(val)}
                              onChange={(val) => setValue(val)}
                              onOpenChange={onOpenChange}
                              />
                      </ConfigProvider>
                      </div>
                    </div>
                  </Col>
                  <Col span={6} order={4}>
                    <div className="input">
                      <span className="span1">状态</span>
                      <div className="select">
                        <Select
                          defaultValue="全部"
                          style={{
                            width: '100%',

                          }}
                          bordered={false}
                        >
                          <Option value="2">全部</Option>
                          <Option value="1">已到账</Option>
                          <Option value="0">已退回</Option>
                          <Option value="0">处理中</Option>
                        </Select>
                          </div>
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
            <Table columns={columns} dataSource={data}/>
           
            </div>
        </div>
    );
  }

export default CommissionMa;