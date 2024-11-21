import React from "react";
import { Form, Input, Button, message } from "antd";
import logo from "../../assets/images/logo-fnb.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import NguoiDungService from "../../services/NguoiDung.Service";

const TitlelH2 = styled.h2`
  position: relative;
  color: #231390;
  padding-top: 20px;
`;

const ImageLogo = styled.img`
  position: absolute;
  width: 120px;
  height: 120px;
  opacity: 0.7;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
`;

const Register = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate("/login");
  };

  const handleSubmit = async (values) => {
    const { email, password } = values;

    try {
      const { data, message } = await NguoiDungService.register({
        Email: email,
        Mat_Khau: password,
      });

      if (data) {
        messageApi.success(message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        messageApi.error(message || "Đăng ký thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      messageApi.error("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "30%",
        margin: "auto",
        padding: "20px",
        backgroundColor: "#c7d4e8",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        marginTop: "50px",
      }}
    >
      {contextHolder}
      <div style={{ textAlign: "center" }}>
        <ImageLogo src={logo} alt="Hình minh họa" />
      </div>
      <TitlelH2 style={{ textAlign: "center" }}>Đăng Ký</TitlelH2>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
          ]}
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item
          name="confirm"
          rules={[
            { required: true, message: "Vui lòng nhập lại mật khẩu!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng Ký
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <p>
          Bạn đã có tài khoản!{" "}
          <span
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={handleRegisterClick}
          >
            Đăng nhập ngay
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
