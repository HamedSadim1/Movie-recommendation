import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Details from "./Details";
import Movie from "./Movie";
const Stack = createNativeStackNavigator();
const MovieDetails = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Movie" component={Movie} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
