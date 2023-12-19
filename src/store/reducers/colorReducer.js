import * as actionType from "../actionTypes/actionTypes.js";

const initialState = {
  activeColor: {
    _id: "noId",
    name: "no color selected",
    hex: "#ffffff",
    isDelete: false,
  },
  colorsList: {},
  count: 0,
};

export function colors(state = initialState, action) {
  switch (action.type) {
    case actionType.ACTIVE_COLOR:
      return {
        ...state, // used spread operator to make a copy of preStates and so the preStates remain same when changing the specific action.
        activeColor: action.payload,
      };

    case actionType.COLORS_LIST:
      return {
        ...state,
        colorsList: action.payload,
      };

    case actionType.COUNT:
      return {
        ...state,
        count: action.payload,
      };

    default:
      return state;
  }
}
