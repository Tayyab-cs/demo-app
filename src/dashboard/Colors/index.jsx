import React from "react";
import { Space, Row, Col } from "antd";
import ColorChanger from "./components/colorChanger";
import ColorBox from "./components/colorBox";

export const Colors = () => {
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
};
