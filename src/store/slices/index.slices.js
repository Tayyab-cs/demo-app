import { combineReducers } from "redux";
import colorReducer from "./colorSlice.js";

export default combineReducers({
  colors: colorReducer,
});
