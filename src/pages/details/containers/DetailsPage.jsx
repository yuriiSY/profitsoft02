import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import css from "./DetailsPage.module.css";
import Notiflix from "notiflix";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBook } from "app/actions/book";
import AddEditBookForm from "../components/AddEditBookForm";

const DetailsPage = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedBook, isLoading, error } = useSelector((state) => state.book);

  const { id } = useParams();
  const [mode, setMode] = useState(id ? "view" : "add");
  const [bookData, setBookData] = useState({});

  useEffect(() => {
    if (id) {
      dispatch(fetchBook(id));
    }
  }, [dispatch, id, mode]);

  useEffect(() => {
    if (mode === "add") {
      setBookData({});
    } else if (selectedBook) {
      setBookData(selectedBook);
    }
  }, [mode, selectedBook]);

  const handleEditMode = () => {
    setMode("edit");
  };

  const handleCancel = () => {
    setMode("view");
  };

  return (
    <div>
      {mode === "add" ? (
        <AddEditBookForm />
      ) : isLoading || !selectedBook ? (
        <div>Loading...</div>
      ) : mode === "view" ? (
        <div>
          <h2>View Mode</h2>
          <div>
            {formatMessage({ id: "title" })}: {bookData.title}
          </div>
          <div>
            {formatMessage({ id: "edit" })}: {bookData.genre}
          </div>
          <div>
            {formatMessage({ id: "year" })}: {bookData.year_published}
          </div>
          <div className={css.buttonWrapper}>
            <button className={css.submitBtn} onClick={handleEditMode}>
              {formatMessage({ id: "edit" })}
            </button>
            <button className={css.optionBtn} onClick={() => navigate(-1)}>
              {formatMessage({ id: "back" })}
            </button>
          </div>
        </div>
      ) : (
        <AddEditBookForm
          onCancel={handleCancel}
          item={bookData}
          action={"Edit"}
        />
      )}
      {error && Notiflix.Notify.failure(`Error: ${error}`)}
    </div>
  );
};

export default DetailsPage;
