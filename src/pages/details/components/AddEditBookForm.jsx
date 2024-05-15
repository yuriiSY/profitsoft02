import css from "./AddEditBook.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook, updateBook } from "app/actions/book";
import { useNavigate } from "react-router-dom";
import Notiflix from "notiflix";
import * as Yup from "yup";

const INITIAL_STATE = {
  title: "",
  genre: "",
  year_published: "",
};

const AddEditBookForm = ({
  item = INITIAL_STATE,
  action = "Add",
  onCancel,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [book, setBook] = useState(item);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schema = Yup.object().shape({
      title: Yup.string().required("Title is required"),
      genre: Yup.string().required("Genre is required"),
      year_published: Yup.number()
        .required("Year is required")
        .typeError("Year must be a number")
        .integer("Year must be an integer"),
    });
    try {
      await schema.validate(book, { abortEarly: false });
      if (action === "Add") {
        dispatch(addBook(book));
        Notiflix.Notify.success(`Book ${book.title} added`);
        console.log("data:", book);
      } else {
        dispatch(updateBook(item.id, book));
        Notiflix.Notify.success(`Book updated`);
        onCancel();
        console.log("edit", book);
      }
      reset();
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((e) => {
        newErrors[e.path] = e.message;
      });
      setErrors(newErrors);
    }
  };

  const reset = () => {
    setBook({ ...INITIAL_STATE });
    setErrors({});
  };

  const { title, genre, year_published } = book;

  return (
    <div className={css.formWrapper}>
      <h2>{action} Book</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.inputWrapper}>
          <label className={css.label} htmlFor="title">
            Title:
          </label>
          <input
            className={css.input}
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
          />
          {errors.title && <p className={css.error}>{errors.title}</p>}
        </div>
        <div className={css.inputWrapper}>
          <label className={css.label} htmlFor="year">
            Year:
          </label>
          <input
            className={css.input}
            type="text"
            id="year"
            name="year_published"
            value={year_published}
            onChange={handleChange}
          />
          {errors.year_published && (
            <p className={css.error}>{errors.year_published}</p>
          )}
        </div>
        <div className={css.inputWrapper}>
          <label className={css.label} htmlFor="genre">
            Genre:
          </label>
          <input
            className={css.input}
            type="text"
            id="genre"
            name="genre"
            value={genre}
            onChange={handleChange}
          />
          {errors.genre && <p className={css.error}>{errors.genre}</p>}
        </div>
        <button className={css.submitBtn} type="submit">
          {action}
        </button>
      </form>

      {action === "Add" ? (
        <button className={css.optionBtn} onClick={() => navigate(-1)}>
          Back
        </button>
      ) : (
        <button className={css.optionBtn} onClick={onCancel}>
          Cancel
        </button>
      )}
    </div>
  );
};

export default AddEditBookForm;
