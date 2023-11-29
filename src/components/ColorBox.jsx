import React from "react";
import { Flex, Typography } from "antd";

const { Title } = Typography;

export default function ColorBox({ selectedColor }) {
  let { name, hex, id } = selectedColor;
  console.log("ColorBox: values(name, hex)", name, hex, id);

  return (
    <Flex
      gap="small"
      justify="center"
      align="center"
      style={{ backgroundColor: hex, height: "100vh" }}
    >
      <Title level={2} style={{ fontSize: "50px"}}>{name.toUpperCase()}</Title>
    </Flex>
  );
}
