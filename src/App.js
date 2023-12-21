import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store.js";
import AppConfig from "./components/AppConfig.jsx";
import RouterConfig from "./routes/RouterConfig.jsx";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppConfig>
          <RouterConfig />
        </AppConfig>
      </PersistGate>
    </Provider>
  );
}

export default App;
