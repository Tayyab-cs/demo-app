import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import dayjs from "dayjs";
import { fetchColors } from "../../store/slices/colorSlice.js";
import menuItems from "./menuItems.js";
import LayoutHeader from "./LayoutHeader.jsx";
import "./index.css";
dayjs.locale("en");

const { Sider, Content } = Layout;

const DashboardLayout = () => {
  let location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(location.pathname);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (key) => {
    navigate(key);
    setSelectedMenu(key);
  };

  // API call
  useEffect(() => {
    dispatch(fetchColors());
  }, [dispatch]);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedMenu]}
          onClick={({ key }) => handleMenuClick(key)}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <LayoutHeader setCollapsed={setCollapsed} collapsed={collapsed} />
        <Content
          className="page-content"
          style={{
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

export default DashboardLayout;
