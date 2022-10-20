import React, { Component } from 'react';
import style from './Freestyle.module.scss';
import { Table, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const data = [
  {
    key: '1',
    id: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    id: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    id: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];
const Freestyle = () => {
  const navigate = useNavigate()
  const columns = [
    {
      title: '平台资料',
      dataIndex: 'name',
      key: 'id',//该列的唯一值

    },
    {
      title: '更新时间',
      dataIndex: 'age',
      key: 'id',//该列的唯一值

    },
    {
      title: '状态',
      dataIndex: 'address',
      key: 'id',//该列的唯一值

    },
    {
      title: '操作',
      render: (_, record) => (
        <Space size="middle">
          <Button type='link' onClick={() => {
            console.log('%c ======>>>>>>>>', 'color:orange;', record.id)
            navigate('/main/freestyleedit')
          }}>  编辑</Button>

        </Space>
      )
    }
  ];
  return (
    <div className={style.conetnt}>
      <Table columns={columns} dataSource={data} size="middle" className={style.table} />
    </div>
  );
}

export default Freestyle;

