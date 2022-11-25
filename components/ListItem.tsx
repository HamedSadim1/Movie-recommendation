import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { FC } from "react";
import { Data, Result } from "./services/IMovieData";
import { useNavigation } from "@react-navigation/native";

interface ListItemProps {
  result: Result;
}

const ListItem = ({ result }: ListItemProps) => {
  const navigation: any = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Details", { movieId: result.id })}
      >
        <Image
          resizeMode="cover"
          source={{
            uri: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
    margin: 5,
  },
  movieName: {
    position: "absolute",
    width: 100,
    top: 10,
    textAlign: "center",
  },
});
