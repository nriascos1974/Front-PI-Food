import React, { useEffect, useState } from "react";
import styles from "./Detail.module.css";
import loading from "../../images/loading.gif";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


export default function Detail() {
  const recipeDet = useSelector((state) => state.newRecipes)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  function removerCaracteres(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    return str.replace(/(<([^>]+)>)/gi, "");
  }

  return (
    <div className={styles.detailSection}>
      {isLoading ? (
        <div className={styles.loading}>
          <img src={loading} alt="Loading..." />
        </div>
      ) : (
        <div>
          <div className={styles.overlay} />
          <div className={styles.title}>
            <h2>{recipeDet.title}</h2>
          </div>

          <div className={styles.recipeDetail}>
            <div>
              <div className={styles.infoContainer}>
                <div className={styles.diets}>
                  <p id={styles.diets}>
                    {recipeDet.diets &&
                      recipeDet.diets.map((diet, ind) => (
                        <span key={ind} className={styles.span}>
                          {diet.name}
                        </span>
                      ))}
                  </p>
                </div>
                <p>ID: {recipeDet.id}</p>
                <p>
                  {recipeDet.summary &&
                    removerCaracteres(recipeDet.summary)}
                </p>
                <p>Health Score: {recipeDet.healthScore}</p>
              </div>
              <div className={styles.img}>
                <img src={recipeDet.image} alt="" />
              </div>
            </div>
            <h2>Steps:</h2>
            <div className={styles.listSteps}>
              <ul>
                {recipeDet.steps &&
                  recipeDet.steps.map((x, index) => (
                    <li key={index}>
                      {x.number}: {x.step}
                    </li>
                  ))}
              </ul>
            </div>
            <Link
              to={"/home"}
              className={styles.button}
              style={{ textDecoration: "none" }}
            >
              Back
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
