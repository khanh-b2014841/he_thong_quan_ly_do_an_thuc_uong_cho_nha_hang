import React from "react";
import { Card, Table, Row, Col, Tag } from "antd";
import styled from "styled-components";

// Styled Components for better styling
const PageContainer = styled.div`
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const ChiTietKho = () => {
  // Mock data for warehouse information
  const warehouseInfo = {
    type: "Kho nhập",
    ingredientCount: 20,
    productCount: 50,
    createdAt: "2023-01-15",
  };

  // Mock data for products
  const productData = [
    {
      key: "1",
      index: 1,
      name: "Bánh Pizza Hải Sản",
      quantity: 100,
      price: "200,000 VND",
      manufactureDate: "2023-10-01",
      expiryDate: "2023-12-01",
    },
    {
      key: "2",
      index: 2,
      name: "Hamburger Gà",
      quantity: 80,
      price: "150,000 VND",
      manufactureDate: "2023-09-15",
      expiryDate: "2023-11-15",
    },
  ];

  // Mock data for ingredients
  const ingredientData = [
    {
      key: "1",
      index: 1,
      name: "Bột Mì",
      price: "20,000 VND/kg",
      weight: "500kg",
      manufactureDate: "2023-08-01",
      expiryDate: "2024-08-01",
    },
    {
      key: "2",
      index: 2,
      name: "Phô Mai Mozzarella",
      price: "150,000 VND/kg",
      weight: "50kg",
      manufactureDate: "2023-07-15",
      expiryDate: "2024-07-15",
    },
  ];

  // Table columns for products
  const productColumns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: "10%",
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name",
      key: "name",
      width: "25%",
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: "15%",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: "20%",
    },
    {
      title: "Ngày Sản Xuất",
      dataIndex: "manufactureDate",
      key: "manufactureDate",
      width: "15%",
    },
    {
      title: "Ngày Hết Hạn",
      dataIndex: "expiryDate",
      key: "expiryDate",
      width: "15%",
    },
  ];

  // Table columns for ingredients
  const ingredientColumns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: "10%",
    },
    {
      title: "Tên Nguyên Liệu",
      dataIndex: "name",
      key: "name",
      width: "25%",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: "20%",
    },
    {
      title: "Khối Lượng",
      dataIndex: "weight",
      key: "weight",
      width: "15%",
    },
    {
      title: "Ngày Sản Xuất",
      dataIndex: "manufactureDate",
      key: "manufactureDate",
      width: "15%",
    },
    {
      title: "Ngày Hết Hạn",
      dataIndex: "expiryDate",
      key: "expiryDate",
      width: "15%",
    },
  ];

  return (
    <PageContainer>
      {/* Warehouse Information Section */}
      <Section>
        <Card title="Thông Tin Kho" bordered>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <p>
                <strong>Loại Kho:</strong> {warehouseInfo.type}
              </p>
            </Col>
            <Col span={6}>
              <p>
                <strong>Số Lượng Nguyên Liệu:</strong>{" "}
                {warehouseInfo.ingredientCount}
              </p>
            </Col>
            <Col span={6}>
              <p>
                <strong>Số Lượng Sản Phẩm:</strong> {warehouseInfo.productCount}
              </p>
            </Col>
            <Col span={6}>
              <p>
                <strong>Thời Gian Tạo:</strong> {warehouseInfo.createdAt}
              </p>
            </Col>
          </Row>
        </Card>
      </Section>

      {/* Product Table Section */}
      <Section>
        <Card title="Danh Sách Sản Phẩm" bordered>
          <Table
            dataSource={productData}
            columns={productColumns}
            pagination={{ pageSize: 5 }}
            rowKey="key"
          />
        </Card>
      </Section>

      {/* Ingredient Table Section */}
      <Section>
        <Card title="Danh Sách Nguyên Liệu" bordered>
          <Table
            dataSource={ingredientData}
            columns={ingredientColumns}
            pagination={{ pageSize: 5 }}
            rowKey="key"
          />
        </Card>
      </Section>
    </PageContainer>
  );
};

export default ChiTietKho;
