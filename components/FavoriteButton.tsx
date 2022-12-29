import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FavoriteButtonProps {
  handlePress: () => void;
  onShare: () => Promise<void>;
}

const FavoriteButton = ({ handlePress, onShare }: FavoriteButtonProps) => {
  return (
    <View>
      <View>
        <Pressable style={styles.button} onPress={() => handlePress()}>
          <Icon name="favorite" size={30} color="red" />
        </Pressable>
      </View>

      <View style={styles.shareButton}>
        <Pressable onPress={() => onShare()}>
          <Icon name="share" size={30} color="green" />
        </Pressable>
      </View>
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
  shareButton: {
    alignContent: "center",
    borderRadius: 50,
    width: 50,
    padding: 10,
    marginLeft: 10,
    marginTop: 55,
    marginStart: 10,
  },
});
