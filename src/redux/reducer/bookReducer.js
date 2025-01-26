import {
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
  EDIT_BOOK,
  READING_STATUS,
  REMOVE_BOOK,
} from "../actionType/bookActionType";

export const initialState = { books: [], loading: false, error: null };

export const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK_REQUEST:
      return { ...state, loading: true };

    case ADD_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        books: [...state.books, action.payload],
      };

    case ADD_BOOK_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case REMOVE_BOOK:
      return {
        ...state,
        loading: false,
        books: state.books.filter((book) => book.id !== action.payload),
      };

    case EDIT_BOOK:
      return {
        ...state,
        loading: false,
        books: state.books.map((book) =>
          book.id === action.payload.id ? book : action.payload
        ),
      };

    case READING_STATUS:
      return {
        ...state,
        loading: false,
        books: state.books.map((book) =>
          book.id === action.payload ? book.readingStatus : true
        ),
      };
    default:
      return state;
  }
};
