// import React from "react";
// import { Layout, Menu, Input, Badge } from "antd";
// import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
// import styled from "styled-components";

// const { Header } = Layout;
// const { Search } = Input;

// // Styled Components
// const HeaderCustom = styled(Header)`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background-color: #ff5722;
//   padding: 0 50px;
// `;

// const Logo = styled.div`
//   float: left;
//   color: white;
//   font-size: 24px;
//   font-weight: bold;
// `;

// const SearchBar = styled.div`
//   flex: 1;
//   padding-left: 50px;
// `;

// const StyledMenu = styled(Menu)`
//   display: flex;
//   justify-content: flex-end;
//   background-color: transparent;

//   .ant-menu-item {
//     color: white;
//   }

//   .ant-menu-item:hover {
//     background-color: #e64a19;
//   }
// `;

// const StyledSearchButton = styled(Search)`
//   .ant-input-search-button {
//     background-color: #ff5722;
//     border-color: #ff5722;
//   }

//   .ant-input-search-button:hover {
//     background-color: #e64a19;
//     border-color: #e64a19;
//   }
// `;

// const Home = () => {
//   const onSearch = (value) => console.log(value);

//   return (
//     <Layout>
//       {/* Header */}
//       <HeaderCustom>
//         <Logo>MyRestaurant</Logo>

//         {/* Thanh tìm kiếm */}
//         <SearchBar>
//           <StyledSearchButton
//             placeholder="Search for products..."
//             allowClear
//             onSearch={onSearch}
//             style={{ width: 400 }}
//           />
//         </SearchBar>

//         {/* Menu bên phải */}
//         <StyledMenu mode="horizontal">
//           <Menu.Item key="1">
//             <UserOutlined />
//             Đăng nhập
//           </Menu.Item>
//           <Menu.Item key="2">
//             <Badge count={3}>
//               <ShoppingCartOutlined />
//               Giỏ hàng
//             </Badge>
//           </Menu.Item>
//         </StyledMenu>
//       </HeaderCustom>

//       {/* Nội dung chính */}
//       <Layout.Content style={{ padding: "50px" }}>
//         <div>Trang chủ</div>
//       </Layout.Content>

//       {/* Footer */}
//       <Layout.Footer style={{ textAlign: "center" }}>
//         MyRestaurant ©2024 Created by YourName
//       </Layout.Footer>
//     </Layout>
//   );
// };

// export default Home;
