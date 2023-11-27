import "./App.css";
import ColorButtons from "./components/ColorButtons.jsx";
import { COLORS } from "./colors.js";

function App() {
  // Random Color Picker
  // const getRandomColor = () => {
  //   const randomIndex = Math.floor(Math.random() * COLORS.length);
  //   const color = COLORS[randomIndex];
  //   return color.hex;
  // };

  // // default and random colors array
  // const newColors = [
  //   { name: "default", hex: "#ffffff" },
  //   { name: "random", hex: getRandomColor },
  // ];

  // // checking newColors exists in COLORS array or not
  // newColors.forEach(newColor => {
  //   const colorExists = COLORS.some(color => color.name === newColor.name);
  //   if (!colorExists) {
  //     COLORS.unshift(newColor);
  //   }
  // });

  //return <ColorButtons colors={COLORS} />;

  return <div>hello</div>
}

export default App;
