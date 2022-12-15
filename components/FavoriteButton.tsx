import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

interface PlayButtonProps {
  handlePress: () => void;
}

const FavoriteButton = ({ handlePress }: PlayButtonProps) => {
  return (
    <View>
      <Pressable style={styles.button} onPress={() => handlePress()}>
        <Icon name="favorite" size={30} color="red" />
      </Pressable>
    </View>
  );
};

export default FavoriteButton;
const styles = StyleSheet.create({
  button: {
    alignContent: "center",
    borderRadius: 50,
    width: 50,
    padding: 10,
  },
});
