import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { FC, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Data, Result } from "./services/IMovieData";
import axios from "axios";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

const Movie = () => {
  const [moviePopular, setMoviePopular] = useState<Data>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  } as Data);
  const navigation: any = useNavigation();
  const { results } = moviePopular;
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const getMoviePopular = async () => {
    setLoading(true);
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=18f0c1bfe643593733b0a4c124cbae28&language=en-US&page=${page}`
    );
    setMoviePopular(response.data);
    setLoading(false);
  };
  // PostUrl Function Give the source of the Url Image
  const PosterUrl = (source: string) => {
    return `https://image.tmdb.org/t/p/original${source}`;
  };

  useEffect(() => {
    getMoviePopular();
  }, [page]);

  const handleClickPage = () => {
    setPage(page + 1);
  };

  return (
    <View>
      <Text style={styles.title}>Popular Movies</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <View>
              <Pressable
                onPress={() => {
                  navigation.push("Movie", { movie: item.id });
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {item.title}
                </Text>
                <Image
                  source={{ uri: PosterUrl(item.backdrop_path) }}
                  style={styles.image}
                />
              </Pressable>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={() => {
            handleClickPage();
          }}
        />
      )}
    </View>
  );
};

export default Movie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    marginStart: 5,
    marginEnd: 20,
    paddingTop: 15,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "center",
  },
  button: {
    backgroundColor: "blue",
    flex: 1,
    color: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
});
