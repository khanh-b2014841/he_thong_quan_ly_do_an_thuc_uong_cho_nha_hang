import React, { useState } from "react";
import { Table, Button, DatePicker, Space, message, Switch } from "antd";
import { EyeOutlined, FilterOutlined } from "@ant-design/icons";
import moment from "moment";
import styled from "styled-components";

const { MonthPicker } = DatePicker;

const PageContainer = styled.div`
  padding: 20px;
`;

const QuanLyLichLamViec = () => {
  // Mock data for work schedules
  const [workSchedules, setWorkSchedules] = useState([
    {
      key: "1",
      index: 1,
      date: "2024-11-20",
      startTime: "08:00",
      endTime: "16:00",
      attendance: "Đã chấm công",
      active: true, // Add active status
    },
    {
      key: "2",
      index: 2,
      date: "2024-11-21",
      startTime: "16:00",
      endTime: "00:00",
      attendance: "Chưa chấm công",
      active: false, // Add active status
    },
  ]);

  const [filteredData, setFilteredData] = useState(workSchedules);
  const [filterMonth, setFilterMonth] = useState(null);

  // Handle filtering by month and year
  const handleFilter = (date) => {
    if (date) {
      const selectedMonth = moment(date).format("YYYY-MM");
      const filtered = workSchedules.filter((schedule) =>
        schedule.date.startsWith(selectedMonth)
      );
      setFilteredData(filtered);
      setFilterMonth(selectedMonth);
    } else {
      setFilteredData(workSchedules);
      setFilterMonth(null);
    }
  };

  // Handle switch toggle
  const handleSwitchChange = (checked, record) => {
    const updatedSchedules = workSchedules.map((schedule) =>
      schedule.key === record.key ? { ...schedule, active: checked } : schedule
    );
    setWorkSchedules(updatedSchedules);
    setFilteredData(updatedSchedules);
    message.success(`Trạng thái của ngày ${record.date} đã được cập nhật.`);
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
      title: "Ngày",
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
      title: "Chấm công",
      dataIndex: "attendance",
      key: "attendance",
      width: "20%",
      render: (text) => (
        <span style={{ color: text === "Đã chấm công" ? "green" : "red" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() =>
              message.info(`Xem đơn giá lương của ngày: ${record.date}`)
            }
          >
            Xem đơn giá lương
          </Button>
          <Switch
            checked={record.active}
            onChange={(checked) => handleSwitchChange(checked, record)}
          />
        </Space>
      ),
      width: "30%",
    },
  ];

  return (
    <PageContainer>
      <h1>Quản Lý Lịch Làm Việc</h1>
      <Space style={{ marginBottom: 20 }}>
        <MonthPicker
          placeholder="Chọn tháng và năm"
          onChange={handleFilter}
          format="YYYY-MM"
        />
        <Button onClick={() => handleFilter(null)}>Hiển thị tất cả</Button>
        <FilterOutlined />
      </Space>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="key"
        pagination={{ pageSize: 5 }}
      />
    </PageContainer>
  );
};

export default QuanLyLichLamViec;
