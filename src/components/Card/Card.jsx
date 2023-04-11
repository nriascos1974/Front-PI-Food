import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";

function Card({ id, title, image, diets, healthScore }) {
  const dispatch = useDispatch();

  const handlerClick = (idRecipe) => {
    console.log(idRecipe);
    dispatch(actions.getRecipeDetail(idRecipe));
  };

  return (
    <Link
      to={`/detail`}
      onClick={() => handlerClick(id)}
      style={{ textDecoration: "none" }}
    >
      <div className={styles.recipes}>
        <div>
          <img src={image} alt="" />
        </div>
        <div className={styles.info}>
          <h2>{title}</h2>
          <p>Health Score: {healthScore}</p>
          <div className={styles.diets}>
            <p id={styles.diets}>
              {diets?.map((diet) => (
                <span className={styles.span}>{diet.name}</span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
