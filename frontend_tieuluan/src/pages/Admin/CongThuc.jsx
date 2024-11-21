import React from "react";
import { Table, Button, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const TitlelH2 = styled.h2`
  color: #231390;
  text-align: center;
`;

const Container = styled.div``;

const CongThuc = () => {
  const columns = [
    { title: "STT", dataIndex: "key", key: "key" },
    { title: "Tên Nguyên Liệu", dataIndex: "name", key: "name" },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price} VND`,
    },
    { title: "Khối Lượng", dataIndex: "weight", key: "weight" },
    { title: "Ngày sản xuất", dataIndex: "Ngay_SX", key: "Ngay_SX" },
    { title: "Ngày hết hạn", dataIndex: "Ngay_HH", key: "Ngay_HH" },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "blue", cursor: "pointer" }}
            title="Sửa"
          />
          <DeleteOutlined
            style={{ color: "red", cursor: "pointer" }}
            title="Xóa"
          />
          <EyeOutlined
            style={{ color: "green", cursor: "pointer" }}
            title="Xem chi tiết"
          />
        </Space>
      ),
    },
  ];

  // Mock data
  const data = [
    {
      key: 1,
      name: "Bột Mì",
      price: 50000,
      weight: "1 kg",
      Ngay_SX: "2024-11-01",
      Ngay_HH: "2025-01-01",
    },
    {
      key: 2,
      name: "Đường",
      price: 30000,
      weight: "500 g",
      Ngay_SX: "2024-10-15",
      Ngay_HH: "2025-04-15",
    },
    {
      key: 3,
      name: "Sữa Tươi",
      price: 20000,
      weight: "1 L",
      Ngay_SX: "2024-11-05",
      Ngay_HH: "2024-12-05",
    },
  ];

  return (
    <Container>
      <Button
        type="default"
        icon={<ArrowLeftOutlined />}
        style={{ border: "none" }}
      ></Button>
      <TitlelH2>Công Thức</TitlelH2>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 20 }}
      >
        Thêm Nguyên Liệu Cho Món
      </Button>

      <Table columns={columns} dataSource={data} rowKey="key" />
    </Container>
  );
};

export default CongThuc;
