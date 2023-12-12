import React, { useState } from "react";
import { Space, Row, Col } from "antd";
import ColorChanger from "./ColorChanger.jsx";
import ColorBox from "./ColorBox.jsx";

const DEFAULT_SELECTED_COLOR = {
  name: "No Color Selected",
  hex: "#fff",
  id: "no color selected",
  isDelete: false,
};

export default function ColorButtons() {
  const [color, setColor] = useState(DEFAULT_SELECTED_COLOR);

  return (
    <div style={{ height: "100vh" }}>
      <Row gap="small">
        <Col span={12}>
          <ColorChanger color={color} setColor={setColor} />
        </Col>
        <Space />
        <Col span={12}>
          <ColorBox color={color} />
        </Col>
      </Row>
    </div>
  );
}
