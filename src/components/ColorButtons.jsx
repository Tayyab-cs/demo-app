import React, { useState } from "react";
import ColorChanger from "./ColorChanger";
import ColorBox from "./ColorBox";
import { Space, Row, Col } from "antd";
import { COLORS } from "../colors";

const DEFAULT_SELECTED_COLOR = {
  name: "No Color Selected",
  hex: "#fff",
  id: "no color selected",
  isDelete: false,
};

export default function ColorButtons() {
  const [selectedColor, setSelectedColor] = useState(DEFAULT_SELECTED_COLOR);

  // Random Color Picker
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * COLORS.length);
    const color = COLORS[randomIndex];

    return color.hex;
  };

  // default and random colors array
  const newColors = [
    { name: "default", hex: "#ffffff" },
    { name: "random", hex: getRandomColor },
  ];

  // checking newColors exists in COLORS array or not
  newColors.forEach((newColor) => {
    const colorExists = COLORS.some((color) => color.name === newColor.name);
    if (!colorExists) {
      COLORS.unshift(newColor);
    }
  });

  let colors = COLORS.map((col, index) => ({
    ...col,
    id: col.name + index,
    isDelete: false,
  }));

  return (
    <Row gap="small">
      <Col span={12}>
        <ColorChanger
          colors={colors}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />
      </Col>
      <Space />
      <Col span={12}>
        <ColorBox selectedColor={selectedColor} />
      </Col>
    </Row>
  );
}
