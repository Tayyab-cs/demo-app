import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
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
import { Layout, Menu, Button, theme, Switch } from "antd";

import "./DashboardLayout.css";
import {
  fetchColors,
  setDarkMode,
  setLocale,
} from "../../store/slices/colorSlice.js";

import urPK from "antd/locale/ur_PK";
import enUS from "antd/locale/en_US";
import dayjs from "dayjs";
dayjs.locale("en");
const { Header, Sider, Content } = Layout;

export const DashboardLayout = () => {
  let location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(location.pathname);
  const dispatch = useDispatch();
  const { darkMode, locale } = useSelector((state) => state.colors);
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
    dispatch(setLocale(localeValue));
    if (!localeValue) {
      dayjs.locale("en");
    } else {
      dayjs.locale("zh-cn");
    }
  };

  const toggleTheme = () => {
    dispatch(setDarkMode(!darkMode));
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
