import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Table, Space, Modal, Form, DatePicker } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  ArrowLeftOutlined, // Icon quay về trang trước
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { convertUrl, ERROR_LOG } from "../../utils";
import { useNotificationContext } from "../../hooks/useNotification";
import SanPhamServices from "../../services/SanPham.Service";
import ChiTietSanPhamServices from "../../services/ChiTietSanPham";
import KhoServices from "../../services/Kho.Service";

const TitlelH2 = styled.h2`
  color: #231390;
  text-align: center;
`;

const SanPhamKho = () => {
  const navigate = useNavigate();
  const { ma } = useParams();
  const [dataSource, setDataSource] = useState([]);
  const [maSP, setMaSP] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { setShowNotification, setIsLoading } = useNotificationContext();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
  });
  const [CTKho, setCTKho] = useState(undefined);

  const getAllSanPham = async ({
    page,
    limit,
    name = null,
    order = null,
    kho = null,
  }) => {
    setIsLoading(true);
    try {
      const { data, status } = await SanPhamServices.getAll({
        page,
        limit,
        name,
        order,
      });

      if (status === 201) {
        setPagination({
          current: page ?? 1,
          pageSize: limit ?? 6,
          total: data.count,
        });
        const processData = async () => {
          const dataSource = await Promise.all(
            data.sanPhams.map(async (item, i) => {
              const res = await ChiTietSanPhamServices.getOne(kho, item.Ma_SP);
              let status = true;

              if (res.status === 201 && res.data) {
                status = false;
              }

              return {
                key: item.Ma_SP,
                Hinh_Anh: item.Hinh_Anh,
                Ten_SP: item.Ten_SP,
                Mo_Ta: item.Mo_Ta,
                index: i + 1,
                status,
              };
            })
          );
          setDataSource(dataSource);
        };

        processData();
      }
    } catch (error) {
      console.log("Không thể lấy danh sách sản phẩm!");
      setShowNotification(ERROR_LOG);
    }
    setIsLoading(false);
  };

  const getOneKho = async (ma) => {
    setIsLoading(true);
    try {
      const { data, status } = await KhoServices.getOne(ma);

      if (status === 201) {
        setCTKho(data);
      }
    } catch (err) {
      console.log("Error: ", err);
      setShowNotification(ERROR_LOG);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (ma) {
      getAllSanPham({
        page: pagination.current,
        limit: pagination.pageSize,
        kho: ma,
      });
      getOneKho(ma);
    } else navigate(-1);
  }, [pagination.current, pagination.pageSize, ma, navigate]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleModalOpen = (ma = null) => {
    setMaSP(null);
    if (ma) {
      setMaSP(ma);
    }
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      const { message, status } = await ChiTietSanPhamServices.create({
        Ma_Kho: ma,
        Ma_SP: maSP,
        Gia_Nhap: CTKho?.Loai_Kho ? +values.price : 0,
        Gia_Xuat: !CTKho?.Loai_Kho ? +values.price : 0,
        So_Luong: values.quantity,
        Ngay_SX: values.productionDate.toDate(),
        Ngay_HH: values.expiryDate.toDate(),
      });
      setShowNotification({
        isShow: true,
        message,
        status: status === 200 ? "success" : "error",
      });
      if (status === 200) {
        await getAllSanPham({
          page: pagination.current,
          limit: pagination.pageSize,
          kho: ma,
        });
      }
    } catch (error) {
      console.log("Không thể thêm Nguyên liệu!");
      setShowNotification(ERROR_LOG);
    }
    setIsLoading(false);
    setModalVisible(false);
    form.resetFields();
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
      key: "action",
      render: (_, record) => (
        <Space
          size="middle"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {record.status && (
            <PlusOutlined
              style={{ color: "blue", cursor: "pointer" }}
              title="Sửa"
              onClick={() => handleModalOpen(record.key)}
            />
          )}
        </Space>
      ),
    },
  ];

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  return (
    <div>
      <Button
        type="default"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{ border: "none" }}
      ></Button>
      <TitlelH2>Quản Lý Sản Phẩm Kho</TitlelH2>

      <Input
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Tìm kiếm sản phẩm..."
        suffix={<SearchOutlined />}
        style={{
          width: 300,
          marginBottom: 20,
          borderRadius: "5px",
          border: "1px solid #d9d9d9",
        }}
      />

      {/* Table */}
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="key"
        pagination={pagination}
        onChange={handleTableChange}
      />

      {/* Modal to Add Product */}
      <Modal
        title="Thêm Sản Phẩm Vào Kho"
        open={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={600}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            name="price"
            label="Giá Nhập"
            rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
          >
            <Input type="number" placeholder="Nhập giá sản phẩm" />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Số Lượng"
            rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
          >
            <Input type="number" placeholder="Nhập số lượng" />
          </Form.Item>

          <Form.Item
            name="productionDate"
            label="Ngày Sản Xuất"
            rules={[
              { required: true, message: "Vui lòng chọn ngày sản xuất!" },
            ]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              placeholder="Chọn ngày sản xuất"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="expiryDate"
            label="Ngày Hết Hạn"
            dependencies={["productionDate"]}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày hết hạn!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    !value ||
                    value.isAfter(getFieldValue("productionDate"))
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Ngày hết hạn phải lớn hơn ngày sản xuất!")
                  );
                },
              }),
            ]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              placeholder="Chọn ngày hết hạn"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SanPhamKho;
