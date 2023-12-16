import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
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
import { FETCH_COLORS_URI } from "../../api/endPoints.js";
import { activeColor } from "../../store/actions/colorActions.js";

const { Title } = Typography;

const OLD_COLORS = [
  {
    _id: "123456789d0",
    name: "default",
    hex: "#ffffff",
    isDelete: false,
  },
  {
    _id: "987654321r0",
    name: "random",
    hex: () => "#" + Math.floor(Math.random() * 16777215).toString(16),
    isDelete: false,
  },
];
const DEFAULT_SELECTED_COLOR = {
  _id: "noId",
  name: "no color selected",
  hex: "#ffffff",
  isDelete: false,
};

export default function ColorChanger() {
  const [displayColors, setDisplayColors] = useState([]);
  const [count, setCount] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  // Fetch Colors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(FETCH_COLORS_URI);
        setDisplayColors([...OLD_COLORS, ...response.data.result.data]);
      } catch (error) {
        console.error("Error fetching colors: ", error);
      }
    };

    fetchData();
  }, []);

  // Notification
  const openMessage = (type, message) => {
    messageApi.open({
      type,
      content: message,
    });
  };

  // Delete Button
  const handleDelete = (colorId) => {
    if (count > 0 && count <= displayColors.length) {
      setDisplayColors((prevColors) =>
        prevColors.map((color) => {
          if (color._id === colorId) {
            color.isDelete = true;
          }
          return color;
        })
      );
      setCount((prevCount) => prevCount - 1);
      dispatch(activeColor(DEFAULT_SELECTED_COLOR));
    } else {
      openMessage("error", "You are not allowed to perform this action 😢");
    }
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
              onClick={() => setCount(count - 1)}
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
              disabled={
                count ===
                displayColors.filter((color) => !color.isDelete).length
              }
              onClick={() => setCount(count + 1)}
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
          {displayColors
            .filter((colors) => !colors.isDelete)
            .slice(0, count)
            .map((color, index) => (
              <Col key={color._id} span={8} style={{ padding: "5px" }}>
                <Flex>
                  <Button
                    name={color.name}
                    key={color.key}
                    type="dashed"
                    size="large"
                    onClick={() => {
                      dispatch(
                        activeColor({
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
                      onClick={() => handleDelete(color._id)}
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
