import React from "react";
import { Flex, Typography } from "antd";

const { Title } = Typography;

export default function ColorBox({ color }) {
  let { name, hex } = color;

  console.log("name: ", color);

  return (
    <Flex
      gap="small"
      justify="center"
      align="center"
      style={{ backgroundColor: hex, height: "100vh" }}
    >
      <Title level={2} style={{ fontSize: "50px" }}>
        {name}
      </Title>
    </Flex>
  );
}
