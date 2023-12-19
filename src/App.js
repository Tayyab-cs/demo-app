import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { FETCH_COLORS_URI } from "../src/api/endPoints.js";
import { colorsListAction } from "../src/store/actions/colorActions.js";
import NotFound from "./components/NotFound.jsx";
import Colors from "./components/colors/ColorButtons.jsx";
import ColorsForm from "./components/colorsForm/ColorsForm.jsx";
import UserDetails from "./dashboard/UserDetails.jsx";
import Home from "./pages/Home.jsx";

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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(FETCH_COLORS_URI);
        dispatch(
          colorsListAction([...OLD_COLORS, ...response.data.result.data])
        );
      } catch (error) {
        console.error("Error fetching colors: ", error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/color" element={<Colors />} />
      <Route path="/create-color" element={<ColorsForm />} />
      <Route path="/user-details" element={<UserDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
