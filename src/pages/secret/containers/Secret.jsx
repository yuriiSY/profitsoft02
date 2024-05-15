import { useIntl } from "react-intl";
import css from "./Secret.module.css";
import React from "react";
import Typography from "components/Typography";
import CardList from "../components/CardList/CardList";
import { Link } from "react-router-dom";

function Secret() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Typography>{formatMessage({ id: "title" })}</Typography>
      <Link to="/addBook">
        <button className={css.addBtn}>
          {formatMessage({ id: "button" })}
        </button>
      </Link>
      <CardList />
    </>
  );
}

export default Secret;
