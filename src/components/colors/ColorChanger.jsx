import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
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
  payload: {
    name: "No Color Selected",
    hex: "#fff",
    id: "no color selected",
    isDelete: false,
  },
};

export default function ColorChanger() {
  const [count, setCount] = useState(0);
  const [displayColors, setDisplayColors] = useState([...OLD_COLORS]);
  const [messageApi, contextHolder] = message.useMessage();
  const color = useSelector((state) => state.activeColor);
  const colorState = useSelector((state) => state.colors);
  const dispatch = useDispatch();

  console.log("color: ", color);
  console.log("colorState: ", colorState);

  // Fetch Colors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(FETCH_COLORS_URI);
        setDisplayColors([...OLD_COLORS, ...response.data.result.data]);
        setCount(displayColors.length);
      } catch (error) {
        console.error("Error fetching colors: ", error);
      }
    };

    fetchData();
  }, [displayColors.length]);

  // Notification
  const openMessage = (type, message) => {
    messageApi.open({
      type,
      content: message,
    });
  };

  // Delete Button
  const handleDelete = (colorId) => {
    if (count === 5) {
      openMessage("error", "You are not allowed to perform this action 😢");
    } else if (count > 5 && displayColors.length > 5) {
      setDisplayColors(color);
      setCount((preCount) => preCount - 1);

      // Updating Colors Screen State
      if (colorId === color._id)
        dispatch(activeColor({ DEFAULT_SELECTED_COLOR }));
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
              disabled={count === displayColors.length}
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
          {displayColors.map((color, index) => (
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
                    onClick={() => handleDelete(color.id)}
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
