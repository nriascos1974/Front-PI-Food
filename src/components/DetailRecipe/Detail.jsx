import React, { useEffect, useState } from "react";
import styles from "./Detail.module.css";
import loading from "../../images/loading.gif";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function Detail() {
  const { detailId } = useParams();
  const [recipeDetail, setRecipeDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(`/recipes/${detailId}`);
      const recipeDet = response.data;
      setRecipeDetail(recipeDet);
      setIsLoading(false);
    }
    fetchData();
  }, [detailId]);

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
            <h2>{recipeDetail.title}</h2>
          </div>

          <div className={styles.recipeDetail}>
            <div>
              <div className={styles.infoContainer}>
                <div className={styles.diets}>
                  <p id={styles.diets}>
                    {recipeDetail.diets &&
                      recipeDetail.diets.map((diet, ind) => (
                        <span key={ind} className={styles.span}>
                          {diet.name}
                        </span>
                      ))}
                  </p>
                </div>
                <p>ID: {recipeDetail.id}</p>
                <p>
                  {recipeDetail.summary &&
                    removerCaracteres(recipeDetail.summary)}
                </p>
                <p>Health Score: {recipeDetail.healthScore}</p>
              </div>
              <div className={styles.img}>
                <img src={recipeDetail.image} alt="" />
              </div>
            </div>
            <h2>Steps:</h2>
            <div className={styles.listSteps}>
              <ul>
                {recipeDetail.steps &&
                  recipeDetail.steps.map((x, index) => (
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
