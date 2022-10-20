import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Space,
  Pagination,
  Modal,
  Form,
  Input,
  message,
  Upload,
  Radio,
  ConfigProvider,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import http from "../../../utils/http";
import zh_CN from "antd/es/locale/zh_CN";
import "./index.scss";
const { Column } = Table;
const { confirm } = Modal;

/* 上传标签图片 */
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("只能上传JPG/PNG格式图片");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("图片大小不能超过2MB!");
  }

  return isJpgOrPng && isLt2M;
};

const GrandMana = () => {
  const [useform] = Form.useForm();
  const formref = React.createRef();
  //标签列表
  const [dataList, setData] = useState([]);
  //搜索框值
  const [searchTagName, setSearchTagName] = useState("");
  //模态框
  const [isModalOpen, setIsModalOpen] = useState(false);
  //模态框标题
  const [tagTitle, setTitle] = useState("");
  //模态框类型：新增or编辑
  const [modalType, setModalType] = useState(0);
  //分页
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  //数据总条数
  const [total, setTotal] = useState(0);
  //获取token用于上传图片
  const [token, setToken] = useState("");

  /* 发起网络请求，获取数据并存入store */
  useEffect(() => {
    getBrandList(currentPage, currentPageSize);
    setToken(sessionStorage.getItem("token"));
  }, []);

  /* 发请求获取商品标签数据 */
  const getBrandList = async (Page, PageSize) => {
    http({
      url: "/admin/brand/selectAllByPage",
      params: {
        page: Page,
        limit: PageSize,
      },
    }).then((res) => {
      console.log(res);
      if (res.code !== 200) return;
      setData(res.date.data);
      setTotal(res.date.count);
    });
  };

  /* 搜索框值 */
  const getSearchValue = (event) => {
    setSearchTagName(event.target.value);
  };

  /* 检索回调 */
  const getBrandListByName = async () => {
    http({
      url: "/admin/brand/selectByName",
      params: {
        page: currentPage,
        limit: currentPageSize,
        brandName: searchTagName,
      },
    }).then((res) => {
      if (res.code !== 200) return;
      console.log("搜索成功", res);
      setData(res.date.data);
      setTotal(res.date.count);
    });
  };

  /* 重置回调 */
  const resetList = () => {
    setSearchTagName("");
    getBrandList(currentPage, currentPageSize);
  };

  /* 编辑按钮回调 */
  const updateGoodsTag = (text) => {
    // console.log(text);
    setTitle("编辑品牌");
    setIsModalOpen(true);
    setModalType(1);
    getUpdateBrandInfo(text.brandId);
  };

  /* 获取编辑数据信息 */
  const getUpdateBrandInfo = async (brandId) => {
    http({
      url: "/admin/brand/selectById",
      params: {
        brandId: brandId,
      },
    }).then((res) => {
      console.log(res);
      if (res.code !== 200) return;
      //给编辑模态框赋初始值
      useform.setFieldsValue({
        brandName: res.date.brandName,
        brandRemark: res.date.brandRemark,
        brandOrder: res.date.brandOrder,
        brandId: res.date.brandId,
      });
    });
  };

  /* 删除按钮回调 */
  const deleteBrand = (text) => {
    console.log(text);
    //该品牌下有商品，不可删除
    confirm({
      title: "提示",
      okText: "确定",
      cancelText: "取消",
      content: (
        <span>
          确定要删除
          <span style={{ color: "red" }}>&nbsp;{text.brandName}&nbsp;</span>
          吗？该操作不可恢复！
        </span>
      ),
      onOk() {
        confirmDelete(text.brandId);
      },
      onCancel() {
        console.log("取消");
      },
    });
  };

  /* 确认删除回调 */
  const confirmDelete = async (brandId) => {
    http({
      url: "/admin/brand/deletById",
      method: "delete",
      params: {
        brandId: brandId,
      },
    }).then((res) => {
      console.log(res);
      if (res.code !== 200) return message.error("删除失败");
      getBrandList(currentPage, currentPageSize);
      message.success("删除成功");
    });
  };

  /* 新增按钮打开模态框回调 */
  const showModal = () => {
    setIsModalOpen(true);
    setTitle("新建品牌");
    setModalType(0);
    useform.resetFields("");
  };

  /* 模态框自带回调 */
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  /* 模态框取消回调 */
  const closeModal = () => {
    setIsModalOpen(false);
  };

  /* 模态框确定回调 */
  const onFinish = async (values) => {
    if (modalType == 0) {
      http({
        url: "/admin/brand/insertBrand",
        method: "post",
        params: {
          brandDelete: 0,
          brandImg: "3.jpg",
          brandName: values.brandName,
          brandOrder: values.brandOrder,
          brandRemark: values.brandRemark,
          brandState: values.brandState,
        },
      }).then((res) => {
        console.log(res);
        if (res.code !== 200) return message.error("新增失败");
        getBrandList(currentPage, currentPageSize);
        setIsModalOpen(false);
        message.success("新增成功");
      });
    } else {
      console.log(values);
      http({
        url: "/admin/brand/updateById",
        params: {
          brandDelete: 0,
          brandImg: "3.jpg",
          brandName: values.brandName,
          brandOrder: values.brandOrder,
          brandRemark: values.brandRemark,
          brandState: values.brandState,
          brandId: values.brandId,
        },
      }).then((res) => {
        console.log(res);
        if (res.code !== 200) return message.error("编辑失败");
        getBrandList(currentPage, currentPageSize);
        setIsModalOpen(false);
        message.success("编辑成功");
      });
    }
  };

  /* 点击页码 */
  const updateCurrentPage = (page, pageSize) => {
    console.log(page, pageSize);
    setCurrentPageSize(pageSize);
    setCurrentPage(page);
    getBrandList(page, pageSize);
  };

  /* 上传品牌图片 */
  const handleChange = (info) => {
    console.log(info);
  };

  return (
    <>
      <div className="brand-content-contatner">
        <div className="first-line">
          <div className="brand-search-box">
            <span>品牌名称</span>
            <input
              type="text"
              name="goodsName"
              placeholder="请输入内容"
              value={searchTagName}
              onChange={getSearchValue}
            />
          </div>
        </div>
        <div className="second-line">
          <Button size="default" onClick={getBrandListByName}>
            检索
          </Button>
          <Button size="default" onClick={resetList}>
            重置
          </Button>
          <Button size="default" onClick={showModal}>
            新建品牌
          </Button>
        </div>
      </div>
      <div className="brand-table-box">
        <div className="table-data">
          <Table dataSource={dataList} pagination={false}>
            <Column title="品牌名称" dataIndex="brandName" key="brandName" />
            <Column title="排序" dataIndex="brandOrder" key="brandOrder" />
            <Column
              title="状态"
              key="brandState"
              render={(_, record) => (
                <span>{record.brandState == 0 ? "正常" : "禁用"}</span>
              )}
            />
            <Column
              title="操作"
              key="action"
              render={(_, record) => (
                <Space size="small">
                  <Button
                    type="link"
                    onClick={() => {
                      updateGoodsTag(record);
                    }}
                  >
                    编辑
                  </Button>
                  <Button
                    type="link"
                    onClick={() => {
                      deleteBrand(record);
                    }}
                  >
                    删除
                  </Button>
                </Space>
              )}
            />
          </Table>
        </div>
        <div className="footer">
          <ConfigProvider locale={zh_CN}>
            <Pagination
              defaultCurrent={currentPage}
              current={currentPage}
              size="small"
              total={total}
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
        {/* 新增+编辑弹出框 */}
        <>
          <Modal
            title={tagTitle}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
            okText="确定"
            cancelText="取消"
          >
            <Form
              name="basic"
              form={useform}
              ref={formref}
              onFinish={onFinish}
              labelCol={{
                span: 5,
              }}
              wrapperCol={{
                span: 14,
              }}
              autoComplete="off"
              initialValues={{
                type: "1",
              }}
            >
              <Form.Item
                label="brandId"
                name="brandId"
                style={{ display: "none" }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="品牌名称"
                name="brandName"
                rules={[
                  {
                    required: true,
                    message: "亲输入品牌名称",
                  },
                ]}
              >
                <Input placeholder="请输入品牌名称" />
              </Form.Item>
              <Form.Item label="品牌英文名称" name="brandRemark">
                <Input placeholder="请输入品牌英文名称" />
              </Form.Item>
              <Form.Item
                label="排序"
                name="brandOrder"
                rules={[
                  {
                    required: true,
                    message: "亲输入排序号",
                  },
                ]}
              >
                <Input placeholder="清除输入排序号" />
              </Form.Item>
              <Form.Item
                name="brandState"
                label="状态"
                rules={[
                  {
                    required: true,
                    message: "请选择状态",
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
              <Form.Item
                label="品牌图片"
                name="brandImg"
                /* rules={[
                  {
                    required: true,
                  },
                ]} */
              >
                {/* 上传标签图片 */}
                <div className="pic-box">
                  <Upload
                    name="type"
                    action="http://43.143.44.182:9080/file/uploadImg"
                    headers={{
                      token: token,
                    }}
                    listType="picture-card"
                    maxCount={1}
                    onChange={handleChange}
                  >
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      +
                    </div>
                  </Upload>
                </div>
                <div className="rule-box">
                  <p>200*200像素</p>
                  <p>仅支持JPG/PNG格式</p>
                </div>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  style={{ marginRight: "30px" }}
                  onClick={closeModal}
                >
                  取消
                </Button>
                <Button type="primary" htmlType="submit">
                  确定
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </>
      </div>
    </>
  );
};

export default GrandMana;
