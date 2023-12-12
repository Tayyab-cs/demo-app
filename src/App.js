import "./App.css";
import { Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound.jsx";
import Colors from "./components/colors/ColorButtons.jsx";
import ColorsForm from "./components/colorsForm/ColorsForm.jsx";
import UserDetails from "./dashboard/UserDetails.jsx";
import Home from "./pages/Home.jsx";

function App() {
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
