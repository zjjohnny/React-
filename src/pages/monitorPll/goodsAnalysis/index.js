import './index.scss'
import PieChart from '../../../components/pll/pieChart'
import { useEffect, useState } from 'react'
import http from '../../../utils/http'
import {QuestionCircleFilled} from '@ant-design/icons';
import { DatePicker, Popover, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import React from 'react';
const { RangePicker } = DatePicker;

const GoodsAnalysis = ()=>{
    //头部数据
    const [analysisHeader,setAnalysisHeader] = useState({})
    //饼图组件
    const [pieData,setPieData] =useState()
    //hover提示框
    const headerContent =(
        <div className='analysisHeader-tip' >
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>商品总数：</span> 
            <span>截止当日，在售商品总数</span>
          </p>
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>活动商品数: </span> 
            <span>截止当日，在售商品加入到秒杀等营销活动的商品数</span>
          </p>
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>销售库存: </span> 
            <span>截止当日，已销售商品库存数量</span>
          </p>
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>分类分布: </span> 
            <span>截止所选当日，当前一级分类商品分布</span>
          </p>
          <p className='analysisHeader-tipP'>
            <span style={{fontWeight: 'bold'}}>销售排行: </span> 
            <span>所选时间内，商品销售排行</span>
          </p>
        </div>
    )


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
          url: '/admin/goodmonitor/show',
          method: 'post',
      }).then(res=>{
          console.log(res);
          setAnalysisHeader(res.date.shangmian)
          setPieData(()=>{
              return <PieChart data={res.date.sanxingtu} echartsTitle='分类数据'/>
          })
      })
      }
      useEffect(()=>{
        sendHttp()
          
      },[])

    return <div className='goodsAnalysisBox' style={{ height: document.body.clientHeight-90-40, overflow: 'auto' }}>
        {/* <AnalysisHeader title='商品分析' dataTitle='商品概况' data={goodsData}/> */}
        <div className='analysisHeader'>
            <div className='analysisHeader1'>
                <span className='analysisHeader-title'>商品分析</span>
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
            <div className='analysisHeader2'>商品概况</div>
            <div className='analysisHeader3'>
            <div className='headerItem'>
                    <span className='itemData'>{analysisHeader.allgoods}</span>
                    <span>商品总数</span>
                </div>
                <div className='headerItem'>
                    <span className='itemData'>{analysisHeader.activegoods}</span>
                    <span>活动商品数</span>
                </div>
                <div className='headerItem'>
                    <span className='itemData'>{analysisHeader.sall}</span>
                    <span>销售库存</span>
                </div>
            </div>
        </div>
        {pieData}
        {/* <PieChart echartsTitle='商品数据'/> */}
    </div>
}

export default GoodsAnalysis