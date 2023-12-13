import React, { useState } from "react";
import {
  BgColorsOutlined,
  CarOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  NotificationOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import Welcome from "./Welcome.jsx";
import Colors from "../components/colors/ColorButtons.jsx";
import ColorsForm from "../components/colorsForm/ColorsForm.jsx";
import UserDetails from "../dashboard/UserDetails.jsx";
import NotificationScreen from "./NotificationScreen.jsx";

const { Header, Sider, Content } = Layout;

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("welcome");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (key) => {
    setSelectedMenu(key);
  };

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
          items={[
            {
              key: "welcome",
              icon: <HomeOutlined />,
              label: "Welcome",
            },
            {
              key: "colors",
              icon: <BgColorsOutlined />,
              label: "Colors",
            },
            {
              key: "createColor",
              icon: <PlusCircleOutlined />,
              label: "Create New Color",
            },
            {
              key: "userDetails",
              icon: <CarOutlined />,
              label: "Car Registration",
            },
            {
              key: "notifications",
              icon: <NotificationOutlined />,
              label: "Notifications",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {selectedMenu === "welcome" && <Welcome />}
          {selectedMenu === "colors" && <Colors />}
          {selectedMenu === "createColor" && <ColorsForm />}
          {selectedMenu === "userDetails" && <UserDetails />}
          {selectedMenu === "notifications" && <NotificationScreen />}
        </Content>
      </Layout>
    </Layout>
  );
}
