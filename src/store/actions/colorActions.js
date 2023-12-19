import * as actionType from "../actionTypes/actionTypes";

export const activeColorAction = (activeColor) => {
  return {
    type: actionType.ACTIVE_COLOR,
    payload: activeColor,
  };
};

export const colorsListAction = (colorsList) => {
  return {
    type: actionType.COLORS_LIST,
    payload: colorsList,
  };
};

export const countAction = (count) => {
  return {
    type: actionType.COUNT,
    payload: count,
  };
};
