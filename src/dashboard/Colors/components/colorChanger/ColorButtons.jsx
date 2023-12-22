import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Flex, Row, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  setActiveColor,
  setColorsList,
  setCount,
} from "../../../../store/slices/colorSlice.js";
import "../../index.css";

const DEFAULT_SELECTED_COLOR = {
  _id: "noId",
  name: "no color selected",
  hex: "#ffffff",
  isDelete: false,
};

const ColorButtons = () => {
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
      dispatch(setColorsList(updatedColors));
      dispatch(setCount(count - 1));
      if (activeColor.name === colorName) {
        dispatch(setActiveColor(DEFAULT_SELECTED_COLOR));
      }
    } else {
      openMessage("error", "You are not allowed to perform this action 😢");
    }
  };
  return (
    <>
      {contextHolder}
      <Flex className="flex-btns" align="center" justify="center">
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
                          setActiveColor({
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
                        className="delete-color-btn"
                        onClick={() => handleDelete(color.name)}
                      >
                        <DeleteOutlined />
                      </Button>
                    </Flex>
                  </Flex>
                </Col>
              ))}
        </Row>
      </Flex>
    </>
  );
};

export default ColorButtons;
