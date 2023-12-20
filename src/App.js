import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { ConfigProvider, theme } from "antd";
import axios from "axios";
import "./App.css";
import { FETCH_COLORS_URI } from "../src/api/endPoints.js";
import { colorsListAction } from "../src/store/actions/colorActions.js";
import { Home, NotFound } from "./pages/index.pages.js";
import {
  ColorButtons,
  ColorsForm,
  UserDetails,
  NotificationScreen,
  Welcome,
} from "./dashboard/index.dashboard.js";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "../src/store/store.js";

const { persistor } = configureStore();

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

  // API call
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

  let darkMode = useSelector((state) => state.colors.darkMode);

  return (
    <>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider
          theme={{
            algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}>
                <Route path="/" element={<Welcome />} />
                <Route path="/color" element={<ColorButtons />} />
                <Route path="/create-color" element={<ColorsForm />} />
                <Route path="/user-details" element={<UserDetails />} />
                <Route path="/notifications" element={<NotificationScreen />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </PersistGate>
    </>
  );
}

export default App;
