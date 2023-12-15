import * as actionType from "../actionTypes/actionTypes.js";

export default function colorReducer(state, action) {
  switch (action.type) {
    case actionType.ACTIVE_COLOR:
      return {
        ...state,
        payload: action.payload,
      };

    // case actionType.COLORS:
    //   return {
    //     ...state,
    //     payload: action.payload,
    //   };

    default:
      return state;
  }
}
