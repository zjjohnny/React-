import './index.scss'
import AnalysisEcharts from '../../../components/pll/analysisEcharts'
import { useEffect, useState } from 'react'
import http from '../../../utils/http'
import {QuestionCircleFilled} from '@ant-design/icons';
import { DatePicker, Popover, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;

const UserAnalysis = ()=>{
    //头部数据
  const [analysisHeader,setAnalysisHeader] = useState({})
  const content = (
    <div className='analysisHeader-tip' >
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>新增用户：</span> 
            <span>所选日期内，每日首次授权小程序的危险用户。一个微信号，只在首次首次授权作新增用户，重复授权的用户不会重复计量。</span>
          </p>
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>活跃用户：</span> 
            <span>所选日期内，至少使用一次的用户。</span>
          </p>
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>日活跃: </span> 
            <span>当日的活跃设备数</span>
          </p>
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>周活跃: </span> 
            <span>截至当日，最近一周（含当日的7天）活跃设备数</span>
          </p>
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>月活跃: </span> 
            <span>截至当日，最近一月（含当日的30天）活跃设备数</span>
          </p>
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>DAU/MAU: </span> 
            <span>所选日期内，当日的日活跃设备数（DAU）与30日活跃设备数（MAU）比值的均值</span>
          </p>
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>启动次数：</span> 
            <span>所选日期内，应用被启动的总次数</span>
          </p>
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>单次使用平均时长: </span> 
            <span>所选日期内，每日每次启动应用的时长均值。</span>
          </p>
        </div>
  )  
  //曲线图
  const [echartData, setEchartData] =useState()
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
        // http({
        //    url: '/admin/leader/time',
        //    method: 'post',
        //    params: {
        //        beg: beginTime,
        //        end: endTime
        //    }
        // }).then(res=>{
        //    console.log(res);
        //    setAnalysisHeader(res.date)
        // })
        }

    };

    const sendHttp = ()=>{
      http({
        url: '/admin/usermoni/show',
        method: 'post',
    }).then(res=>{
        console.log(res);
        setAnalysisHeader(res.date.all[0])
        setEchartData(()=>{
            return <AnalysisEcharts day={res.date.dayactive} newUser={res.date.newUser} echartsTitle='用户趋势'/>
        })
    })
    }
    useEffect(()=>{
      sendHttp()
        
    },[])
    
  

    return <div className='userAnalysisBox' style={{ height: document.body.clientHeight-90-40, overflow: 'auto' }}>
        {/* <AnalysisHeader title='用户分析' dataTitle='用户概况' data={userData}/> */}
        <div className='analysisHeader'>
            <div className='analysisHeader1'>
                <span className='analysisHeader-title'>用户分析</span>
                <div>
                    <span style={{fontSize: '12px'}}>数据指标</span>
                    <Popover content={content} title="数据指标说明">
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
            <div className='analysisHeader2'>商品概况</div>
            <div className='analysisHeader3'>
            <div className='headerItem'>
                    <span className='itemData'>{analysisHeader.newuser}</span>
                    <span>新增用户</span>
                </div>
                <div className='headerItem'>
                    <span className='itemData'>{analysisHeader.monthactive}</span>
                    <span>活跃用户</span>
                </div>
                <div className='headerItem'>
                    <span className='itemData'>{analysisHeader.dau}</span>
                    <span>DAU/MAU</span>
                </div>
            </div>
        </div>
        {echartData}
        {/* <AnalysisTable tableTitle='用户增长'/> */}
        
    </div>
}

export default UserAnalysis