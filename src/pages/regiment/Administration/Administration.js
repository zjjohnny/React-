import { Input,Select,Button,Modal,Tag,Space,Table,Pagination } from 'antd';
import React, { useState,useEffect } from 'react';
import './Administration.scss'
import http from '../../../utils/http';
const { Option } = Select;
const Administration=()=>{
  // 分页
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize]=useState(5);
  // const [serachId,setSearchId]=useState();
  // table的数据
    const [data, setData] = useState([]);
    const columns = [
        {
          title: '团长ID',//表格列名
          dataIndex: 'regimentId',//对应数据字段
         
        },
        {
          title: '审核时间',
          dataIndex: 'regmentUserTime',
        },
        {
          title: '姓名',
          dataIndex: 'regimentName',
        },
        {
          title: '手机号',
          dataIndex: 'regimentPhone',
        },
        {
          title: '自提点名称',
          dataIndex: 'regimentPick',
        },
        {
            title: '自提点地址',
            dataIndex: 'regimentPickAddress',
          },
          {
            title: '自提点类型',
            dataIndex: 'regimentPickType',
          },
          {
            title: '成交金额',
            dataIndex: 'regimentUserMoney',
          },
          {
            title: '成交订单',
            dataIndex: 'regimentUserOrder',
          },
          {
            title: '状态',
            dataIndex: 'regimentState',
          },
        {
          title: '操作',
          render: (_, record) => (
            <Space size="middle">
              <Button href={"./infromation"}>查看</Button>
              <Button type="default" onClick={myshowModals}>无效</Button>
                <Modal title="无效原因" open={isModalOpenss} 
                destroyOnClose={true} onOk={handleOkss} onCancel={handleCancelss} okText={'确定'} cancelText={'取消'}>
                    <p>
                        <Button>用户主动要求</Button>
                        <Button>信息填写错误</Button>
                        <Button>恶意注册</Button>
                    </p>
                    <p><Input size="large" placeholder="请手动输入原因"></Input></p>
                </Modal>
      
            </Space>
          )
      
        },
      ];
    useEffect(() => {
      console.log()
      showTable(current,pageSize)
    }
    ,[])
    const showTable=(Page,PageSize,regimentName)=>{
      http({
        url:`/admin/regimentClient/showListRegimentUser/${Page}/${PageSize}`,
        method:"get",
      }).then(res=>{
        console.log(res)
        setData(res.date.list) 
      })
    }
     // 分页的回调
     const onChange = (page,pageSize) => {
      console.log(page,pageSize,current);
      setCurrent(page);
      setPageSize(pageSize);
      showTable(page,pageSize)
    };
      //搜索框的取值
    const inputChange=(e)=>{
      console.log(e.target.value)
      showTable(1,pageSize,e.target.value)
    }

    {/*tag标签*/}
    const { CheckableTag } = Tag;
    const tagsData = ['高端团战', '品质团长', '客单量高'];
    
    {/*  模态框*/}
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpens, setIsModalOpens] = useState(false);
    const [isModalOpenss, setIsModalOpenss] = useState(false);
    const showModal = () => {
    setIsModalOpen(true);
    };
    const myshowModal = () => {
    setIsModalOpens(true);
    };
    const myshowModals = () => {
    setIsModalOpenss(true);
    };
    const handleOk = () => {
    setIsModalOpen(false);
    };
    const handleOks = () => {
     setIsModalOpens(false);
    };
    const handleOkss = () => {
    setIsModalOpenss(false);
    };

    const handleCancel = () => {
    setIsModalOpen(false);
    };
    const handleCancels = () => {
    setIsModalOpens(false);
    };
    const handleCancelss = () => {
    setIsModalOpenss(false);
    };
     {/*tag标签*/}
    const [selectedTags, setSelectedTags] = useState(['Books']);

     const handleChange = (tag, checked) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t !== tag);
          console.log('You are interested in: ', nextSelectedTags);
          setSelectedTags(nextSelectedTags);
        };
        // table的选择框回调
        const [selectedRowKeys, setSelectedRowKeys] = useState([]);
        const onSelectChange = (newSelectedRowKeys) => {
          console.log('selectedRowKeys changed: ', newSelectedRowKeys);
          setSelectedRowKeys(newSelectedRowKeys);
        };
        const rowSelection = {
          selectedRowKeys,
          onChange: onSelectChange,
        };
    return(
     <div className={"my-input"}>
        <div className={"myinp"}>
            <Input className={"inpone"} size="large" placeholder="请输入姓名" onChange={inputChange} prefix={'姓名'}/> 
            <Input size="large" placeholder="请输入手机号" prefix={'手机号'} style={{marginLeft:'20px'}}/> 
            <Input size="large" placeholder="请输入内容" prefix={'自提点名称'} style={{marginLeft:'20px'}}/> 
            <Input size="large" placeholder="请输入内容" prefix={'地址'} style={{marginLeft:'20px'}}/> 
        </div>
        <div className={"sele"}>
              <div className={"searchbox"}>
                <span className={"mytext"}>自提点类型</span>
                <select className={"mysearchbox"}
                name="goodsTag"
                // onChange={getSearchInfo}            
                >
                <option value="全部">全部</option>
                <option value="便利店">便利店</option>
                <option value="快递驿站">快递驿站</option>
                <option value="杂货店">杂货店</option>
                <option value="水果/生鲜店">水果/生鲜店</option>
                <option value="其他">其他</option>
                </select>
              </div>             
        </div>
        <div className={"mysele"}>
          <div className={"search-box"}>
                  <span className={"mytext"}>团长标签</span>
                    <select
                    name="goodsTag"
                    // onChange={getSearchInfo}            
                    >
                    <option value="全部">全部</option>
                    <option value="高营收">高营收</option>
                    <option value="品质社区">品质社区</option>
                    <option value="其他">其他</option>
                    </select>
                </div> 
          </div>
        <div className={"btn"}>
                <Button>检索</Button>
                <Button>重置</Button>
                <Button type="default" onClick={showModal}>添加标签</Button>
                <Modal title="添加标签" open={isModalOpen} onOk={handleOk} destroyOnClose={true}
                onCancel={handleCancel} okText={'确定'} cancelText={'取消'}>
                {tagsData.map((tag) => (
                    <CheckableTag
                    key={tag}
                    checked={selectedTags.indexOf(tag) > -1}
                    onChange={(checked) => handleChange(tag, checked)}
                    >
                    {tag}
                    </CheckableTag>
                ))}
                </Modal>
                <Button type="default" onClick={myshowModal}>有效</Button>
                <Modal title="提示" open={isModalOpens} 
                    destroyOnClose={true} onOk={handleOks} onCancel={handleCancels} okText={'确定'} cancelText={'取消'}>
                        <p>确认要设置张三的团长为有效吗</p>           
                </Modal>
                <Button typetype="default" onClick={myshowModals}>无效</Button>
                <Modal title="无效原因" open={isModalOpenss} 
                destroyOnClose={true} onOk={handleOkss} onCancel={handleCancelss} okText={'确定'} cancelText={'取消'}>
                    <p>
                        <Button>用户主动要求</Button>
                        <Button>信息填写错误</Button>
                        <Button>恶意注册</Button>
                    </p>
                    <p><Input size="large" placeholder="请手动输入原因"></Input></p>
                </Modal>
                <Button type="default">导出</Button>
        </div>
        <div className={"mytabs"}>
        <Table  columns={columns} rowSelection={rowSelection}  dataSource={data}  pagination={false}
          align='center'/>
          <Pagination current={current}  onChange={onChange} showSizeChanger pageSizeOptions={[5, 10,20, 50]} total={50}/>;
           {/* <Checkbox onChange={onChange}>Checkbox</Checkbox> */}
        </div>
     </div>
    )
}
export default Administration