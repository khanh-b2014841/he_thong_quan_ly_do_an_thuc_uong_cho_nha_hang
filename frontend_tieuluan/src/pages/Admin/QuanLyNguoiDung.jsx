import React, { useState } from "react";
import {
  Table,
  Input,
  Select,
  Button,
  Space,
  Tag,
  Popconfirm,
  message,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const { Option } = Select;

const PageContainer = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const QuanLyNguoiDung = () => {
  // Mock data for users
  const [users, setUsers] = useState([
    {
      key: "1",
      index: 1,
      name: "Nguyen Van A",
      email: "a@gmail.com",
      status: "Active",
      role: "Admin",
    },
    {
      key: "2",
      index: 2,
      name: "Tran Thi B",
      email: "b@gmail.com",
      status: "Blocked",
      role: "User",
    },
    {
      key: "3",
      index: 3,
      name: "Pham Van C",
      email: "c@gmail.com",
      status: "Active",
      role: "Editor",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  // Handle search filter by name
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle role filter
  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  // Handle blocking/unblocking a user
  const toggleUserStatus = (key) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.key === key
          ? { ...user, status: user.status === "Active" ? "Blocked" : "Active" }
          : user
      )
    );
    message.success("Cập nhật trạng thái người dùng thành công!");
  };

  // Filtered data based on search and role
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRole === "" || user.role === selectedRole)
  );

  // Table columns
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: "10%",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "25%",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>
          {status === "Active" ? "Hoạt động" : "Bị khóa"}
        </Tag>
      ),
      width: "15%",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "15%",
    },
    {
      title: "Hành Động",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() =>
              message.info(`Xem chi tiết người dùng: ${record.name}`)
            }
          >
            Xem
          </Button>
          {record.status === "Active" ? (
            <Popconfirm
              title="Bạn có chắc chắn muốn khóa người dùng này?"
              onConfirm={() => toggleUserStatus(record.key)}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <Button type="link" icon={<LockOutlined />} danger>
                Khóa
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Bạn có chắc chắn muốn mở khóa người dùng này?"
              onConfirm={() => toggleUserStatus(record.key)}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <Button type="link" icon={<UnlockOutlined />}>
                Mở khóa
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
      width: "20%",
    },
  ];

  return (
    <PageContainer>
      {/* Header: Search and Role Filter */}
      <Header>
        <Input
          placeholder="Tìm kiếm theo tên"
          value={searchTerm}
          onChange={handleSearch}
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
        />
        <Select
          placeholder="Lọc theo vai trò"
          onChange={handleRoleChange}
          allowClear
          style={{ width: 200 }}
        >
          <Option value="Admin">Admin</Option>
          <Option value="User">User</Option>
          <Option value="Editor">Editor</Option>
        </Select>
      </Header>

      {/* User Management Table */}
      <Table
        dataSource={filteredUsers}
        columns={columns}
        rowKey="key"
        pagination={{ pageSize: 5 }}
      />
    </PageContainer>
  );
};

export default QuanLyNguoiDung;
