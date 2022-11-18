import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState, FC } from "react";
import { Formik } from "formik";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Recommendation Movie App</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});
