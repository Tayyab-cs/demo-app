import "./App.css";
import { Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound.jsx";
import Colors from "./components/colors/ColorButtons.jsx";
import ColorsForm from "./components/colorsForm/ColorsForm.jsx";
import UserDetails from "./dashboard/UserDetails.jsx";

function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/color" element={<Colors />} />
      <Route path="/create-color" element={<ColorsForm />} />
      <Route path="/user-details" element={<UserDetails />} />
    </Routes>
  );
}

export default App;
