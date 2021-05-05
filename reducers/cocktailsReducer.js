import { combineReducers } from "redux";

const INITIAL_STATE = {
  cocktails: [],
};

const cocktailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_COCKTAILS":
      return {
        ...state,
        cocktails: action.payload,
      };
    case "CLEAR_COCKTAILS":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default combineReducers({
  cocktails: cocktailsReducer,
});
