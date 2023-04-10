import {
  ADD_RECIPE,
  FILTER_TYPE_DIET,
  FILTER_ORGIN,
  ORDERBY,
  GET_RECIPES,
  GET_RECIPES_NAME,
  GET_DIETS,
  RESET_FILTER,
} from "./type-actions";

const initialState = {
  recipes: [],
  allRecipes: [],
  typeDiets: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_ORGIN:
      let recipesFilter = [];
      if (action.payload === "All") {
        recipesFilter = state.allRecipes;
      } else if (action.payload === "Db") {
        recipesFilter = state.allRecipes.filter((e) => e.createDb);
      } else if (action.payload === "Api") {
        recipesFilter = state.allRecipes.filter((e) => !e.createDb);
      }

      return {
        ...state,
        recipes: recipesFilter,
      };

    case FILTER_TYPE_DIET:
      const allRecipes = state.allRecipes;
      const dietFilter =
        action.payload === "All"
          ? allRecipes
          : allRecipes.filter((recipe) =>
              recipe.diets.map((r) => r.name).includes(action.payload)
            );

      return {
        ...state,
        recipes: dietFilter,
      };

    case ORDERBY:
      let orderRecipes = [...state.recipes];
      if (action.payload === "a-z") {
        orderRecipes.sort((a, b) => a.title.localeCompare(b.title));
      } else if (action.payload === "z-a") {
        orderRecipes.sort((a, b) => b.title.localeCompare(a.title));
      } else if (action.payload === "1-9") {
        orderRecipes.sort((a, b) => a.healthScore - b.healthScore);
      } else if (action.payload === "9-1") {
        orderRecipes.sort((a, b) => b.healthScore - a.healthScore);
      } else {
        orderRecipes = state.allRecipes;
      }

      return {
        ...state,
        recipes: orderRecipes,
      };

    case GET_RECIPES:

      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case GET_RECIPES_NAME:

      return {
        ...state,
        recipes: action.payload,
      };
    case RESET_FILTER:

      return {
        ...state,
        recipes: state.allRecipes,
      };

    case GET_DIETS:

      return {
        ...state,
        typeDiets: action.payload,
      };

    case ADD_RECIPE:

      return {
        ...state,
        recipes: [...state.recipes, action.payload],
        allRecipes: [...state.allRecipes, action.payload],
      };

    default:

      return { ...state };
  }
};

export default reducer;
