import React, { useEffect, useState,useRef } from "react";
import "./index.scss";
import { Col, Input, Row, Button, Select, DatePicker,Form } from "antd";
import http from "../../utils/http";

const { Option } = Select;
const { RangePicker } = DatePicker;

const OderForm = () => {
  const [data, setData] = useState(null);
  const [data1, setData1] = useState([]);
  // const [form] = Form.useForm();

    // const input2 = useRef(null)
    // const change2 =(event)=>{
    //   sentence = input2.current.input.value
    //   console.log(sentence)
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
            orderNo:sentence
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
 
  // const [data2, setData2] = useState([]);
  useEffect(() => {
    // 团长姓名（下拉框）
    http({
      url: "/admin/orderGoods/getRegimentName",
      method: "get",
    }).then((res) => {
      // console.log(res);
      setData(res.date);
    });

    // 订单状态（下拉框）
    http({
      url: "/admin/orderGoods/getOrderStatus",
      method: "get",
    }).then((res) => {
      // console.log(res);
      setData1(res.date);
    });
  }, []);





  return (
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
            <Input placeholder="请输入内容" bordered={false} onChange={change2} ref={input2}/>
          </div>
        </Col>
        <Col span={6} order={3}>
          <div className="input">
            <span className="span1">下单时间</span>
            <div className="select">
              <RangePicker placeholder="[开始日期,结束日期]"  bordered={false} />
            </div>
          </div>
        </Col>
        <Col span={6} order={4}>
          <div className="input">
            <span className="span1">订单状态</span>
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
                    <Option key={item.id}>{item.orderStatus}</Option>
                  ))}
              </Select>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={6} order={4}>
          <div className="input">
            <span className="span1">手机号</span>
            <Input placeholder="请输入内容" bordered={false}  />
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
            <span className="span1">收货人</span>
            <Input placeholder="请输入内容" bordered={false} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={2} order={1}>
          <div className="button">
            <Button onClick={chaxun}>检索</Button>
          </div>
        </Col>
        <Col span={2} order={2}>
          <div className="button">
            <Button>重置</Button>
          </div>
        </Col>
        <Col span={2} order={3}>
          <div className="button">
            <Button danger>导出</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default OderForm;
