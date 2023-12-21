import { useSelector } from "react-redux";
import { ConfigProvider, theme } from "antd";
import "../../node_modules/dayjs/locale/ur";

function AppConfig({ children }) {
  let { darkMode, locale } = useSelector((state) => state.colors);

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
      locale={locale}
    >
      {children}
    </ConfigProvider>
  );
}

export default AppConfig;
