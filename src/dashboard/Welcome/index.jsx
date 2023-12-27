import React from "react";
import { Flex, Image, Typography } from "antd";
import welcome from "../../assets/gifs/hello.gif";
import { Outlet } from "react-router-dom";

const { Title } = Typography;

const Welcome = () => {
  return (
    <Flex justify="center" align="center" vertical>
      <Title level={1}>WELCOME TO APPFORPRACTICE</Title>
      <Image
        src={welcome}
        alt="Your GIF"
        style={{ margin: "10px", width: "400px" }}
      />
      <Outlet />
    </Flex>
  );
};

export default Welcome;
