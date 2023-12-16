import * as actionType from "../actionTypes/actionTypes";

export const activeColor = (activeColor) => {
  return {
    type: actionType.ACTIVE_COLOR,
    payload: activeColor,
  };
};

// export const colors = (colors) => {
//   return {
//     type: actionType.COLORS,
//     payload: [colors],
//   };
// };
