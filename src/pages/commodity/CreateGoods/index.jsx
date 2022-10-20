import "./index.scss";
import { useLocation } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Radio,
  Modal,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import http from "../../../utils/http";
const { Option } = Select;
const { TextArea } = Input;

/* 上传图片 */
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const CreateGoods = () => {
  const [useform1] = Form.useForm();
  const formref1 = React.createRef();
  const [useform2] = Form.useForm();
  const formref2 = React.createRef();
  //商品分类下拉
  const [goodsClassify, setGoodsClassify] = useState([]);
  //商品标签下拉
  const [goodsLabel, setGoodsLabel] = useState([]);
  //商品品牌下拉
  const [goodsBrand, setGoodsBrand] = useState([]);
  //限购or不限购
  const [purchaseLimit, setPurchaseLimit] = useState(-1);
  //限购数量
  const [limitCount, setLimitCount] = useState(0);
  //佣金
  const [goodsCommno, setGoodsCommno] = useState(10);
  //佣金数量输入框
  const [commissionCount, setCommissionCount] = useState(0);

  /* 上传图片 */
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    getGoodsLabelSelete();
    getGoodsClassifySelete();
    getGoodsBrandSelete();
    initPageForm();
  }, []);

  /* 图片上传方法 */
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      ></div>
    </div>
  );

  /* 获取传递的参数 */
  const { state } = useLocation();
  console.log(state);

  /* 判断是新建商品还是编辑商品 */
  const initPageForm = () => {
    if (state.goodsId) {
      //当前为编辑状态
      //调函数获取要编辑商品的信息
      getUpdateGoodsInfo();
    } else {
      //当前为新建状态
      //清空表单
      useform1.resetFields("");
      useform2.resetFields("");
    }
  };

  /* 发请求获取编辑商品的信息 */
  const getUpdateGoodsInfo = async () => {
    http({
      url: "/admin/goods/getGoodsById",
      params: {
        goodsId: state.goodsId,
      },
    }).then((res) => {
      console.log(res);
      if (res.code !== 200) return;
      useform1.setFieldsValue({
        goodsName: res.date.goodsName,
        goodsDescription: res.date.goodsDescription,
        classifyId: res.date.classifyId,
        lableId: res.date.lableId,
        brandId: res.date.brandId,
        goodsSize: res.date.goodsSize,
        goodsBuilddate: res.date.goodsBuilddate,
        goodsShelf: res.date.goodsShelf,
        goodsReserve: res.date.goodsReserve,
        goodsState: res.date.goodsState,
      });
      useform2.setFieldsValue({
        repertoryId: res.date.repertoryId,
        goodsOriginal: res.date.goodsOriginal,
        goodsPrice: res.date.goodsPrice,
        goodsLimit: res.date.goodsLimit,
        goodsComm: res.date.goodsComm,
      });
    });
  };

  /* 获取商品标签用于下拉 */
  const getGoodsLabelSelete = async () => {
    http({
      url: "/admin/label/selectLabelName",
    }).then((res) => {
      console.log(res);
      if (res.code !== 200) return;
      let myData = res.date.map((item) => {
        let data = {};
        data.labelId = item.labelId;
        data.labelName = item.labelName;
        return data;
      });
      setGoodsLabel(myData);
    });
  };

  /* 获取商品分类用于下拉 */
  const getGoodsClassifySelete = async () => {
    http({
      url: "/admin/classify/selectClassifyName",
    }).then((res) => {
      console.log(res);
      let myData = res.date.map((item) => {
        let data = {};
        data.classifyId = item.classifyId;
        data.classifyName = item.classifyName;
        return data;
      });
      setGoodsClassify(myData);
    });
  };

  /* 获取商品品牌用于下拉 */
  const getGoodsBrandSelete = async () => {
    http({
      url: "/admin/brand/selectBrandName",
    }).then((res) => {
      let myData = res.date.map((item) => {
        let data = {};
        data.brandName = item.brandName;
        data.brandId = item.brandId;
        return data;
      });
      setGoodsBrand(myData);
    });
  };

  /* 限购input框 */
  const getLimitInput = (e) => {
    setLimitCount(e.target.value);
  };

  /* 限购or不限购 */
  const getLimitCount = (e) => {
    if (e.target.value == -1) {
      setPurchaseLimit(-1);
    } else {
      setPurchaseLimit(limitCount);
    }
  };

  /* 佣金input框 */
  const getCommissionInput = (e) => {
    setCommissionCount(e.target.value);
  };

  /* 佣金 */
  const getCommission = (e) => {
    if (e.target.value == "品类佣金") {
      setGoodsCommno(10);
    } else {
      setGoodsCommno(commissionCount);
    }
  };

  /* 新建//保存按钮回调 */
  const getGoodsBasicInfo = async () => {
    console.log(useform1.getFieldsValue());
    console.log(useform2.getFieldsValue());
    if (state.goodsId) {
      console.log(state.goodsId);
      http({
        url: "/admin/goods/updateGoodsById",
        method: "post",
        params: {
          goodsName: useform1.getFieldsValue().goodsName,
          goodsDescription: useform1.getFieldsValue().goodsDescription,
          classifyId: useform1.getFieldsValue().classifyId,
          lableId: useform1.getFieldsValue().lableId,
          brandId: useform1.getFieldsValue().brandId,
          goodsSize: useform1.getFieldsValue().goodsSize,
          goodsBuilddate: useform1.getFieldsValue().goodsBuilddate,
          goodsShelf: useform1.getFieldsValue().goodsShelf,
          goodsReserve: useform1.getFieldsValue().goodsReserve,
          goodsState: useform1.getFieldsValue().goodsState,
          repertoryId: useform2.getFieldsValue().repertoryId,
          goodsOriginal: useform2.getFieldsValue().goodsOriginal,
          goodsPrice: useform2.getFieldsValue().goodsPrice,
          goodsLimit: purchaseLimit,
          goodsComm: useform2.getFieldsValue().goodsComm,
          goodsCommno: goodsCommno,
          goodsImg: "5.jpg",
          goodsPulishdate: "2022-10-17 00:00:00",
          goodsSold: "20",
          admin: "admin",
          goodsDelete: 0,
          goodsId: state.goodsId,
        },
      }).then((res) => {
        console.log(res);
        if (
          res.code == 500 &&
          res.msg == "该商品已存在！如需添加库存，请前往修改！"
        )
          return message.error("该商品已存在");
        if (res.code == 200 && res.msg == "修改成功")
          return message.success("修改成功");
      });
    } else {
      http({
        url: "/admin/goods/insertGoods",
        method: "post",
        params: {
          goodsName: useform1.getFieldsValue().goodsName,
          goodsDescription: useform1.getFieldsValue().goodsDescription,
          classifyId: useform1.getFieldsValue().classifyId,
          lableId: useform1.getFieldsValue().lableId,
          brandId: useform1.getFieldsValue().brandId,
          goodsSize: useform1.getFieldsValue().goodsSize,
          goodsBuilddate: useform1.getFieldsValue().goodsBuilddate,
          goodsShelf: useform1.getFieldsValue().goodsShelf,
          goodsReserve: useform1.getFieldsValue().goodsReserve,
          goodsState: useform1.getFieldsValue().goodsState,
          repertoryId: useform2.getFieldsValue().repertoryId,
          goodsOriginal: useform2.getFieldsValue().goodsOriginal,
          goodsPrice: useform2.getFieldsValue().goodsPrice,
          goodsLimit: purchaseLimit,
          goodsComm: useform2.getFieldsValue().goodsComm,
          goodsCommno: goodsCommno,
          goodsImg: "5.jpg",
          goodsPulishdate: "2022-10-17 00:00:00",
          goodsSold: "20",
          admin: "admin",
          goodsDelete: 0,
        },
      }).then((res) => {
        console.log(res);
        if (res.code !== 200) return message.error("新建失败");
        message.success("新建成功");
      });
    }
  };

  return (
    <div
      className="cre-content-container"
      style={{ height: document.body.clientHeight - 130, overflow: "auto" }}
    >
      <div className="title-box">
        <div className="title">商品基础信息</div>
        <div className="opera-box">
          <Button
            size="default"
            onClick={() => {
              window.history.back(-1);
            }}
          >
            取消
          </Button>
          <Button size="default" onClick={getGoodsBasicInfo}>
            {state.goodsId ? "保存" : "新建"}
          </Button>
        </div>
      </div>
      {/* 商品基础信息表单 */}
      <div className="form-box">
        <Form
          name="basic"
          form={useform1}
          ref={formref1}
          labelCol={{
            span: 2,
          }}
          wrapperCol={{
            span: 5,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          {/* 商品名称 */}
          <Form.Item
            label="商品名称"
            name="goodsName"
            rules={[
              {
                required: true,
                message: "请输入商品名称",
              },
            ]}
          >
            <Input placeholder="请输入商品名称" />
          </Form.Item>

          {/* 商品描述 */}
          <Form.Item label="商品描述" name="goodsDescription">
            <Input placeholder="请输入商品描述" />
          </Form.Item>

          {/* 商品分类 */}
          <Form.Item
            label="商品分类"
            name="classifyId"
            rules={[
              {
                required: true,
                message: "请输入商品分类",
              },
            ]}
          >
            <Select
              style={{
                width: 230,
              }}
              placeholder="请输入商品分类 "
            >
              {goodsClassify.map((item, index) => {
                return (
                  <Option value={item.classifyId} key={index}>
                    {item.classifyName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          {/* 商品标签 */}
          <Form.Item
            label="商品标签"
            name="lableId"
            rules={[
              {
                required: true,
                message: "请选择商品标签",
              },
            ]}
          >
            <Select
              style={{
                width: 230,
              }}
              placeholder="请选择商品标签"
            >
              {goodsLabel.map((item, index) => {
                return (
                  <Option value={item.labelId} key={index}>
                    {item.labelName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          {/* 商品品牌 */}
          <Form.Item
            label="商品品牌"
            name="brandId"
            rules={[
              {
                required: true,
                message: "请选择商品品牌",
              },
            ]}
          >
            <Select
              style={{
                width: 230,
              }}
              placeholder="请选择商品品牌"
            >
              {goodsBrand.map((item, index) => {
                return (
                  <option value={index.brandId} key={index}>
                    {item.brandName}
                  </option>
                );
              })}
            </Select>
          </Form.Item>

          {/* 商品规格 */}
          <Form.Item label="规格" name="goodsSize">
            <Input placeholder="请输入规格" />
          </Form.Item>

          {/* 生产日期 */}
          <Form.Item
            label="生产日期"
            name="goodsBuilddate"
            rules={[
              {
                required: true,
                message: "请输入生产日期",
              },
            ]}
          >
            <Input placeholder="请输入生产日期" />
          </Form.Item>

          {/* 保质期 */}
          <Form.Item
            label="保质期"
            name="goodsShelf"
            rules={[
              {
                required: true,
                message: "请输入保质期",
              },
            ]}
          >
            <Input placeholder="请输入保质期" />
          </Form.Item>

          {/* 存储方式 */}
          <Form.Item
            label="存储方式"
            name="goodsReserve"
            rules={[
              {
                required: true,
                message: "请输入存储方式",
              },
            ]}
          >
            <Input placeholder="请输入存储方式" />
          </Form.Item>

          {/* 商品状态 */}
          <Form.Item
            label="商品状态"
            name="goodsState"
            rules={[
              {
                required: true,
                message: "请选择商品状态",
              },
            ]}
          >
            <Radio.Group>
              <Radio.Button value="0" style={{ marginRight: "10px" }}>
                启用
              </Radio.Button>
              <Radio.Button value="1">禁用</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
      {/* 商品价格信息表单 */}
      <div className="title-box">
        <div className="title">商品价格信息</div>
      </div>
      <div className="form-box">
        <Form
          name="basic"
          ref={formref2}
          form={useform2}
          labelCol={{
            span: 2,
          }}
          wrapperCol={{
            span: 5,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          {/* 库存 */}
          <Form.Item
            label="库存"
            name="repertoryId"
            rules={[
              {
                required: true,
                message: "请输入商品库存",
              },
            ]}
          >
            <div className="style-box">
              <Input placeholder="请输入商品库存" />
              <span>件</span>
            </div>
          </Form.Item>
          {/* 原价 */}
          <Form.Item
            label="原价"
            name="goodsOriginal"
            rules={[
              {
                required: true,
                message: "请输入商品原价",
              },
            ]}
          >
            <div className="style-box">
              <Input placeholder="请输入商品原价" />
              <span>元</span>
            </div>
          </Form.Item>
          {/* 销售价 */}
          <Form.Item
            label="销售价"
            name="goodsPrice"
            rules={[
              {
                required: true,
                message: "请输入商品销售价",
              },
            ]}
          >
            <div className="style-box">
              <Input placeholder="请输入商品销售价" />
              <span>元</span>
            </div>
          </Form.Item>
          {/* 是否限购 */}
          <Form.Item
            label="是否限购"
            name="goodsLimit"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <div className="limit-box">
              <Radio.Group onChange={getLimitCount}>
                <Radio name="11" value="-1">
                  不限购
                </Radio>
                <Radio name="22" value="0">
                  限购数量
                </Radio>
              </Radio.Group>
              <div className="input-box">
                <Input placeholder="请输入限购数量" onChange={getLimitInput} />
                <span>件</span>
              </div>
            </div>
          </Form.Item>
          <Form.Item
            label="佣金"
            name="goodsComm"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group onChange={getCommission}>
              <Radio value="品类佣金">品类佣金：10%</Radio>
              <Radio value="佣金百分比">
                佣金百分比
                <div className="flex-box">
                  <Input
                    placeholder="请输入百分比"
                    onChange={getCommissionInput}
                    name="input"
                  />
                  <span>%</span>
                </div>
              </Radio>
              <Radio value="固定佣金">
                固定佣金
                <div className="flex-box">
                  <Input placeholder="请输入佣金" />
                  <span>元</span>
                </div>
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
      {/* 商品主视图，最多添加6张 */}
      <div className="title-box">
        <div className="title">商品主视图，最多添加6张</div>
      </div>
      <div className="upload-pic" style={{ overflow: "hidden" }}>
        <span style={{ float: "left" }}>商品头图</span>
        <div style={{ float: "left", margin: "0 0 20px 10px" }}>
          <>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              maxCount="6"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </>
          <span style={{ fontSize: "12px" }}>
            只能上传IPG/PNG图片，图片大小不能超过2MB
          </span>
        </div>
      </div>
      {/* 商品详情 */}
      <div className="title-box">
        <div className="title">商品详情</div>
      </div>
      <div>
        <>
          <TextArea rows={4} placeholder="请输入商品详情" />
        </>
      </div>
    </div>
  );
};

export default CreateGoods;
