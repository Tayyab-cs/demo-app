import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  activeColorAction,
  colorsListAction,
  countAction,
} from "../../store/actions/colorActions.js";

const { Title } = Typography;

const DEFAULT_SELECTED_COLOR = {
  _id: "noId",
  name: "no color selected",
  hex: "#ffffff",
  isDelete: false,
};

export default function ColorChanger() {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const activeColor = useSelector((state) => state.colors.activeColor);
  const colors = useSelector((state) => state.colors.colorsList);
  const count = useSelector((state) => state.colors.count);

  // Notification
  const openMessage = (type, message) => {
    messageApi.open({
      type,
      content: message,
    });
  };

  // Delete Button
  const handleDelete = (colorName) => {
    if (count > 0 && count <= colors.length) {
      const updatedColors = colors.map((color) => {
        if (color.name === colorName) {
          color.isDelete = true;
        }
        return color;
      });
      dispatch(colorsListAction(updatedColors));
      dispatch(countAction(count - 1));
      if (activeColor.name === colorName) {
        dispatch(activeColorAction(DEFAULT_SELECTED_COLOR));
      }
    } else {
      openMessage("error", "You are not allowed to perform this action 😢");
    }
  };

  const countLength = () => {
    const colorsList = colors;
    if (colorsList && Array.isArray(colorsList)) {
      const listLength = colorsList.filter((color) => !color.isDelete).length;
      return count === listLength;
    }
    return false;
  };

  return (
    <div style={{ padding: "5px" }}>
      {contextHolder}
      {/***** CARD *****/}
      <Flex justify="center">
        <Card
          title="Counter"
          bordered={false}
          style={{ width: "300", textAlign: "center" }}
        >
          <Space>
            <Button
              disabled={count === 0}
              onClick={() => {
                dispatch(countAction(count - 1));
              }}
              style={{
                color: "white",
                background: "#83E50D",
                borderRadius: "20px",
              }}
            >
              -
            </Button>
            <Title style={{ fontWeight: "bold", fontSize: "20px" }}>
              {count}
            </Title>
            <Button
              disabled={countLength()}
              onClick={() => {
                dispatch(countAction(count + 1));
              }}
              style={{
                color: "white",
                background: "red",
                borderRadius: "20px",
              }}
            >
              +
            </Button>
          </Space>
        </Card>
      </Flex>

      <Divider />

      {/***** BUTTONS *****/}
      <Flex align="center" justify="center" style={{ margin: "50px" }}>
        <Row>
          {colors &&
            colors
              .filter((colors) => !colors.isDelete)
              .slice(0, count)
              .map((color, index) => (
                <Col
                  key={color.hex + index}
                  span={8}
                  style={{ padding: "5px" }}
                >
                  <Flex>
                    <Button
                      name={color.name}
                      key={color.key}
                      type="dashed"
                      size="large"
                      onClick={() => {
                        dispatch(
                          activeColorAction({
                            id: color._id,
                            name: color.name,
                            hex:
                              typeof color.hex === "function"
                                ? color.hex()
                                : color.hex,
                            isDelete: color.isDelete,
                          })
                        );
                      }}
                      style={{
                        width: "200px",
                        background:
                          color.name === "random" && color.name === "random"
                            ? color.hex
                            : color.hex,
                      }}
                    >
                      {color.name}
                    </Button>
                    <Flex align="center">
                      <Button
                        onClick={() => handleDelete(color.name)}
                        style={{
                          width: "1px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "black",
                          background: "red",
                          borderRadius: "20px",
                        }}
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
