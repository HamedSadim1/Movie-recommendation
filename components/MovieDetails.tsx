import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Details from "./Details";
import Movie from "./Movie";
import Navbar from "./Navbar";
import Search from "./Search";
const Stack = createNativeStackNavigator();
const MovieDetails = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Movie"
        component={Movie}
        options={{
          headerTransparent: true,
          header: () => <Navbar main={true} />,
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerTransparent: true,
          header: () => <Navbar main={false} />,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerTransparent: true,
          header: () => <Navbar main={false} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
