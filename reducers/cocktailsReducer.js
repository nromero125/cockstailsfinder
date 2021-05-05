import { combineReducers } from "redux";
import {
  CLEAR_COCKTAILS,
  GET_COCKTAILS,
  GET_DRINKS_ERROR,
  GET_DRINKS_LOADING,
} from "../actions/types";

const INITIAL_STATE = {
  cocktails: [],
  loading: false,
  error: "",
};

const cocktailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_COCKTAILS:
      return {
        ...state,
        cocktails: action.payload,
        loading: false,
      };
    case GET_DRINKS_LOADING:
      return { ...state, loading: true };
    case GET_DRINKS_ERROR:
      return {
        ...state,
        loading: false,
        error: "Oops something is wrong!",
        cocktails: [],
      };
    case CLEAR_COCKTAILS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default combineReducers({
  cocktails: cocktailsReducer,
});
