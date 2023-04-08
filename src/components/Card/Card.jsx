import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

function Card({ id, title, image, diets, healthScore }) {
  return (
    <Link to={`/detail/${id}`} style={{ textDecoration: 'none' }}>
      <div className={styles.recipes}>
        <div >
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
