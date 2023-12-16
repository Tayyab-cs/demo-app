import React from "react";
import { Space, Row, Col } from "antd";
import ColorChanger from "./ColorChanger.jsx";
import ColorBox from "./ColorBox.jsx";

export default function ColorButtons() {
  return (
    <div>
      <Row gap="small">
        <Col span={12}>
          <ColorChanger />
        </Col>
        <Space />
        <Col span={12}>
          <ColorBox />
        </Col>
      </Row>
    </div>
  );
}
