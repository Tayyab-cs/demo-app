import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/store.js";
import "./index.css";
import App from "./App";

const DEFAULT_COLOR = {
  payload: {
    id: "noId",
    name: "No Color Selected",
    hex: "#ffffff",
    isDelete: null,
  },
};
const store = configureStore(DEFAULT_COLOR);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
