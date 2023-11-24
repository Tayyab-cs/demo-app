import { useState } from "react";
import "./App.css";
import { Flex, Button } from "antd";
import { COLORS } from "./colors.js";

function App() {
  const [bgColor, setBgColor] = useState('#fff');

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * COLORS.length);
    const color = COLORS[randomIndex];
    return color.hex;
  };

  return (
  <div style={{ backgroundColor: bgColor, height: '100%', padding: '5px' }}>
    <Flex gap="small" wrap="wrap">
        <Button name="default" onClick={() => setBgColor('#fff')}>Default</Button>
        <Button name="random" type="dashed" onClick={() => setBgColor(getRandomColor())}>Random</Button>
        <Button name="green" onClick={() => setBgColor('#008000')}>Green</Button>
        <Button name="blue" onClick={() => setBgColor('#0000FF')}>Blue</Button>
        {
          COLORS.map((color, index) => (
            <Button name={color.name} key={color.name + index} onClick={() => setBgColor(color.hex)}>
              {color.name}
            </Button>
          ))
        }
    </Flex>
  </div>
  )
}

export default App;
