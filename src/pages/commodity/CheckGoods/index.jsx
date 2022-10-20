import "./index.scss";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import store from "../../../store";
import { Input, message } from "antd";
import http from "../../../utils/http";
const { TextArea } = Input;

const CheckGoods = () => {
  /* 获取传递的参数 */
  const { state } = useLocation();
  // console.log(state);
  //产看的商品
  const [goodsInfo, setGoodsInfo] = useState({});
  useEffect(() => {
    //发请求获取要查看的商品的信息
    getCheckGoodsInfo();
  }, []);

  /* 获取查看商品的信息 */
  const getCheckGoodsInfo = () => {
    http({
      url: "/admin/goods/selectAllById/",
      params: {
        goodsId: state.goodsId,
      },
    }).then((res) => {
      console.log(res);
      if (res.code !== 200) return message.error("获取商品信息失败");
      setGoodsInfo(res.date);
    });
  };

  return (
    <div className="ch-content-container">
      {/* 商品基础信息 */}
      <div className="info-box">
        <div style={{ lineHeight: "40px", paddingLeft: "20px" }}>
          商品基础信息
        </div>
        <table border="1">
          <tbody>
            <tr>
              <td>商品ID：{goodsInfo.goodsId}</td>
              <td>商品名称：{goodsInfo.goodsName}</td>
              <td>商品品类：{goodsInfo.classifyName}</td>
            </tr>
            <tr>
              <td>商品品牌：{goodsInfo.brandName}</td>
              <td>规格：{goodsInfo.goodsSize}</td>
              <td>生产日期：{goodsInfo.goodsBuilddate}</td>
            </tr>
            <tr>
              <td>保质期：{goodsInfo.goodsShelf}</td>
              <td>存储方式：{goodsInfo.goodsReserve}</td>
              <td>
                商品状态：{goodsInfo.goodsState === "0" ? "启用" : "禁用"}
              </td>
            </tr>
            <tr>
              <td>商品标签：{goodsInfo.labelName}</td>
              <td>商品描述：{goodsInfo.goodsDescription}</td>
              <td>发布时间：{goodsInfo.goodsPulishdate}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* 商品价格信息 */}
      <div className="info-box">
        <div
          style={{ lineHeight: "40px", paddingLeft: "20px", marginTop: "20px" }}
        >
          商品价格信息
        </div>
        <table border="1">
          <tbody>
            <tr>
              <td>商品剩余库存：{goodsInfo.repertoryId}</td>
              <td>已售数量：{goodsInfo.goodsSold}</td>
              <td>商品原价：{goodsInfo.goodsOriginal}</td>
            </tr>
            <tr>
              <td>销售价格：{goodsInfo.goodsPrice}</td>
              <td>佣金类型：{goodsInfo.goodsComm}</td>
              <td>佣金比例：{goodsInfo.goodsCommno}</td>
            </tr>
            <tr>
              <td>保质期：{goodsInfo.goodsShelf}</td>
              <td>存储方式：{goodsInfo.goodsReserve}</td>
              <td>
                商品状态：{goodsInfo.goodsState === "0" ? "正常" : "禁用"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* 商品主视图 */}
      <div className="info-box">
        <div
          style={{ lineHeight: "40px", paddingLeft: "20px", marginTop: "20px" }}
        >
          商品主视图
        </div>
      </div>
      {/* 商品描述 */}
      <div className="info-box">
        <div
          style={{ lineHeight: "40px", paddingLeft: "20px", marginTop: "20px" }}
        >
          商品描述
        </div>
        <>
          <TextArea
            rows={4}
            placeholder="商品详情1"
            style={{ marginLeft: "20px" }}
          />
        </>
      </div>
    </div>
  );
};

export default CheckGoods;
