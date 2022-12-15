import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";

const FavoriteMovies = () => {
  const { getItem } = useAsyncStorage("favorite");

  const [value, setValue] = useState<string[]>([]);
  const readItemFromStorage = async () => {
    try {
      const item = await getItem();
      if (item) {
        setValue(JSON.parse(item));
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    readItemFromStorage();
  }, [getItem]);

  return (
    <View style={styles.container}>
      <Text>Favorite Movies</Text>
      {value.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
    </View>
  );
};

export default FavoriteMovies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
