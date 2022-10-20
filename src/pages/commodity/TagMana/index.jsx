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
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import "./index.scss";
import http from "../../../utils/http";
import zh_CN from "antd/es/locale/zh_CN";
const { Column } = Table;
const { confirm } = Modal;

const TagMana = () => {
  const [useform] = Form.useForm();
  const formref = React.createRef();
  //标签列表
  const [dataList, setData] = useState([]);
  //搜索框值
  const [searchTagName, setSearchTagName] = useState("");
  //展示模态框
  const [isModalOpen, setIsModalOpen] = useState(false);
  //模态框标题
  const [tagTitle, setTitle] = useState("");
  //判断是编辑还是新增
  const [btnType, setBtnType] = useState();
  //页码
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setPageSize] = useState(10);
  //数据总条数
  const [total, setTotal] = useState(1);
  //获取token用于上传图片
  const [token, setToken] = useState("");

  /* 发起网络请求，获取数据并存入store */
  useEffect(() => {
    getTagList(currentPage, currentPageSize);
    setToken(sessionStorage.getItem("token"));
  }, []);

  /* 发请求获取商品标签数据 */
  const getTagList = async (Page, PageSize) => {
    console.log(Page, PageSize);
    http({
      url: "/admin/label/selectAllByPage",
      params: {
        page: Page,
        limit: PageSize,
      },
    }).then((res) => {
      console.log("标签管理", res);
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
  const getTagListByname = async () => {
    http({
      url: "/admin/label/selectByInputName",
      params: {
        labelName: searchTagName,
        page: currentPage,
        limit: currentPageSize,
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
    getTagList(currentPage, currentPageSize);
  };

  /* 点击页码 */
  const updateCurrentPage = (page, pageSize) => {
    setPageSize(pageSize);
    setCurrentPage(page);
    getTagList(page, pageSize);
  };

  /* 编辑按钮回调 */
  const updateBtn = (text) => {
    setTitle("编辑标签");
    setIsModalOpen(true);
    //设置模态框状态为修改
    setBtnType(1);
    //调用获取当前数据信息的回调
    getUpdateLabelInfo(text.labelId);
  };

  /* 获取编辑数据信息 */
  const getUpdateLabelInfo = async (labelId) => {
    http({
      url: "/admin/label/selectById",
      params: {
        labelId: labelId,
      },
    }).then((res) => {
      if (res.code !== 200) return;
      console.log("查询成功", res);
      //给编辑模态框赋初始值
      useform.setFieldsValue({
        labelName: res.date.labelName,
        labelDescribe: res.date.labelDescribe,
        labelOrder: res.date.labelOrder,
        labelState: res.date.labelState,
        labelId: res.date.labelId,
      });
    });
  };

  /* 删除按钮回调 */
  const deleteGoodsTag = (text) => {
    console.log(text);
    confirm({
      title: "提示",
      okText: "确定",
      cancelText: "取消",
      content: (
        <span>
          您确定要删除
          <span style={{ color: "red" }}>&nbsp;{text.labelName}&nbsp;</span>
          吗？删除后，商品标签将不再显示。该操作不可恢复！
        </span>
      ),
      onOk() {
        confirmDelete(text.labelId);
      },
      onCancel() {
        console.log("取消删除");
      },
    });
  };

  /* 确认删除回调 */
  const confirmDelete = async (goodsId) => {
    http({
      url: "/admin/label/deletById",
      method: "delete",
      params: {
        labelId: goodsId,
      },
    }).then((res) => {
      if (res.code !== 200) return message.error("删除失败");
      getTagList(currentPage, currentPageSize);
      message.success("删除成功");
    });
  };

  /* 新增按钮打开模态框回调 */
  const showModal = () => {
    setIsModalOpen(true);
    setTitle("新建标签");
    //设置模态框状态为新增按钮
    setBtnType(0);
    //清空模态框form表单
    useform.resetFields("");
  };

  /* form表单确定按钮回调 */
  const onFinish = async (values) => {
    if (btnType === 0) {
      http({
        url: "/admin/label/insertLabel",
        method: "post",
        params: {
          labelDelete: 0,
          labelDescribe: values.labelDescribe,
          labelImg: "1.jpg",
          labelName: values.labelName,
          labelOrder: values.labelOrder,
          labelState: values.labelState,
        },
      }).then((res) => {
        if (res.code !== 200) return message.error("新增失败");
        console.log("新建成功", res);
        setIsModalOpen(false);
        message.success("新增成功");
        getTagList(currentPage, currentPageSize);
      });
    } else {
      console.log(values);
      http({
        url: "/admin/label/updateLabelById",
        method: "post",
        params: {
          labelDelete: 0,
          labelId: values.labelId,
          labelDescribe: values.labelDescribe,
          labelImg: "2.jpg",
          labelName: values.labelName,
          labelOrder: values.labelOrder,
          labelState: values.labelState,
        },
      }).then((res) => {
        if (res.code !== 200) return message.error("编辑失败");
        console.log("编辑成功", res);
        setIsModalOpen(false);
        message.success("编辑成功");
        getTagList(currentPage, currentPageSize);
      });
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  /* form表单取消回调 */
  const closeModal = () => {
    setIsModalOpen(false);
  };

  /* 上传图片的回调 */
  const onchange = (obj) => {
    console.log(obj);
  };

  /* 限制图上传格式 */
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("只能上传JPG/PNG格式的图片");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("图片大小不能超过2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <>
      <div className="tag-content-contatner">
        <div className="first-line">
          <div className="tag-search-box">
            <span>标签名称</span>
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
          <Button size="default" onClick={getTagListByname}>
            检索
          </Button>
          <Button size="default" onClick={resetList}>
            重置
          </Button>
          <Button size="default" onClick={showModal}>
            新建标签
          </Button>
        </div>
      </div>
      <div className="tag-table-box">
        <div className="table-data">
          <Table dataSource={dataList} pagination={false}>
            <Column title="标签名称" dataIndex="labelName" key="labelName" />
            <Column title="排序" dataIndex="labelOrder" key="labelOrder" />
            <Column
              title="状态"
              // dataIndex="labelState"
              key="labelState"
              render={(_, record) => (
                <span>{record.labelState == 0 ? "正常" : "禁用"}</span>
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
                      updateBtn(record);
                    }}
                  >
                    编辑
                  </Button>
                  <Button
                    type="link"
                    onClick={() => {
                      deleteGoodsTag(record);
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
                name="labelId"
                label="labelId"
                style={{ display: "none" }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="标签名称"
                name="labelName"
                rules={[
                  {
                    required: true,
                    message: "亲输入标签名称",
                  },
                ]}
              >
                <Input placeholder="请输入标签名称" />
              </Form.Item>
              <Form.Item label="描述" name="labelDescribe">
                <Input placeholder="请输入描述" />
              </Form.Item>
              <Form.Item
                label="排序"
                name="labelOrder"
                rules={[
                  {
                    required: true,
                    message: "亲输入标签排序号",
                  },
                ]}
              >
                <Input placeholder="清除输入排序号" />
              </Form.Item>
              <Form.Item
                name="labelState"
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
                label="标签图片"
                name="upload"
                valuePropName="fileList"
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
                    onChange={onchange}
                    beforeUpload={beforeUpload}
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

export default TagMana;
