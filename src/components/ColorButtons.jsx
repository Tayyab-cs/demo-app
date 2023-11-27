import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Flex, Button, Card, Alert, Typography, Space } from "antd";

const { Text } = Typography;

export default function ColorButtons({ colors }) {
  const [bgColor, setBgColor] = useState("#fff");
  const [count, setCount] = useState(5);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [mutateColors, setMutateColors] = useState(colors);
  const [displayColors, setDisplayColors] = useState(colors.slice(0, count));

  // Saving original colors array to mutable colors array

  const countIncrement = () => {
    if (count <= mutateColors.length) {
      setCount(() => count + 1);
      setShowAlert(() => false);
      setDisplayColors(() =>
        mutateColors.filter((col) => !col.isDelete).slice(0, count + 1)
      );
    } else {
      setAlertMsg("Colors Limit Reached");
      setAlertType("warning");
      setShowAlert(true);
    }
  };
  const countDecrement = () => {
    if (count > 5) {
      setCount(() => count - 1);
      setShowAlert(() => false);
      setDisplayColors(() =>
        mutateColors.filter((col) => !col.isDelete).slice(0, count - 1)
      );
    } else if (count === 5) {
      setShowAlert(() => true);
    }
  };

  // Handling Alert
  const handleAlertClose = () => {
    setShowAlert(() => false);
  };

  // Delete Button
  const handleDelete = (colorId) => {
    if (count === 5) {
      setAlertMsg("You are not allowed to perform this action");
      setAlertType("error");
      setShowAlert(() => true);
    } else if (count > 5) {
      const updatedColors = mutateColors.map((col) =>
        col.id === colorId ? { ...col, isDelete: true } : col
      );
      setMutateColors(updatedColors);
      setDisplayColors(
        updatedColors.filter((col) => !col.isDelete).slice(0, count - 1)
      );
      setShowAlert(false);
      setCount((preCount) => preCount - 1);
    }
  };

  return (
    <div style={{ backgroundColor: bgColor, height: "100vh", padding: "5px" }}>
      {/***** CARD *****/}
      <Flex gap="large">
        <Card
          title="Counter"
          bordered={false}
          style={{ width: 300, textAlign: "center" }}
        >
          <Space>
            <Button disabled={count === 5} onClick={() => countDecrement()}>
              -
            </Button>
            <Text>{count}</Text>
            <Button onClick={() => countIncrement()}>+</Button>
          </Space>
        </Card>
        <div>
          {showAlert && (
            <Alert
              message={alertMsg}
              type={alertType}
              showIcon
              closable
              onClose={() => handleAlertClose()}
            />
          )}
        </div>
      </Flex>
      <hr />

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
                setShowAlert(false);
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
                color: "red",
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
