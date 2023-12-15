import React from "react";
import { Flex, Typography } from "antd";
import { useSelector } from "react-redux";

const { Title } = Typography;

export default function ColorBox() {
  const state = useSelector((state) => state.payload);
  let { name, hex } = state;
  console.log("color box state: ", state);

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
