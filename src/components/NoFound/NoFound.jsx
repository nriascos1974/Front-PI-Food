import React from "react";
import style from "./NoFound.module.css";

function NoFound() {
  return (
    <div className={style.notfound}>
      <h1 className={style.titulo}>404</h1>
      <h2 className={style.subtitulo}>Page No Found</h2>
    </div>
  );
}

export default NoFound;
