import './analysisHeader.scss'
import React from 'react';
import {QuestionCircleFilled} from '@ant-design/icons';
import { DatePicker, Space, Popover } from 'antd';
const { RangePicker } = DatePicker;

const AnalysisHeader = (props)=>{
    let Content;
    const userContent = (
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
      );
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
    
    const goodsContent = (
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
    );

    if(props.title === '用户分析'){
        Content = userContent
    }else if(props.title === '交易分析'){
        Content = tradeContent
    }else if(props.title === '团长分析'){
      console.log(props);
      const list1 = []
      for(let item in props.data){
        // list1.push(item+"="+props.data[item])
        let obj={}
        obj[item] = props.data[item]
        list1.push(obj)
        let obj2 ={}
        obj2.name = obj[item]
        // console.log(item,props.data[item]);
      }
      // list1.push(props.data)
      console.log(list1);
      // const dataList = list1.map((item,i)=>{
      //     return (
      //         <div className='item' key={i}>
      //             <span className='itemData'>{item.num}</span>
      //             <span>{item.name}</span>
      //         </div>
      //     )
      // })
    }else if(props.title === '商品分析'){
        Content = goodsContent
    }

    const dataList = props.data.map((item,i)=>{
      return (
        <div className='headerItem'>
          <span className='itemData'>{item.num}</span>
          <span>{item.name}</span>
        </div>
      )
    })
    
    return (<div className='analysisHeader'>
    <div className='analysisHeader1'>
        <span className='analysisHeader-title'>{props.title}</span>
        <div>
            <span style={{fontSize: '12px'}}>数据指标</span>
            <Popover content={Content} title="数据指标说明">
                <QuestionCircleFilled />
            </Popover>
            <span style={{marginRight: '20px'}}></span>
            <Space direction="vertical" size={12}>
                <RangePicker />
            </Space>
        </div>
    </div>
    <div className='analysisHeader2'>{props.dataTitle}</div>
    <div className='analysisHeader3'>
        {
            dataList
        }
    </div>
</div>)
}

export default AnalysisHeader