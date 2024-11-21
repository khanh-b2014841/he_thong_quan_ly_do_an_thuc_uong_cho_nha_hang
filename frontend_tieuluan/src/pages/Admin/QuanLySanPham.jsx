import React, { useState, useEffect } from "react";
import { Table, Button, Input, Form, Modal, Flex } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  ExclamationCircleFilled,
  CloudUploadOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import SanPhamServices from "../../services/SanPham.Service";
import { useNotificationContext } from "../../hooks/useNotification";
import {
  convertUrl,
  ERROR_LOG,
  getNameImage,
  PATH,
  PATH_ADMIN,
} from "../../utils";

import { useNavigate } from "react-router-dom";

const TitlelH2 = styled.h2`
  color: #231390;
  text-align: center;
`;
const StyledFormItem = styled(Form.Item)`
  margin-bottom: 16px;
`;

const UploadBox = styled.label`
  border-radius: 10px;
  width: 100%;
  height: 200px;
  border: 1px dashed #000;
  font-size: 20px;
  cursor: pointer;
  display: inline-block;
  background-size: cover;
  background-position: center;
`;

const QuanLySanPham = () => {
  const navigate = useNavigate();

  const [dataSource, setDataSource] = useState([]);
  const { setShowNotification, setIsLoading } = useNotificationContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [maSP, setMaSP] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
  });
  const [initialFile, setInitialFile] = useState(null);

  const getAllSanPham = async ({ page, limit, name = null, order = null }) => {
    setIsLoading(true);
    try {
      const { data, status } = await SanPhamServices.getAll({
        page,
        limit,
        name,
        order,
      });

      if (status === 201 && data.count > 0) {
        setPagination({
          current: page ?? 1,
          pageSize: limit ?? 6,
          total: data?.count,
        });
        setDataSource(
          data?.sanPhams.map((item, i) => ({
            key: item.Ma_SP,
            Hinh_Anh: item.Hinh_Anh,
            Ten_SP: item.Ten_SP,
            Mo_Ta: item.Mo_Ta,
            index: i + 1,
          }))
        );
      }
    } catch (error) {
      console.log("Không thể lấy danh sách sản phẩm! ", error);
      setShowNotification(ERROR_LOG);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllSanPham({ page: pagination.current, limit: pagination.pageSize });
  }, [pagination.current, pagination.pageSize]);

  const handleImageUpload = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setInitialFile({ url: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOk = async (values) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("Ten_SP", values.Ten_SP);
      if (values.Mo_Ta) {
        formData.append("Mo_Ta", values.Mo_Ta);
      }
      if (selectedFile) {
        formData.append("file", selectedFile);
      } else if (initialFile?.url) {
        const imgSrc = `uploads\\${getNameImage(initialFile.url)}`;
        formData.append("Hinh_Anh", imgSrc);
      }
      let status = 200;
      let message = "";
      if (maSP) {
        const res = await SanPhamServices.update(maSP, formData);
        status = res.status;
        message = res.message;
      } else {
        const res = await SanPhamServices.create(formData);
        status = res.status;
        message = res.message;
      }
      if (status === 200) {
        await getAllSanPham({
          page: pagination.current,
          limit: pagination.pageSize,
        });
      }
      setShowNotification({
        isShow: true,
        message,
        status: status === 200 ? "success" : "error",
      });
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      setShowNotification(ERROR_LOG);
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDeleteSanPham = async (ma) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa sản phẩm này?",
      icon: <ExclamationCircleFilled />,
      cancelText: "Hủy",
      async onOk() {
        setIsLoading(true);
        try {
          const { message, status } = await SanPhamServices.delete(ma);

          setShowNotification({
            isShow: true,
            message,
            status: status === 200 ? "success" : "error",
          });
        } catch (error) {
          console.error("Error deleting SanPham:", error);
          setShowNotification(ERROR_LOG);
        }
        setIsLoading(false);
      },
      onCancel() {},
    });
  };

  const handleShowModal = async (ma = null) => {
    setMaSP(undefined);
    setInitialFile(null);
    setSelectedFile(null);
    if (ma) {
      setMaSP(ma);
      await getOneSanPham(ma);
    }
    setIsModalVisible(true);
  };

  const getOneSanPham = async (ma) => {
    setIsLoading(true);
    try {
      const { data, status } = await SanPhamServices.getOne(ma);
      if (status === 201) {
        form.setFieldsValue({
          Ten_SP: data.Ten_SP,
          Gia: data.Gia,
          Mo_Ta: data.Mo_Ta,
        });
        setInitialFile({
          uid: "-1",
          name: getNameImage(data.Hinh_Anh),
          status: "done",
          url: convertUrl(data.Hinh_Anh),
        });
      }
    } catch (err) {
      console.log("Error: ", err);
      setShowNotification(ERROR_LOG);
    }
    setIsLoading(false);
  };

  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "index",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "Hinh_Anh",
      render: (text) => (
        <img src={convertUrl(text)} alt="SanPham" style={{ width: "100px" }} />
      ),
    },
    { title: "Tên sản phẩm", dataIndex: "Ten_SP" },
    { title: "Mô tả", dataIndex: "Mo_Ta" },
    {
      title: "Thao tác",
      render: (_, record) => (
        <span>
          <EditOutlined
            style={{ marginRight: 8, cursor: "pointer" }}
            onClick={() => handleShowModal(record.key)}
          />
          <DeleteOutlined
            style={{ marginRight: 8, color: "red", cursor: "pointer" }}
            onClick={() => handleDeleteSanPham(record.key)}
          />
          <EyeOutlined
            style={{ marginRight: 8, color: "blue", cursor: "pointer" }}
          />
          <ContainerOutlined
            style={{ color: "green", cursor: "pointer" }}
            onClick={() =>
              navigate(PATH_ADMIN(PATH.CONG_THUC).replace(":ma", record.key))
            }
          />
        </span>
      ),
    },
  ];

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const cancelModal = () => {
    setIsModalVisible(false);
    setMaSP(undefined);
    setInitialFile(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <TitlelH2>Quản Lý Sản Phẩm</TitlelH2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleShowModal()}
        style={{
          marginBottom: "10px",
          backgroundColor: "#4CAF50",
          borderColor: "#4CAF50",
        }}
      >
        Thêm sản phẩm
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="key"
        pagination={pagination}
        onChange={handleTableChange}
      />
      <Modal
        title={maSP ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleOk}>
          <StyledFormItem
            label="Tên sản phẩm"
            name="Ten_SP"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input />
          </StyledFormItem>
          <StyledFormItem label="Mô tả" name="Mo_Ta">
            <Input.TextArea />
          </StyledFormItem>
          <StyledFormItem label="Hình ảnh" name="Hinh_Anh">
            <UploadBox
              htmlFor="image"
              style={{
                backgroundImage: `url(${initialFile?.url || ""})`,
              }}
            >
              <Form.Item style={{ display: "none" }}>
                <Input
                  type="file"
                  hidden
                  id="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Form.Item>
              {!initialFile && (
                <Flex
                  align="center"
                  justify="center"
                  style={{
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <CloudUploadOutlined />
                  <span>Chọn ảnh</span>
                </Flex>
              )}
            </UploadBox>
          </StyledFormItem>
          <Form.Item>
            <Flex justify="flex-end" align="center" gap={10}>
              <Button
                type="primary"
                style={{ backgroundColor: "red" }}
                onClick={cancelModal}
              >
                Hủy
              </Button>
              <Button type="primary" htmlType="submit">
                {maSP ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default QuanLySanPham;
