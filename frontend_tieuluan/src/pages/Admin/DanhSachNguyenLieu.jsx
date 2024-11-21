import React, { useEffect, useState } from "react";
import { Button, Input, Table, Space, Modal, Form, message } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TitlelH2 = styled.h2`
  color: #231390;
  text-align: center;
`;

const DanhSachNguyenLieu = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null); // Track selected record
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
  });

  useEffect(() => {
    setDataSource([
      {
        key: 1,
        index: 1,
        Hinh_Anh: "https://via.placeholder.com/100",
        Ten_NL: "Bột Mì",
        Mo_Ta: "Dùng để làm bánh",
        weight: 500,
      },
      {
        key: 2,
        index: 2,
        Hinh_Anh: "https://via.placeholder.com/100",
        Ten_NL: "Đường",
        Mo_Ta: "Nguyên liệu nấu ăn",
        weight: 1000,
      },
      {
        key: 3,
        index: 3,
        Hinh_Anh: "https://via.placeholder.com/100",
        Ten_NL: "Muối",
        Mo_Ta: "Dùng để nêm nếm",
        weight: 200,
      },
    ]);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleModalOpen = (record) => {
    setEditingRecord(record); // Set the record being edited
    setModalVisible(true);
    if (record) {
      form.setFieldsValue(record); // Populate form with record data
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    form.resetFields();
    setEditingRecord(null); // Clear selected record
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editingRecord) {
        // Edit existing record
        const updatedDataSource = dataSource.map((item) =>
          item.key === editingRecord.key ? { ...item, ...values } : item
        );
        setDataSource(updatedDataSource);
        message.success("Cập nhật nguyên liệu thành công!");
      } else {
        // Add new record
        const newItem = {
          key: dataSource.length + 1,
          index: dataSource.length + 1,
          Hinh_Anh: "https://via.placeholder.com/100", // Placeholder for new item
          Ten_NL: `Nguyên Liệu ${dataSource.length + 1}`,
          Mo_Ta: `Mô tả sản phẩm ${dataSource.length + 1}`,
          ...values,
        };
        setDataSource([...dataSource, newItem]);
        message.success("Thêm nguyên liệu thành công!");
      }
      handleModalClose();
    });
  };

  const filteredData = dataSource.filter((item) =>
    item.Ten_NL.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <img
          src={text}
          alt="NguyenLieu"
          style={{ width: "100px", height: "100px" }}
        />
      ),
    },
    { title: "Tên nguyên liệu", dataIndex: "Ten_NL" },
    { title: "Mô tả", dataIndex: "Mo_Ta" },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <PlusOutlined
            style={{ color: "blue", cursor: "pointer" }}
            title="Sửa"
            onClick={() => handleModalOpen(record)} // Pass record to modal
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="default"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{ border: "none" }}
      ></Button>
      <TitlelH2>Danh Sách Nguyên Liệu</TitlelH2>

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

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="key"
        pagination={pagination}
      />

      {/* Modal for Adding/Editing Ingredient */}
      <Modal
        title={editingRecord ? "Chỉnh sửa nguyên liệu" : "Thêm nguyên liệu"}
        open={modalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="cancel" onClick={handleModalClose}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleSave}>
            {editingRecord ? "Lưu thay đổi" : "Thêm"}
          </Button>,
        ]}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="weight"
            label="Khối lượng"
            rules={[{ required: true, message: "Vui lòng nhập khối lượng!" }]}
          >
            <Input type="number" placeholder="Nhập khối lượng sản phẩm" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DanhSachNguyenLieu;
