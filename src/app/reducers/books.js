import {
  FETCH_BOOKS_ERROR,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_LOADING,
  DELETE_BOOKS_LOADING,
  DELETE_BOOKS_SUCCESS,
  DELETE_BOOKS_ERROR,
  ADD_BOOKS_ERROR,
  ADD_BOOKS_LOADING,
  ADD_BOOKS_SUCCESS,
  FETCH_BOOK_ERROR,
  FETCH_BOOK_SUCCESS,
  FETCH_BOOK_LOADING,
  UPDATE_BOOK_ERROR,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_LOADING,
  SET_FILTER,
} from "app/constants/actionTypes";

const initialState = {
  books: [],
  isLoading: false,
  error: null,
  selectedBook: null,
  filter: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload,
        isLoading: false,
        error: null,
      };
    case FETCH_BOOKS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case FETCH_BOOK_LOADING:
      return {
        ...state,
        selectedBook: null,
        isLoading: true,
        error: null,
      };
    case FETCH_BOOK_SUCCESS:
      return {
        ...state,
        selectedBook: action.payload,
        isLoading: false,
        error: null,
      };
    case FETCH_BOOK_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case DELETE_BOOKS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case DELETE_BOOKS_SUCCESS:
      return {
        ...state,
        books: state.books.filter(({ id }) => id !== action.payload),
        isLoading: false,
        error: null,
      };
    case DELETE_BOOKS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ADD_BOOKS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ADD_BOOKS_SUCCESS:
      return {
        ...state,
        books: [...state.books, action.payload],
        isLoading: false,
        error: null,
      };
    case ADD_BOOKS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case UPDATE_BOOK_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case UPDATE_BOOK_SUCCESS:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
        selectedBook: action.payload,
        isLoading: false,
        error: null,
      };
    case UPDATE_BOOK_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
