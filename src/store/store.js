import { createStore } from "redux";
import colorReducer from "./reducers/colorReducer.js";

export default function configureStore(initialState) {
  return createStore(colorReducer, initialState);
}
