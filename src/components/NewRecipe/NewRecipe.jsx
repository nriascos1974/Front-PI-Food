import React, { useState, useEffect, useRef } from "react";
import * as actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./NewRecipe.module.css";
import { Link, useNavigate } from "react-router-dom";

//*Funcion para validar los inputs que reciben informacion del usuario
function validate(recipe) {
  const errors = {};

  const regularExpression = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  const regExpUrl = /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/;
  if (!recipe.title.trim())
    errors.title = "Please put the title of the recipe!";
  if (!regularExpression.test(recipe.title.trim()))
    errors.title = "Title field only accepts letters and blank spaces!";
  if (!recipe.summary.trim())
    errors.summary = "Please put the summary of the recipe!";
  if (!regExpUrl.test(recipe.image.trim()))
    errors.image = "Must be an image URL";
  if (!recipe.image.trim()) errors.image = "Please put the image URL";
  if (!regExpUrl.test(recipe.image.trim()))
    errors.image = "Must be an image URL";
  return errors;
}

function NewRecipe() {
  const formRef = useRef(null); //*Hook para referencia el form
  const dispatch = useDispatch();
  const allDiets = useSelector((state) => state.typeDiets);
  const navigate = useNavigate();
  const [stepDescription, setStepDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [recipe, setRecipe] = useState({
    title: "",
    summary: "",
    healthScore: 50,
    image: "",
    steps: [],
    diets: [],
    numSteps: 0,
  });

  //*cuando se renderiza el formulario cargo los tipos de dietas ejecutando la actions
  useEffect(() => {
    dispatch(actions.getDiets());
  }, [dispatch]);

  //*Funcion Handler que captura la informacion de los input y a la vez realiza las validaciones
  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...recipe,
        [e.target.name]: e.target.value,
      })
    );
  };

  //* Funcion handler para capturar los tipos de dieta que son chequeadas
  const changeHandler = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setRecipe({ ...recipe, diets: [...recipe.diets, value] });
    } else {
      setRecipe({
        ...recipe,
        diets: recipe.diets.filter((x) => x !== value),
      });
    }
  };

  //*Funcion Handler que realiza el envio de la informacion una vez validada o se revalida de que este completa el formnulario
  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(recipe));

    if (
      recipe.title &&
      recipe.summary &&
      recipe.image &&
      recipe.diets.length &&
      recipe.steps.length &&
      !Object.keys(errors).length
    ) {
      dispatch(actions.addRecipe(recipe)).then(() => {
        navigate(`/detail`);
      });

      setRecipe({
        title: "",
        summary: "",
        healthScore: 50,
        image: "",
        steps: [],
        diets: [],
        numSteps: 0,
      });
      formRef.current.reset();
    } else {
      alert("All fields are required");
    }
  };

  const handleDelete = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    setRecipe({
      ...recipe,
      steps: [],
    });
  };

  function handleChangeStep(e) {
    setStepDescription(e.target.value);
  }

  function handleStep(e) {
    e.preventDefault();
    if (stepDescription !== "") {
      setRecipe({
        ...recipe,
        numSteps: recipe.numSteps + 1,
        steps: [
          ...recipe.steps,
          { number: recipe.numSteps + 1, step: stepDescription },
        ],
      });
      setStepDescription("");
    } else {
      alert("please put a step");
    }
  }

  return (
    <div className={styles.formSection}>
      <div className={styles.overlay} />

      <div className={styles.title}>
        <h2>New Recipe</h2>
      </div>

      <div className={styles.formContainer}>
        <form
          onSubmit={handleSubmit}
          className={styles.formulario}
          ref={formRef}
        >
          <Link
            to="/home"
            className={styles.btn}
            style={{ textDecoration: "none" }}
          >
            Back
          </Link>
          <div className={styles.imgContainer}>
            <img src={recipe.image} alt="" />
          </div>
          <div className={styles.inputName}>
            <label className={styles.inputTitle}>Title</label>
            <input
              className={errors.title ? styles.errorInput : styles.input}
              type="text"
              value={recipe.title}
              name="title"
              onChange={handleChange}
            />
            {errors.title && (
              <span className={styles.errorText}>{errors.title}</span>
            )}
          </div>
          <div className={styles.inputResumen}>
            <label className={styles.inputTitle}>Summary</label>
            <textarea
              className={
                errors.summary ? styles.errorTextarea : styles.textarea
              }
              type="text"
              value={recipe.summary}
              name="summary"
              maxLength="1000"
              onChange={handleChange}
            />
            {errors.summary && (
              <span className={styles.errorText}>{errors.summary}</span>
            )}
          </div>
          <div className={styles.inputName}>
            <label className={styles.inputTitle}>Health Score</label>
            <input
              type="range"
              min="0"
              max="100"
              value={recipe.healthScore}
              name="healthScore"
              onChange={handleChange}
            />
            <output id="rangevalue">{recipe.healthScore}</output>
          </div>
          <div className={styles.inputName}>
            <label className={styles.inputTitle}>Image</label>
            <input
              className={errors.image ? styles.errorInput : styles.input}
              type="url"
              value={recipe.image}
              name="image"
              onChange={handleChange}
            />
            {errors.image && (
              <span className={styles.errorText}>{errors.image}</span>
            )}
          </div>
          <div className={styles.inputResumen}>
            <label className={styles.inputTitle}>Step by step</label>
            <textarea
              className={styles.textareaSteps}
              type="text"
              name="steps"
              maxLength="500"
              value={stepDescription}
              onChange={handleChangeStep}
            />
            <div className={styles.btnContainer}>
              <button onClick={handleStep} className={styles.btnx}>
                Add
              </button>
              <button className={styles.btnx} onClick={handleDelete}>
                Clean
              </button>
            </div>
            <ul>
              {recipe.steps.map((e, idx) => {
                return (
                  <p key={idx} className={styles.listSteps}>
                    {e.number} : {e.step}
                  </p>
                );
              })}
            </ul>
          </div>
          <div className={styles.inputDietas}>
            <label className={styles.inputTitle}>Type Diets</label>
            {allDiets.map((x) => {
              return (
                <div key={x.id}>
                  <label htmlFor="">
                    <input
                      className={styles.inputCheck}
                      type="checkbox"
                      onChange={changeHandler}
                      name="diets"
                      value={x.name}
                    />
                    {x.name}
                  </label>
                </div>
              );
            })}
          </div>

          <button type="submit" className={styles.buttonForm}>
            Create Recipe
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewRecipe;
