import './index.scss'
import PieChart from '../../../components/pll/pieChart'
import { useEffect, useState } from 'react'
import http from '../../../utils/http'
import {QuestionCircleFilled} from '@ant-design/icons';
import { DatePicker, Popover, ConfigProvider, Pagination } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { Table,Button } from 'antd';
import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const HeaderAnalysis = ()=>{
    //头部数据
    const [analysisHeader,setAnalysisHeader] = useState([])
    //饼图组件
    const [pieData,setPieData] =useState()
    //hover提示框
    const headerContent = (
        <div className='analysisHeader-tip' >
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>团长总数：</span> 
            <span>截止当日，审核通过的团长总数</span>
          </p>
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>新增团长: </span> 
            <span>所选日期内，新增团长数</span>
          </p>
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>活跃团长：</span> 
            <span>分享商品团长数</span>
          </p>
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>团长佣金: </span> 
            <span>所选日期内，已结算的团长佣金</span>
          </p>
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>分享订单: </span> 
            <span>所选日期内，通过团长分享所支付的订单</span>
          </p>
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>区域分布: </span> 
            <span>截止所选当日，当前城市团长区域分布</span>
          </p>
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>门店排行: </span> 
            <span>所选时间内，团长销售排行</span>
          </p>
        </div>
    );

    //表格数据
    const [tableData,setTableData] = useState([])
    const [page,setPage] = useState(1)
    const [pageSize,setPageSize] = useState(5)
    const [pageCount ,setPageCount] =useState()
    const columns = [
        {
          title: '时间',
          key: 'date',
          dataIndex: 'date',
          sorter: {
            compare: (a, b) => Date.parse(a.date) - Date.parse(b.date) 
          },
        },
        {
          title: '新增团长',
          key: 'leaderNew',
          dataIndex: 'leaderNew',
          sorter: {
            compare: (a, b) => a.leaderNew - b.leaderNew,
            multiple: 3,
          },
        },
        {
          title: '团长佣金（元）',
          key: 'leaderCommission',
          dataIndex: 'leaderCommission',
          sorter: {
            compare: (a, b) => a.leaderCommission - b.leaderCommission,
            multiple: 2,
          },
        },
        {
          title: '活跃团长',
          key: 'leaderActive',
          dataIndex: 'leaderActive',
          sorter: {
            compare: (a, b) => a.leaderCommission - b.leaderCommission,
            multiple: 1,
          },
        },
        // {
        //     title: '分享订单',
        //     key:'',
        //     dataIndex: '10',
        //     sorter: {
        //       compare: (a, b) => a.english - b.english,
        //       multiple: 1,
        //     },
        // },
         
    ];
    //pagination{current:1,pageSize:10}   sorter{}
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
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
    //时间选择器
    const [dates, setDates] = useState(null);
    const [hackValue, setHackValue] = useState(null);
    const [value, setValue] = useState(null);
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
        http({
           url: '/admin/leader/time',
           method: 'post',
           params: {
               beg: beginTime,
               end: endTime
           }
        }).then(res=>{
           console.log(res);
           setAnalysisHeader(res.date)
        })
        }
    };
    //分页
    const onShowSizeChange = (current, pageSize) => {
      console.log(current, pageSize);
    };
    const changePage = (page, pageSize) => {
      console.log(page, pageSize);
      setPage(page);
      setPageSize(pageSize)
      sendHttp(page,pageSize)
    }
    const sendHttp = (page,pageSize)=>{
      http({
        url: '/admin/leader/show',
        method: 'post',
        params: {
            page: page,
            limit: pageSize
        }
    }).then(res=>{
        console.log(res);
        setPageCount(res.date.count)
        setAnalysisHeader(res.date.data2)
        // changeTable(res.date.data)
        setTableData(res.date.data)
        setPieData(()=>{
            return <PieChart data={res.date.data3} echartsTitle='团长数据'/>
        })
    })
    }
    useEffect(()=>{
      sendHttp(page,pageSize)
        
    },[])
    return <div className='headerAnalysisBox' style={{ height: document.body.clientHeight-90-35, overflow: 'auto' }}>
        <div className='analysisHeader'>
            <div className='analysisHeader1'>
                <span className='analysisHeader-title'>团长分析</span>
                <div>
                    <span style={{fontSize: '12px'}}>数据指标</span>
                    <Popover content={headerContent} title="数据指标说明">
                        <QuestionCircleFilled />
                    </Popover>
                    <span style={{marginRight: '20px'}}></span>
                    <ConfigProvider locale={zhCN}>
                        <RangePicker value={hackValue || value}
                        disabledDate={disabledDate}
                        onCalendarChange={(val) => setDates(val)}
                        onChange={(val) => setValue(val)}
                        onOpenChange={onOpenChange}/>
                    </ConfigProvider>
                </div>
            </div>
            <div className='analysisHeader2'>团长概况</div>
            <div className='analysisHeader3'>
                <div className='headerItem'>
                    <span className='itemData'>{analysisHeader.num}</span>
                    <span>团长数</span>
                </div>
                <div className='headerItem'>
                    <span className='itemData'>{analysisHeader.leaderNew}</span>
                    <span>新增团长数</span>
                </div>
                <div className='headerItem'>
                    <span className='itemData'>{analysisHeader.leaderActive}</span>
                    <span>活跃团长数</span>
                </div>
                <div className='headerItem'>
                    <span className='itemData'>{analysisHeader.leaderCommission}</span>
                    <span>团长佣金（元）</span>
                </div>
                <div className='headerItem'>
                    <span className='itemData'>10</span>
                    <span>分享订单</span>
                </div>
            </div>
        </div>
        {pieData}
        <div className="analysisTableBox">
          <div className='tableTitle'>
              <span>团长增长</span>
              <Button icon={<DownloadOutlined />}>导出</Button>
          </div>
          <div className='tableContent'>
              <Table columns={columns} dataSource={tableData} onChange={onChange} pagination={false}/>
          </div>
          <ConfigProvider locale={zhCN}>
            <Pagination
              current = {page}
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              onChange={changePage}
              defaultCurrent={page}
              pageSize = {pageSize}
              total={pageCount}
              pageSizeOptions = {[5,10,15,20]}
              defaultPageSize = {5}
            />
          </ConfigProvider>
          
        </div>
    </div>
}

export default HeaderAnalysis