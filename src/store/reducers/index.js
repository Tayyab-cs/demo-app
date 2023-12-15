import { combineReducers } from "redux";
import { activeColor, colors } from "./colorReducer.js";

export default combineReducers({
  activeColor,
  colors,
});
