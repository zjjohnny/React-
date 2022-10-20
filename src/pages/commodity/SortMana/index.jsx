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
  Select,
  Radio,
  ConfigProvider,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import http from "../../../utils/http";
import zh_CN from "antd/es/locale/zh_CN";
import "./index.scss";
const { Option } = Select;
const { Column } = Table;
const { confirm } = Modal;

/* 表格数据 */
const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i,
    id: i + 1,
    goodsID: i + 1,
    goodsName: `商品 ${i + 1}`,
    originalPrice: 32,
    salePrice: 40,
    stockCount: 23,
    goodsTag: `标签 ${i + 1}`,
    goodsSort: `分类 ${i + 1}`,
    state: true,
  });
}

/* 上传标签图片 */
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("只能上传JPG/PNG图片!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("图片大小不能超过2MB!");
  }

  return isJpgOrPng && isLt2M;
};

const SortMana = () => {
  const [useform] = Form.useForm();
  const formref = React.createRef();
  //标签列表
  const [sortList, setData] = useState([]);
  //搜索框值
  const [searchTagName, setSearchTagName] = useState("");
  //模态框
  const [isModalOpen, setIsModalOpen] = useState(false);
  //模态框标题
  const [tagTitle, setTitle] = useState("");
  //上传标签图片
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  //模态框类型：新增or编辑
  const [modalType, setModalType] = useState(0);
  //分页
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getSortList(currentPage, currentPageSize);
  }, []);

  /* 发起网络请求获取分类数据 */
  const getSortList = async (Page, PageSize) => {
    http({
      url: "/admin/classify/selectAllPage",
      params: {
        page: Page,
        limit: PageSize,
      },
    }).then((res) => {
      if (res.code !== 200) return;
      console.log("请求成功", res);
      setData(res.date.data);
      setTotal(res.date.count);
    });
  };

  /* 搜索框值 */
  const getSearchValue = (event) => {
    setSearchTagName(event.target.value);
  };

  /* 检索回调 */
  const getSortListByName = () => {
    console.log(searchTagName);
    http({
      url: "/admin/classify/selectByInput",
      method: "post",
      params: {
        classifyName: searchTagName,
        page: currentPage,
        limit: currentPageSize,
      },
    }).then((res) => {
      console.log(res);
      if (res.code !== 200) return;
      setData(res.date.data);
      setTotal(res.date.count);
    });
  };

  /* 重置回调 */
  const resetList = () => {
    getSortList(currentPage, currentPageSize);
    setSearchTagName("");
  };

  /* 点击页码 */
  const updateCurrentPage = (page, pageSize) => {
    console.log(page, pageSize);
    setCurrentPage(page);
    setCurrentPageSize(pageSize);
    getSortList(page, pageSize);
  };

  /* 编辑回调 */
  const updateGoodsSort = (text) => {
    setTitle("编辑分类");
    setIsModalOpen(true);
    setModalType(1);
    getUpdateSortInfo(text.classifyId);
  };

  /* 获取编辑数据信息 */
  const getUpdateSortInfo = (classifyId) => {
    http({
      url: "/admin/classify/selectOneById",
      params: {
        classify_id: classifyId,
      },
    }).then((res) => {
      console.log(res);
      if (res.code !== 200) return;
      //给模态框赋初始值
      useform.setFieldsValue({
        classifyName: res.date.classifyName,
        classifyOrder: res.date.classifyOrder,
        classifyComm: res.date.classifyComm,
        classifyState: res.date.classifyState,
        classifyId: res.date.classifyId,
      });
    });
  };

  /* 删除回调 */
  const deleteGoodsSort = async (text) => {
    http({
      url: "/admin/classify/deletById",
      method: "delete",
      params: {
        classifyId: text.classifyId,
      },
    }).then((res) => {
      console.log(res);
      //分类下面还有商品
      if (res.msg === "该分类下还有商品！") {
        confirm({
          title: "提示",
          okText: "确定",
          cancelText: "取消",
          content: (
            <span>
              <span style={{ color: "red" }}>
                &nbsp;{text.classifyName}&nbsp;
              </span>
              品牌下有商品，不可删除
            </span>
          ),
          onOk() {
            console.log("不可删除");
          },
          onCancel() {
            console.log("取消");
          },
        });
      } else {
        //该分类下没有商品
        getSortList(currentPage, currentPageSize);
        console.log("删除成功");
      }
    });
  };

  /* 新增按钮打开模态框回调 */
  const showModal = () => {
    setIsModalOpen(true);
    setTitle("新建分类");
    setModalType(0);
    //清空模态框form表单
    useform.resetFields("");
  };

  /* 模态框确定按钮回调 */
  const onFinish = async (values) => {
    if (modalType === 0) {
      console.log("新建", values);
      http({
        url: "/admin/classify/insert",
        method: "post",
        params: {
          classifyDelete: 0,
          classifyComm: values.classifyComm,
          classifyImg: "4.jpg",
          classifyName: values.classifyName,
          classifyOrder: values.classifyOrder,
          classifyState: values.classifyState,
          classifyType: 0,
        },
      }).then((res) => {
        if (res.code !== 200) return message.error("新增失败");
        message.success("新增成功");
        setIsModalOpen(false);
        getSortList(currentPage, currentPageSize);
      });
    } else {
      http({
        url: "/admin/classify/update",
        method: "post",
        params: {
          classifyDelete: 0,
          classifyComm: values.classifyComm,
          classifyId: values.classifyId,
          classifyImg: "4.jpg",
          classifyName: values.classifyName,
          classifyOrder: values.classifyOrder,
          classifyState: values.classifyState,
          classifyType: 0,
        },
      }).then((res) => {
        console.log(res);
        if (res.code !== 200) return message.error("编辑失败");
        message.success("编辑成功");
        setIsModalOpen(false);
        getSortList(currentPage, currentPageSize);
      });
    }
  };

  /* 模态框回调 */
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  /* 模态框取消按钮 */
  const closeModal = () => {
    setIsModalOpen(false);
  };

  /* 上传标签图片 */
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <>
      <div className="sort-content-contatner">
        <div className="first-line">
          <div className="sort-search-box">
            <span>分类名称</span>
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
          <Button size="default" onClick={getSortListByName}>
            检索
          </Button>
          <Button size="default" onClick={resetList}>
            重置
          </Button>
          <Button size="default" onClick={showModal}>
            新建分类
          </Button>
        </div>
      </div>
      <div className="sort-table-box">
        <div className="table-data">
          <Table dataSource={sortList} pagination={false}>
            <Column
              title="分类名称"
              dataIndex="classifyName"
              key="classifyName"
            />
            <Column
              title="排序"
              dataIndex="classifyOrder"
              key="classifyOrder"
            />
            <Column
              title="品类佣金"
              dataIndex="classifyComm"
              key="classifyComm"
            />
            <Column
              title="状态"
              // dataIndex="classifyState"
              key="classifyState"
              render={(_, record) => (
                <span>{record.classifyState == 0 ? "正常" : "禁用"}</span>
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
                      updateGoodsSort(record);
                    }}
                  >
                    编辑
                  </Button>
                  <Button
                    type="link"
                    onClick={() => {
                      deleteGoodsSort(record);
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
            footer={[]}
            onOk={handleOk}
            onCancel={handleCancel}
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
                label="classifyId"
                name="classifyId"
                style={{ display: "none" }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="分类名称"
                name="classifyName"
                rules={[
                  {
                    required: true,
                    message: "请输入分类名称",
                  },
                ]}
              >
                <Input placeholder="请输入分类名称" />
              </Form.Item>
              <Form.Item
                label="所属分类"
                name="classifyType"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "请选择所属分类",
                  },
                ]}
              >
                <Select placeholder="请选择所属分类">
                  <Option value="日化用品">日化用品</Option>
                  <Option value="保健用品">保健用品</Option>
                  <Option value="社区服务">社区服务</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="排序"
                name="classifyOrder"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="清除输入排序号" />
              </Form.Item>
              <Form.Item
                label="分类佣金"
                name="classifyComm"
                rules={[
                  {
                    required: true,
                    message: "请输入分类佣金金额",
                  },
                ]}
              >
                <Input placeholder="请输入分类佣金金额" />
              </Form.Item>
              <Form.Item label="">以最下级分类佣金为主</Form.Item>
              <Form.Item
                label="分类状态"
                name="classifyState"
                rules={[
                  {
                    required: true,
                    message: "请选择分类状态",
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
                label="分类图片"
                name="classifyImg"
                /* rules={[
                  {
                    required: true,
                  },
                ]} */
              >
                {/* 上传标签图片 */}
                <div className="pic-box">
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                          width: "100%",
                        }}
                      />
                    ) : (
                      uploadButton
                    )}
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

export default SortMana;
