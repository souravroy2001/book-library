import { combineReducers } from "redux";
import { bookReducer } from "./bookReducer";
import { fetchBookReducer } from "./fetchBookReducer";
import { themeReducer } from "./themeReducer";

export const rootReducer = combineReducers({
  book: bookReducer,
  fetchBook: fetchBookReducer,
  theme: themeReducer,
});
