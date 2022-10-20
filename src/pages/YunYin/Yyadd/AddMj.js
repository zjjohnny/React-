import {useNavigate} from 'react-router-dom'
import React, { useState } from 'react';
import './quan.scss';
import { Input,Select,Radio,DatePicker,ConfigProvider,Space } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';



// 选择框第一个
const { Option } = Select;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

// 日期选择器
const { RangePicker } = DatePicker

// 指定商品弹框内的搜索框


const Addmj = () => {

    // 范围单选框的函数
    const [valuefw, setValuefw] = useState(1);

    const onChangefw = (e) => {
      console.log('radio checked', e.target.value);
      setValuefw(e.target.value);
    };
    // 单选框的函数
    const [valuefs, setValuefs] = useState(3);

    const onChangefs = (f) => {
      console.log('radio checked', f.target.value);
      setValuefs(f.target.value);
    };
    
// 日期选择器
const [dates, setDates] = useState(null);
  const [hackValue, setHackValue] = useState(null);
  const [valuea, setValuea] = useState(null);

  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }

    const tooLate = dates[0] && current.diff(dates[0], 'days') > 7;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open) => {
    if (open) {
      setHackValue([null, null]);
      setDates([null, null]);
    } else {
      setHackValue(null);
    }
  };
// 保存返回按钮
  const navigate=useNavigate()

//   商品标签栏


//   指定商品表格
  




    return(
        <div>
            
             <div className='yhqxx'>
                <p>优惠券信息</p>
                  <div className='quanbta'>
                    <button>取消</button>
                  </div>
                  <div className='quanbtb'>
                    <button onClick={()=>{
                         navigate('/main/YyMj') } 
                     }>
                       保存
                      </button>
                   </div>
             </div>

{/* 第一个 */}
<div>
                 <p style={{float:'left',marginTop:'30px',color:'red'}}>*</p>
                    <div style={{float:'left',marginLeft:'7px',marginTop:'30px',fontSize:'16px'}}>满减名称</div>
                     <div style={{float:'left',marginLeft:'17px',marginTop:'28px'}}>
                     <Input style={{width:'250px'}} placeholder='请输入优惠券名称'/>
                  </div>
             </div>
{/* 第二个输入框 */}
             <div>
               <p style={{float:'left',marginLeft:'-344px',marginTop:'80px',color:'red'}}>*</p>
                   <div style={{float:'left',marginLeft:'-333px',marginTop:'80px',fontSize:'16px'}}>满减类型</div>
                  <div style={{float:'left',marginLeft:'-250px',marginTop:'78px'}}>
                  <Select
                     defaultValue="lucy"
                     
                     style={{
                     width: 250,
                    }}
                     onChange={handleChange}
                      >
                    <Option value="jack">注册赠送</Option>
                    <Option value="lucy">购物赠送</Option>
                    
                     <Option value="Yiminghe">全场赠送</Option>
                    </Select>
                  </div>
             </div>
        
           
             {/* 第三个输入框 */}
             <div>
                 <p style={{float:'left',marginLeft:'-344px',marginTop:'135px',color:'red'}}>*</p>
                    <div style={{float:'left',marginLeft:'-333px',marginTop:'135px',fontSize:'16px'}}>使用门槛</div>
                     <div style={{float:'left',marginLeft:'-250px',marginTop:'133px'}}>
                     <div>订单满&nbsp;<Input style={{width:'50px',height:'32px'}}></Input>&nbsp;元减&nbsp;<Input style={{width:'50px',height:'32px'}}></Input>&nbsp;元</div>
                  </div>
             </div>
             {/* 第四个输入框 */}
             <div>
                 <p style={{float:'left',marginLeft:'-344px',marginTop:'190px',color:'red'}}>*</p>
                    <div style={{float:'left',marginLeft:'-333px',marginTop:'190px',fontSize:'16px'}}>使用范围</div>
                     <div style={{float:'left',marginLeft:'-250px',marginTop:'188px'}}>
                     <Radio.Group onChange={onChangefw} value={valuefw} style={{marginLeft:'40px',marginTop:'3px'}}>
                      <Radio value={1} style={{font:'26px'}}>单一商品</Radio>
                      <Radio value={2}>全部商品</Radio>

                     </Radio.Group>
                  </div>
             </div>
             {/* 第五个输入框 */}
             <div>
                 <p style={{float:'left',marginLeft:'-344px',marginTop:'250px',color:'red'}}>*</p>
                    <div style={{float:'left',marginLeft:'-333px',marginTop:'250px',fontSize:'16px'}}>使用方式</div>
                     <div style={{float:'left',marginLeft:'-245px',marginTop:'247px'}}>
                     <Select
                        defaultValue="使用一次"
                        disabled
                         style={{
                       width: 120,
                       
                     }}
                       >
                        </Select>
                  </div>
             </div>
          {/* 第六个单选 */}
              <div>
                 <p style={{float:'left',marginLeft:'-344px',marginTop:'310px',color:'red'}}>*</p>
                    <div style={{float:'left',marginLeft:'-333px',marginTop:'310px',fontSize:'16px'}}>运营是否可用</div>
                     <div style={{float:'left',marginLeft:'-230px',marginTop:'308px'}}>
                     <Radio.Group onChange={onChangefs} value={valuefs} style={{marginLeft:'20px',marginTop:'3px'}}>
                      <Radio value={3} style={{font:'26px'}}>秒杀可用</Radio>
                      <Radio value={4}>拼团可用</Radio>

                     </Radio.Group>
                     
                  </div>
             </div>

             {/* 第七个时间 */}
             <div>
                 <p style={{float:'left',marginLeft:'-344px',marginTop:'375px',color:'red'}}>*</p>
                    <div style={{float:'left',marginLeft:'-333px',marginTop:'375px',fontSize:'16px'}}>活动时间</div>
                     <div style={{float:'left',marginLeft:'-230px',marginTop:'375px'}}>
                     <ConfigProvider locale={zhCN}>
                     <RangePicker
                     style={{width:'250px',marginLeft:'-20px'}}
                     value={hackValue || valuea}
                     disabledDate={disabledDate}
                      onCalendarChange={(val) => setDates(val)}
                     onChange={(val) => setValuea(val)}
                      onOpenChange={onOpenChange}
                     />
                     </ConfigProvider>
                  </div>
             </div>

             {/* 备注输入框 */}
             <div>
                 <p style={{float:'left',marginLeft:'-340px',marginTop:'440px',color:'red'}}>*</p>
                    <div style={{float:'left',marginLeft:'-330px',marginTop:'440px',fontSize:'16px'}}>备注</div>
                     <div style={{float:'left',marginLeft:'-230px',marginTop:'438px'}}>
                      <Input style={{width:"250px",marginLeft:'-20px'} }placeholder='请输入备注'/>
                  </div>
             </div>

          
       
         
        </div>
    )
}
  
export default Addmj;