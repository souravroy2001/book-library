import {
  GET_BOOKS_FAILURE,
  GET_BOOKS_REQUEST,
  GET_BOOKS_SUCCESS,
} from "../actionType/bookActionType";

export const initialState = { books: [], loading: false, error: null };

export const fetchBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS_REQUEST:
      return { ...state, loading: true };
    case GET_BOOKS_SUCCESS:
      return { ...state, loading: false, books: action.payload };
    case GET_BOOKS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
