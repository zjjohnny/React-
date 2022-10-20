import './analysisTable.scss'
import { Table,Button } from 'antd';
import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';

const columns = [
    {
      title: '时间',
      dataIndex: 'date',
    },
    {
      title: '新增用户',
      dataIndex: 'leaderNew',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: '日活跃',
      dataIndex: 'userDay',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: '周活跃',
      dataIndex: 'userWeek',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
        title: '月活跃',
        dataIndex: 'userMonth',
        sorter: {
          compare: (a, b) => a.english - b.english,
          multiple: 1,
        },
      },
      {
        title: '启动次数',
        dataIndex: 'openTimes',
        sorter: {
          compare: (a, b) => a.english - b.english,
          multiple: 1,
        },
      },
      {
        title: '单次平均使用时长',
        dataIndex: 'prvTime',
        sorter: {
          compare: (a, b) => a.english - b.english,
          multiple: 1,
        },
      },
  ];
  const tableData = [
    {
      key: '1',
      time: '690',
      userAdded: 120,
      userDay: 98,
      userWeek: 60,
      userMonth: 70,
      openTimes: 1111,
      prvTime:22
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
  };
  const AnalysisTable =(props)=>{
      console.log(props);
      return <div className="analysisTableBox">
          <div className='tableTitle'>
              <span>{props.tableTitle}</span>
              <Button icon={<DownloadOutlined />}>导出</Button>
          </div>
          <div className='tableContent'>
              <Table columns={columns} dataSource={tableData} onChange={onChange} />
          </div>
      </div>
  }

export default AnalysisTable