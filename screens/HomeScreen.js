import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { Platform, StatusBar } from "react-native";

import { SearchBar } from "react-native-elements";
import { Text } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/cocktail.png")}
        />
        <Text>
          <Text style={styles.fontBold}>Cocktail</Text>{" "}
          <Text style={styles.font}>Finder</Text>
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
        <SearchBar
          pointerEvents="none"
          platform={Platform.OS === "android" ? "android" : "ios"}
          style={styles.searchBar}
          placeholder="Search your favorite cocktail"
          lightTheme={true}
          onFocus={() => navigation.navigate("SearchScreen")}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    backgroundColor: "#f03265",
    height: "100%",
  },
  fontBold: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  font: {
    fontSize: 24,
    color: "#fff",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});

const mapStateToProps = (state) => {
  const { cocktails } = state;
  return { cocktails };
};

export default connect(mapStateToProps)(HomeScreen);
