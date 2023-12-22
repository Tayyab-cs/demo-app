import React from "react";
import { Divider } from "antd";
import ColorsCounter from "./ColorsCounter.jsx";
import ColorButtons from "./ColorButtons.jsx";
import "../../index.css";

const ColorChanger = () => {
  return (
    <div style={{ padding: "5px" }}>
      <ColorsCounter />
      <Divider />
      <ColorButtons />
    </div>
  );
};

export default ColorChanger;
