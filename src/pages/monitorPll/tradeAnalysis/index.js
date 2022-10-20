import './index.scss'
import AnalysisEcharts from '../../../components/pll/analysisEcharts'
import { useState, useEffect } from 'react'
import http from '../../../utils/http'
import {QuestionCircleFilled} from '@ant-design/icons';
import { Tabs, DatePicker, Popover, ConfigProvider, Pagination } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { Table,Button } from 'antd';
import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import dataProcess from '../../../components/pll/dataProcess'
import * as echarts from 'echarts'

const { RangePicker } = DatePicker;

const TradeAnalysis = ()=>{
    let barData, barDataY1, barDataY2
    //头部数据
    const [analysisHeader,setAnalysisHeader] = useState([])
    //echarts组件
    const [echartData,setEchartData] =useState()
    //表格数据
    const [tableData,setTableData] = useState([]);
    const [page,setPage] = useState(1)
    const [pageSize,setPageSize] = useState(5)
    const [pageCount ,setPageCount] =useState()
    const columns = [
        // {
        //   title: '时间',
        //   key: 'date',
        //   dataIndex: 'date',
        //   sorter: {
        //     compare: (a, b) => Date.parse(a.date) - Date.parse(b.date) 
        //   },
        // },
        {
          title: '订单金额（元）',
          key: 'money',
          dataIndex: 'money',
          sorter: {
            compare: (a, b) => a.money - b.money,
            multiple: 3,
          },
        },
        {
          title: '订单用户',
          key: 'num',
          dataIndex: 'num',
          sorter: {
            compare: (a, b) => a.num - b.num,
            multiple: 2,
          },
        },
        {
          title: '支付订单',
          key: 'payorder',
          dataIndex: 'payorder',
          sorter: {
            compare: (a, b) => a.payorder - b.payorder,
            multiple: 1,
          },
        },
        {
            title: '订单数',
            key: 'suc',
            dataIndex: 'suc',
            sorter: {
              compare: (a, b) => a.suc - b.suc,
              multiple: 1,
            },
        },
        {
            title: '用户ARPU',
            key: 'arpu',
            dataIndex: 'arpu',
            sorter: {
              compare: (a, b) => a.arpu - b.arpu,
              multiple: 1,
            },
        },
    ]
    const tradeContent = (
        <div className='analysisHeader-tip' >
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>订单金额：</span> 
            <span>所选时段内支付订单的金额合计值</span>
          </p>
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>订单用户: </span> 
            <span>所选日期内，完成支付订单用户数</span>
          </p>
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>支付订单数: </span> 
            <span>所选时段内支付订单的次数</span>
          </p>
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>订单完成率: </span> 
            <span>支付订单数 / 订单数</span>
          </p>
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>订单数: </span> 
            <span>所选时段内订单的次数</span>
          </p>
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>用户ARPU: </span> 
            <span>支付订单金额 / 活跃用户</span>
          </p>
        </div>
    );
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
             url: '/admin/jiaoyi/time',
             method: 'post',
             params: {
                 beg: beginTime,
                 end: endTime
             }
          }).then(res=>{
             console.log(res.date);
             setAnalysisHeader(res.date.data)
          })
        }
    };
    //echart图表
    let userData=[]
    let userDate=[]
    //   echarts图表x\y轴数据转换数组
    const changeData =(data)=>{
      console.log(data);
        let data3 = []
        let data1 = []
        let data2 = []

        for(let i=0;i<data.length;i++){
          data3.push(data[i].date)
          data1.push(data[i].money)
          data2.push(data[i].arpu)
        }
        barData = [...data3]
        barDataY1 = [...data1]
        barDataY2 = [...data2]
        // let newData = dataProcess(data)
        // for(let i=0;i<newData.length;i++){
        //     newDateArr.push(newData[i].date);
        //     dataArr.push(newData[i].data)
        // }
        // userData = [...dataArr]
        // userDate = [...newDateArr]
        console.log(barData,barDataY1,barDataY2);
    }
    const echartView = (eid)=>{
        let addUserEcharts = echarts.init(document.getElementById(eid))
        let addUserOption = {
            title: {
                    // text: '订单总数10000'
            },
            // tooltip: {
            //   trigger: 'axis',
            //   axisPointer: {
            //     type: 'shadow'
            //   }
            // },
            legend: {},
            xAxis: {
                boundaryGap:false,
                // data: ['02/01','02/02','02/03','02/04','02/05','02/06','02/07'],
                data:barData,
                axisLabel:{
                    interval:0,
                    rotate:35
                },
            },
            yAxis: {
                name: '',
                type: 'value'
            },
            series: [
                {
                    name:'订单金额',
                    // data:[380,100,300,50,500,220,410],
                    data:barDataY1,
                    color:'#a9dcf8',
                    type: 'line',
                    smooth: 0.6,
                    symbol: 'none'
                },
                {
                  name:'用户ARPU',
                  // data:[10,20,100,500,300,220,410],
                  data:barDataY2,
                  type: 'line',
                  smooth: 0.6,
                  symbol: 'none',
                  lineStyle: {
                      color: '#6d8ceb',
                  },
              },
            ]
        };
        addUserEcharts.clear()
        addUserEcharts.setOption(addUserOption);
    }
    //tab切换
    const tabChange = (key) => {
        // if(key === '2'){
        //     changeData()
        //     setTimeout(()=>{
        //         echartView('dayUserEcharts')
        //     },1000)
        // }else if(key === '3'){
        //     changeData();
        //     setTimeout(()=>{
        //         echartView('weekUserEcharts')
        //     },1000)
            
        // }
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
    //刷新页面
    const sendHttp =(page,pageSize)=>{
      http({
        url:'/admin/jiaoyi/show',
        method: 'post',
        params: {
            page: page,
            limit: pageSize
        }
    }).then(res=>{
        console.log(res.date);
        setPageCount(res.date.count);
        setAnalysisHeader(res.date.data3);
        setTableData(res.date.data);
        changeData(res.date.data2)
        setEchartData(()=>{
            return <AnalysisEcharts data={res.date.data2} echartsTitle='交易趋势'/>
        })
        
    })
    }
    useEffect(()=>{
      sendHttp(page,pageSize);
      console.log('11');
      setTimeout(()=>{
        echartView('orderMoney');
        console.log(barData,barDataY1,barDataY2);
      },2000)
    },[])

    

    return <div className='tradeAnalysisBox' style={{ height: document.body.clientHeight-90-40, overflow: 'auto' }}>
        <div className='analysisHeader'>
            <div className='analysisHeader1'>
                <span className='analysisHeader-title'>交易分析</span>
                <div>
                    <span style={{fontSize: '12px'}}>数据指标</span>
                    <Popover content={tradeContent} title="数据指标说明">
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
            <div className='analysisHeader2'>交易概况</div>
            <div className='analysisHeader3'>
                <div className='headerItem'>
                    <span className='itemData'>{analysisHeader.money}</span>
                    <span>订单金额（元）</span>
                </div>
                <div className='headerItem'>
                    <span className='itemData'>{analysisHeader.num}</span>
                    <span>订单用户</span>
                </div>
                <div className='headerItem'>
                    <span className='itemData'>{analysisHeader.payorder}</span>
                    <span>支付订单数</span>
                </div>
                <div className='headerItem'>
                    <span className='itemData'>{analysisHeader.suc}</span>
                    <span>订单完成率</span>
                </div>
                <div className='headerItem'>
                    <span className='itemData'>{analysisHeader.arpu}</span>
                    <span>用户ARPU</span>
                </div>
            </div>
        </div>
        {/* <AnalysisEcharts echartsTitle='交易趋势'/> */}
        <div className="analysisEchartsBox">
        <div className='echartsTitle'>交易趋势</div>
        <div className='echartsContent'>
            <Tabs
                defaultActiveKey="1"
                onChange={tabChange}
                items={[
                {
                    label: `订单金额`,
                    key: '1',
                    children: (
                        <div id='orderMoney' style={{width:'90%',height:'350px'}}>
                        </div>
                    ),
                },
                {
                    label: `订单用户`,
                    key: '2',
                    children: (
                        <div id='orderUser' style={{width:'90%',height:'350px'}}>
                        </div>
                    ),
                },
                {
                    label: `订单数`,
                    key: '3',
                    children: (
                        <div id='orderNum' style={{width:'90%',height:'350px'}}>
                        </div>
                    ),
                },
                {
                    label: `支付订单`,
                    key: '4',
                    children: (
                      <div id='orderPay' style={{width:'90%',height:'350px'}}>
                        </div>
                    ),
                }
                ]}
            />
        </div>
    </div>

        <div className="analysisTableBox">
          <div className='tableTitle'>
              <span>交易增长</span>
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

export default TradeAnalysis