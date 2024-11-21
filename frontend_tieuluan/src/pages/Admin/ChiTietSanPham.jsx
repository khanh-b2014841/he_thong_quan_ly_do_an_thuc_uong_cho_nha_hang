import React from "react";
import { Card, Table, Row, Col } from "antd";
import styled from "styled-components";

// Styled Components for better styling
const PageContainer = styled.div`
  padding: 20px;
`;

const ProductInfo = styled.div`
  margin-bottom: 20px;
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;

const ChiTietSanPham = () => {
  // Mock data for product information
  const product = {
    name: "Bánh Pizza Hải Sản",
    image: "https://via.placeholder.com/300", // Placeholder for product image
    description: "Một loại bánh pizza thơm ngon với hải sản tươi sống.",
  };

  // Mock data for ingredients
  const ingredients = [
    {
      key: "1",
      index: 1,
      name: "Bột Mì",
      image: "https://via.placeholder.com/100",
      weight: "500g",
    },
    {
      key: "2",
      index: 2,
      name: "Phô Mai Mozzarella",
      image: "https://via.placeholder.com/100",
      weight: "200g",
    },
    {
      key: "3",
      index: 3,
      name: "Hải Sản",
      image: "https://via.placeholder.com/100",
      weight: "300g",
    },
  ];

  // Table columns
  const columns = [
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
      width: "30%",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="NguyenLieu"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />
      ),
      width: "20%",
    },
    {
      title: "Khối Lượng",
      dataIndex: "weight",
      key: "weight",
      width: "20%",
    },
  ];

  return (
    <PageContainer>
      {/* Product Information Section */}
      <Card title="Thông Tin Sản Phẩm" bordered>
        <ProductInfo>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <ProductImage src={product.image} alt={product.name} />
            </Col>
            <Col xs={24} sm={16}>
              <h2>{product.name}</h2>
              <ProductDescription>{product.description}</ProductDescription>
            </Col>
          </Row>
        </ProductInfo>
      </Card>

      {/* Ingredients Table Section */}
      <Card
        title="Nguyên Liệu Tạo Thành Sản Phẩm"
        bordered
        style={{ marginTop: "20px" }}
      >
        <Table
          dataSource={ingredients}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="key"
        />
      </Card>
    </PageContainer>
  );
};

export default ChiTietSanPham;
