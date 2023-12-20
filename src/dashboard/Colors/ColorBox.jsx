import React from "react";
import { useSelector } from "react-redux";
import { Flex, Typography } from "antd";

const { Title } = Typography;

export const ColorBox = () => {
  const colors = useSelector((state) => state.colors.activeColor);
  let { name, hex } = colors;

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
};
