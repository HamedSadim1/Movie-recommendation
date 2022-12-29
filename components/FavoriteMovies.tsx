import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import {
  getMovieDetails,
  Detail,
  Result,
} from "../components/services/IMovieData";
import { Data } from "./services/IMovieData";

const FavoriteMovies = () => {
  const { getItem } = useAsyncStorage("favorite");
  const [value, setValue] = useState<string[]>([]);

  const readItemFromStorage = async () => {
    try {
      //! get items from Storage
      const item = await getItem();
      //! if the item is not null, parse it and set it in the state
      if (item) {
        setValue(JSON.parse(item));
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  readItemFromStorage();

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          data={value}
          renderItem={({ item }) => (
            <Image
              resizeMode="cover"
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item}`,
              }}
              style={styles.image}
            />
          )}
          keyExtractor={(item) => item}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default FavoriteMovies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  list: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  image: {
    height: 280,
    width: 180,
    borderRadius: 20,
    margin: 5,
  },
});
