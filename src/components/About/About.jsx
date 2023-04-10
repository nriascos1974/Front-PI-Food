import React from "react";
import yo from "../../images/yo.png";
import git from "../../images/icon-git.png";
import ig from "../../images/icon-ig.png";
import linkin from "../../images/icon-in.png";
import styles from "./About.module.css";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className={styles.detailContainer}>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <p style={{ width: "50%", textAlign: "justify" }}>
            Ingeniero de Sistemas, proximamente Desarrollador Fullstack
            (SoyHenry), vivo en la ciudad de Medellín, Antioquia - Colombia.
            <br />
            <br />
            <li>
              <a
                href="https://www.linkedin.com/in/nestor-j-riascos-m-37b58622a/"
                target=""
              >
                <img className={styles.git} src={linkin} alt="linkin" />
              </a>
            </li>
            <li>
              <a href="https://github.com/nriascos1974" target="">
                <img className={styles.git} src={git} alt="git" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/nestor_riascos/"
                target=""
              >
                <img className={styles.git} src={ig} alt="ig" />
              </a>
            </li>
          </p>
          <p style={{ width: "50%", textAlign: "center" }}>
            Desarrollo realizado aplicando los conocimientos adquiridos durante
            el Bootcamp <strong>SoyHenry</strong>.
            <br />
            <br />
            Esta aplicación ha sido desarrorrada con:
            <ul>
              <li>
                <strong>* FrontEnd *</strong>
              </li>
              <li>React</li>
              <li>React-Redux</li>
              <li>CSS3</li>
              <li>
                <strong>* BackEnd *</strong>
              </li>
              <li>NodeJs</li>
              <li>ExpressJs</li>
              <li>
                <strong>* Base de Datos *</strong>
              </li>
              <li>PostgreSql</li>
              <li>Sequelize</li>
            </ul>
          </p>
        </div>
        <div>
          <h1 style={{ fontSize: "30px" }}>Nestor Jair Riasco Mosquera</h1>
          <img
            className={styles.image}
            src={yo}
            alt="Nestor Jair Riasco Mosquera"
          ></img>
        </div>
        <Link
          to="/home"
          className={styles.btn}
          style={{ textDecoration: "none" }}
        >
          Back
        </Link>
      </div>
    </div>
  );
}

export default About;
