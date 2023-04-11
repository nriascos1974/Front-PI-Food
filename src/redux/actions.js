import {
  ADD_RECIPE,
  FILTER_TYPE_DIET,
  FILTER_ORGIN,
  ORDERBY,
  GET_RECIPES,
  GET_RECIPES_DETAIL,
  SET_RECIPE_CLEAN,
  GET_RECIPES_NAME,
  GET_DIETS,
  RESET_FILTER,
} from "./type-actions";
import axios from "axios";

export const addRecipe = (recipe) => {
  return async (dispatch) => {
    const response = await axios.post("/recipes", recipe);
    return dispatch({
      type: ADD_RECIPE,
      payload: response.data,
    });
  };
};

export const getDiets = () => {
  return async (dispatch) => {
    const response = await axios(`/diets`);
    return dispatch({
      type: GET_DIETS,
      payload: response.data,
    });
  };
};

export const getRecipes = () => {
  return async (dispatch) => {
    const response = await axios(`/recipes`);
    return dispatch({
      type: GET_RECIPES,
      payload: response.data,
    });
  };
};

export const getRecipeDetail = (detailId) => {
  return async (dispatch) => {
    const response = await axios(`/recipes/${detailId}`);
    return dispatch({
      type: GET_RECIPES_DETAIL,
      payload: response.data,
    });
  };
};

export const getRecipesName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios(
        `/recipes?name=${name}`
      );
      return dispatch({
        type: GET_RECIPES_NAME,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: SET_RECIPE_CLEAN,
      });
    }
  };
};

export const orderCards = (order) => {
  return {
    type: ORDERBY,
    payload: order,
  };
};

export const filterOrigin = (origin) => {
  return {
    type: FILTER_ORGIN,
    payload: origin,
  };
};

export const filterTypeDiet = (typediet) => {
  return {
    type: FILTER_TYPE_DIET,
    payload: typediet,
  };
};
export const filterReset = () => {
  return {
    type: RESET_FILTER,
  };
};
