import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Table, Space, Modal, Form, DatePicker } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  ArrowLeftOutlined, // Icon quay về trang trước
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useNotificationContext } from "../../hooks/useNotification";
import NguyenLieuServices from "../../services/NguyenLieu.Service";
import { convertUrl, ERROR_LOG } from "../../utils";
import ChiTietNguyenLieuServices from "../../services/ChiTietNguyenLieu";
import KhoServices from "../../services/Kho.Service";

const TitlelH2 = styled.h2`
  color: #231390;
  text-align: center;
`;

const NguyenLieuKho = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const { ma } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [maNL, setMaNL] = useState();
  const { setShowNotification, setIsLoading } = useNotificationContext();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
  });
  const [CTKho, setCTKho] = useState(undefined);

  const getAllNguyenLieu = async ({
    page,
    limit,
    name = null,
    nsx = null,
    kho = null,
  }) => {
    setIsLoading(true);
    try {
      const { data, status } = await NguyenLieuServices.getAll({
        page,
        limit,
        name,
        nsx,
      });

      if (status === 201) {
        setPagination({
          current: page ?? 1,
          pageSize: limit ?? 6,
          total: data.count,
        });
        const processData = async () => {
          const dataSource = await Promise.all(
            data.nguyenLieus.map(async (item, i) => {
              const res = await ChiTietNguyenLieuServices.getOne(
                kho,
                item.Ma_NL
              );
              let status = true;

              if (res.status === 201 && res.data) {
                status = false;
              }

              return {
                key: item.Ma_NL,
                Hinh_Anh: item.Hinh_Anh,
                Ten_NL: item.Ten_NL,
                Ma_NSX: item.Ma_NSX,
                Mo_Ta: item.Mo_Ta,
                index: i + 1,
                Ten_NSX: item.NSX.Ten_NSX,
                status,
              };
            })
          );
          setDataSource(dataSource);
        };
        processData();
      }
    } catch (error) {
      console.log("Không thể lấy danh sách Nguyên liệu!");
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
      getAllNguyenLieu({
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

  const handleModalOpen = async (ma) => {
    setMaNL(undefined);
    if (ma) {
      setMaNL(ma);
    }
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      const { message, status } = await ChiTietNguyenLieuServices.create({
        Ma_Kho: ma,
        Ma_NL: maNL,
        Gia_Nhap: CTKho?.Loai_Kho ? +values.price : 0,
        Gia_Xuat: !CTKho?.Loai_Kho ? +values.price : 0,
        Khoi_Luong: +values.mass,
        Ngay_SX: values.productionDate.toDate(),
        Ngay_HH: values.expiryDate.toDate(),
      });
      setShowNotification({
        isShow: true,
        message,
        status: status === 200 ? "success" : "error",
      });
      if (status === 200) {
        await getAllNguyenLieu({
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
      <TitlelH2>Quản Lý Nguyên Liệu Kho</TitlelH2>

      <Input
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Tìm kiếm nguyên liệu..."
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

      {/* Modal to Add Ingredient */}
      <Modal
        title="Thêm Nguyên Liệu Vào Kho"
        open={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={600}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
          >
            <Input type="number" placeholder="Nhập giá nguyên liệu" />
          </Form.Item>

          <Form.Item
            name="mass"
            label="Khối lượng"
            rules={[{ required: true, message: "Vui lòng nhập khối!" }]}
          >
            <Input type="number" placeholder="Nhập khối lượng" />
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

export default NguyenLieuKho;
