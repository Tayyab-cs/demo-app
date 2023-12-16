import React from "react";
import { Flex, Typography } from "antd";
import { useSelector } from "react-redux";

const { Title } = Typography;

export default function ColorBox() {
  const activeColor = useSelector((state) => state.activeColor);
  let { name, hex } = activeColor.activeColor.payload;

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
