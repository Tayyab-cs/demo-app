import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import {
  BgColorsOutlined,
  CarOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  NotificationOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Radio } from "antd";
import { Layout, Menu, Button, theme, ConfigProvider, Switch } from "antd";
import urPK from "antd/locale/ur_PK";
import enUS from "antd/locale/en_US";
import dayjs from "dayjs";
import "../../node_modules/dayjs/locale/ur";
import { darkModeAction } from "../store/actions/colorActions.js";
import "./Home.css";

dayjs.locale("en");

const { Header, Sider, Content } = Layout;

export const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("/");
  const [locale, setLocal] = useState(enUS);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.colors.darkMode);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (key) => {
    navigate(key);
    setSelectedMenu(key);
  };

  const changeLocale = (e) => {
    const localeValue = e.target.value;
    setLocal(localeValue);
    if (!localeValue) {
      dayjs.locale("en");
    } else {
      dayjs.locale("zh-cn");
    }
  };

  const toggleTheme = () => {
    dispatch(darkModeAction(!darkMode));
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
              key: "/",
              icon: <HomeOutlined />,
              label: "Welcome",
            },
            {
              key: "/color",
              icon: <BgColorsOutlined />,
              label: "Colors",
            },
            {
              key: "/create-color",
              icon: <PlusCircleOutlined />,
              label: "Create New Color",
            },
            {
              key: "/user-details",
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
          className="page-header"
          style={{
            background: colorBgContainer,
          }}
        >
          <Button
            className="btn-collapse"
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <Radio.Group value={locale} onChange={changeLocale}>
            <Radio.Button key="en" value={enUS}>
              English
            </Radio.Button>
            <Radio.Button key="cn" value={urPK}>
              اردو
            </Radio.Button>
          </Radio.Group>

          <Switch
            checkedChildren={<MdDarkMode />}
            unCheckedChildren={<MdLightMode />}
            checked={darkMode}
            onChange={toggleTheme}
          />
        </Header>
        <ConfigProvider locale={locale}>
          <Content
            className="page-content"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </ConfigProvider>
      </Layout>
    </Layout>
  );
};
