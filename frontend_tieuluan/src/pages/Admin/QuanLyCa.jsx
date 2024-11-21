import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  TimePicker,
  DatePicker,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import styled from "styled-components";
import moment from "moment";

const PageContainer = styled.div`
  padding: 20px;
`;

const QuanLyCa = () => {
  // Mock data for shifts
  const [shifts, setShifts] = useState([
    {
      key: "1",
      index: 1,
      date: "2024-11-20",
      startTime: "08:00",
      endTime: "16:00",
    },
    {
      key: "2",
      index: 2,
      date: "2024-11-21",
      startTime: "16:00",
      endTime: "00:00",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "add", "view", or "edit"
  const [selectedShift, setSelectedShift] = useState(null);
  const [form] = Form.useForm();

  // Handle Modal Open/Close
  const handleOpenModal = (type, record = null) => {
    setModalType(type);
    setSelectedShift(record);
    if (record) {
      form.setFieldsValue({
        date: moment(record.date),
        startTime: moment(record.startTime, "HH:mm"),
        endTime: moment(record.endTime, "HH:mm"),
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedShift(null);
    form.resetFields();
  };

  // Handle Add/Edit Wage Rate
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const updatedShift = {
        ...selectedShift,
        date: values.date.format("YYYY-MM-DD"),
        startTime: values.startTime.format("HH:mm"),
        endTime: values.endTime.format("HH:mm"),
      };

      if (modalType === "add") {
        setShifts([
          ...shifts,
          {
            ...updatedShift,
            key: `${shifts.length + 1}`,
            index: shifts.length + 1,
          },
        ]);
        message.success("Thêm ca thành công!");
      } else if (modalType === "edit") {
        setShifts(
          shifts.map((shift) =>
            shift.key === selectedShift.key ? updatedShift : shift
          )
        );
        message.success("Chỉnh sửa ca thành công!");
      }
      handleCloseModal();
    });
  };

  // Table Columns
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: "10%",
    },
    {
      title: "Ngày làm việc",
      dataIndex: "date",
      key: "date",
      width: "20%",
    },
    {
      title: "Giờ bắt đầu",
      dataIndex: "startTime",
      key: "startTime",
      width: "20%",
    },
    {
      title: "Giờ kết thúc",
      dataIndex: "endTime",
      key: "endTime",
      width: "20%",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<PlusOutlined />}
            onClick={() => handleOpenModal("add", record)}
            title="Thêm đơn giá lương"
          >
            Thêm
          </Button>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() =>
              message.info(`Xem đơn giá lương của ca ngày: ${record.date}`)
            }
            title="Xem đơn giá lương"
          >
            Xem
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleOpenModal("edit", record)}
            title="Chỉnh sửa đơn giá lương"
          >
            Sửa
          </Button>
        </Space>
      ),
      width: "30%",
    },
  ];

  return (
    <PageContainer>
      <h1>Quản Lý Ca</h1>
      <Table
        columns={columns}
        dataSource={shifts}
        rowKey="key"
        pagination={{ pageSize: 5 }}
      />

      {/* Modal for Add/Edit Wage Rate */}
      <Modal
        title={
          modalType === "add" ? "Thêm Đơn Giá Lương" : "Chỉnh Sửa Đơn Giá Lương"
        }
        open={isModalOpen}
        onCancel={handleCloseModal}
        onOk={handleSubmit}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="date"
            label="Ngày làm việc"
            rules={[
              { required: true, message: "Vui lòng chọn ngày làm việc!" },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="startTime"
            label="Giờ bắt đầu"
            rules={[{ required: true, message: "Vui lòng chọn giờ bắt đầu!" }]}
          >
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="endTime"
            label="Giờ kết thúc"
            rules={[{ required: true, message: "Vui lòng chọn giờ kết thúc!" }]}
          >
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default QuanLyCa;
