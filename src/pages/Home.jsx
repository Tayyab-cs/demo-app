import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { MdDarkMode, MdLightMode } from "react-icons/md";
import Welcome from "./Welcome.jsx";
import Colors from "../components/colors/ColorButtons.jsx";
import ColorsForm from "../components/colorsForm/ColorsForm.jsx";
import UserDetails from "../dashboard/UserDetails.jsx";
import NotificationScreen from "./NotificationScreen.jsx";
import { darkModeAction } from "../store/actions/colorActions.js";

dayjs.locale("en");

const { Header, Sider, Content } = Layout;

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("welcome");
  const [locale, setLocal] = useState(enUS);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.colors.darkMode);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (key) => {
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
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
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
          {/* <span
            style={{
              marginRight: 16,
            }}
          >
            Change locale of components:
          </span> */}
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
        </ConfigProvider>
      </Layout>
    </Layout>
  );
}
