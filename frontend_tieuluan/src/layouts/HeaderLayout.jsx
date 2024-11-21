import { Header } from "antd/es/layout/layout";
import React from "react";
import logo from "../assets/images/logo-fnb.png";

const HeaderLayout = () => {
  return (
    <Header style={{ background: "#9ec7ea", padding: "0 20px" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: "60px", height: "60px", marginTop: "2px" }}
        />
      </div>
    </Header>
  );
};

export default HeaderLayout;
