import { CHANGE_THEME } from "../actionType/themeActionType";

export const initialState = { theme: true };

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, theme: !state.theme };
    default:
      return state;
  }
};
