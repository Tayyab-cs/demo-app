import * as actionType from "../actionTypes/actionTypes.js";

const initialState = {
  activeColor: {
    payload: {
      id: "noId",
      name: "no color selected",
      hex: "#ffffff",
      isDelete: false,
    },
  },
  colors: [],
};

export function activeColor(state = initialState, action) {
  switch (action.type) {
    case actionType.ACTIVE_COLOR:
      console.log("action1: ", action);
      return {
        ...state,
        activeColor: action,
      };

    default:
      return state;
  }
}

export function colors(state = initialState, action) {
  switch (action.type) {
    case actionType.COLORS:
      console.log("action2: ", action.payload);
      return {
        ...state,
        colors: action.payload,
      };

    default:
      return state;
  }
}
