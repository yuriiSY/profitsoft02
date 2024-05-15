import { useIntl } from "react-intl";
import css from "./CardList.module.css";
import CardListItem from "../CardListItem/CardListItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  setFilter,
  fetchBooks,
  deleteBooks,
  fetchBooksFiltered,
} from "app/actions/book";
import PaginationList from "components/PaginationList ";
import Notiflix from "notiflix";

const CardList = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const [filterField, setFilterField] = useState("");
  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(localStorage.getItem("currentPage"), 10) || 1;
  });

  const itemsPerPage = 2;

  const { books, isLoading, error, filter } = useSelector(
    (state) => state.book
  );

  useEffect(() => {
    setFilterField(filter);
    dispatch(fetchBooksFiltered(filter));
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  const onDeleteBook = (id) => {
    dispatch(deleteBooks(id));
    Notiflix.Notify.success(`Book deleted`);
  };

  const handleFilter = () => {
    dispatch(setFilter(filterField));
    dispatch(fetchBooksFiltered(filterField));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(books.length / itemsPerPage);

  const displayedBooks = books.slice(startIndex, endIndex);
  console.log(filter);
  console.log(filterField);
  const elements = displayedBooks.map((item) => {
    return (
      <CardListItem
        onClick={() => onDeleteBook(item.id)}
        key={item.id}
        id={item.id}
        item={item}
      />
    );
  });

  return (
    <>
      <div>
        <input
          type="text"
          value={filterField}
          onChange={(e) => setFilterField(e.target.value)}
          placeholder="Enter filter field"
        />
        <button onClick={handleFilter}>
          {formatMessage({ id: "filter" })}
        </button>
      </div>
      {books.length === 0 && isLoading && <div>Loading...</div>}
      {books.length === 0 && !isLoading && !error && (
        <div className={css.emptyData}>No books found.</div>
      )}
      {books.length > 0 && !isLoading && (
        <>
          <ul className={css.listOfItems}>{elements}</ul>
          <div className={css.pagination}>
            <PaginationList
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
      {error && Notiflix.Notify.failure(`Error: ${error}`)}
    </>
  );
};

export default CardList;
