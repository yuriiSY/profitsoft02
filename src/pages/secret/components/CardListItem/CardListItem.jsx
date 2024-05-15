import { useState } from "react";
import css from "./CardListItem.module.css";
import Card from "components/Card/Card";
import CardTitle from "components/CardTitle";
import IconButton from "components/IconButton";
import Close from "components/icons/Close";
import { Link } from "react-router-dom";

const CardListItem = ({ id, item, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <Link key={id} to={`/details/${item.id}`}>
      <li
        className={css.card}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card>
          <CardTitle>{item.title}</CardTitle>
          {isHovered && (
            <div className={css.button}>
              <IconButton onClick={handleDeleteClick}>
                <Close />
              </IconButton>
            </div>
          )}
        </Card>
      </li>
    </Link>
  );
};

export default CardListItem;
