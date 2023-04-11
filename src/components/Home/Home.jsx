import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import loading from "../../images/loading.gif";
import * as actions from "../../redux/actions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";

function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;
  const pageCount = Math.ceil(allRecipes.length / pageSize);
  const indexOfLastRecipe = currentPage * pageSize; //en un principio sera 9
  const indexOfFirstRecipe = indexOfLastRecipe - pageSize;
  const currentRecipe = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe); //te divide un array dependiendo lo que este pasando por parametro

  function handlePageClick(page) {
    setCurrentPage(page);
   }

  useEffect(() => {
    dispatch(actions.getRecipes()).then(() => setIsLoading(false));
  }, [dispatch]);

  function handleClick(e) {
    //para resetear las recetas
    e.preventDefault(); //para que no se rompa
    dispatch(actions.filterReset());
    setCurrentPage(1);
    document.getElementById("orderByName").selectedIndex = 0;
    document.getElementById("orderByHealth").selectedIndex = 0;
    document.getElementById("filteredByDiets").selectedIndex = 0;
    document.getElementById("filteredCreated").selectedIndex = 0;
  }

  function handlerFilteredByDiets(e) {
    e.preventDefault();
    dispatch(actions.filterTypeDiet(e.target.value)); //tomara lo que clickea el usuario
    setCurrentPage(1);
    document.getElementById("filteredCreated").selectedIndex = 0;
  }

  function handlerFilteredCreated(e) {
    e.preventDefault();
    dispatch(actions.filterOrigin(e.target.value)); //recordar esto es el payload lo del select
    document.getElementById("filteredByDiets").selectedIndex = 0;
    setCurrentPage(1);
  }

  function HandlerOrderByName(e) {
    e.preventDefault();
    dispatch(actions.orderCards(e.target.value));
    setCurrentPage(1);
  }

  function HandlerOrderByHealth(e) {
    e.preventDefault();
    dispatch(actions.orderCards(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div className={styles.background}>
      <nav className={styles.Nav}>
        <div className={styles.navLink}>
          <div className={styles.linkHome}>
            <Link
              to="/recipe"
              className={({ isActive }) =>
                isActive ? styles.active : styles.disable
              }
            >
              <button id="buttonCreate" className={styles.btn}>
                Create Recipe{" "}
              </button>
            </Link>

            <Link
              to="/About"
              className={({ isActive }) =>
                isActive ? styles.active : styles.disable
              }
            >
              <button id="buttonAbout" className={styles.btn}>
                About
              </button>
            </Link>

            <Link
              to="/"
              className={({ isActive }) =>
                isActive ? styles.active : styles.disable
              }
            >
              <button id="buttonLogout" className={styles.btn}>
                Logout
              </button>
            </Link>
            <SearchBar />
          </div>

          <div>
            <div>
              <button
                onClick={(e) => {
                  handleClick(e);
                }}
                className={styles.btn}
              >
                Reset Filters
              </button>
            </div>
            <div className={styles.selectsContainer}>
              <select
                id="orderByName"
                onChange={(e) => HandlerOrderByName(e)}
                className={styles.input}
              >
                <option disabled >Order by Title</option>
                <option value="a-z">Title (A-Z)</option>
                <option value="z-a">Title (Z-A)</option>
              </select>

              <select
                id="orderByHealth"
                onChange={(e) => HandlerOrderByHealth(e)}
                className={styles.input}
              >
                <option disabled>Order by Health Score</option>
                <option value="1-9">Ascending Health Score</option>
                <option value="9-1">Descending Health Score</option>
              </select>

              <select
                id="filteredByDiets"
                onChange={(e) => handlerFilteredByDiets(e)}
                className={styles.input}
              >
                <option disabled>Filter by Type Diet</option>
                <option value="All">(All Recipes)</option>
                <option value="gluten free">Gluten free</option>
                <option value='dairy free"'>Dairy free</option>
                <option value="ketogenic">Ketogenic</option>
                <option value="lacto ovo vegetarian">
                  Lacto ovo vegetarian
                </option>
                <option value="vegan">Vegan</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="paleolithic">Paleolithic</option>
                <option value="primal">Primal</option>
                <option value="fodmap friendly">Fodmap friendly</option>
                <option value="whole 30">Whole 30</option>
              </select>

              <select
                id="filteredCreated"
                onChange={(e) => handlerFilteredCreated(e)}
                className={styles.input}
              >
                <option disabled >Filter by Origin</option>
                <option value="All">(All)</option>
                <option value="Db">Created</option>
                <option value="Api">API</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      {allRecipes.length ? (
        <div className={styles.pageBtnContainer}>
          {currentPage > 1 && (
            <button
              onClick={() => handlePageClick(currentPage - 1)}
              className={styles.btnPage}
            >
              {"<"}
            </button>
          )}

          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              className={`${currentPage === index + 1 ? styles.btnPageActive : styles.btnPage}`}
            >
              {index + 1}
            </button>
          ))}

          {currentPage < pageCount && (
            <button
              onClick={() => handlePageClick(currentPage + 1)}
              className={styles.btnPage}
            >
              {" "}
              {">"}{" "}
            </button>
          )}
        </div>
      ) : null}

      {isLoading ? (
        <div className={styles.loading}>
          <img src={loading} alt="Loading..." />
        </div>
      ) : (
        <div className={styles.recipesContainer}>
          {allRecipes.length ? (
            currentRecipe.map((rec, ind) => (
              <Card
                image={rec.image}
                title={rec.title}
                diets={rec.diets}
                healthScore={rec.healthScore}
                id={rec.id}
                key={ind}
              />
            ))
          ) : (
            <h2 className={styles.noHayTarjetas}>
              No hay <br />
              Delicias Culinarias
            </h2>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
