import { useEffect } from 'react'
import * as echarts from 'echarts'
import './pieChart.scss'
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const PieChart =(props)=>{
    let pieData, barDataY, barData1, barData2
    //饼图数据封装结构
    const changData = (data)=>{
      let newData = []
      if(data.echartsTitle === '团长数据'){
        for(let i=0;i<data.data.length;i++){
          let obj = {}
          obj.value = data.data[i].num
          obj.name = data.data[i].address
          newData.push(obj)
        }
      }else{
        for(let i=0;i<data.data.length;i++){
          let obj = {}
          obj.value = data.data[i].num
          obj.name = data.data[i].classifyName
          newData.push(obj)
        }
      }
      console.log(newData);
      return newData
    }
    //条形图数据封装
    const changeBar = (data)=>{
      let dataY = []
      let data1 = []
      let data2 = []
      if(data.echartsTitle === '团长数据'){
        for(let i=0;i<data.data.length;i++){
          dataY.push(data.data[i].address)
          data1.push(data.data[i].money)
          data2.push(data.data[i].num)
          
        }
      }else{
        for(let i=0;i<data.data.length;i++){
          dataY.push(data.data[i].classifyName)
          data1.push(data.data[i].num)
          data2.push(data.data[i].num)
        }
      }
      console.log(dataY,data1,data2);
      barDataY = [...dataY]
      barData1 = [...data1]
      barData2 = [...data2]
    }

    useEffect(()=>{
      console.log(props);
      pieData = changData(props)
      // console.log(pieData);
      changeBar(props)
      
        let pieChart = echarts.init(document.getElementById('headerPieChart'))
        let barChart = echarts.init(document.getElementById('headerBarChart'))
        let pieChartOption = {
            title: {
              text: '区域分布',
              left: 'left'
            },
            legend: {
              orient: 'vertical',
              left: 'right'
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                // data: [
                //   { value: 1048, name: 'Search Engine' },
                //   { value: 735, name: 'Direct' },
                //   { value: 580, name: 'Email' },
                //   { value: 484, name: 'Union Ads' },
                //   { value: 300, name: 'Video Ads' }
                // ],
                data:pieData,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
        };
        let barChartOption  = {
            title: {
              text: '门店排行'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {},
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01]
            },
            yAxis: {
              type: 'category',
              // data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
              data: barDataY
            },
            series: [
              {
                name: '销售金额',
                type: 'bar',
                // data: [18203, 23489, 29034, 104970, 131744, 630230]
                data: barData1
              },
              {
                name: '销售订单',
                type: 'bar',
                // data: [19325, 23438, 31000, 121594, 134141, 681807]
                data: barData2
              }
            ]
          };
        pieChart.clear()
        barChart.clear()
        pieChart.setOption(pieChartOption);
        barChart.setOption(barChartOption)
    },[])
    return <div className='pieChartBox'>
            <div className='echartsTitle'>{props.echartsTitle}</div>
            <div className='echartsContent'>
                <>
                    <div id='headerPieChart' style={{width:'40%',height:'350px'}}></div>
                    <Button id='pieBtn' size='small' icon={<DownloadOutlined />}>导出</Button>
                </>
                <>
                    <div id='headerBarChart' style={{width:'45%',height:'350px'}}></div>
                    <Button id='barBtn' size='small' icon={<DownloadOutlined />}>导出</Button>
                </>
            </div>
        </div>
}

export default PieChart