import './dataCheck.scss'
import { React, useEffect, useState } from "react"
import { DatePicker, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

const { RangePicker } = DatePicker;
const DataCheck =(props)=>{

     //时间选择器
     const [dates, setDates] = useState(null);
     const [hackValue, setHackValue] = useState(null);
     const [value, setValue] = useState(null);
     //时间格式转换
     const formatDateTime =(inputTime)=>{
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        // var h = date.getHours();
        // h = h < 10 ? "0" + h : h;
        // var minute = date.getMinutes();
        // var second = date.getSeconds();
        // minute = minute < 10 ? "0" + minute : minute;
        // second = second < 10 ? "0" + second : second;
        // return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
        return y + "-" + m + "-" + d ;
      }
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
         }
     };
     //订单统计周、月、年点击切换
     const [orderChecked,setOrderChecked] = useState('month')
     const orderWeek = ()=>{
         setOrderChecked('week')
         console.log('week');
     }
     const orderMonth = ()=>{
         setOrderChecked('month')
         console.log('month');
     }
     const orderYear = ()=>{
         setOrderChecked('year')
         console.log('year');
     }
     useEffect(()=>{
        // console.log(props);
        

        
     },[props])

     return(
        <>
            <div className='orderStatistic-title'>
                <span className='operateBox-top-tilte'>{props.title}</span>
                <div className='timeSelect'>
                    <span className={orderChecked === 'week' ? 'order-checked' : ''} onClick={orderWeek}>本周</span>
                    <span className={orderChecked === 'month' ? 'order-checked' : ''} onClick={orderMonth}>本月</span>
                    <span className={orderChecked === 'year' ? 'order-checked' : ''} onClick={orderYear}>本年</span>
                     <ConfigProvider locale={zhCN}>
                        <RangePicker
                        value={hackValue || value}
                        disabledDate={disabledDate}
                        onCalendarChange={(val) => setDates(val)}
                        onChange={(val) => setValue(val)}
                        onOpenChange={onOpenChange}
                        />
                    </ConfigProvider>
                                        
                </div>
            </div>
        </>
     )

}

export default DataCheck