import { combineReducers } from "redux";
import colorReducer from "./colorReducer.js";

export default combineReducers({
  colorReducer: colorReducer,
});
