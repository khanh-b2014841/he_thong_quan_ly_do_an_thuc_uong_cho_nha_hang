import React, { useState } from "react";
import {
  Card,
  Descriptions,
  Divider,
  Typography,
  Avatar,
  Button,
  Input,
  DatePicker,
  Select,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  CalendarOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;

const ThongTin = () => {
  // Dữ liệu mẫu người dùng
  const [isEditing, setIsEditing] = useState(false);

  // Chuyển đổi chế độ chỉnh sửa
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Card
      style={{ maxWidth: 600, margin: "0 auto", padding: "24px" }}
      bordered={false}
    >
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Avatar size={100} icon={<UserOutlined />} />
        <Title level={3} style={{ marginTop: 16 }}>
          {isEditing ? (
            <Input placeholder="Nhập tên người dùng" style={{ width: 200 }} />
          ) : (
            "Nguyễn Văn A"
          )}
        </Title>
      </div>

      <Divider orientation="left">Thông Tin Cá Nhân</Divider>
      <Descriptions column={1} bordered>
        <Descriptions.Item
          label={
            <>
              <MailOutlined /> Email
            </>
          }
        >
          {isEditing ? (
            <Input placeholder="Nhập email" />
          ) : (
            "nguyenvana@example.com"
          )}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <PhoneOutlined /> Số Điện Thoại
            </>
          }
        >
          {isEditing ? (
            <Input placeholder="Nhập số điện thoại" />
          ) : (
            "0123456789"
          )}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <HomeOutlined /> Địa Chỉ
            </>
          }
        >
          {isEditing ? (
            <Input placeholder="Nhập địa chỉ" />
          ) : (
            "123 Đường ABC, Quận 1, TP. Hồ Chí Minh"
          )}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <CalendarOutlined /> Ngày Sinh
            </>
          }
        >
          {isEditing ? (
            <DatePicker
              placeholder="Chọn ngày sinh"
              style={{ width: "100%" }}
              defaultValue={moment("1990-01-01", "YYYY-MM-DD")}
            />
          ) : (
            "1990-01-01"
          )}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <IdcardOutlined /> Giới Tính
            </>
          }
        >
          {isEditing ? (
            <Select defaultValue="Nam" style={{ width: "100%" }}>
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
            </Select>
          ) : (
            "Nam"
          )}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <IdcardOutlined /> Chức Vụ
            </>
          }
        >
          {isEditing ? <Input placeholder="Nhập chức vụ" /> : "Quản lý"}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <div style={{ textAlign: "center", marginTop: 16 }}>
        <Button
          type="primary"
          icon={<UserOutlined />}
          onClick={handleEditClick}
        >
          {isEditing ? "Lưu" : "Cập nhật"}
        </Button>
      </div>
    </Card>
  );
};

export default ThongTin;
