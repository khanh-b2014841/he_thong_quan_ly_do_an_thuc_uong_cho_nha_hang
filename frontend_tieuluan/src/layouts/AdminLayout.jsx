import React, { useCallback, useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo-fnb.png";
import styled from "styled-components";
import { ERROR_LOG, PATH, PATH_ADMIN } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { accountInfoSelector, accountTokenSelector } from "../store/selectors";
import { useNotificationContext } from "../hooks/useNotification";
import NguoiDungServices from "../services/NguoiDung.Service";
import { actions as actionAccount } from "../store/accountSlice";

const { Header, Content } = Layout;

const StyledSider = styled(Layout.Sider)`
  background-color: #6befde !important;
`;

const StyledMenu = styled(Menu)`
  background-color: #6befde !important;

  .ant-menu-item:hover {
    background-color: #458b8e !important;
    color: white !important;
  }
  .ant-menu-item {
    color: black !important;
  }

  .ant-menu-item-selected {
    background-color: #458b8e !important;
    color: white !important;
  }
`;
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: #c5f5f5;
`;

const HeaderContainer = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 5px;
  margin: -4px 0;
  background-color: #c5f5f5;
`;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const token = useSelector(accountTokenSelector);
  const info = useSelector(accountInfoSelector);
  const { setShowNotification, setIsLoading } = useNotificationContext();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState();

  const handleMenuClick = (key) => {
    switch (key) {
      case "1":
        navigate(PATH.ADMIN);
        break;
      case "2":
        navigate(PATH_ADMIN(PATH.SAN_PHAM));
        break;
      case "3":
        navigate(PATH_ADMIN(PATH.NGUYEN_LIEU));
        break;
      case "4":
        navigate(PATH_ADMIN(PATH.NSX));
        break;
      case "6":
        navigate(PATH_ADMIN(PATH.KHO));
        break;
      case "user-info":
        navigate(PATH_ADMIN(PATH.INFO)); // Add a new route for user information
        break;
      case "test-fe":
        navigate(PATH_ADMIN(PATH.DS_NL));
        break;
      default:
        break;
    }
  };

  const userMenu = (
    <Menu onClick={({ key }) => handleMenuClick(key)}>
      <Menu.Item key="user-info">Thông tin</Menu.Item>
      <Menu.Item key="logout" danger>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const getInfoUser = async () => {
    setIsLoading(true);
    try {
      const { status, data } = await NguoiDungServices.getOne();
      if (status === 201) {
        dispatch(actionAccount.setInfo(data));
        setUserName(data.Ten_ND);
      } else navigate(PATH.LOGIN);
    } catch (err) {
      console.log("Error: ", err);
      setShowNotification(ERROR_LOG);
      navigate(PATH.LOGIN);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (token) {
      if (info) {
        setUserName(info.Ten_ND);
      } else {
        getInfoUser();
      }
    } else navigate(PATH.LOGIN);
  }, [token, info, navigate]);

  return (
    <Layout>
      <StyledSider trigger={null} collapsible collapsed={collapsed}>
        <LogoContainer>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "60px", height: "60px" }}
          />
        </LogoContainer>
        <div className="demo-logo-vertical" />
        <StyledMenu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Thống Kê",
              onClick: () => handleMenuClick("1"),
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Quản lý sản Phẩm",
              onClick: () => handleMenuClick("2"),
            },
            {
              key: "3",
              icon: <VideoCameraOutlined />,
              label: "Quản lý nguyên liệu",
              onClick: () => handleMenuClick("3"),
            },
            {
              key: "4",
              icon: <VideoCameraOutlined />,
              label: "Quản lý Nhà Sản Xuất",
              onClick: () => handleMenuClick("4"),
            },
            {
              key: "6",
              icon: <UploadOutlined />,
              label: "Quản lý kho",
              onClick: () => handleMenuClick("6"),
            },
          ]}
        />
      </StyledSider>
      <Layout>
        <HeaderContainer>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <p>Xin chào {userName}!</p>
          <div style={{ marginRight: "30px" }}>
            <Input
              placeholder="Tìm kiếm..."
              prefix={<SearchOutlined />}
              style={{ width: 250, margin: "0 20px" }}
            />
            <Dropdown overlay={userMenu}>
              <Button icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </HeaderContainer>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
