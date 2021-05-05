export const getCocktails = (cocktails) => ({
  type: "GET_COCKTAILS",
  payload: cocktails,
});

export const clearCocktails = () => ({
  type: "CLEAR_COCKTAILS",
});
