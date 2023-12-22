import React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Radio, Switch, Layout, theme } from "antd";
import urPK from "antd/locale/ur_PK";
import enUS from "antd/locale/en_US";
import { useSelector, useDispatch } from "react-redux";
import { setDarkMode, setLocale } from "../../store/slices/colorSlice.js";
import dayjs from "dayjs";

const { Header } = Layout;

const LayoutHeader = ({ collapsed, setCollapsed }) => {
  const dispatch = useDispatch();
  const { darkMode, locale } = useSelector((state) => state.colors);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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

  return (
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
  );
};

export default LayoutHeader;
