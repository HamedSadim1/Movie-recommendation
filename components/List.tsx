import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { FC } from "react";
import { Data, Result } from "./services/IMovieData";
import ListItem from "./ListItem";

interface IMovieProps {
  title: string;
  Movies: Data;
}

const List: FC<IMovieProps> = ({ title, Movies }) => {
  const { results } = Movies;
  return (
    <View>
      <Text style={styles.text}>{title}</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ListItem result={item} />}
        style={styles.list}
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        legacyImplementation={false}
        scrollEnabled={true}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    paddingBottom: 5,
  },
  list: {
    marginTop: 5,
  },
});
