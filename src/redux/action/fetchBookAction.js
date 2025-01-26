import axios from "axios";
import {
  GET_BOOKS_FAILURE,
  GET_BOOKS_REQUEST,
  GET_BOOKS_SUCCESS,
} from "../actionType/bookActionType";
import { toaster } from "@/components/ui/toaster";

function getBooksRequest() {
  return {
    type: GET_BOOKS_REQUEST,
  };
}

function getBooksSuccess(books) {
  return {
    type: GET_BOOKS_SUCCESS,
    payload: books,
  };
}

function getBooksFailure(error) {
  return {
    type: GET_BOOKS_FAILURE,
    payload: error,
  };
}

function fetchBook(id) {
  const url = id
    ? `https://evaluation-unit-04-sprint-02-default-rtdb.asia-southeast1.firebasedatabase.app/books/${id}.json`
    : "https://evaluation-unit-04-sprint-02-default-rtdb.asia-southeast1.firebasedatabase.app/books.json";
  return async (dispatch) => {
    dispatch(getBooksRequest());
    try {
      const response = await axios.get(url);
      const data = await response.data;
      dispatch(getBooksSuccess(data));
    } catch (error) {
      dispatch(getBooksFailure(error.message));
    }
  };
}

export const showFetchSuccessToaster = () => {
    toaster.create({
      title: "Data Fetched",
      description: "Data has been successfully retrieved.",
      type: "success",
        meta: {
          closable: true,
        },
    });
  };

export { getBooksRequest, getBooksSuccess, getBooksFailure, fetchBook };
