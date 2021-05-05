import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import cocktailsReducer from "./reducers/cocktailsReducer";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import PropTypes from "prop-types";
import ReduxThunk from "redux-thunk";

export default function App() {
  const Stack = createStackNavigator();
  const store = createStore(cocktailsReducer, {}, applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="HomeScreen"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SearchScreen"
            component={SearchScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

App.propTypes = {
  Stack: PropTypes.func,
  store: PropTypes.func,
};
