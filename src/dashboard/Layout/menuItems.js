import {
  BgColorsOutlined,
  CarOutlined,
  HomeOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const menuItems = [
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
    key: "/car-registration",
    icon: <CarOutlined />,
    label: "Car Registration",
  },
  {
    key: "notifications",
    icon: <NotificationOutlined />,
    label: "Notifications",
  },
];

export default menuItems;
