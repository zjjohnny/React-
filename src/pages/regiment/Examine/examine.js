import { Input,Select,Button,Modal,Tabs,Table,Space, } from 'antd';
import React, { useEffect, useState } from 'react';
import './examines.scss'
import http from '../../../utils/http';
const { Option } = Select;
const Examine=()=>{
    // tabs的第一个数据
    const columns=[
            {            
                title: '申请ID',//表格列名
                dataIndex: 'regimentId',//对应数据字段
                key: 'regimentId',//该列的唯一值       
            },
            {            
                title: '申请时间',//表格列名
                dataIndex: 'regimentAuditTime',//对应数据字段
                key: 'regimentAuditTime',//该列的唯一值       
            },
            {            
                title: '姓名',//表格列名
                dataIndex: 'regimentName',//对应数据字段
                key: 'regimentName',//该列的唯一值       
            },
            {            
                title: '手机号',//表格列名
                dataIndex: 'regimentPhone',//对应数据字段
                key: 'regimentPhone',//该列的唯一值       
            },
            {            
                title: '自提点名称',//表格列名
                dataIndex: 'regimentPick',//对应数据字段
                key: 'regimentPick',//该列的唯一值       
            },
            {            
                title: '自提点地址',//表格列名
                dataIndex: 'regimentPickAddress',//对应数据字段
                key: 'regimentPickAddress',//该列的唯一值       
            },
            {            
                title: '自提点类型',//表格列名
                dataIndex: 'regimentPickType',//对应数据字段
                key: 'regimentPickType',//该列的唯一值       
            },
            {            
                title: '操作',//表格列名
                dataIndex: 'doing',//对应数据字段
                key: 'doing',//该列的唯一值   
                render: (_, record) => (
                    <Space size="middle">
                        <Button type="default" onClick={showModal}>通过</Button>
                        <Modal title="提示" open={isModalOpen} onOk={handleOk} destroyOnClose={true}
                            onCancel={handleCancel} okText={'确定'} cancelText={'取消'}>
                        <p>确定要批量通过已选开户申请吗？</p>
                        </Modal>
                        <Button type="default" onClick={myshowModal}>作废</Button>
                        <Modal title="作废原因" open={isModalOpens} 
                        destroyOnClose={true} onOk={handleOks} onCancel={handleCancels} okText={'确定'} cancelText={'取消'}>
                        <p>
                            <Button>用户主动要求</Button>
                            <Button>信息填写错误</Button>
                            <Button>恶意注册</Button>
                        </p>
                        <p><Input size="large" placeholder="请手动输入原因"></Input></p>
                        </Modal>
                    </Space>   
                ) 
            }
    ]   
    const [data, setData] = useState([]);
    useEffect(() => {
        console.log(111);
        http({
          url:'/admin/regiment/showList',
          method:"get",
          params:{
            page:1,
            limit:2
         }
       
        }).then(res=>{
          console.log(res)
          setData(res.date.list)
        })
        showAdopt()
        showVoid()
      },[])
    // tabs的第二个数据
    const [datas, setDatas] = useState([]);
    const columnss=[
        {            
            title: '申请ID',//表格列名
            dataIndex: 'regimentId',//对应数据字段
            key: 'regimentId',//该列的唯一值       
        },
        {            
            title: '申请时间',//表格列名
            dataIndex: 'regimentAuditTime',//对应数据字段
            key: 'regimentAuditTime',//该列的唯一值       
        },
        {            
            title: '姓名',//表格列名
            dataIndex: 'regimentName',//对应数据字段
            key: 'regimentName',//该列的唯一值       
        },
        {            
            title: '手机号',//表格列名
            dataIndex: 'regimentPhone',//对应数据字段
            key: 'regimentPhone',//该列的唯一值       
        },
        {            
            title: '自提点名称',//表格列名
            dataIndex: 'regimentPick',//对应数据字段
            key: 'regimentPick',//该列的唯一值       
        },
        {            
            title: '自提点地址',//表格列名
            dataIndex: 'regimentPickAddress',//对应数据字段
            key: 'regimentPickAddress',//该列的唯一值       
        },
        {            
            title: '自提点类型',//表格列名
            dataIndex: 'regimentPickType',//对应数据字段
            key: 'styel',//该列的唯一值       
        },      
    ]
    let pt = [];
    const showAdopt=()=>{
        http({
            url:'/admin/regiment/showRegimentStateList',
            method:"get",
            params:{
                page:'1',
                limit:'1',
                state:'0'
            }
          }).then(res=>{
            console.log(res.date.list[0])
           pt.push(res.date.list[0]);
           setDatas(pt);
           console.log(pt)
          })
    } 
    // tabs的第三个数据
    const [datass, setDatass] = useState([]);
    const columnsss=[
        {            
            title: '申请ID',//表格列名
            dataIndex: 'id',//对应数据字段
            key: 'id',//该列的唯一值       
        },
        {            
            title: '申请时间',//表格列名
            dataIndex: 'time',//对应数据字段
            key: 'time',//该列的唯一值       
        },
        {            
            title: '姓名',//表格列名
            dataIndex: 'name',//对应数据字段
            key: 'name',//该列的唯一值       
        },
        {            
            title: '手机号',//表格列名
            dataIndex: 'tel',//对应数据字段
            key: 'tel',//该列的唯一值       
        },
        {            
            title: '自提点名称',//表格列名
            dataIndex: 'localname',//对应数据字段
            key: 'localname',//该列的唯一值       
        },
        {            
            title: '自提点地址',//表格列名
            dataIndex: 'local',//对应数据字段
            key: 'local',//该列的唯一值       
        },
        {            
            title: '自提点类型',//表格列名
            dataIndex: 'styel',//对应数据字段
            key: 'styel',//该列的唯一值       
        },
        {            
            title: '操作人',//表格列名
            dataIndex: 'people',//对应数据字段
            key: 'people',//该列的唯一值       
        },
        {            
            title: '作废原因',//表格列名
            dataIndex: 'beause',//对应数据字段
            key: 'beause',//该列的唯一值       
        },
        
    ]
    let myvoid = []
    const showVoid=()=>{
        http({
            url:'/admin/regiment/showRegimentStateList',
            method:"get",
            params:{
                page:'1',
                limit:'1',
                state:'1'
            }
          }).then(res=>{
            console.log(res.date.list)
           pt.push(res.date.list);
           setDatass(myvoid);
           console.log(myvoid)
          })
    }
    
    {/*  模态框*/}
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpens, setIsModalOpens] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
        showAdopt(0)
    };
    const myshowModal = () => {
        setIsModalOpens(true);
        showVoid(1)
     };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleOks = () => {
         setIsModalOpens(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleCancels = () => {
            setIsModalOpens(false);
    };

    const onChange = (value) => {
        console.log(`selected ${value}`);
    }; 
    // const onSearch = (value) => {
    //     console.log('search:', value);
    // };
    const getSearchInfo = () => {};

    return (    
        <div className={"myinputs"}>
            <div className={"myinp"}>
                <Input className={"inpone"} size="large" placeholder="请输入姓名" prefix={'姓名'}/> 
                <Input size="large" placeholder="请输入手机号" prefix={'手机号'} style={{marginLeft:'20px'}}/> 
                <Input size="large" placeholder="请输入内容" prefix={'自提点名称'} style={{marginLeft:'20px'}}/> 
                <Input size="large" placeholder="请输入内容" prefix={'地址'} style={{marginLeft:'20px'}}/> 
            </div>
            <div className={"sele"}>
                <div className={"searchbox"}>
                <span>自提点类型</span>
                <select
                name="goodsTag"
                onChange={getSearchInfo}
                         
                >
                <option value="全部">全部</option>
                <option value="便利店">便利店</option>
                <option value="快递驿站">快递驿站</option>
                <option value="杂货店">杂货店</option>
                <option value="现快递驿站货">水果/生鲜店</option>
                <option value="现快递驿站货">其他</option>
                </select>
                </div>
            </div>
            <div className={"btn"}>
                <Button>检索</Button>
                <Button>重置</Button>
                <Button type="default" onClick={showModal}>批量通过</Button>
                <Modal title="提示" open={isModalOpen} onOk={handleOk} destroyOnClose={true}
                onCancel={handleCancel} okText={'确定'} cancelText={'取消'}>
                    <p>确定要批量通过已选开户申请吗？</p>
                </Modal>
                <Button type="default" onClick={myshowModal}>批量作废</Button>
                <Modal title="作废原因" open={isModalOpens} 
                destroyOnClose={true} onOk={handleOks} onCancel={handleCancels} okText={'确定'} cancelText={'取消'}>
                    <p>
                        <Button>用户主动要求</Button>
                        <Button>信息填写错误</Button>
                        <Button>恶意注册</Button>
                    </p>
                    <p><Input size="large" placeholder="请手动输入原因"></Input></p>
                </Modal>
                
            </div>
            <div className={"mytabs"}>           
                <Tabs
                    className={"mytabs-one"}
                    defaultActiveKey="1"
                    onChange={onChange}
                    items={[
                    {
                        label: `待审核`,
                        key: '1',
                        children: (                       
                            <Table  columns={columns} dataSource={data} pagination={{pageSize:5}}
                            align='center'/>
                        ),
                    },
                    {
                        label: `已通过`,
                        key: '2',
                        children: (                       
                            <Table  columns={columnss} dataSource={datas} rowKey={(recorda) => recorda.id} pagination={{pageSize:5}}
                            align='center'/>
                        ),
                    },
                    {
                        label: `已作废`,
                        key: '3',
                        children: (                       
                            <Table  columns={columnsss} dataSource={datass} rowKey={(recordb) => recordb.id} pagination={{pageSize:5}}
                            align='center'/>
                        ),
                    },
                    ]}
                />
            </div>
        </div>      
   ) 
}
export default Examine