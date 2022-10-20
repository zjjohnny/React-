import React, { useState, useEffect } from 'react';
import style from './acess.module.scss'
import { server } from '../../../api/api';
import moment from 'moment';
import { Button, Table, Input, InputNumber, Select, DatePicker, Pagination, notification } from 'antd';
const { RangePicker } = DatePicker;

const columns = [
  {
    title: 'id',//表格列名
    dataIndex: 'logId',//对应数据字段
    key: 'logId',//该列的唯一值
  },
  {
    title: '操作时间',
    dataIndex: 'logTime',
    key: 'logId',
  },
  {
    title: '账号',
    dataIndex: 'logAccount',
    key: 'logId',
  },
  {
    title: '操作行为',
    dataIndex: 'logOperate',
    key: 'logId',
  },
  {
    title: 'ip',
    dataIndex: 'logIp',
    key: 'logId',
  },
];
const Operation = () => {
  const [data, setdata] = useState([]);
  const [InputValue, setSearchText] = useState('');
  // 分页数据
  const [current, setCurrent] = useState(1); //当前页数
  const [Total, setTotal] = useState(); //总条数
  const [pageSize, setPageSize] = useState(5); //每页条数
  // 日期选择器开始到结束时间
  const [StartTime, setSatetiem] = useState('')
  const [End, setEnd] = useState('')
  const onChange = (page, pageSize) => {
    // 当前页
    setPageSize(pageSize)
    setCurrent(page);
    // 调用日志列表接口
    Getlist(page, pageSize)
  };
  useEffect(() => {
    Getlist(current, pageSize)
  }, []);
  const Serchnamea = (e) => {
    console.log('%c ======>>>>>>>>', 'color:orange;', e.target.value)
    setSearchText(e.target.value)
  }
  // 
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  };
  const disabledRangeTime = (_, type) => {
    if (type === 'start') {
      return {
        disabledHours: () => range(0, 60).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    }

    return {
      disabledHours: () => range(0, 60).splice(20, 4),
      disabledMinutes: () => range(0, 31),
      disabledSeconds: () => [55, 56],
    };
  };
  const range = (start, end) => {
    const result = [];

    for (let i = start; i < end; i++) {
      result.push(i);
    }

    return result;
  }; // eslint-disable-next-line arrow-body-style
  // 日期变更
  const onChanges = (date, dateString) => {
    console.log(date, '---', dateString);
    console.log('%c ======>>>>>>>>', 'color:orange;', dateString)
    setSatetiem(dateString[0])
    setEnd(dateString[1])
    // SrechID(current, pageSize, InputValue, StartTime, End)
  }

  // 获取日志列表的接口
  async function Getlist(current, pageSize) {
    try {
      const obj = {
        page: current,
        limit: pageSize,
      }
      const res = await server.Getopration(obj)
      if (res.code == 200) {
        setdata(res.data)
      setTotal(res.count)

      }

    }
    catch (err) {
      console.log('%c ======>>>>>>>>', 'color:orange;', err)
    }
  }
  // 获取日志搜索的接口
  async function SrechID(current, pageSize, InputValue, from, to) {
    try {
      const obj = {
        limit: pageSize,
        page: current,
        msg: InputValue,
        from: from,
        to: to
      }
      const res = await server.SrechOpratin(obj)
      if (res.code == 200) {
        setTotal(res.count)
        setdata(res.data)
      }
      if(res.code==101){
        setdata(res.data)
        notification.success({
          placement: 'top',
          message: '失败',
          description:
            '没有查询到数据',
        });
      }
    } catch (err) {
      console.log('%c ======>>>>>>>>', 'color:orange;', err)
    }
  }
  return (
    <div className={style.acessbox}>
      {/* 模态框 */}
      {/* 搜索部分 */}
      <div>
        <div className={style.inputitem}>
          <Input size="min" className={style.inputaa} placeholder="请输入账号" prefix={'账号'} onChange={Serchnamea} value={InputValue} />
          <div>
            {/* <RangePicker allowClear={true} onChange={getTime} /> */}
            <RangePicker
              disabledDate={disabledDate}
              disabledTime={disabledRangeTime}
              onChange={onChanges}
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
              }}
              format="YYYY-MM-DD HH:mm:ss"
            />
          </div>
        </div>
        <div>
          <div>
            <Button onClick={() => [
              SrechID(current, pageSize, InputValue, StartTime, End)
            ]}>搜索</Button>
            <Button onClick={() => {
              setSearchText('')
            }}>重置</Button>
          </div>
          <p>当前条件共检索到<span>{Total}</span>条相关信息</p>
        </div>
      </div>
      {/* 表格 */}
      <div>
        <Table pagination={false} className={style.table} columns={columns} dataSource={data} rowKey={(record) => record.id}
          align='center'
        />
      </div>
      <div className={style.paginations}>
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

export default Operation;
