import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./store/store.js";

const { store } = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));

const AppWrapper = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
};

root.render(<AppWrapper />);
