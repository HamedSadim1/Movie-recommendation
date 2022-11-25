import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState, FC } from "react";
import VideoPlay from "./VideoPlay";

const Home = () => {
  return <View style={styles.container}></View>;
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});
