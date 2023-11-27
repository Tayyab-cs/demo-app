import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Flex, Button, Card, Typography, Space, message, Divider } from "antd";

const { Text } = Typography;

export default function ColorButtons({ colors }) {
  const [bgColor, setBgColor] = useState("#fff");
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
      openMessage('warning', 'Colors Limit Reached 😒');
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
      openMessage('error', 'You are not allowed to perform this action 😢');
    } else if (count > 5) {
      const updatedColors = mutateColors.map((col) =>
        col.id === colorId ? { ...col, isDelete: true } : col
      );
      setMutateColors(updatedColors);
      setDisplayColors(
        updatedColors.filter((col) => !col.isDelete).slice(0, count - 1)
      );
      setCount((preCount) => preCount - 1);
    }
  };

  return (
    <div style={{ backgroundColor: bgColor, height: "100vh", padding: "5px" }}>
      {contextHolder}
      {/***** CARD *****/}
      <Flex justify="center">
        <Card
          title="Counter"
          bordered={false}
          style={{ width: 300, textAlign: "center" }}
        >
          <Space>
            <Button disabled={count === 5} style={{ color: 'white', background: 'red', borderRadius: '20px' }} onClick={() => countDecrement()}>
              -
            </Button>
            <Text style={{ fontWeight: 'bold', fontSize: '20px'}}>{count}</Text>
            <Button style={{ color: 'white', background: '#83E50D', borderRadius: '20px' }} onClick={() => countIncrement()}>+</Button>
          </Space>
        </Card>
      </Flex>

      <Divider />

      {/***** BUTTONS *****/}
      <Flex gap="small" wrap="wrap">
        {displayColors.map((color, index) => (
          <span
            key={color.name + index}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Button
              name={color.name}
              key={color.key}
              type="dashed"
              onClick={() => {
                setBgColor(color.hex);
              }}
            >
              {color.name}
            </Button>
            <Button
              style={{
                width: "1px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                background: 'red',
                borderRadius: "20px",
              }}
              onClick={() => handleDelete(color.id)}
            >
              <DeleteOutlined style={{ fontSize: "10px" }} />
            </Button>
          </span>
        ))}
      </Flex>
    </div>
  );
}
