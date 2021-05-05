import { GET_COCKTAILS, GET_DRINKS_LOADING, GET_DRINKS_ERROR } from "./types";
import axios from "axios";

export const clearCocktails = () => ({
  type: "CLEAR_COCKTAILS",
});

export const getCocktails = (search) => {
  return (dispatch) => {
    dispatch({ type: GET_DRINKS_LOADING });
    axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
      .then(({ data }) => {
        dispatch({
          type: GET_COCKTAILS,
          payload: data.drinks,
        });
      })
      .catch(() => {
        dispatch({ type: GET_DRINKS_ERROR });
      });
  };
};
