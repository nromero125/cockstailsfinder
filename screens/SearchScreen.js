import React, { useState } from "react";
import { connect } from "react-redux";
import { SearchBar } from "react-native-elements";
import axios from "axios";
import { Platform, StatusBar } from "react-native";

import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  SafeAreaView,
} from "react-native";
import { bindActionCreators } from "redux";
import { getCocktails, clearCocktails } from "../actions/cocktailsActions";
import { Text } from "react-native";
import PropTypes from "prop-types";

const SearchScreen = (props) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const searchCocktails = async () => {
    if (search.length >= 3) {
      setLoading(true);
      await axios
        .get(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`
        )
        .then(({ data }) => {
          props.getCocktails(data.drinks);
          setLoading(false);
        });
    }
  };

  const onChange = (e) => {
    searchCocktails();
  };

  const clear = () => {
    props.clearCocktails();
    setSearch("");
  };

  const DrinksItem = ({ title, image_url }) => (
    <View style={styles.container}>
      <Image source={{ uri: image_url }} style={styles.photo} />
      <View style={styles.container_text}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;

    return (
      <View style={styles.footer}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <SearchBar
        placeholder="Search your favorite cocktail"
        lightTheme={true}
        onChangeText={setSearch}
        onChange={onChange}
        value={search}
        autoFocus={true}
        onClear={clear}
        onCancel={clear}
        showCancel={true}
        platform={Platform.OS === "android" ? "android" : "ios"}
      />
      {loading && <ActivityIndicator color="#0000ff" animating size="large" />}
      {props.cocktails.cocktails && (
        <FlatList
          data={props.cocktails.cocktails}
          renderItem={({ item }) => (
            <DrinksItem title={item.strDrink} image_url={item.strDrinkThumb} />
          )}
          keyExtractor={(item, index) => String(index)}
          ListFooterComponent={renderFooter}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#f03265",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: "#FFF",
    elevation: 2,
    height: 80,
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE",
  },
  title: {
    fontSize: 18,
    color: "#000",
  },
  container_text: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 12,
    justifyContent: "center",
  },

  photo: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});

const mapStateToProps = (state) => {
  return { cocktails: state.cocktails };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCocktails,
      clearCocktails,
    },
    dispatch
  );

SearchScreen.propTypes = {
  cocktails: PropTypes.object,
  loading: PropTypes.bool,
  search: PropTypes.string,
  getCocktails: PropTypes.func,
  clearCocktails: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
