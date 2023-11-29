import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Row,
  Space,
  Typography,
  message,
} from "antd";

const { Title } = Typography;

const DEFAULT_SELECTED_COLOR = {
  name: "No Color Selected",
  hex: "#fff",
  id: "no color selected",
  isDelete: false,
};

export default function ColorChanger({ colors, onSelectColor, selectedColor }) {
  const [count, setCount] = useState(5);
  const [mutateColors, setMutateColors] = useState(colors);
  const [displayColors, setDisplayColors] = useState(colors.slice(0, count));
  const [messageApi, contextHolder] = message.useMessage();

  // Notification
  const openMessage = (type, message) => {
    messageApi.open({
      type,
      content: message,
    });
  };

  // Handling Count Increment and Decrement
  const countIncrement = () => {
    if (count <= mutateColors.length) {
      setCount(() => count + 1);
      setDisplayColors(() =>
        mutateColors.filter((col) => !col.isDelete).slice(0, count + 1)
      );
    } else {
      openMessage("warning", "Colors Limit Reached 😒");
    }
  };
  const countDecrement = () => {
    if (count > 5) {
      setCount(() => count - 1);
      setDisplayColors(() =>
        mutateColors.filter((col) => !col.isDelete).slice(0, count - 1)
      );
    }
  };

  // Delete Button
  const handleDelete = (colorId) => {
    if (count === 5) {
      openMessage("error", "You are not allowed to perform this action 😢");
    } else if (count > 5) {
      const updatedColors = mutateColors.map((col) =>
        col.id === colorId ? { ...col, isDelete: true } : col
      );
      setMutateColors(updatedColors);
      setDisplayColors(
        updatedColors.filter((col) => !col.isDelete).slice(0, count - 1)
      );
      setCount((preCount) => preCount - 1);

      // Updating Colors Screen State
      if (colorId === selectedColor.id) onSelectColor(DEFAULT_SELECTED_COLOR);
    }
  };

  return (
    <div style={{ height: "100vh", padding: "5px" }}>
      {contextHolder}
      {/***** CARD *****/}
      <Flex justify="center">
        <Card
          title="Counter"
          bordered={false}
          style={{ width: 300, textAlign: "center" }}
        >
          <Space>
            <Button
              disabled={count === 5}
              style={{
                color: "white",
                background: "red",
                borderRadius: "20px",
              }}
              onClick={() => countDecrement()}
            >
              -
            </Button>
            <Title style={{ fontWeight: "bold", fontSize: "20px" }}>
              {count}
            </Title>
            <Button
              style={{
                color: "white",
                background: "#83E50D",
                borderRadius: "20px",
              }}
              onClick={() => countIncrement()}
            >
              +
            </Button>
          </Space>
        </Card>
      </Flex>

      <Divider />

      {/***** BUTTONS *****/}
      <Flex style={{ margin: "50px" }} align="center" justify="center">
        <Row>
          {displayColors.map((color, index) => (
            <Col key={color.id} span={8} style={{ padding: "5px" }}>
              <Flex>
                <Button
                  name={color.name}
                  key={color.key}
                  type="dashed"
                  size="large"
                  style={{
                    width: "200px",
                    background:
                      color.name === "random" && selectedColor.name === "random"
                        ? selectedColor.hex
                        : color.hex,
                  }}
                  onClick={() => {
                    onSelectColor({
                      ...color,
                      hex:
                        typeof color.hex === "function"
                          ? color.hex()
                          : color.hex,
                    });
                  }}
                >
                  {color.name}
                </Button>
                <Flex align="center">
                  <Button
                    style={{
                      width: "1px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "black",
                      background: "red",
                      borderRadius: "20px",
                    }}
                    onClick={() => handleDelete(color.id)}
                  >
                    <DeleteOutlined style={{ fontSize: "10px" }} />
                  </Button>
                </Flex>
              </Flex>
            </Col>
          ))}
        </Row>
      </Flex>
    </div>
  );
}
