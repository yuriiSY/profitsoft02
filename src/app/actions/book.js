import {
  FETCH_BOOKS_LOADING,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_ERROR,
  DELETE_BOOKS_ERROR,
  DELETE_BOOKS_SUCCESS,
  DELETE_BOOKS_LOADING,
  ADD_BOOKS_LOADING,
  ADD_BOOKS_ERROR,
  ADD_BOOKS_SUCCESS,
  FETCH_BOOK_ERROR,
  FETCH_BOOK_LOADING,
  FETCH_BOOK_SUCCESS,
  UPDATE_BOOK_ERROR,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_LOADING,
  SET_FILTER,
} from "app/constants/actionTypes";
import axios from "axios";

const bookInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const setFilter = (payload) => {
  return {
    type: SET_FILTER,
    payload,
  };
};

const addBooksLoading = () => {
  return {
    type: ADD_BOOKS_LOADING,
  };
};
const addBooksSuccess = (payload) => {
  return {
    type: ADD_BOOKS_SUCCESS,
    payload,
  };
};
const addBooksError = (payload) => {
  return {
    type: ADD_BOOKS_ERROR,
    payload,
  };
};
//fetch books
const fetchBooksLoading = () => {
  return {
    type: FETCH_BOOKS_LOADING,
  };
};
const fetchBooksSuccess = (payload) => {
  return {
    type: FETCH_BOOKS_SUCCESS,
    payload,
  };
};
const fetchBooksError = (payload) => {
  return {
    type: FETCH_BOOKS_ERROR,
    payload,
  };
};
//fetch book
const fetchBookLoading = () => {
  return {
    type: FETCH_BOOK_LOADING,
  };
};
const fetchBookSuccess = (payload) => {
  return {
    type: FETCH_BOOK_SUCCESS,
    payload,
  };
};
const fetchBookError = (payload) => {
  return {
    type: FETCH_BOOK_ERROR,
    payload,
  };
};

const deleteBooksLoading = () => {
  return {
    type: DELETE_BOOKS_LOADING,
  };
};
const deleteBooksSuccess = (payload) => {
  return {
    type: DELETE_BOOKS_SUCCESS,
    payload,
  };
};
const deleteBooksError = (payload) => {
  return {
    type: DELETE_BOOKS_ERROR,
    payload,
  };
};

const updateBooksLoading = () => {
  return {
    type: UPDATE_BOOK_LOADING,
  };
};
const updateBooksSuccess = (payload) => {
  return {
    type: UPDATE_BOOK_SUCCESS,
    payload,
  };
};
const updateBooksError = (payload) => {
  return {
    type: UPDATE_BOOK_ERROR,
    payload,
  };
};

export const deleteBooks = (id) => async (dispatch) => {
  try {
    dispatch(deleteBooksLoading());
    await bookInstance.delete(`/books/${id}`);
    dispatch(deleteBooksSuccess(id));
  } catch (e) {
    dispatch(deleteBooksError(e.message));
  }
};

export const fetchBook = (id) => async (dispatch) => {
  try {
    dispatch(fetchBookLoading());
    const response = await bookInstance.get(`/books/${id}`);
    dispatch(fetchBookSuccess(response.data));
  } catch (e) {
    dispatch(fetchBookError(e.message));
  }
};

// export const fetchBooks = () => async (dispatch) => {
//   try {
//     dispatch(fetchBooksLoading);
//     const response = await bookInstance.get("/books");
//     dispatch(fetchBooksSuccess(response.data));
//   } catch (e) {
//     dispatch(fetchBooksError(e.message));
//   }
// };

export const addBook = (body) => async (dispatch) => {
  try {
    dispatch(addBooksLoading());
    const response = await bookInstance.post("/books", body);
    dispatch(addBooksSuccess(response.data));
  } catch (e) {
    dispatch(addBooksError(e.message));
  }
};

export const updateBook = (id, body) => async (dispatch) => {
  try {
    dispatch(updateBooksLoading());
    const response = await bookInstance.put(`/books/${id}`, body);
    dispatch(updateBooksSuccess(response.data));
  } catch (e) {
    dispatch(updateBooksError(e.message));
  }
};

export const fetchBooksFiltered = (filter) => async (dispatch) => {
  try {
    dispatch(fetchBooksLoading());
    const response = await bookInstance.get("/books", {
      params: { filter },
    });
    dispatch(fetchBooksSuccess(response.data));
  } catch (e) {
    dispatch(dispatch(fetchBooksError(e.message)));
  }
};
