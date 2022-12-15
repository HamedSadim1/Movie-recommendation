import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Alert,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { searchMovie, Data } from "./services/IMovieData";
import ListItem from "./ListItem";
import Icon from "react-native-vector-icons/Ionicons";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<Data>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  } as Data);
  const [loading, setLoading] = useState<boolean>(false);

  const { results } = searchQuery;

  const onSubmit = (text: string) => {
    setLoading(true);
    searchMovie(text)
      .then((data) => {
        setSearchQuery(data);
      })
      .catch((error) => {
        Alert.alert("Error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.searchButton}
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder="Search"
            onEndEditing={() => onSubmit(search)}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{ left: 360, top: 10 }}
        onPress={() => onSubmit(search)}
      >
        <Icon name="search-outline" size={30} color="black" />
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000FF"
          style={styles.loading}
        />
      ) : (
        <View style={styles.movieList}>
          <FlatList
            numColumns={3}
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ListItem result={item} />}
          />
        </View>
      )}
      {searchQuery.total_results === 0 && !loading && (
        <Text style={styles.noResults}>No results found</Text>
      )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 120,
  },
  searchButton: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
    height: 50,
    width: 300,
    padding: 8,
  },
  movieList: {
    paddingTop: 40,
    paddingBottom: 60,
    paddingLeft: 8,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    paddingBottom: 5,
  },
  loading: {
    paddingTop: 50,
  },
  noResults: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    paddingTop: 50,
    textAlign: "center",
  },
});
