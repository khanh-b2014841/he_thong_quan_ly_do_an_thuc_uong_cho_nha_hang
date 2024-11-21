import React, { useState, useEffect } from "react";
import { Table, Button, Input, Form, Modal, Select, Flex } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ExclamationCircleFilled,
  CloudUploadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import NguyenLieuServices from "../../services/NguyenLieu.Service";
import { useNotificationContext } from "../../hooks/useNotification";
import NhaSanXuatServices from "../../services/NhaSanXuat.Service";
import { convertUrl, ERROR_LOG, getNameImage } from "../../utils";

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

const QuanLyNguyenLieu = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [maNL, setMaNL] = useState();
  const [nhaSanXuats, setNhaSanXuats] = useState([]);
  const { setShowNotification, setIsLoading } = useNotificationContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
  });
  const [initialFile, setInitialFile] = useState(null);

  const getAllNguyenLieu = async ({ page, limit, name = null, nsx = null }) => {
    setIsLoading(true);
    try {
      const { data, status } = await NguyenLieuServices.getAll({
        page,
        limit,
        name,
        nsx,
      });

      if (status === 201 && data?.count > 0) {
        setPagination({
          current: page ?? 1,
          pageSize: limit ?? 6,
          total: data.count,
        });
        setDataSource(
          data.nguyenLieus.map((item, i) => ({
            key: item.Ma_NL,
            Hinh_Anh: item.Hinh_Anh,
            Ten_NL: item.Ten_NL,
            Ma_NSX: item.Ma_NSX,
            Mo_Ta: item.Mo_Ta,
            index: i + 1,
            Ten_NSX: item.NSX.Ten_NSX,
          }))
        );
      }
    } catch (error) {
      console.log("Không thể lấy danh sách Nguyên liệu!");
      setShowNotification(ERROR_LOG);
    }
    setIsLoading(false);
  };

  const getAllNSX = async () => {
    setIsLoading(true);
    try {
      const { data, status } = await NhaSanXuatServices.getAll({});

      if (status === 201) {
        console.log(data);
        setNhaSanXuats(
          data.nhaSanXuats.map((nsx) => ({
            label: nsx.Ten_NSX,
            value: nsx.Ma_NSX,
          }))
        );
      }
    } catch (error) {
      console.log("Không thể lấy danh sách nhà sản xuất!");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllNSX();
    getAllNguyenLieu({ page: pagination.current, limit: pagination.pageSize });
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

  const handleShowModal = async (ma = null) => {
    setMaNL(undefined);
    setInitialFile(null);
    setSelectedFile(null);
    if (ma) {
      setMaNL(ma);
      await getOneNguyenLieu(ma);
    }
    setIsModalVisible(true);
  };

  const handleOk = async (values) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("Ten_NL", values.Ten_NL);
      formData.append("Ma_NSX", values.Ma_NSX);
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
      if (maNL) {
        const res = await NguyenLieuServices.update(maNL, formData);
        status = res.status;
        message = res.message;
      } else {
        const res = await NguyenLieuServices.create(formData);
        status = res.status;
        message = res.message;
      }
      if (status === 200) {
        await getAllNguyenLieu({
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

  const handleDeleteNguyenLieu = async (ma) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa sản phẩm này?",
      icon: <ExclamationCircleFilled />,
      cancelText: "Hủy",
      async onOk() {
        setIsLoading(true);
        try {
          const { message, status } = await NguyenLieuServices.delete(ma);

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

  const getOneNguyenLieu = async (ma) => {
    setIsLoading(true);
    try {
      const { data, status } = await NguyenLieuServices.getOne(ma);

      if (status === 201) {
        form.setFieldsValue({
          Ten_NL: data.Ten_NL,
          Mo_Ta: data.Mo_Ta,
          Ma_NSX: data.Ma_NSX,
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

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const cancelModal = () => {
    setIsModalVisible(false);
    setMaNL(undefined);
    setInitialFile(null);
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
        <img src={convertUrl(text)} alt="product" style={{ width: "100px" }} />
      ),
    },
    {
      title: "Tên Nhà Sản Xuất",
      dataIndex: "Ten_NSX",
    },
    { title: "Tên Nguyên Liệu", dataIndex: "Ten_NL" },
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
            onClick={() => handleDeleteNguyenLieu(record.key)}
          />
          <EyeOutlined
            style={{ marginRight: 8, color: "blue", cursor: "pointer" }}
          />
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <TitlelH2>Quản Lý Nguyên Liệu</TitlelH2>
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
        Thêm Nguyên Liệu
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="key"
        pagination={pagination}
        onChange={handleTableChange}
      />
      <Modal
        title={maNL ? "Chỉnh sửa Nguyên Liệu" : "Thêm Nguyên Liệu"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleOk}>
          <StyledFormItem
            label="Nhà sản xuất"
            name="Ma_NSX"
            rules={[{ required: true, message: "Vui lòng chọn nhà sản xuất!" }]}
          >
            <Select placeholder="Chọn nhà sản xuất" options={nhaSanXuats} />
          </StyledFormItem>
          <StyledFormItem
            label="Tên Nguyên Liệu"
            name="Ten_NL"
            rules={[
              { required: true, message: "Vui lòng nhập tên Nguyên Liệu!" },
            ]}
          >
            <Input />
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
          <StyledFormItem label="Mô tả" name="Mo_Ta">
            <Input.TextArea />
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
                {maNL ? "Chỉnh sửa Nguyên Liệu" : "Thêm Nguyên Liệu"}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default QuanLyNguyenLieu;
