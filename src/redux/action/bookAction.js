import axios from "axios";
import {
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
  EDIT_BOOK,
  READING_STATUS,
  REMOVE_BOOK,
} from "../actionType/bookActionType";
import { toaster } from "@/components/ui/toaster";

function addBooksRequest() {
  return {
    type: ADD_BOOK_REQUEST,
  };
}

function addBooksSuccess(books) {
  return {
    type: ADD_BOOK_SUCCESS,
    payload: books,
  };
}

function addBooksFailure(error) {
  return {
    type: ADD_BOOK_FAILURE,
    payload: error,
  };
}

function deleteBook(id) {
  return {
    type: REMOVE_BOOK,
    payload: id,
  };
}

function editBook(book) {
  return {
    type: EDIT_BOOK,
    payload: book,
  };
}

function updateReadingStatus(status) {
  return {
    type: READING_STATUS,
    payload: status,
  };
}

function postBook(book) {
  return async (dispatch) => {
    dispatch(addBooksRequest()); // Start loading

    try {
      // Make POST request
      const response = await axios.post(
        "https://evaluation-unit-04-sprint-02-default-rtdb.asia-southeast1.firebasedatabase.app/books.json",
        book
      );
      const data = await response.data;
      if (response.status === 200 || response.status === 201) {
        dispatch(addBooksSuccess(data, book));
      }
    } catch (error) {
      const errorMessage = error.response
        ? `Server responded with ${error.response.status}: ${error.response.data}`
        : `Error: ${error.message}`;

      dispatch(addBooksFailure(errorMessage));
    }
  };
}

function removeBook(id) {
  return async (dispatch) => {
    dispatch(addBooksRequest());
    try {
      await axios.delete(
        `https://evaluation-unit-04-sprint-02-default-rtdb.asia-southeast1.firebasedatabase.app/books/${id}.json`
      );
      dispatch(deleteBook(id));
    } catch (error) {
      dispatch(addBooksFailure(error.message));
    }
  };
}

function updateBook(book, id) {
  return async (dispatch) => {
    dispatch(addBooksRequest());
    try {
      const response = await axios.put(
        `https://evaluation-unit-04-sprint-02-default-rtdb.asia-southeast1.firebasedatabase.app/books/${id}.json`,
        book
      );
      const data = await response.data;
      dispatch(editBook(data));
    } catch (error) {
      dispatch(addBooksFailure(error.message));
    }
  };
}

export const showDeleteBookToaster = (name) => {
  toaster.create({
    title: "Book Removed",
    description: `${name} has been removed from your list.`,
    type: "error",
    meta: {
      closable: true,
    },
  });
};

export const showAddBookToaster = (book) => {
  toaster.create({
    title: "Book Added",
    description: `${book.title} has been added to your library.`,
    type: "success",
    meta: {
      closable: true,
    },
  });
};

export const showUpdateBookToaster = (book) => {
  toaster.create({
    title: "Book Updated",
    description: `${book.title} details have been updated.`,
    type: "success",
    meta: {
      closable: true,
    },
  });
};

export {
  deleteBook,
  editBook,
  updateReadingStatus,
  postBook,
  removeBook,
  updateBook,
};
