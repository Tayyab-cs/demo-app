import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers/index.js";

const persistConfig = {
  key: "root",
  storage,
};

const persistReducers = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  let store = createStore(
    persistReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  let persistor = persistStore(store);

  return { store, persistor };
}
