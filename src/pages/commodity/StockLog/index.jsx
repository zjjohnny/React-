import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Space,
  Pagination,
  Modal,
  DatePicker,
  Tabs,
  ConfigProvider,
  message,
} from "antd";
import http from "../../../utils/http";
import zh_CN from "antd/es/locale/zh_CN";

import "./index.scss";
const { Column } = Table;
const { RangePicker } = DatePicker;

const StockLog = () => {
  /* 商品出库组件 */
  const DeliveryStock = () => {
    return (
      <>
        {/* <div className="table-box"> */}
        <div className="stock-table-data">
          <Table
            rowSelection={rowSelection}
            dataSource={deliverList}
            pagination={false}
          >
            <Column title="商品ID" dataIndex="repertoryId" key="repertoryId" />
            <Column
              title="出库时间"
              dataIndex="repertoryOuttime"
              key="repertoryOuttime"
            />
            <Column title="商品名称" dataIndex="goodsName" key="goodsName" />
            <Column
              title="出库类型"
              dataIndex="repertoryOuttype"
              key="repertoryOuttype"
            />
            <Column title="订单号" dataIndex="oderId" key="oderId" />
            <Column
              title="出库数量"
              dataIndex="repertoryCount"
              key="repertoryCount"
            />
            <Column
              title="剩余库存"
              dataIndex="repertoryOutnum"
              key="repertoryOutnum"
            />
            <Column
              title="操作人"
              dataIndex="repertoryPerson"
              key="repertoryPerson"
            />
          </Table>
        </div>
        {/* </div> */}
      </>
    );
  };
  /* 商品入库组件 */
  const StorageStock = () => {
    return (
      <>
        <div className="stock-table-box">
          <div className="table-data">
            <Table
              rowSelection={rowSelection}
              dataSource={storageList}
              pagination={false}
            >
              <Column
                title="商品ID"
                dataIndex="repertoryId"
                key="repertoryId"
              />
              <Column
                title="入库时间"
                dataIndex="repertoryIntime"
                key="repertoryIntime"
              />
              <Column title="商品名称" dataIndex="goodsName" key="goodsName" />
              <Column
                title="入库类型"
                dataIndex="repertoryIntype"
                key="repertoryIntype"
              />
              <Column title="订单号" dataIndex="oderId" key="oderId" />
              <Column
                title="入库数量"
                dataIndex="repertoryInnum"
                key="repertoryInnum"
              />
              <Column
                title="剩余库存"
                dataIndex="repertoryCount"
                key="repertoryCount"
              />
              <Column
                title="操作人"
                dataIndex="repertoryPerson"
                key="repertoryPerson"
              />
            </Table>
          </div>
        </div>
      </>
    );
  };

  /* 商品出库列表 */
  const [deliverList, setDeliver] = useState([]);
  /* 商品入库列表 */
  const [storageList, setStorage] = useState([]);
  /* 表格选择数据 */
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  /* 分页和底部显示框总数 */
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [total, setTotal] = useState(1);
  /* 搜索 */
  const [goodsName, setGoodsName] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [repertoryInputType, setRepertoryInputType] = useState("");
  const [admin, setAdmin] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  /* 出库or入库类型 */
  const [stockType, setStockType] = useState(0);

  /* 发起网络请求，获取数据并存入store */
  useEffect(() => {
    //获取出库商品
    getDeliveryStock(currentPage, currentPageSize);
    //获取入库商品
    getStorageStock(currentPage, currentPageSize);
  }, []);

  /* 商品出库回调 */
  const getDeliveryStock = async (Page, PageSize) => {
    console.log(Page, PageSize);
    http({
      url: "/admin/repertoryOut/selectRepertoryOut",
      params: {
        page: Page,
        limit: PageSize,
      },
    }).then((res) => {
      if (res.code !== 200) return;
      console.log("出库", res);
      setDeliver(res.date.data);
      setTotal(res.date.total);
    });
  };

  /* 商品出库回调 */
  const getStorageStock = async (Page, PageSize) => {
    console.log(Page, PageSize);
    http({
      url: "/admin/repertoryIn/selectRepertoryIn",
      params: {
        page: Page,
        limit: PageSize,
      },
    }).then((res) => {
      if (res.code !== 200) return;
      console.log("入库", res);
      setStorage(res.date.data);
      setTotal(res.date.total);
    });
  };

  /* tabs切换栏 */
  const onChange = (key) => {
    console.log(key);
    setStockType(key);
    if (key === "0") {
      getDeliveryStock(currentPage, currentPageSize);
    } else {
      getStorageStock(currentPage, currentPageSize);
    }
  };

  /* 表格使用 */
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  /* 选择日期回调 */
  const getTime = (value, dateString) => {
    setStartTime(dateString[0]);
    setEndTime(dateString[1]);
  };

  /* 点击页码 */
  const updateCurrentPage = (page, pageSize) => {
    setCurrentPage(page);
    setCurrentPageSize(pageSize);
    getDeliveryStock(page, pageSize);
    getStorageStock(page, pageSize);
  };

  /* 获取搜索关键字 */
  const getgoodsName = (e) => {
    console.log(e.target.value);
    setGoodsName(e.target.value);
  };
  const getOrderNo = (e) => {
    console.log(e.target.value);
    setOrderNo(e.target.value);
  };
  const getInputType = (e) => {
    console.log(e.target.value);
    if (e.target.value === "全部") {
      setRepertoryInputType("");
    } else {
      setRepertoryInputType(e.target.value);
    }
  };
  const getAdmin = (e) => {
    console.log(e.target.value);
    setAdmin(e.target.value);
  };

  /* 检索按钮回调 */
  const search = async () => {
    console.log(
      admin,
      startTime,
      endTime,
      goodsName,
      orderNo,
      repertoryInputType,
      currentPage,
      currentPageSize
    );
    if (stockType == 0) {
      http({
        url: "/admin/repertoryOut/selectByInput",
        method: "post",
        params: {
          admin: admin,
          endTime: endTime,
          startTime: startTime,
          goodsName: goodsName,
          orderNo: orderNo,
          repertoryInputType: repertoryInputType,
          page: currentPage,
          limit: currentPageSize,
        },
      }).then((res) => {
        console.log(res);
        if (res.code !== 200) return message.error("未查询到相关商品");
        setDeliver(res.date.data);
        setTotal(res.date.total);
      });
    } else {
      http({
        url: "/admin/repertoryIn/selectByInput",
        method: "post",
        params: {
          admin: admin,
          endTime: endTime,
          startTime: startTime,
          goodsName: goodsName,
          orderNo: orderNo,
          repertoryInputType: repertoryInputType,
          page: currentPage,
          limit: currentPageSize,
        },
      }).then((res) => {
        console.log(res);
        if (res.code !== 200) return message.error("未查询到相关商品");
        setStorage(res.date.data);
        setTotal(res.date.total);
      });
    }
  };
  /* 重置按钮回调 */
  const resetInfo = () => {
    if (stockType == 0) {
      getDeliveryStock(currentPage, currentPageSize);
    } else {
      getStorageStock(currentPage, currentPageSize);
    }
  };

  return (
    <>
      <div className="stock-conrtent-contatner">
        <div className="first-line">
          <div className="stock-search-box">
            <span>商品名称</span>
            <input
              type="text"
              name="goodsName"
              placeholder="请输入内容"
              onChange={getgoodsName}
            />
          </div>
          <div className="stock-search-box">
            <span>操作时间</span>
            <RangePicker
              showTime={{
                format: "HH:mm",
              }}
              format="YYYY-MM-DD HH:mm"
              onChange={getTime}
            />
          </div>
          <div className="stock-search-box">
            <span>订单号</span>
            <input
              type="text"
              name="orderNo"
              placeholder="请输入内容"
              onChange={getOrderNo}
            />
          </div>
          <div className="stock-search-box">
            <span>操作类型</span>
            <select name="repertoryInputType" onChange={getInputType}>
              <option value="全部">全部</option>
              <option value="生成订单">生成订单</option>
              <option value="取消订单">取消订单</option>
              <option value="编辑商品">编辑商品</option>
              <option value="添加商品">添加商品</option>
            </select>
          </div>
        </div>
        <div className="second-line">
          <div className="stock-search-box">
            <span>操作人</span>
            <input
              type="text"
              name="admin"
              placeholder="请输入内容"
              onChange={getAdmin}
            />
          </div>
        </div>
        <div className="third-line">
          <Button size="default" onClick={search}>
            检索
          </Button>
          <Button size="default" onClick={resetInfo}>
            重置
          </Button>
          <Button size="default">导出</Button>
        </div>
      </div>
      {/* tabs切换栏 */}
      <div className="stock-tabs-box">
        <Tabs
          defaultActiveKey="0"
          onChange={onChange}
          items={[
            {
              label: `商品出库`,
              key: "0",
              children: <DeliveryStock></DeliveryStock>,
            },
            {
              label: `商品入库`,
              key: "1",
              children: <StorageStock></StorageStock>,
            },
          ]}
        />
        <div className="stock-table-box">
          <div className="footer">
            <ConfigProvider locale={zh_CN}>
              <Pagination
                size="small"
                total={total}
                showSizeChanger
                onChange={updateCurrentPage}
              />
            </ConfigProvider>
            <div className="totalCount">
              当前条件共检索到<span style={{ color: "red" }}>{total}</span>
              条信息
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockLog;
