import React, { useState, useEffect } from 'react';
import { Input, DatePicker, Select, Button, Tabs, Table, Space, Pagination } from 'antd';
import Style from './Reconciliation.module.scss';
import { server } from '../../../api/api';
const TableList = () => {
  // 表格数据接口
  const [current, setCurrent] = useState(1); //当前页数
  const [Total, setTotal] = useState(); //总条数
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState();
  const GetList = async (current, pageSize) => {
    try {
      const res = await server.getCheckList(
        {
          pageNum: current,
          pageSize: pageSize,
        }
      );
      if (res.code == 200) {
        setData(res.date.list)
        setTotal(res.date.total)
      }
    } catch (err) {
      console.log('%c ======>>>>>>>>', 'color:orange;', err)
    }
  }
  // 处理分页
  const onChange = (page, pageSize) => {
    // 当前页
    console.log(page);  //当前页
    console.log('%c ======>>>>>>>>', 'color:orange;', pageSize) //limit
    setPageSize(pageSize)
    setCurrent(page);
    // 获取角色列表接口
    GetList(page, pageSize)
  };
  const columns = [
    {
      title: '账号流水号',
      dataIndex: 'billId',
      key: 'billId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '账单类型',
      dataIndex: 'billType',
      key: 'billId',
    },
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '订单金额',
      dataIndex: 'money',
      key: 'billId',
    },
    {
      title: '结算佣金',
      dataIndex: 'commStatement',
      key: 'billId',
    },
    {
      title: '账单时间',
      dataIndex: 'billTime',
      key: 'billId',
    },
    {
      title: '状态',
      dataIndex: 'billStatus',
      key: 'billId',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'billId',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, record) => (
        <Space size="middle">
          <Button type={"default"} onClick={() => {
          }
          }>  编辑</Button>
          <Button type={"dashed"} onClick={() => {

          }}>删除</Button>

        </Space>
      ),
    },
  ];
  useEffect(() => {
    GetList(current, pageSize)
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={false} />
      <div className={Style.paginations}>
        <Pagination
          style={{ "marginLeft": "20px", 'backgroundColor': '#fff', 'height': '40px' }}
          current={current} onChange={onChange} total={Total} showSizeChanger
          pageSizeOptions={['5', '10', '20', '30', '40']}
          defaultPageSize={pageSize}
        />
      </div>
    </div>
  );
}


const Reconciliation = () => {
  const { RangePicker } = DatePicker;
  const [SelctList, setSelctList] = useState([]);
  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };
  const onOk = (value) => {
    console.log('onOk: ', value);
  };
  const { Option } = Select;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const TabonChange = (key) => {
    console.log(key);
  };
  // 获取下拉框的数据
  const SelectList = async () => {
    try {
      const res = await server.SelectionList()
      if (res.code == 200) {
        setSelctList(res.date)
      }
    }
    catch (err) {
      alert(err)
    }
  }
  useEffect(() => {
    SelectList()
  }, []);
  return (
    <div className={Style.Box}>
      <div className={Style.box1}>
        <ul>
          <li> <Input size="large" placeholder="large size" prefix={'账单流水'} /></li>
          <li> <Input size="large" placeholder="large size" prefix={'订单号'} /></li>
          <li> <Input size="large" placeholder="large size" prefix={'退款单号'} /></li>
          <li><span>账单时间</span>
            <RangePicker
              className={Style.date}
              showTime={{
                format: 'HH:mm',
              }}
              format="YYYY-MM-DD HH:mm"
              onChange={onChange}
              onOk={onOk}
            /></li>

          <li><span>订单状态</span>  <Select
            className={Style.date}
            defaultValue="未付款"
            onChange={handleChange}
          >
            {/* 循环渲染option */}
            {/* <Option value="jack">Jack</Option> */}
            {
              SelctList.map((el,index) => {
                return   <Option key={index} value={el.orderStatus}>{el.orderStatus}</Option>
              })
            }
          </Select></li>
          <li> <Input size="large" placeholder="large size" prefix={'姓名'} /></li>
          <li> <Input size="large" placeholder="large size" prefix={'收件人'} /></li>
        </ul>
        <div className={Style.btnArr}>
          <Button>检索</Button>  <Button>重置</Button>  <Button>导出</Button>
        </div>
      </div>
      <div className={Style.box1}>
        {/* table */}
        <Tabs
          defaultActiveKey="1"
          onChange={TabonChange}
          className={Style.tab}
          items={[
            {
              label: `支付订单`,
              key: '1',
              children: <TableList />,
            },
            {
              label: `售后订单`,
              key: '2',
              children: <TableList />,
            },

          ]}
        />
      </div>
    </div>
  );
}

export default Reconciliation;
