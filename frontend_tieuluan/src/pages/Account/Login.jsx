import React from "react";
import { Form, Input, Button } from "antd";
import logo from "../../assets/images/logo-fnb.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions as actionAccount } from "../../store/accountSlice";
import NguoiDungServices from "../../services/NguoiDung.Service";
import { useNotificationContext } from "../../hooks/useNotification";
import { ERROR_LOG, PATH } from "../../utils";

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

const Login = () => {
  const { setShowNotification, setIsLoading } = useNotificationContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const { email, password } = values;
    setIsLoading(true);
    try {
      const { data, message, status } = await NguoiDungServices.login({
        Email: email,
        Mat_Khau: password,
      });

      setShowNotification({
        isShow: true,
        message,
        status: status === 201 ? "success" : "error",
      });
      if (status === 201) {
        dispatch(
          actionAccount.LoginAccount({
            user: data.nguoiDung,
            token: data.token,
          })
        );
        navigate(PATH.ADMIN);
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập: ", error);
      setShowNotification(ERROR_LOG);
    }
    setIsLoading(false);
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
      <div style={{ textAlign: "center" }}>
        <ImageLogo src={logo} alt="Hình minh họa" />
      </div>
      <TitlelH2 style={{ textAlign: "center" }}>Đăng Nhập</TitlelH2>
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
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng Nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
