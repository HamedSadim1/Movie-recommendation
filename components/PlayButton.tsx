import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

interface PlayButtonProps {
  handlePress: () => void;
}

const PlayButton = ({ handlePress }: PlayButtonProps) => {
  return (
    <View>
      <Pressable style={styles.button} onPress={() => handlePress()}>
        <Icon name="caret-forward-outline" size={30} />
      </Pressable>
    </View>
  );
};

export default PlayButton;

const styles = StyleSheet.create({
  button: {
    alignContent: "center",
    borderRadius: 50,
    width: 50,
    padding: 10,
    backgroundColor: "#4481FC",
  },
});
