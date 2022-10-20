import { React, useEffect, useState } from "react"
import './goodsRank.scss'
import http from '../../utils/http'

const GoodsRank =(props)=>{
    let goods_monthData = [] ;//默认展示本月
    let header_monthData = [];
    //订单统计周、月、年点击切换
    const [orderChecked,setOrderChecked] = useState('month')
    const [rankData, setRankData] = useState([]);
    const checkHttp =(url)=>{
        http({
            url:url,
            method: 'post'
        }).then(res=>{
            console.log(res.date);
            setRankData(res.date)
        })
    }
    const orderDay = ()=>{
        setOrderChecked('today');
        if(props.title === '商品销量排行'){
            checkHttp('/admin/monitor/good/day')
        }else if(props.title === '团长销量排行'){
            checkHttp()
        }
    }
    const orderWeek = ()=>{
        setOrderChecked('week')
        if(props.title === '商品销量排行'){
            checkHttp('/admin/monitor/good/week')
        }else if(props.title === '团长销量排行'){
            checkHttp('/admin/monitor/regiment/week')
        }
    }
    const orderMonth = ()=>{
        setOrderChecked('month');
        if(props.title === '商品销量排行'){
            http({
                url:"/admin/monitor/show",
                method: 'post'
            }).then(res=>{
                console.log(res.date);
                setRankData(res.date.goodshot)
            })
        }
    }
    const orderYear = ()=>{
        if(props.title === '商品销量排行'){
            checkHttp('/admin/monitor/good/year')
        }else if(props.title === '团长销量排行'){
            checkHttp()
        }
        setOrderChecked('year');
    }
    useEffect(()=>{
        console.log(props);
        setRankData(props.goodsData);
    },[props.goodsData])
   
    
    return (
        <div className='goodsRank' >
            <div className='goodsRank-title'>
                <span className='operateBox-top-tilte'>{props.title}</span>
                <div className='timeSelect'>
                    <span className={orderChecked === 'today' ? 'order-checked' : ''} onClick={orderDay}>今日</span>
                    <span className={orderChecked === 'week' ? 'order-checked' : ''} onClick={orderWeek}>本周</span>
                    <span className={orderChecked === 'month' ? 'order-checked' : ''} onClick={orderMonth}>本月</span>
                    <span className={orderChecked === 'year' ? 'order-checked' : ''} onClick={orderYear}>本年</span>
                </div>
            </div>
            <div className='goodsRank-content'>
                <div>
                    {rankData.map((item,i)=>{
                        return(
                            <div className='goodsRank-contentItem' key={i}>
                                <div>
                                    <>
                                    <span style={{display:(i+1)===1 ? 'inline-block':'none'}} className='contentItem-num color1'>{i+1}</span>
                                    <span style={{display:(i+1)===2 ? 'inline-block':'none'}} className='contentItem-num color2'>{i+1}</span>
                                    <span style={{display:(i+1)===3 ? 'inline-block':'none'}} className='contentItem-num color3'>{i+1}</span>
                                    <span style={{display:(i+1)>3 ? 'inline-block':'none'}} className='contentItem-num'>{i+1}</span>
                                    </>
                                    <>
                                    <span style={{display:item.date ? 'inline-block':'none'}}>{item.date}</span>
                                    <span style={{display:item.name ? 'inline-block':'none'}}>{item.name}</span>
                                    </>
                                </div>
                                <span style={{display:item.area ? 'inline-block':'none'}}>{item.area}</span>
                                <span>{item.num}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default GoodsRank