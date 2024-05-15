import { combineReducers } from "redux";

import user from "./user";
import book from "./books";

export default combineReducers({
  user,
  book,
});
