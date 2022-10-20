import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ConfigProvider,
  Button,
  Table,
  Space,
  Pagination,
  Modal,
  Tabs,
  message,
} from "antd";
import { observer } from "mobx-react";
import http from "../../../utils/http";
import zh_CN from "antd/es/locale/zh_CN";
import "./index.scss";
const { Column } = Table;
const { confirm } = Modal;

const CommodityMana = () => {
  //商品组件
  const GoodsList = () => {
    return (
      <>
        <div className="table-data">
          <Table
            rowSelection={rowSelection}
            dataSource={goodsList}
            pagination={false}
          >
            <Column title="ID" dataIndex="goodsId" key="goodsId" />
            <Column title="商品名称" dataIndex="goodsName" key="goodsName" />
            <Column
              title="原价"
              dataIndex="goodsOriginal"
              key="goodsOriginal"
            />
            <Column title="销售价" dataIndex="goodsPrice" key="goodsPrice" />
            <Column title="库存余量" dataIndex="goodsShelf" key="goodsShelf" />
            <Column title="标签" dataIndex="labelName" key="labelName" />
            <Column
              title="商品分类"
              dataIndex="classifyName"
              key="classifyName"
            />
            <Column
              title="操作"
              render={(_, record) => (
                <Space size="small">
                  <Button
                    type="link"
                    onClick={() => {
                      navigate("checkgoods", {
                        state: { goodsId: record.goodsId },
                      });
                    }}
                  >
                    查看
                  </Button>
                  <Button
                    type="link"
                    onClick={() => {
                      updateGoodsState(record);
                    }}
                  >
                    {record.goodsState == 0 ? "禁用" : "启用"}
                  </Button>
                  <Button
                    type="link"
                    onClick={() => {
                      navigate("creategoods", {
                        state: { goodsId: record.goodsId },
                      });
                    }}
                  >
                    编辑
                  </Button>
                  <Button
                    type="link"
                    onClick={() => {
                      deleteGoodsBtn(record);
                    }}
                  >
                    删除
                  </Button>
                </Space>
              )}
            />
          </Table>
        </div>
      </>
    );
  };
  const navigate = useNavigate();
  const [goodsList, setGoodsList] = useState([]);
  //表格选择数据
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  //禁用或启用商品状态
  const [goodsKey, setGoodsKey] = useState(0);
  //商品标签
  const [goodsLabelList, setGoodsLabelList] = useState([]);
  //商品分类
  const [goodsClassifyList, setGoodsClasssifyList] = useState([]);
  //搜索
  const [goodsName, setGoodsName] = useState("");
  const [goodsLabel, setGoodsLabel] = useState("");
  const [goodsClassify, setGoodsClassify] = useState("");
  const [goodsStartCount, setGoodsStartCount] = useState("");
  const [goodsEndCount, setGoodsEndCount] = useState("");
  //分页
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  /* 发起网络请求，获取数据并存入store */
  useEffect(() => {
    getEnableGoods(currentPage, currentPageSize);
    getGoodsLabelSelete();
    getGoodsClassifySelete();
  }, []);

  /* 获取启用商品 */
  const getEnableGoods = async (Page, PageSize) => {
    http({
      url: "/admin/goods/selectGoods",
      params: {
        page: Page,
        limit: PageSize,
        goodsState: 0,
      },
    }).then((res) => {
      console.log("启用", res);
      if (res.code !== 200) return;
      setGoodsList(res.date.data);
      setTotal(res.date.count);
    });
  };

  /* 获取禁用商品 */
  const getForbidGoods = async (Page, PageSize) => {
    http({
      url: "/admin/goods/selectGoods",
      params: {
        page: Page,
        limit: PageSize,
        goodsState: 1,
      },
    }).then((res) => {
      console.log("禁用", res);
      if (res.code !== 200) return;
      setGoodsList(res.date.data);
      setTotal(res.date.count);
    });
  };

  /* 获取商品标签下拉框数据 */
  const getGoodsLabelSelete = async () => {
    http({
      url: "/admin/label/selectLabelName",
    }).then((res) => {
      let myData = res.date.map((item) => {
        let data = {};
        data.labelId = item.labelId;
        data.labelName = item.labelName;
        return data;
      });
      setGoodsLabelList(myData);
    });
  };

  /* 获取商品分类下拉框数据 */
  const getGoodsClassifySelete = async () => {
    http({
      url: "/admin/classify/selectClassifyName",
    }).then((res) => {
      let myData = res.date.map((item) => {
        let data = {};
        data.classifyId = item.classifyId;
        data.classifyName = item.classifyName;
        return data;
      });
      setGoodsClasssifyList(myData);
    });
  };

  /* tabs切换栏 */
  const onChange = (key) => {
    setGoodsKey(key);
    if (key === "0") {
      getEnableGoods(currentPage, currentPageSize);
    } else {
      getForbidGoods(currentPage, currentPageSize);
    }
  };

  /* 获取搜索关键字 */
  const getGoodsName = (e) => {
    setGoodsName(e.target.value);
  };
  const getGoodsLabel = (e) => {
    setGoodsLabel(e.target.value);
  };
  const getGoodsClassify = (e) => {
    setGoodsClassify(e.target.value);
  };
  const getGoodsCount = (e) => {
    setGoodsStartCount("");
    setGoodsEndCount("");
    if (e.target.value == "200以上") {
      setGoodsStartCount("200");
    } else if (e.target.value == "0") {
      setGoodsStartCount("0");
    } else {
      let data = e.target.value.split("~");
      setGoodsStartCount(data[0]);
      setGoodsEndCount(data[1]);
    }
  };

  /* 检索按钮回调 */
  const search = async () => {
    console.log(
      goodsKey,
      goodsName,
      goodsClassify,
      goodsLabel,
      goodsStartCount,
      goodsEndCount
    );
    http({
      url: "/admin/goods/selectByInput",
      method: "post",
      params: {
        goodsState: goodsKey,
        classifyName: goodsClassify,
        labelName: goodsLabel,
        goodsName: goodsName,
        limit: 10,
        page: 1,
        repertoryCountStart: goodsStartCount,
        repertoryCountEnd: goodsEndCount,
      },
    }).then((res) => {
      console.log(res);
      if (res.code !== 200) return message.error("未搜索到相关商品");
      setGoodsList(res.date);
      setTotal(res.date.length);
    });
  };
  /* 重置按钮回调 */
  const resetInfo = () => {
    setGoodsName("");
    setGoodsLabel("");
    setGoodsClassify("");
    setGoodsStartCount("");
    setGoodsEndCount("");
    if (goodsKey == 0) {
      getEnableGoods(currentPage, currentPageSize);
    } else {
      getForbidGoods(currentPage, currentPageSize);
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

  /* 点击页码 */
  const updateCurrentPage = (page, pageSize) => {
    console.log(page, pageSize);
    setCurrentPage(page);
    setCurrentPageSize(pageSize);
    getEnableGoods(page, pageSize);
    getEnableGoods(page, pageSize);
  };

  /* 禁用或启用按钮回调 */
  const updateGoodsState = (text) => {
    console.log(text);
    confirm({
      title: "提示",
      okText: "确定",
      cancelText: "取消",
      content: (
        <span>
          您确定要{text.goodsState == 0 ? "禁用" : "启用"}
          <span style={{ color: "red" }}>&nbsp;{text.goodsName}&nbsp;</span>吗？
        </span>
      ),
      onOk() {
        comfirmEnableForbidden(text.goodsId);
      },
      onCancel() {
        console.log("取消");
      },
    });
  };

  /* 确认启用或禁用回调 */
  const comfirmEnableForbidden = async (goodsId) => {
    console.log(goodsId, goodsKey);
    let key = 0;
    if (goodsKey == 1) {
      key = 0;
    } else {
      key = 1;
    }
    http({
      url: "/admin/goods/forbiddenById",
      method: "post",
      params: {
        goodsId: goodsId,
        goodsState: key,
      },
    }).then((res) => {
      console.log(res);
      if (res.code !== 200) return message.error("操作失败");
      message.success("操作成功");
      onChange(goodsKey);
    });
  };

  /* 删除商品按钮回调 */
  const deleteGoodsBtn = (text) => {
    confirm({
      title: "提示",
      content: (
        <span>
          您确定要删除
          <span style={{ color: "red" }}>&nbsp;{text.goodsName}&nbsp;</span>
          吗？该操作不可恢复
        </span>
      ),
      onOk() {
        confirmDeleteGoods(text.goodsId);
      },
      onCancel() {
        console.log("取消");
      },
    });
  };

  /* 确认删除回调 */
  const confirmDeleteGoods = async (goodsId) => {
    console.log(goodsId);
    http({
      url: "/admin/goods/deletById",
      method: "delete",
      params: {
        goodsId: goodsId,
      },
    }).then((res) => {
      console.log(res);
      if (res.code !== 200) return message.error("删除失败");
      message.success("删除成功");
      onChange(goodsKey);
    });
  };

  return (
    <>
      <div className="com-conrtent-contatner">
        <div className="first-line">
          <div className="com-search-box">
            <span>商品名称</span>
            <input
              type="text"
              name="goodsName"
              placeholder="请输入内容"
              value={goodsName}
              onChange={getGoodsName}
            />
          </div>
          <div className="com-search-box">
            <span>商品标签</span>
            <select name="goodsTag" onChange={getGoodsLabel} value={goodsLabel}>
              <option value="">全部</option>
              {goodsLabelList.map((item, key) => {
                return (
                  <option value={item.labelId} key={key}>
                    {item.labelName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="com-search-box">
            <span>商品分类</span>
            <select
              name="goodsSort"
              value={goodsClassify}
              onChange={getGoodsClassify}
            >
              <option value="">全部</option>
              {goodsClassifyList.map((item, key) => {
                return (
                  <option value={item.classifyId} key={key}>
                    {item.classifyName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="com-search-box">
            <span>库存数量</span>
            <select name="stockCount" onChange={getGoodsCount}>
              <option value="">全部</option>
              <option value="0">0</option>
              <option value="1~50">1~50</option>
              <option value="51~100">51~100</option>
              <option value="101~200">101~200</option>
              <option value="200以上">200以上</option>
            </select>
          </div>
        </div>
        <div className="second-line">
          <Button size="default" onClick={search}>
            检索
          </Button>
          <Button size="default" onClick={resetInfo}>
            重置
          </Button>
          <Button
            size="default"
            onClick={() => {
              navigate("creategoods", { state: { goodsId: "" } });
            }}
          >
            新建商品
          </Button>
        </div>
      </div>
      {/* tabs切换栏 */}
      <div className="com-tabs-box">
        <Tabs
          defaultActiveKey="0"
          onChange={onChange}
          items={[
            {
              label: `启用`,
              key: "0",
              children: <GoodsList></GoodsList>,
            },
            {
              label: `禁用`,
              key: "1",
              children: <GoodsList></GoodsList>,
            },
          ]}
        />
        <div className="com-table-box">
          <div className="footer">
            <ConfigProvider locale={zh_CN}>
              <Pagination
                size="small"
                total={total}
                defaultCurrent={currentPage}
                current={currentPage}
                showSizeChanger
                onChange={updateCurrentPage}
              />
            </ConfigProvider>
            <div className="totalCount">
              当前条件共检索到
              <span style={{ color: "red" }}>{total}</span>
              条信息
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(CommodityMana);
