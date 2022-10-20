import './analysisEcharts.scss'
import { Tabs } from 'antd';
import { React, useEffect} from 'react';
import * as echarts from 'echarts'
import dataProcess from './dataProcess'

const AnalysisEcharts =(props)=>{
    console.log(props);
    let userData=[]
    let userDate=[]
    //   echarts图表x\y轴数据转换数组
    const changeData =(data)=>{
        let newDateArr = []
        let dataArr = []

        let newData = dataProcess(data)
        for(let i=0;i<newData.length;i++){
            newDateArr.push(newData[i].date);
            dataArr.push(newData[i].data)
        }
        userData = [...dataArr]
        userDate = [...newDateArr]
        console.log(userData,userDate);
    }
    const echartView = (eid)=>{
        let addUserEcharts = echarts.init(document.getElementById(eid))
        let addUserOption = {
            xAxis: {
                boundaryGap:false,
                // data: ['2022/02/01','2022/02/02','2022/02/03','2022/02/04','2022/02/05','2022/02/06','2022/02/07']
                data: userDate
            },
            yAxis: {},
            series: [
                {
                    data: userData,
                    // data:[380,100,300,50,500,220,410],
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
        addUserEcharts.clear()
        addUserEcharts.setOption(addUserOption);
    }
    //tab切换
    const onChange = (key) => {
        if(key === '2'){
            changeData(props.newUser)
            setTimeout(()=>{
                echartView('dayUserEcharts')
            },1000)
        }else if(key === '3'){
            changeData(props.day);
            setTimeout(()=>{
                echartView('weekUserEcharts')
            },1000)
            
        }
    };
    useEffect(()=>{
        changeData(props.day)
    },[])
    setTimeout(()=>{
        echartView('addUserEcharts')
    },2000)
        
    return <div className="analysisEchartsBox">
        <div className='echartsTitle'>{props.echartsTitle}</div>
        <div className='echartsContent'>
            <Tabs
                defaultActiveKey="1"
                onChange={onChange}
                items={[
                {
                    label: `新增用户`,
                    key: '1',
                    children: (
                        <div id='addUserEcharts' style={{width:'90%',height:'350px'}}>
                        </div>
                    ),
                },
                {
                    label: `日活跃`,
                    key: '2',
                    children: (
                        <div id='dayUserEcharts' style={{width:'90%',height:'350px'}}>
                        </div>
                    ),
                },
                {
                    label: `周活跃`,
                    key: '3',
                    children: (
                        <div id='weekUserEcharts' style={{width:'90%',height:'350px'}}>
                        </div>
                    ),
                },
                {
                    label: `月活跃`,
                    key: '4',
                    children: `Content of Tab Pane 4`,
                }
                ]}
            />
        </div>
    </div>

}

export default AnalysisEcharts