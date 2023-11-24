import { useState, useCallback  } from "react";
import "./App.css";
import { Flex, Button } from "antd";

function App() {
  const [bgColor, setBgColor] = useState('#fff');

  const getRandomColor = useCallback (() => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }, []);

  return (
  <div style={{ backgroundColor: bgColor, height: '100vh', padding: '5px' }}>
    <Flex gap="small" wrap="wrap">
        <Button name="default" onClick={() => setBgColor('#fff')}>Default</Button>
        <Button name="green" type="dashed" onClick={() => setBgColor('#008000')}>Green</Button>
        <Button name="blue" type="primary" onClick={() => setBgColor('#0000FF')}>Blue</Button>
        <Button name="random" type="text" onClick={() => setBgColor(getRandomColor())}>Random</Button>
    </Flex>
  </div>
  )
}

export default App;
