import React from "react";
import { Flex, Image, Typography } from "antd";
import welcome from "../../src/assets/gifs/hello.gif";

const { Title } = Typography;

export default function Welcome() {
  return (
    <Flex justify="center" align="center" vertical>
      <Title level={1}>WELCOME TO APPFORPRACTICE</Title>
      <Image
        src={welcome}
        alt="Your GIF"
        style={{ margin: "10px", width: "400px" }}
      />
    </Flex>
  );
}
