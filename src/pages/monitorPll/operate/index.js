import './index.scss'
import { React, useEffect, useState } from "react"
import { UserSwitchOutlined,SyncOutlined,UsergroupAddOutlined,PropertySafetyFilled,PayCircleFilled,DatabaseFilled,
    PlusCircleOutlined } from '@ant-design/icons';
import * as echarts from 'echarts';
import DataCheck from '../../../components/pll/dataCheck'
import GoodsRank from '../../../components/pll/goodsRank'
import http from '../../../utils/http'
import {observer} from 'mobx-react'
import { DatePicker, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { useNavigate  } from 'react-router-dom';
import dataProcess from '../../../components/pll/dataProcess'
const Operate = ()=>{
    const navigate = useNavigate();
    const { RangePicker } = DatePicker;
    //后端获取的页面数据存放
    const [operateData, setOperateData] = useState({});
    // 商品销量、团长销量排行
    const [goodsRank,setGoodsRank]= useState()
    const [headerRank,setHeaderRank]= useState()
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
        return y + "-" + m + "-" + d ;
      }
    
    let orderData=[]
    let orderDate=[]
    //   echarts图表x\y轴数据转换数组
    const changeData =(data)=>{
        let newDateArr = []
        let dataArr = []

        let newData = dataProcess(data)
        for(let i=0;i<newData.length;i++){
            newDateArr.push(newData[i].date);
            dataArr.push(newData[i].data)
        }
        orderData = [...dataArr]
        orderDate = [...newDateArr]
    }
    //时间选择框
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
            url: '/admin/monitor/time',
            method: 'post',
            params: {
                beg: beginTime,
                end: endTime
            }
         }).then(res=>{
            console.log(res);
            changeData(res.date.orderDay)
            myChart()
         })
         }
     };
     //订单统计周、月、年点击切换
     const [orderChecked,setOrderChecked] = useState('month')
     const orderWeek = ()=>{
         setOrderChecked('week');
         setHackValue([null, null]);
         setDates([null, null]);
         http({
            url:'/admin/monitor/week?id=1',
            method: 'post'
         }).then(res=>{
            console.log(res);
            changeData(res.date.orderDay)
            myChart()
         })
         console.log('week');
     }
     const orderMonth = ()=>{
         setOrderChecked('month')
         changeData(operateData.orderDay)
         myChart()

         setHackValue([null, null]);
         setDates([null, null]);
         console.log('month');
     }
     const orderYear = ()=>{
         setOrderChecked('year');
         setHackValue([null, null]);
         setDates([null, null]);
         http({
            url:'/admin/monitor/year',
            method: 'post'
         }).then(res=>{
            console.log(res);
            changeData(res.date.orderDay)
            myChart()
         })
         console.log('year');
     }
     //图表渲染
    const myChart = ()=>{
        let orderEcharts = echarts.init(document.getElementById('orderStatisticEcharts'));
        let tradeEcharts = echarts.init(document.getElementById('tradeStatisticEcharts'))
        let orderOption = {
            title: {
                    // text: '订单总数10000'
            },
            xAxis: {
                boundaryGap:false,
                // data: ['02/01','02/02','02/03','02/04','02/05','02/06','02/07'],
                data:orderDate,
                axisLabel:{
                    interval:0,
                    rotate:35
                },
            },
            yAxis: {
                name: '订单总量',
                type: 'value'
            },
            series: [
                {
                    name:'销量',
                    // data:[380,100,300,50,500,220,410],
                    data:orderData,
                    color:'#a9dcf8',
                    areaStyle: {},
                    type: 'line',
                    smooth: 0.6,
                    symbol: 'none',
                    lineStyle: {
                        color: '#6d8ceb',
                    },
                }
            ]
        };
        orderEcharts.clear()
        orderEcharts.setOption(orderOption);
        tradeEcharts.setOption(orderOption);
    }
    // hooks函数组件获取当前时间
    const [time, setTime] = useState(new Date());
    const updateTime =()=>{
        setTime(new Date());
    }

    //运营快捷入口
    const gotoCreateGoods =()=>{
        navigate('/main/commoditymana/creategoods', { state: {goodsId:''}
});//有历史记录的跳转
    }
    const gotoGoodsMana =()=>{
        navigate('/main/commoditymana');
    }
    const goSendGoods = ()=>{
        navigate('/main/sendout')
    }
    const goHeader = ()=>{
        navigate('/main/Administration')
    }
    const goOrder = ()=>{
        navigate('main/Order')
    }
    const goUser =()=>{
        navigate('/main/users')
    }
    //待办事项
    const goPayOrder=()=>{
        navigate('main/Order')
    }
    const goSendOrder=()=>{
        navigate('/main/sendout')
    }
    const headerCheck=()=>{
        navigate('/main/examine')
    }
    const afterSales=()=>{
        navigate('/main/Aftermarkent')
    }
    const goodsInventory=()=>{
        navigate('/main/stocklog')
    }
    const advertis=()=>{
        navigate('/main/adManage')
    }
    useEffect(()=>{
        // 获取当前时间
        const timer = setInterval(()=>{
            updateTime()
        },100)
        return ()=>{
            clearInterval(timer)
        }
    },[time])
    
    
    useEffect(()=>{
        // 初始页面数据请求
        http({
            url:'/admin/monitor/show',
            method: 'post'
        }).then(res=>{
            console.log(res.date);
            setOperateData(res.date); 
            // store.monitor.setGoodsRankList(res.date)
            // console.log(res.date.orderDay);
            setGoodsRank(()=>{
                return <GoodsRank goodsData={res.date.goodshot} title='商品销量排行'/>
            })
            setHeaderRank(()=>{
                return <GoodsRank goodsData={res.date.leaderRanks} title='团长销量排行'/>
            })
            changeData(res.date.orderDay)
            
        })

        setTimeout(()=>{
            myChart()
        },2000)
            
    },[])

   
    return(
        <div className='operateBox' style={{ height: document.body.clientHeight-90-30, overflow: 'auto' }}>
            <div className='operateBox-top'>
                <div className='operateBox-todayData'>
                    <div className='operateBox-head-title'>
                        <span className='operateBox-top-tilte'>今日实时数据</span>
                        <span className='operateBox-time'>统计时间：{time.toLocaleDateString()}-{time.toLocaleTimeString()}</span>
                    </div>
                    <div className='operateBox-topData'>
                        <div className='operateBox-itemIcon'>
                            <DatabaseFilled style={{ fontSize: '40px', color: '#3987e0' }} />
                            <div className='operateBox-itemData'>
                                <span className='dataPrice'>{operateData.monitorOrder}</span><br/>
                                <span>付款订单</span>
                            </div>
                        </div>
                        <div className='operateBox-itemIcon'>
                            <PropertySafetyFilled style={{ fontSize: '40px', color: '#f04814' }} />
                            <div className='operateBox-itemData'>
                                <span>￥</span><span className='dataPrice'>{operateData.monitorAmount}</span><br/>
                                <span>付款金额（元）</span>
                            </div>
                        </div>
                        <div className='operateBox-itemIcon'>
                            <UserSwitchOutlined style={{ fontSize: '40px', color: 'red' }} />
                            <div className='operateBox-itemData'>
                                <span className='dataPrice'>{operateData.monitorActive}</span><br/>
                                <span>活跃用户（今日）</span>
                            </div>
                        </div>
                        <div className='operateBox-itemIcon'>
                            <SyncOutlined style={{ fontSize: '40px', color: 'purple' }} />
                            <div className='operateBox-itemData'>
                                <span className='dataPrice'>{operateData.monitorRate}</span><br/>
                                <span>转化率（%）</span>
                            </div>
                        </div>
                        <div className='operateBox-itemIcon'>
                            <PayCircleFilled style={{ fontSize: '40px', color: 'orange' }} />
                            <div className='operateBox-itemData'>
                                <span style={{display:operateData.monitorPrice ? 'inline-block':'none'}}>￥</span><span className='dataPrice'>{operateData.monitorPrice}</span><br/>
                                <span>客单价（元）</span>
                            </div>
                        </div>
                        <div className='operateBox-itemIcon'>
                            <UsergroupAddOutlined style={{ fontSize: '40px', color: '#5fd1ee' }} />
                            <div className='operateBox-itemData'>
                                <span className='dataPrice'>{operateData.monitorNew}</span><br/>
                                <span>新增用户（今日）</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='operateBox-into'>
                    <div className='operateBox-head-title' >
                        <span className='operateBox-top-tilte'>运营快捷入口</span>
                    </div>
                    <div className='operateBox-intoBox'>
                        <div className='intoBox1'>
                            <div className='operateBox-intoItem' onClick={gotoCreateGoods}>
                                <PlusCircleOutlined />
                                <span>新建商品</span>
                            </div>
                            <div className='operateBox-intoItem' onClick={gotoGoodsMana}>
                                <PlusCircleOutlined />
                                <span>商品管理</span>
                            </div>
                            <div className='operateBox-intoItem' onClick={goSendGoods}>
                                <PlusCircleOutlined />
                                <span>发货管理</span>
                            </div>
                        </div>
                        <div className='intoBox1'>
                            <div className='operateBox-intoItem' onClick={goHeader}>
                                <PlusCircleOutlined />
                                <span>团长管理</span>
                            </div>
                            <div className='operateBox-intoItem' onClick={goOrder}>
                                <PlusCircleOutlined />
                                <span>订单管理</span>
                            </div>
                            <div className='operateBox-intoItem' onClick={goUser}>
                                <PlusCircleOutlined />
                                <span>用户管理</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='operateBox-center'>
                <div className='operateBox-centerLeft'>
                    <div className='todo'>
                        <div className='operateBox-head-title'>
                            <span className='operateBox-top-tilte'>待办事项</span>
                        </div>
                        <div className='todoContent'>
                            <div className='todoContent-item' onClick={goPayOrder}>
                                <span>待付款订单</span>
                                <span>（{operateData.monitorWaitpay}）</span>
                            </div>
                            <div className='todoContent-item' onClick={goSendOrder}>
                                <span>待发货社区</span>
                                <span>（{operateData.monitorDeliver}）</span>
                            </div>
                            <div className='todoContent-item' onClick={headerCheck}>
                                <span>团长申请审核</span>
                                <span>（{operateData.monitorExamine}）</span>
                            </div>
                            <div className='todoContent-item' onClick={afterSales}>
                                <span>售后订单审核</span>
                                <span>（{operateData.monitorSales}）</span>
                            </div>
                            <div className='todoContent-item' onClick={goodsInventory}>
                                <span>商品库存不足</span>
                                <span>（{operateData.monitorInsufficient}）</span>
                            </div>
                            <div className='todoContent-item' onClick={advertis}>
                                <span>广告即将到期</span>
                                <span>（{operateData.monitorExpire}）</span>
                            </div>
                        </div>
                    </div>
                    <div className='orderStatistic'>
                        {/* <DataCheck title='订单统计'/> */}
                        <div className='orderStatistic-title'>
                            <span className='operateBox-top-tilte'>订单统计</span>
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
                        <div id='orderStatisticEcharts' style={{width:'100%',height:'240px'}}>
                        </div>
                    </div>
                    <div className='tradeStatistic'>
                        {/* {echartsData} */}
                        <DataCheck title='交易统计'/>
                        <div id='tradeStatisticEcharts' style={{width:'100%',height:'240px'}}>
                        </div>
                    </div>
                </div>
                <div className='operateBox-centerRight'>
                    {goodsRank}
                    {headerRank}
                </div>
            </div>
        </div>
    )
}

export default observer(Operate)

/* */