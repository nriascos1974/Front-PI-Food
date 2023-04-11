import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();

  function handleInputChange(e) {
    dispatch(actions.getRecipesName(e.target.value));
  }

  return (
    <div>
      <input
        id="inputSearch"
        className={styles.inputSearch}
        type="text"
        placeholder="Search for a recipe "
        onChange={handleInputChange}
      />
    </div>
  );
}
