import React from "react";
import foto from "../../images/my.png";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import henry from "../../images/henry.png";

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      <div className={styles.container}>
        <h2>
          Delicias Culinarias <br />
          para todos los paladares
        </h2>
        <div className={styles.developer}>
          <img src={foto} alt="" />
          <span>By Nestor Jair Riasco M.</span>
        </div>
        <p>
          <img src={henry} alt="" />
        </p>
        <Link to="/home" style={{ textDecoration: 'none' }} >
        <button  className={styles.Button}><strong>Go to the main page</strong> </button>
        </Link>
      </div>
    </div>
  );
}
